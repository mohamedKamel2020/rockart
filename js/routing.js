import { stripBase, withBase } from './base.js';
import { ALL_PRODUCTS, COMPANY_INFO, PROJECTS } from './data.js';

/** Public site origin used for canonical URLs, Open Graph and structured data. */
export const SITE_URL = COMPANY_INFO.website.replace(/\/+$/, '');
export const DEFAULT_OG_IMAGE = '/assets/images/hero_retaining_wall_1794852048110.jpg';

function normalizePathname(pathname) {
  pathname = stripBase(pathname || '/');
  if (pathname === '/') return '/';
  const cleaned = pathname.replace(/\/+$/, '');
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

/**
 * Supports clean routes (`/about`, `/products/SP-227/`, `/projects/banded-boundary-wall/`)
 * and the real static `.html` files (`/about.html`, ...).
 */
export function parseRoute(pathname) {
  const path = normalizePathname(pathname);

  if (path === '/' || path === '/index.html') return { page: 'home', path: '/' };
  if (path === '/about' || path === '/about.html') return { page: 'about', path: '/about' };
  if (path === '/lock-stone' || path === '/lock-stone.html')
    return { page: 'lock-stone', path: '/lock-stone' };
  if (path === '/products' || path === '/products.html')
    return { page: 'products', path: '/products' };
  if (path === '/projects' || path === '/projects.html')
    return { page: 'projects', path: '/projects' };
  if (path === '/contact' || path === '/contact.html')
    return { page: 'contact', path: '/contact' };
  if (path === '/404' || path === '/404.html') return { page: 'not-found', path: '/404' };

  if (path.startsWith('/products/')) {
    const sku = decodeURIComponent(path.slice('/products/'.length));
    const found = ALL_PRODUCTS.find((p) => p.sku.toLowerCase() === sku.toLowerCase());
    if (found) {
      return { page: 'product-detail', param: found.sku, path: `/products/${found.sku}` };
    }
    return { page: 'not-found', path };
  }

  if (path.startsWith('/projects/')) {
    const slug = decodeURIComponent(path.slice('/projects/'.length));
    const found = PROJECTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
    if (found) {
      return { page: 'project-detail', param: found.slug, path: `/projects/${found.slug}` };
    }
    return { page: 'not-found', path };
  }

  return { page: 'not-found', path };
}

/**
 * Generates standard static HTML hrefs so every link works seamlessly on any static server
 * as well as Node server.
 */
function routeFilePath(page, param = '') {
  switch (page) {
    case 'home':
      return '/index.html';
    case 'about':
      return '/about.html';
    case 'lock-stone':
      return '/lock-stone.html';
    case 'products':
      return '/products.html';
    case 'product-detail':
      return param ? `/products/${encodeURIComponent(param)}/` : '/products.html';
    case 'projects':
      return '/projects.html';
    case 'project-detail':
      return param ? `/projects/${encodeURIComponent(param)}/` : '/projects.html';
    case 'contact':
      return '/contact.html';
    default:
      return '/404.html';
  }
}

/** Real URL of a page, including the base path when hosted in a sub-folder. */
export function buildPageUrl(page, param = '') {
  return withBase(routeFilePath(page, param));
}

/** Canonical (indexable) URL path of a route — always the real, crawlable URL. */
export function getCanonicalPath(route) {
  if (route.page === 'home') return '/';
  if (route.page === 'not-found') return route.path;
  return routeFilePath(route.page, route.param || '');
}

const META = {
  home: {
    ar: {
      title: 'روك آرت | حوائط ساندة لوك ستون وتكسية حجرية GRC في مصر',
      description:
        'روك آرت للمنتجات الأسمنتية والديكور — مصنع بالكيلو 26 أبو رواش الجيزة: نظام لوك ستون للحوائط الساندة ببراءة اختراع، تكسية حجرية جي آر سي، وأصص ونوافير حدائق. اطلب عرض سعر.',
    },
    en: {
      title: 'Rock Art | Lock Stone Retaining Walls & GRC Stone Cladding in Egypt',
      description:
        'Rock Art — Abu Rawash, Giza factory: patented Lock Stone retaining wall system, GRC stone cladding, cast-stone planters and garden fountains. Request a quote.',
    },
  },
  about: {
    ar: {
      title: 'عن روك آرت | مصنع منتجات أسمنتية وجي آر سي بأبو رواش',
      description:
        'تعرّف على مصنع روك آرت بالكيلو 26 أبو رواش: تصنيع بلوك الكيستون والإنترلوك وأعمال الجي آر سي للفلل والمشروعات، ومشروعات منفذة في مختلف أنحاء مصر.',
    },
    en: {
      title: 'About Rock Art | Cement & GRC Products Factory in Abu Rawash',
      description:
        'Rock Art factory at Kilo 26 Abu Rawash, Giza — cement products, GRC architectural works and 15+ major projects delivered across Egypt.',
    },
  },
  'lock-stone': {
    ar: {
      title: 'نظام لوك ستون للحوائط الساندة | براءة اختراع | روك آرت',
      description:
        'نظام لوك ستون للحوائط الساندة مزدوج التسليح ببراءة اختراع رقم 2018/1412، لارتفاعات تتجاوز 12 متراً مع تدعيم جيد للتربة، بشبكات جيوجريد HDPE من 60 إلى 160 كيلو نيوتن/م. احصل على عرض سعر.',
    },
    en: {
      title: 'Lock Stone Retaining Wall System | Patented | Rock Art Egypt',
      description:
        'Patented double-reinforced Lock Stone retaining walls supporting heights over 12 m with proper soil reinforcement, using HDPE geogrids rated 60 to 160 kN/m.',
    },
  },
  products: {
    ar: {
      title: 'كتالوج التكسية الحجرية والطوب الصناعي والأصص الخرسانية | روك آرت',
      description:
        'تصفح 14 منتجاً: بلاط صناعي لتكسية الحوائط بالطرز اليوناني والأسباني والإنجليزي، وأصص ونوافير حدائق خرسانية. المقاسات والألوان وطلب عينة وعرض سعر.',
    },
    en: {
      title: 'Stone & Brick Cladding and Cast-Stone Planters Catalog | Rock Art',
      description:
        'Browse the catalog: Greek, Spanish and English artificial stone and brick cladding tiles, cast-stone planters and garden fountains.',
    },
  },
  projects: {
    ar: {
      title: 'أعمالنا ومشروعاتنا | حوائط ساندة وتكسية حجرية وجي آر سي | روك آرت',
      description:
        'مشروعات منفذة في مصر: حوائط لوك ستون ساندة ومدرجات، صخور صناعية جي آر سي، تكسية حجرية وتنسيق حدائق. شاهد صور الأعمال والتفاصيل.',
    },
    en: {
      title: 'Completed Projects | Retaining Walls, Cladding & GRC | Rock Art Egypt',
      description:
        'Terraced Lock Stone retaining walls, GRC artificial rockwork, cladding installs and landscaping across Egypt.',
    },
  },
  contact: {
    ar: {
      title: 'اتصل بنا واطلب عرض سعر | روك آرت أبو رواش الجيزة',
      description:
        'تواصل مع روك آرت: الكيلو 26 طريق مصر إسكندرية الصحراوي، أبو رواش، الجيزة. هاتف وواتساب 01064611274 أو أرسل أبعاد مشروعك لعرض سعر.',
    },
    en: {
      title: 'Contact & Request a Quote | Rock Art Abu Rawash, Giza',
      description:
        'Contact Rock Art at Kilo 26 Abu Rawash, Giza or submit project dimensions for a Lock Stone or cladding quote.',
    },
  },
  'not-found': {
    ar: {
      title: '404 — الصفحة غير موجودة | روك آرت',
      description: 'الصفحة المطلوبة غير متوفرة. تصفح نظام لوك ستون أو كتالوج المنتجات أو تواصل معنا.',
    },
    en: {
      title: '404 — Page Not Found | Rock Art Egypt',
      description: 'The requested page could not be found. Explore Lock Stone systems, cladding catalog, or contact Rock Art.',
    },
  },
};

export function getPageMeta(route, lang) {
  if (route.page === 'product-detail' && route.param) {
    const product = ALL_PRODUCTS.find((p) => p.sku === route.param);
    if (product) {
      return lang === 'ar'
        ? {
            title: `${product.name.ar} (${product.sku}) | ${product.typeLabel.ar} | روك آرت`,
            description: `${product.name.ar} كود ${product.sku} — ${product.description.ar}. المقاس ${product.dimensions}. صناعة مصرية من روك آرت، اطلب عرض سعر.`,
          }
        : {
            title: `${product.name.en} (${product.sku}) | ${product.typeLabel.en} | Rock Art`,
            description: `${product.name.en} (${product.sku}) — ${product.description.en}. Size ${product.dimensions}. Made in Egypt by Rock Art.`,
          };
    }
  }

  if (route.page === 'project-detail' && route.param) {
    const project = PROJECTS.find((p) => p.slug === route.param);
    if (project) {
      return lang === 'ar'
        ? { title: `${project.title.ar} | أعمال روك آرت`, description: project.summary.ar }
        : { title: `${project.title.en} | Rock Art Projects`, description: project.summary.en };
    }
  }

  return (META[route.page] || META.home)[lang];
}

function pageLabel(route, lang) {
  const ar = lang === 'ar';
  switch (route.page) {
    case 'about':
      return ar ? 'عن الشركة' : 'About';
    case 'lock-stone':
      return ar ? 'نظام لوك ستون' : 'Lock Stone';
    case 'products':
      return ar ? 'المنتجات' : 'Products';
    case 'projects':
      return ar ? 'أعمالنا' : 'Projects';
    case 'contact':
      return ar ? 'اتصل بنا' : 'Contact';
    default:
      return '';
  }
}

function buildBreadcrumbs(route, lang) {
  const ar = lang === 'ar';
  const trail = [{ name: ar ? 'الرئيسية' : 'Home', path: '/' }];

  if (route.page === 'product-detail' || route.page === 'project-detail') {
    const isProduct = route.page === 'product-detail';
    const listRoute = { page: isProduct ? 'products' : 'projects' };
    trail.push({ name: pageLabel(listRoute, lang), path: routeFilePath(listRoute.page) });
    trail.push({ name: getPageMeta(route, lang).title.split(' | ')[0], path: getCanonicalPath(route) });
  } else if (route.page !== 'home' && route.page !== 'not-found') {
    trail.push({ name: pageLabel(route, lang), path: getCanonicalPath(route) });
  }
  return trail;
}

export function getPageStructuredData(route, origin, lang) {
  const base = origin || SITE_URL;
  const url = `${base}${getCanonicalPath(route)}`;
  const meta = getPageMeta(route, lang);
  const orgId = `${base}/#organization`;

  const organization = {
    '@type': 'LocalBusiness',
    '@id': orgId,
    name: COMPANY_INFO.fullName[lang],
    alternateName: [COMPANY_INFO.brand.ar, COMPANY_INFO.brand.en],
    url: `${base}/`,
    logo: `${base}/favicon.svg`,
    image: `${base}${DEFAULT_OG_IMAGE}`,
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.phones.map((ph) => ph.href.replace('tel:', '')),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address[lang],
      addressLocality: 'Abu Rawash',
      addressRegion: 'Giza',
      addressCountry: 'EG',
    },
    areaServed: { '@type': 'Country', name: 'Egypt' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    url: `${base}/`,
    name: COMPANY_INFO.brand[lang],
    inLanguage: ['ar', 'en'],
    publisher: { '@id': orgId },
  };

  const graph = [organization, website];
  const provider = { '@id': orgId };

  if (route.page === 'product-detail' && route.param) {
    const product = ALL_PRODUCTS.find((p) => p.sku === route.param);
    if (product) {
      graph.push({
        '@type': 'Product',
        '@id': `${url}#product`,
        sku: product.sku,
        name: product.name[lang],
        description: product.description[lang],
        category: product.typeLabel[lang],
        brand: { '@type': 'Brand', name: COMPANY_INFO.brand[lang] },
        manufacturer: provider,
        url,
      });
    }
  } else if (route.page === 'project-detail' && route.param) {
    const project = PROJECTS.find((p) => p.slug === route.param);
    if (project) {
      graph.push({
        '@type': 'CreativeWork',
        '@id': `${url}#project`,
        name: project.title[lang],
        description: project.summary[lang],
        creator: provider,
        url,
      });
    }
  } else if (route.page === 'lock-stone') {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: lang === 'ar' ? 'نظام لوك ستون للحوائط الساندة' : 'Lock Stone Retaining Wall System',
      provider,
      areaServed: 'EG',
      url,
    });
  } else {
    graph.push({
      '@type': route.page === 'contact' ? 'ContactPage' : 'WebPage',
      '@id': `${url}#webpage`,
      name: meta.title,
      description: meta.description,
      url,
      isPartOf: { '@id': `${base}/#website` },
    });
  }

  if (route.page !== 'home' && route.page !== 'not-found') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: buildBreadcrumbs(route, lang).map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: `${base}${item.path}`,
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
