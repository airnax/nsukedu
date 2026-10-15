'use strict';

/* ---------------------------------------------------------------------------
 * NSUK site behaviour. No framework: small, self-contained modules.
 * Every init function guards for missing elements so this file is shared by
 * index.html, under-construction.html and 404.html.
 * ------------------------------------------------------------------------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------------------------------------------------------------------------
 * Content config. Edit here, not in the HTML.
 * ------------------------------------------------------------------------- */

/** Partners shown in the scrolling strip. Remove any that are not confirmed. */
const PARTNERS = [
  'TETFund',
  'Prince Interior Vocational Institute',
  'Federal Polytechnic, Nasarawa',
  'College of Agriculture Science and Technology, Lafia',
  'FIDEI Polytechnic, Gboko',
  'Plateau State Polytechnic, Barkin Ladi',
  'APUDI Institute of Peace Studies',
  'Meyana Bio-Energy Company',
  'OPay Digital Services',
  'Nigerian Security Printing and Minting Co.',
  'Triple Helix Nigeria',
  'Centre for Democracy and Development',
  'Nigeria Geological Survey Agency',
  'Nigerian Meteorological Agency',
  'Defence Space Administration',
  'RUDN University, Russia',
  'Central Mining Institute, Poland',
  'Zumunta Association USA',
];

/** Pages and sections the search box can jump to. */
const uc = (name) => `under-construction.html?page=${encodeURIComponent(name)}`;
const SEARCH_INDEX = [
  { title: 'Programmes and faculties', desc: 'Study at NSUK', href: 'index.html#programmes' },
  { title: 'Administration & Business', desc: 'Faculty', href: uc('Administration & Business') },
  { title: 'Arts & Humanities', desc: 'Faculty', href: uc('Arts & Humanities') },
  { title: 'Science & Technology', desc: 'Faculty', href: uc('Science & Technology') },
  { title: 'Law & Governance', desc: 'Faculty', href: uc('Law & Governance') },
  { title: 'Agriculture & Environment', desc: 'Faculty', href: uc('Agriculture & Environment') },
  { title: 'Education & Society', desc: 'Faculty', href: uc('Education & Society') },
  { title: 'News and announcements', desc: 'Latest from the university', href: 'index.html#news' },
  { title: 'Campus overview video', desc: 'Watch the campus', href: 'index.html#video' },
  { title: 'Apply for admission', desc: 'Admission enquiry and official site', href: 'index.html#admission' },
  { title: 'Partners and collaborations', desc: 'Institutions we work with', href: 'index.html#partners' },
  { title: 'Frequently asked questions', desc: 'NSUK student guide', href: 'https://nsukfaq.vercel.app/faq' },
  { title: 'UTME cut-off mark', desc: 'Admissions question', href: 'https://nsukfaq.vercel.app/faq/adm-1' },
  { title: 'Hostel accommodation', desc: 'Campus life question', href: 'https://nsukfaq.vercel.app/faq/camp-1' },
  { title: 'Academic calendar', desc: 'Dates and deadlines', href: 'https://nsuk.edu.ng/academic-calendar' },
  { title: 'Research at NSUK', desc: 'Local and global impact', href: 'https://nsuk.edu.ng/research' },
  { title: 'Contact us', desc: 'Address, email and message form', href: 'contact.html' },
];

/* ---------------------------------------------------------------------------
 * "Coming soon" scene: an original cat and mouse in graduation gowns, carrying
 * books, running into a stop sign. Pure SVG + CSS (see src/input.css).
 * ------------------------------------------------------------------------- */
const GOWN = '#075E3B';
const GOLD = '#DCB342';
const INK = '#101D17';

