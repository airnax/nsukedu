# NSUK website (Node.js + Express + Tailwind CSS)

Layout from the Eduvet reference design, re-coloured with the Nasarawa State University, Keffi palette.

## Run

```bash
npm install
npm run build:css   # one-off build of public/css/styles.css
npm start           # http://localhost:3000
# or, while editing:
npm run dev         # Tailwind watcher + node --watch
```

## Structure

```
server.js              Express: static files, /api/health, /api/subscribe
tailwind.config.js     NSUK colour tokens, 1170px container, Inter
src/input.css          Tailwind layers: base + components (.wrap, .eyebrow, .accent, .btn-*, .ph)
public/index.html      The page
public/js/main.js      Header, department rows, counters, form
public/img/            Drop images here (see README.md in that folder)
```

## Palette (sampled from nsuk.edu.ng)

| Token         | Hex       |
|---------------|-----------|
| nsuk-700      | `#075E3B` |
| nsuk-800      | `#074A2F` |
| nsuk-900      | `#04462C` |
| nsuk-500      | `#166747` |
| nsuk-950 / ink| `#101D17` |
| nsuk-50       | `#F3F7F5` |
| nsuk-100      | `#E6EFEB` |
| gold-400      | `#DCB342` |
| gold-500      | `#D7A928` |
| gold-100      | `#F5EAC9` |

## Dimensions

The mockup was exported at 1024px wide from a 1440px layout (factor 1.40625). Key measurements:
top bar 35px, header 82px, hero 756px (photo 756 x 756, 72px from the right), container 1170px,
cards 360px with 45px gaps, department rows 131px, news section 851px.

## Where to edit content

| What | Where |
|---|---|
| Partner names (scrolling strip) | `PARTNERS` array at the top of `public/js/main.js` |
| Campus video | `<section id="video" data-youtube="" data-file="video/campus.mp4">` in `index.html`. Put a YouTube video id in `data-youtube`, or drop the file at `public/video/campus.mp4`. With neither, the modal shows the "coming soon" scene. |
| News cards | `public/data/news.json` (the cards in `index.html` are only the fallback when JSON can't load) |
| "Apply now" target | Currently https://nsuk.edu.ng/. Change the `href` in the hero and admission card. |
| Pages not built yet | Every faculty and footer link goes to `under-construction.html?page=<name>`. Unknown URLs get `404.html` (via the server). |

Missing photos show the cat-and-mouse "coming soon" scene. Add the file to `public/img/` and it replaces the scene automatically.

## Also included
- Quick-links bar under the hero, search (click the icon or press `/`), `contact.html` with a form that posts to `/api/contact`, `/sitemap.xml` and `/robots.txt`, skip link, Open Graph tags and JSON-LD.
- See `DEPLOY.md` for hosting.

## Windows shortcut
Double-click `start.bat`. It installs dependencies on the first run, builds the CSS if needed, opens
http://localhost:3000 and starts the server. Close the window to stop it.
