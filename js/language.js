import { toggleShortlistSku } from './engineering.js';
import { getCanonicalPath, getPageMeta, getPageStructuredData, parseRoute, SITE_URL } from './routing.js';

const LANG_STORAGE_KEY = 'rockart-lang';
const SHORTLIST_STORAGE_KEY = 'rockart-shortlist';
const PREFILL_STORAGE_KEY = 'rockart-quote-prefill';

const langListeners = new Set();
const shortlistListeners = new Set();

// Arabic is the default on every new visit. An explicit switch to English is
// remembered only for the current browser session (sessionStorage), so the site
// always opens in Arabic the next time it is visited.
function readInitialLang() {
  try {
    return window.sessionStorage.getItem(LANG_STORAGE_KEY) === 'en' ? 'en' : 'ar';
  } catch {
    return 'ar';
  }
}

function readInitialShortlist() {
  try {
    const saved = window.localStorage.getItem(SHORTLIST_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.slice(0, 3) : [];
  } catch {
    return [];
  }
}

let currentLang = readInitialLang();
let shortlistSkus = readInitialShortlist();

export function getLang() {
  return currentLang;
}

export function isRtl() {
  return currentLang === 'ar';
}

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function applyLanguageAndMeta() {
  const root = document.documentElement;
  root.lang = currentLang;
  root.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  const route = parseRoute(window.location.pathname);
  const meta = getPageMeta(route, currentLang);
  const canonicalUrl = `${SITE_URL}${getCanonicalPath(route)}`;

  document.title = meta.title;
  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('meta[property="og:title"]', 'content', meta.title);
  setMeta('meta[property="og:description"]', 'content', meta.description);
  setMeta('meta[property="og:url"]', 'content', canonicalUrl);
  setMeta('meta[property="og:locale"]', 'content', currentLang === 'ar' ? 'ar_EG' : 'en_US');
  setMeta('meta[name="twitter:title"]', 'content', meta.title);
  setMeta('meta[name="twitter:description"]', 'content', meta.description);

  // Pages that were not prerendered (e.g. a product added after the last build) still get tags.
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  let ldScript = document.getElementById('rockart-structured-data');
  if (!ldScript) {
    ldScript = document.createElement('script');
    ldScript.id = 'rockart-structured-data';
    ldScript.type = 'application/ld+json';
    document.head.appendChild(ldScript);
  }
  ldScript.textContent = JSON.stringify(getPageStructuredData(route, SITE_URL, currentLang));
}

export function setLang(nextLang) {
  const normalized = nextLang === 'ar' ? 'ar' : 'en';
  if (normalized === currentLang) return;
  currentLang = normalized;
  try {
    window.sessionStorage.setItem(LANG_STORAGE_KEY, currentLang);
  } catch {
    // ignore storage errors
  }
  applyLanguageAndMeta();
  [...langListeners].forEach((cb) => {
    try {
      cb(currentLang);
    } catch {
      // ignore listener errors
    }
  });
}

export function onLangChange(cb) {
  langListeners.add(cb);
  return () => langListeners.delete(cb);
}

export function getShortlistSkus() {
  return [...shortlistSkus];
}

export function toggleShortlist(sku) {
  shortlistSkus = toggleShortlistSku(shortlistSkus, sku, 3);
  try {
    window.localStorage.setItem(SHORTLIST_STORAGE_KEY, JSON.stringify(shortlistSkus));
  } catch {
    // ignore storage errors
  }
  [...shortlistListeners].forEach((cb) => {
    try {
      cb([...shortlistSkus]);
    } catch {
      // ignore
    }
  });
  return [...shortlistSkus];
}

export function clearShortlist() {
  shortlistSkus = [];
  try {
    window.localStorage.setItem(SHORTLIST_STORAGE_KEY, '[]');
  } catch {
    // ignore
  }
  [...shortlistListeners].forEach((cb) => {
    try {
      cb([]);
    } catch {
      // ignore
    }
  });
}

export function onShortlistChange(cb) {
  shortlistListeners.add(cb);
  return () => shortlistListeners.delete(cb);
}

function setQuotePrefill(prefill) {
  try {
    if (!prefill) {
      window.sessionStorage.removeItem(PREFILL_STORAGE_KEY);
    } else {
      window.sessionStorage.setItem(PREFILL_STORAGE_KEY, JSON.stringify(prefill));
    }
  } catch {
    // ignore
  }
}

export function getQuotePrefill() {
  try {
    const raw = window.sessionStorage.getItem(PREFILL_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearQuotePrefill() {
  try {
    window.sessionStorage.removeItem(PREFILL_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function navigateWithQuotePrefill(prefill) {
  setQuotePrefill(prefill);
  window.location.href = '/contact.html';
}