const sceneSvg = () => `
<svg viewBox="0 0 520 190" role="img" aria-label="A cat and a mouse in graduation gowns run into a stop sign" xmlns="http://www.w3.org/2000/svg">
  <line x1="10" y1="160" x2="510" y2="160" stroke="${INK}" stroke-opacity=".18" stroke-width="3" stroke-linecap="round"/>

  <!-- stop sign -->
  <g class="soon-sign">
    <rect x="428" y="72" width="7" height="88" fill="#8A948F"/>
    <polygon points="418,28 446,28 466,48 466,76 446,96 418,96 398,76 398,48" fill="#B3261E" stroke="#fff" stroke-width="3"/>
    <text x="432" y="67" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="15" fill="#fff">STOP</text>
  </g>

  <!-- dizzy stars -->
  <g class="soon-stars" fill="${GOLD}">
    <polygon points="395,40 399,50 410,50 401,57 405,67 395,61 385,67 389,57 380,50 391,50"/>
    <polygon points="372,96 375,103 383,103 377,108 379,115 372,111 365,115 367,108 361,103 369,103"/>
  </g>

  <g class="soon-runners">
    <!-- cat (chasing) -->
    <g class="soon-bob">
      <path d="M6 128 C-18 120 -18 92 -4 86" fill="none" stroke="#7C8883" stroke-width="7" stroke-linecap="round"/>
      <rect x="4" y="100" width="46" height="52" rx="10" fill="${GOWN}"/>
      <rect x="-6" y="120" width="24" height="18" rx="2" fill="${GOLD}"/><line x1="12" y1="120" x2="12" y2="138" stroke="${INK}" stroke-width="2"/>
      <polygon points="40,72 46,50 56,70" fill="#8E9A95"/><polygon points="58,70 66,50 72,74" fill="#8E9A95"/>
      <circle cx="56" cy="88" r="21" fill="#8E9A95"/>
      <circle cx="63" cy="84" r="3.2" fill="${INK}"/><circle cx="74" cy="92" r="3.4" fill="#E58AA0"/>
      <polygon points="40,66 56,58 76,66 58,74" fill="${INK}"/><rect x="48" y="72" width="16" height="5" fill="${INK}"/>
      <line x1="76" y1="66" x2="80" y2="82" stroke="${GOLD}" stroke-width="3"/><circle cx="80" cy="84" r="3" fill="${GOLD}"/>
    </g>
    <rect class="soon-leg" x="14" y="150" width="7" height="14" rx="3.5" fill="${INK}"/>
    <rect class="soon-leg b" x="34" y="150" width="7" height="14" rx="3.5" fill="${INK}"/>

    <!-- mouse (running away) -->
    <g class="soon-bob" style="animation-delay:-.1s">
      <path d="M104 142 C84 150 84 130 98 134" fill="none" stroke="#C9928F" stroke-width="3" stroke-linecap="round"/>
      <rect x="104" y="116" width="32" height="38" rx="9" fill="${GOWN}"/>
      <rect x="96" y="128" width="18" height="14" rx="2" fill="${GOLD}"/><line x1="105" y1="128" x2="105" y2="142" stroke="${INK}" stroke-width="2"/>
      <circle cx="126" cy="94" r="7" fill="#C9C2BA"/><circle cx="142" cy="92" r="7" fill="#C9C2BA"/>
      <circle cx="136" cy="106" r="15" fill="#C9C2BA"/>
      <circle cx="141" cy="102" r="2.6" fill="${INK}"/><circle cx="150" cy="108" r="3" fill="#E58AA0"/>
      <polygon points="120,86 136,80 154,86 138,92" fill="${INK}"/>
      <line x1="154" y1="86" x2="157" y2="98" stroke="${GOLD}" stroke-width="3"/><circle cx="157" cy="100" r="2.6" fill="${GOLD}"/>
    </g>
    <rect class="soon-leg b" x="110" y="152" width="6" height="12" rx="3" fill="${INK}"/>
    <rect class="soon-leg" x="124" y="152" width="6" height="12" rx="3" fill="${INK}"/>
  </g>
</svg>`;

const soonMarkup = (caption) =>
  `<div class="soon">${sceneSvg()}<p class="soon-caption">${caption}</p></div>`;

/** Fill every [data-soon] element with the scene (used on the info pages). */
function initSoon() {
  $$('[data-soon]').forEach((el) => {
    el.innerHTML = soonMarkup(el.dataset.soon || 'Coming soon');
  });
}

