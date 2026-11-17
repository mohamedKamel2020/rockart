/**
 * Static prerender (SEO + speed).
 *
 * The site is rendered by JavaScript. Search engines and social crawlers get a much better
 * result when the Arabic page is already in the HTML, so this script runs the real app code
 * inside jsdom and writes the finished pages to disk:
 *
 *   index.html, about.html, lock-stone.html, products.html, projects.html, contact.html, 404.html
 *   products/<SKU>/index.html        (one page per product)
 *   projects/<slug>/index.html       (one page per project)
 *   sitemap.xml
 *
 * In the browser the same JS then takes over (hydrates) and keeps EN/AR, theme and filters working.
 *
 *   npm install && npm run build
 *
 * Re-run it whenever js/data.js changes (new product, project, text...).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Oswald:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Tajawal:wght@400;500;700;800&display=swap';
const CSS_FILES = ['reset', 'variables', 'themes', 'global', 'components', 'animations', 'responsive'];

// --- load the app modules once, with a fake browser global in place -------------------------
const bootDom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://placeholder.test/' });
function useDom(dom) {
  const { window } = dom;
  globalThis.window = window;
  globalThis.document = window.document;
  Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
}
useDom(bootDom);

const data = await import('../js/data.js');
const routing = await import('../js/routing.js');
const language = await import('../js/language.js');
const navigation = await import('../js/navigation.js');
const forms = await import('../js/forms.js');
const home = await import('../js/home.js');
const about = await import('../js/about.js');
const lockstone = await import('../js/lockstone.js');
const products = await import('../js/products.js');
const projects = await import('../js/projects.js');
const notFound = await import('../js/notfound.js');

const { ALL_PRODUCTS, PROJECTS } = data;
const { SITE_URL, DEFAULT_OG_IMAGE, parseRoute, getPageMeta, getPageStructuredData, getCanonicalPath } = routing;
const LANG = 'ar';
if (language.getLang() !== LANG) throw new Error('Default language must be Arabic for prerender.');

const esc = (s) =>
  String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// --- every module the entry point needs, so the browser can fetch them in parallel -----------
function collectModules(entry, seen = new Set()) {
  if (seen.has(entry)) return seen;
  seen.add(entry);
  const src = fs.readFileSync(path.join(ROOT, entry), 'utf8');
  for (const m of src.matchAll(/from '\.\/([a-z-]+\.js)'/g)) collectModules(`js/${m[1]}`, seen);
  return seen;
}
const MODULES = [...collectModules('js/app.js')];

// --- page list -----------------------------------------------------------------------------
const TOP_PAGES = [
  { url: '/', file: 'index.html', page: 'home', priority: '1.0' },
  { url: '/about.html', file: 'about.html', page: 'about', priority: '0.7' },
  { url: '/lock-stone.html', file: 'lock-stone.html', page: 'lock-stone', priority: '0.9' },
  { url: '/products.html', file: 'products.html', page: 'products', priority: '0.9' },
  { url: '/projects.html', file: 'projects.html', page: 'projects', priority: '0.8' },
  { url: '/contact.html', file: 'contact.html', page: 'contact', priority: '0.8' },
];
const targets = [
  ...TOP_PAGES,
  ...ALL_PRODUCTS.map((p) => ({
    url: `/products/${p.sku}/`,
    file: `products/${p.sku}/index.html`,
    page: 'product-detail',
    param: p.sku,
    image: p.image,
    priority: '0.6',
  })),
  ...PROJECTS.map((p) => ({
    url: `/projects/${p.slug}/`,
    file: `projects/${p.slug}/index.html`,
    page: 'project-detail',
    param: p.slug,
    image: p.image,
    priority: '0.6',
  })),
  { url: '/404.html', file: '404.html', page: 'not-found', noindex: true },
];

function shell(target, meta, jsonLd) {
  // Head links are relative to the page's folder, so they work on a domain root AND in a
  // sub-folder (GitHub Pages: user.github.io/repo/). The app itself resolves the base at runtime.
  const rel = '../'.repeat(target.file.split('/').length - 1);
  const canonical = `${SITE_URL}${getCanonicalPath(parseRoute(target.url))}`;
  const ogImage = `${SITE_URL}${target.image || DEFAULT_OG_IMAGE}`;
  const robots = target.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1';
  const heroPreload =
    target.page === 'home' ? `    <link rel="preload" as="image" href="${rel}${esc(data.GENERATED_IMAGES.heroRetainingWall.replace(/^\//, ''))}" fetchpriority="high" />\n` : '';
  const brand = data.COMPANY_INFO.brand[LANG];

  return `<!doctype html>
<html lang="ar" dir="rtl" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${esc(canonical)}" />

    <meta property="og:site_name" content="${esc(brand)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ar_EG" />
    <meta property="og:locale:alternate" content="en_US" />
    <meta property="og:title" content="${esc(meta.title)}" />
    <meta property="og:description" content="${esc(meta.description)}" />
    <meta property="og:url" content="${esc(canonical)}" />
    <meta property="og:image" content="${esc(ogImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(meta.title)}" />
    <meta name="twitter:description" content="${esc(meta.description)}" />
    <meta name="twitter:image" content="${esc(ogImage)}" />
    <meta name="theme-color" content="#FBF9F4" />

    <link rel="icon" type="image/svg+xml" href="${rel}favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <script src="${rel}js/boot.js"></script>
    <link href="${FONTS_URL}" rel="stylesheet" />
${CSS_FILES.map((f) => `    <link rel="stylesheet" href="${rel}css/${f}.css" />`).join('\n')}
${heroPreload}${MODULES.map((m) => `    <link rel="modulepreload" href="${rel}${m}" />`).join('\n')}
    <script type="application/ld+json" id="rockart-structured-data">${JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}</script>
  </head>
  <body data-page="${target.page}">
    <div class="app-shell">
      <div id="app-header">__HEADER__</div>
      <main id="page-root" class="app-main" tabindex="-1">__MAIN__</main>
      <div id="app-footer">__FOOTER__</div>
    </div>
    <script type="module" src="${rel}js/app.js"></script>
  </body>
</html>
`;
}

function renderPage(target) {
  const dom = new JSDOM(
    `<!doctype html><html lang="ar" dir="rtl" data-theme="light"><head><meta name="description" content=""></head><body><div id="app-header"></div><main id="page-root"></main><div id="app-footer"></div></body></html>`,
    { url: `${SITE_URL}${target.url}` }
  );
  useDom(dom);

  navigation.initShell();
  const root = document.getElementById('page-root');
  switch (target.page) {
    case 'home': home.initHomePage(root); break;
    case 'about': about.initAboutPage(root); break;
    case 'lock-stone': lockstone.initLockStonePage(root); break;
    case 'products': products.initProductsPage(root); break;
    case 'product-detail': products.initProductDetailPage(root, target.param); break;
    case 'projects': projects.initProjectsPage(root); break;
    case 'project-detail': projects.initProjectDetailPage(root, target.param); break;
    case 'contact': forms.initContactPage(root); break;
    default: notFound.initNotFoundPage(root);
  }

  const route = parseRoute(target.url);
  const meta = getPageMeta(route, LANG);
  const jsonLd = getPageStructuredData(route, SITE_URL, LANG);
  const html = shell(target, meta, jsonLd)
    .replace('__HEADER__', document.getElementById('app-header').innerHTML)
    .replace('__MAIN__', root.innerHTML)
    .replace('__FOOTER__', document.getElementById('app-footer').innerHTML);
  dom.window.close();
  return html;
}

// --- write everything ------------------------------------------------------------------------
let count = 0;
for (const target of targets) {
  const html = renderPage(target);
  const out = path.join(ROOT, target.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  count += 1;
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${targets
  .filter((t) => !t.noindex)
  .map(
    (t) => `  <url>
    <loc>${esc(SITE_URL + t.url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${t.page === 'home' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${t.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);

console.log(`Prerendered ${count} pages + sitemap.xml (${MODULES.length} modules preloaded).`);
