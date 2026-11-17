# Rock Art Egypt

Static multi-page site (vanilla JS modules, no framework) for Rock Art — Lock Stone retaining walls, GRC cladding and cast-stone products.
Bilingual (AR/EN, RTL) with light/dark themes. **Arabic is the default on every new visit**; English is remembered only for the current browser session.

## Commands
    npm install          # once (installs jsdom, used only by the build)
    npm run dev          # http://localhost:3000  (static dev server)
    npm run build        # prerender every page in Arabic + sitemap.xml   ← run after editing js/data.js
    npm run check        # syntax check
    npm test             # logic + SEO tests (the asset-existence test needs /assets present)

## Structure
    index.html about.html lock-stone.html products.html projects.html contact.html 404.html   (generated)
    products/<SKU>/index.html   projects/<slug>/index.html                                     (generated, one per item)
    sitemap.xml                                                                                (generated)
    js/        app logic (js/data.js = all content, js/routing.js = URLs + SEO meta + JSON-LD)
    css/       styles          js/boot.js = tiny pre-paint script (theme + Arabic default)
    scripts/prerender.mjs      static prerender (SEO + faster first paint)
    send-quote.php             quote form → email (plain PHP mail())
    .htaccess  robots.txt  favicon.svg

Images/videos live in `assets/` (not included in the archive).

## Deploy (Apache / LiteSpeed / cPanel)
Upload everything except `node_modules/`, `scripts/`, `tests/`, `package*.json`, `server.mjs`, `README.md`.
1. Check the domain in `js/data.js → COMPANY_INFO.website` and in `robots.txt`, then `npm run build`.
2. Edit `$TO_EMAIL` at the top of `send-quote.php`.
3. After SSL is active, uncomment the HTTPS rule (and HSTS) in `.htaccess`.
4. Submit `https://www.rockart-eg.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Testing the form locally
Live Server / `npm run dev` cannot run PHP. Use PHP's built-in server instead:

    php -S localhost:8000
    # open http://localhost:8000/contact.html

Local PHP usually has no mail server, so you'll see the "could not send" message — that is normal; on the real host `mail()` works.

## GitHub Pages
The site works from a domain root **and** from a sub-folder such as `https://USER.github.io/REPO/`: all links, images and videos are resolved at runtime from the location of `js/base.js` (see `js/base.js`), and the `<head>` links are relative. Nothing to configure.

1. Push the project (including `assets/`) to the repo, then Settings → Pages → Deploy from branch → `main` / root.
2. Limits of GitHub Pages: PHP does not run there (the quote form will show its "could not send" message — it works on a PHP host), and `.htaccess` is ignored.
3. Canonical URLs, sitemap and Open Graph always point to `COMPANY_INFO.website` (the real domain), so a GitHub copy does not compete with the real site in search.