/** Image placeholders: if the photo is missing, show the scene (big slots) or stripes (small). */
function initImageFallbacks() {
  $$('.ph > img').forEach((img) => {
    const drop = () => {
      const box = img.parentElement;
      if (!box) return; // already handled (error event + complete check can both fire)
      img.remove();
      const { width, height } = box.getBoundingClientRect();
      if (width >= 250 && height >= 250 && !box.querySelector('.soon')) {
        box.classList.add('is-soon');
        box.insertAdjacentHTML('afterbegin', soonMarkup('Photo coming soon'));
      }
    };
    img.addEventListener('error', drop, { once: true });
    if (img.complete && img.naturalWidth === 0) drop();
  });
}

/* ---------------------------------------------------------------------------
 * Header
 * ------------------------------------------------------------------------- */
function initHeader() {
  const header = $('#site-header');
  const toggle = $('#menu-toggle');
  const menu = $('#mobile-menu');
  if (!header) return;

  const onScroll = () => header.classList.toggle('shadow-[0_6px_24px_rgba(16,29,23,.08)]', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(open));
  });
}

/* ---------------------------------------------------------------------------
 * Departments: hovered / focused row becomes the green active row.
 * ------------------------------------------------------------------------- */
function initDepartments() {
  const rows = $$('.dept-row');
  if (!rows.length) return;

  const activate = (row) => {
    rows.forEach((r) => {
      const on = r === row;
      r.classList.toggle('is-active', on);
      $('.dept-bg', r).classList.toggle('opacity-100', on);
      $('.dept-bg', r).classList.toggle('opacity-0', !on);
      $('.dept-arrow', r).classList.toggle('opacity-100', on);
      $('.dept-arrow', r).classList.toggle('opacity-0', !on);
    });
  };
  rows.forEach((row) => {
    row.addEventListener('mouseenter', () => activate(row));
    row.addEventListener('focusin', () => activate(row));
  });
  if (rows[1]) activate(rows[1]); // matches the reference design
}

/* ---------------------------------------------------------------------------
 * Counters: reset to 0, then count up with easing when 60% visible.
 * ------------------------------------------------------------------------- */
function initCounters() {
  const els = $$('[data-count]');
  if (!els.length) return;

  const format = (n) => String(n);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach((el) => (el.textContent = format(el.dataset.count) + (el.dataset.suffix ?? '')));
    return;
  }

  els.forEach((el) => (el.textContent = '0' + (el.dataset.suffix ?? '')));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const el = entry.target;
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? '';
        const duration = target > 100 ? 2200 : 1400;
        const start = performance.now();

        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
          el.textContent = format(Math.round(target * eased)) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------------------------
 * Partners marquee (moves left to right; the track is two copies of the list).
 * ------------------------------------------------------------------------- */
function initPartners() {
  const mount = $('#partners');
  if (!mount) return;

  const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const initials = (name) =>
    name
      .replace(/[^A-Za-z ]/g, '')
      .split(' ')
      .filter((w) => w.length > 2 || w === w.toUpperCase())
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();

  // Logo file (optional): public/img/partners/<slug>.<png|svg|webp|jpg|jpeg>. If none exists, the monogram stays.
  const item = (name, hidden) => `
    <li class="partner"${hidden ? ' aria-hidden="true"' : ''}>
      <span class="partner-mark">
        <span>${initials(name)}</span>
        <img src="img/partners/${slug(name)}.png" data-slug="${slug(name)}" alt="" class="hidden">
      </span>
      <span>${name}</span>
    </li>`;

  const list = PARTNERS.map((n) => item(n, false)).join('');
  const copy = PARTNERS.map((n) => item(n, true)).join('');
  mount.innerHTML = `<ul class="marquee-track">${list}${copy}</ul>`;

  // Swap monogram for the real logo once it loads; try other file types if .png is missing.
  const EXTS = ['png', 'svg', 'webp', 'jpg', 'jpeg'];
  $$('.partner-mark img', mount).forEach((img) => {
    let i = 0;
    const show = () => {
      img.classList.remove('hidden');
      img.previousElementSibling?.remove();
      img.parentElement.classList.add('has-logo');
    };
    img.addEventListener('load', show);
    img.addEventListener('error', () => {
      i += 1;
      if (i < EXTS.length) img.src = `img/partners/${img.dataset.slug}.${EXTS[i]}`;
    });
    if (img.complete && img.naturalWidth > 0) show();
  });

  // Pause / play control (keeps the strip accessible for people who need it still).
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'mx-auto mt-5 block text-[13px] font-semibold text-nsuk-700 underline underline-offset-4';
  toggle.setAttribute('aria-pressed', 'false');
  toggle.textContent = 'Pause scrolling';
  toggle.addEventListener('click', () => {
    const paused = mount.classList.toggle('is-paused');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Resume scrolling' : 'Pause scrolling';
  });
  mount.insertAdjacentElement('afterend', toggle);

  // Touch: hold to pause.
  mount.addEventListener('pointerdown', () => mount.classList.add('is-held'));
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) =>
    mount.addEventListener(ev, () => mount.classList.remove('is-held'))
  );
}

