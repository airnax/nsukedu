# Deploying the NSUK site

The CSS is already built into `public/css/styles.css`. If you change classes, run `npm run build:css` first.

## Before you go live
1. Set `SITE_URL` (see `.env.example`) so `sitemap.xml` and `robots.txt` use your real domain.
2. In `public/index.html`, change `og:image` to an absolute URL, for example `https://your-domain/img/logo.png`
   (use a 1200 x 630 banner for the best WhatsApp / Facebook preview).
3. Replace placeholder photos in `public/img/` (see the README in that folder) and partner logos in `public/img/partners/`.
4. Put real social links in the footer and a phone number in the top bar when you have them.

## Option A: Render / Railway (easiest)
- Create a new Web Service from your Git repo.
- Build command: `npm install`
- Start command: `npm start`
- Add environment variable `SITE_URL`. The platform sets `PORT` for you.
- Add your custom domain in the dashboard. HTTPS is automatic.

Note: form submissions are saved to `data/*.json`. On these platforms the disk is wiped on each deploy unless you attach a
persistent disk, so mount one at `/app/data` or swap the JSON file for a database or an email service.

## Option B: VPS (Ubuntu) with PM2 + nginx
```bash
npm install --omit=dev
npm install -g pm2
SITE_URL=https://your-domain pm2 start server.js --name nsuk
pm2 save && pm2 startup
```
nginx server block (then run `certbot --nginx` for HTTPS):
```nginx
server {
  server_name your-domain;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Option C: Docker
```bash
docker build -t nsuk-site .
docker run -d -p 3000:3000 -e SITE_URL=https://your-domain -v nsuk-data:/app/data nsuk-site
```

## Editing content later
- News: edit `public/data/news.json` (no code changes, no rebuild).
- Partners: `PARTNERS` array in `public/js/main.js`.
- Messages and subscribers: `data/messages.json` and `data/subscribers.json`.
