'use strict';

const path = require('node:path');
const fs = require('node:fs/promises');
const express = require('express');
const compression = require('compression');

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const SUBSCRIBERS_FILE = path.join(__dirname, 'data', 'subscribers.json');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1); // correct client IP behind Render/Railway/nginx

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(compression());
app.use(express.json({ limit: '10kb' }));

app.use((_req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  });
  next();
});

app.use(
  express.static(PUBLIC_DIR, {
    extensions: ['html'],
    // HTML must always revalidate; hashed-style assets can be cached for a week.
    setHeaders(res, filePath) {
      const isHtml = filePath.endsWith('.html');
      res.set('Cache-Control', isHtml ? 'no-cache' : 'public, max-age=604800');
    },
  })
);

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: Math.round(process.uptime()) });
});

app.post('/api/subscribe', async (req, res) => {
  const email = String(req.body?.email ?? '').trim().toLowerCase();

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ ok: false, message: 'Enter a valid email address.' });
  }

  try {
    const list = await readSubscribers();
    if (!list.some((s) => s.email === email)) {
      list.push({ email, createdAt: new Date().toISOString() });
      await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(list, null, 2));
    }
    return res.status(201).json({ ok: true, message: 'Thanks. We will be in touch.' });
  } catch (err) {
    console.error('[subscribe]', err);
    return res.status(500).json({ ok: false, message: 'Something went wrong. Try again shortly.' });
  }
});

async function readJson(file) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}
const readSubscribers = () => readJson(SUBSCRIBERS_FILE);

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------
const MESSAGES_FILE = path.join(__dirname, 'data', 'messages.json');
const hits = new Map(); // ip -> [timestamps]

/** Allow `limit` requests per `windowMs` per IP (in-memory, fine for a single instance). */
function rateLimited(ip, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > limit;
}

app.post('/api/contact', async (req, res) => {
  if (rateLimited(req.ip)) {
    return res.status(429).json({ ok: false, message: 'Too many requests. Please wait a minute.' });
  }

  const body = req.body ?? {};
  if (body.website) return res.status(201).json({ ok: true, message: 'Thanks. Message sent.' }); // honeypot: pretend success

  const name = String(body.name ?? '').trim().slice(0, 100);
  const email = String(body.email ?? '').trim().toLowerCase();
  const subject = String(body.subject ?? 'Other').trim().slice(0, 80);
  const message = String(body.message ?? '').trim().slice(0, 2000);

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return res.status(400).json({ ok: false, message: 'Please add your name, a valid email and a message (10+ characters).' });
  }

  try {
    const list = await readJson(MESSAGES_FILE);
    list.push({ name, email, subject, message, createdAt: new Date().toISOString() });
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(list, null, 2));
    return res.status(201).json({ ok: true, message: 'Thanks. Your message has been received.' });
  } catch (err) {
    console.error('[contact]', err);
    return res.status(500).json({ ok: false, message: 'Something went wrong. Try again shortly.' });
  }
});

// ---------------------------------------------------------------------------
// SEO: robots.txt and sitemap.xml built from the host that served the request
// (set SITE_URL in production, see DEPLOY.md).
// ---------------------------------------------------------------------------
const baseUrl = (req) => process.env.SITE_URL?.replace(/\/$/, '') || `${req.protocol}://${req.get('host')}`;

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl(req)}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const pages = ['/', '/contact.html'];
  const urls = pages.map((p) => `  <url><loc>${baseUrl(req)}${p}</loc></url>`).join('\n');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
});

// ---------------------------------------------------------------------------
// Fallbacks
// ---------------------------------------------------------------------------
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ ok: false, message: 'Not found.' });
  }
  res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'));
});

app.listen(PORT, () => {
  console.log(`NSUK site running at http://localhost:${PORT}`);
});