/* ---------------------------------------------------------------------------
 * Campus video modal. Source order: YouTube id (data-youtube) > local file
 * (data-file). If neither plays, the stage shows the "coming soon" scene.
 * ------------------------------------------------------------------------- */
function initVideo() {
  const section = $('#video');
  const modal = $('#video-modal');
  const stage = $('#video-stage');
  const play = $('#play-video');
  if (!section || !modal || !play) return;

  const showSoon = () => (stage.innerHTML = soonMarkup('Campus video coming soon'));

  const open = () => {
    const yt = (section.dataset.youtube || '').trim();
    const file = (section.dataset.file || '').trim();

    if (yt) {
      stage.innerHTML = `<iframe class="h-full w-full" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(yt)}?autoplay=1&rel=0" title="NSUK campus video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    } else if (file) {
      stage.innerHTML = `<video class="h-full w-full" controls autoplay playsinline><source src="${file}" type="video/mp4"></video>`;
      const source = $('source', stage);
      source.addEventListener('error', showSoon, { once: true });
    } else {
      showSoon();
    }
    modal.showModal();
  };

  const close = () => {
    modal.close();
    stage.innerHTML = ''; // stops playback
  };

  play.addEventListener('click', open);
  $('#video-close')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => e.target === modal && close()); // backdrop click
  modal.addEventListener('close', () => (stage.innerHTML = ''));
}

/* ---------------------------------------------------------------------------
 * Under-construction page: show which page the visitor asked for.
 * ------------------------------------------------------------------------- */
function initUnderConstruction() {
  const label = $('#uc-page');
  if (!label) return;
  const name = new URLSearchParams(location.search).get('page');
  if (name) {
    label.textContent = name;
    document.title = `${name} | Nasarawa State University, Keffi`;
  }
}


/* ---------------------------------------------------------------------------
 * Search dialog: client-side filter over SEARCH_INDEX + the partner names.
 * ------------------------------------------------------------------------- */
function initSearch() {
  const modal = $('#search-modal');
  const openBtn = $('#search-open');
  const input = $('#search-input');
  const list = $('#search-results');
  if (!modal || !openBtn) return;

  const entries = [
    ...SEARCH_INDEX,
    ...PARTNERS.map((name) => ({ title: name, desc: 'Partner', href: 'index.html#partners' })),
  ];
  const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  const render = (q) => {
    const term = q.trim().toLowerCase();
    const hits = (term ? entries.filter((e) => `${e.title} ${e.desc}`.toLowerCase().includes(term)) : SEARCH_INDEX.slice(0, 7)).slice(0, 8);
    list.innerHTML = hits.length
      ? hits.map((e) => `<li role="option"><a href="${e.href}" class="block px-5 py-3 hover:bg-nsuk-50 focus:bg-nsuk-50"><span class="block text-[15px] font-semibold">${esc(e.title)}</span><span class="block text-[13px] text-ink/70">${esc(e.desc)}</span></a></li>`).join('')
      : '<li class="px-5 py-6 text-[14px] text-ink/70">No matches. Try "admission", "news" or a faculty name.</li>';
  };

  openBtn.addEventListener('click', () => {
    render('');
    modal.showModal();
    input.focus();
  });
  input.addEventListener('input', () => render(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') $('a', list)?.click();
  });
  $('#search-close')?.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => e.target === modal && modal.close());
  list.addEventListener('click', (e) => e.target.closest('a') && modal.close());
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) {
      e.preventDefault();
      openBtn.click();
    }
  });
}

/* ---------------------------------------------------------------------------
 * News: render from data/news.json. The static cards in index.html are the
 * fallback (file:// or no server), so a failed fetch changes nothing.
 * ------------------------------------------------------------------------- */
async function initNews() {
  const grid = $('#news-grid');
  if (!grid) return;
  try {
    const res = await fetch('data/news.json', { cache: 'no-cache' });
    if (!res.ok) return;
    const items = await res.json();
    if (!Array.isArray(items) || !items.length) return;

    const esc = (t = '') => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    const safeUrl = (u) => (/^https?:\/\//i.test(u) ? u : '#');

    grid.innerHTML = items.slice(0, 6).map((n) => {
      const big = String(n.day).length <= 2 ? 'text-[26px]' : 'text-[15px] tracking-wide';
      const file = String(n.image || '').split('/').pop();
      return `
      <article class="group">
        <a href="${esc(safeUrl(n.url))}" target="_blank" rel="noopener" class="block">
          <div class="ph relative h-[320px] w-full lg:h-[360px]" data-ph="${esc(file)} · 360 × 360">
            ${n.image ? `<img src="${esc(n.image)}" alt="" loading="lazy" />` : ''}
            <div class="absolute left-[18px] top-[18px] z-[2] flex h-[72px] w-[72px] flex-col items-center justify-center bg-white leading-none"><span class="font-semibold ${big}">${esc(n.day)}</span><span class="mt-1 text-[12px] text-ink/70">${esc(n.month)}</span></div>
          </div>
          <h3 class="mt-[34px] text-[19px] font-medium leading-6 transition-colors group-hover:text-nsuk-700">${esc(n.title)}</h3>
          <p class="mt-3 max-w-[340px] text-[14px] leading-[22px] text-ink/70">${esc(n.summary)}</p>
          <p class="mt-4 text-[13px] font-medium text-nsuk-700">${esc(n.source)} <span aria-hidden="true">&nearr;</span></p>
        </a>
      </article>`;
    }).join('');
  } catch {
    /* keep the static markup */
  }
}

/* ---------------------------------------------------------------------------
 * Contact form -> POST /api/contact
 * ------------------------------------------------------------------------- */
function initContact() {
  const form = $('#contact-form');
  if (!form) return;
  const status = $('#contact-status');
  const btn = $('button[type="submit"]', form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'mt-4 min-h-[24px] text-[15px]';
    btn.disabled = true;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      status.textContent = data.message;
      status.classList.add(res.ok ? 'text-nsuk-700' : 'text-red-700');
      if (res.ok) form.reset();
    } catch {
      status.textContent = 'Could not reach the server. Start it with "npm start" and try again.';
      status.classList.add('text-red-700');
    } finally {
      btn.disabled = false;
    }
  });
}

/* ---------------------------------------------------------------------------
 * Subscribe form -> POST /api/subscribe (needs the Node server).
 * ------------------------------------------------------------------------- */
function initSubscribe() {
  const form = $('#subscribe-form');
  if (!form) return;
  const input = $('input[type="email"]', form);
  const status = $('#subscribe-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'mt-3 min-h-[20px] text-[14px]';

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: input.value }),
      });
      const data = await res.json();
      status.textContent = data.message;
      status.classList.add(res.ok ? 'text-nsuk-700' : 'text-red-700');
      if (res.ok) form.reset();
    } catch {
      status.textContent = 'Could not reach the server. Start it with "npm start" and try again.';
      status.classList.add('text-red-700');
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  initSoon();
  await initNews(); // must run before image fallbacks so new cards are covered
  initImageFallbacks();
  initHeader();
  initSearch();
  initDepartments();
  initCounters();
  initPartners();
  initVideo();
  initUnderConstruction();
  initSubscribe();
  initContact();
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
});
