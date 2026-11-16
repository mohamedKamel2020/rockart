import { ALL_PRODUCTS, COMPANY_INFO, NAV_ITEMS, PAGE_HERO_IMAGES, UI_COPY } from './data.js';
import { escapeHtml, icon, renderBrandMark } from './icons.js';
import {
  getLang,
  getShortlistSkus,
  onLangChange,
  onShortlistChange,
  setLang,
} from './language.js';
import { buildPageUrl, parseRoute } from './routing.js';
import { getTheme, onThemeChange, toggleTheme } from './theme.js';

let megaOpen = false;
let mobileMenuOpen = false;
let megaCloseTimer = null;

function isRouteActive(itemPath, currentRoute) {
  if (itemPath === '/') return currentRoute.page === 'home';
  if (itemPath === '/products') {
    return currentRoute.page === 'products' || currentRoute.page === 'product-detail';
  }
  if (itemPath === '/projects') {
    return currentRoute.page === 'projects' || currentRoute.page === 'project-detail';
  }
  return currentRoute.path === itemPath;
}

function getHrefForNav(path) {
  if (path === '/') return buildPageUrl('home');
  if (path === '/about') return buildPageUrl('about');
  if (path === '/lock-stone') return buildPageUrl('lock-stone');
  if (path === '/products') return buildPageUrl('products');
  if (path === '/projects') return buildPageUrl('projects');
  if (path === '/contact') return buildPageUrl('contact');
  return path;
}

function renderHeaderHtml() {
  const lang = getLang();
  const theme = getTheme();
  const shortlistSkus = getShortlistSkus();
  const currentRoute = parseRoute(window.location.pathname);

  const navLinksHtml = NAV_ITEMS.map((item) => {
    const active = isRouteActive(item.path, currentRoute);
    const href = getHrefForNav(item.path);
    const isProducts = item.path === '/products';
    return `<div class="nav-item-wrap" ${isProducts ? 'id="nav-products-trigger"' : ''}>
      <a href="${escapeHtml(href)}" class="nav-link ${active ? 'is-active' : ''}">${escapeHtml(item.label[lang])}</a>
      ${
        isProducts
          ? `<button type="button" id="mega-toggle-btn" class="mega-toggle-btn" aria-label="Toggle Products Menu" aria-expanded="${megaOpen ? 'true' : 'false'}">
              ${icon('chevronDown', 'icon-sm')}
            </button>`
          : ''
      }
    </div>`;
  }).join('');

  const megaCardsHtml = ALL_PRODUCTS.slice(0, 4)
    .map(
      (prod) => `<a href="${escapeHtml(buildPageUrl('product-detail', prod.sku))}" class="mega-sku-card">
        <div class="mega-swatches">
          ${prod.colors
            .slice(0, 3)
            .map((c) => `<span class="mega-swatch-chip" style="background-color:${escapeHtml(c)};"></span>`)
            .join('')}
        </div>
        <div class="font-mono-tech" style="font-size:0.75rem;font-weight:600;color:var(--accent-eyebrow);">${escapeHtml(prod.sku)}</div>
        <div style="font-size:0.875rem;font-weight:600;color:var(--ink-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(prod.name[lang])}</div>
      </a>`
    )
    .join('');

  const mobileLinksHtml = NAV_ITEMS.map((item) => {
    const active = isRouteActive(item.path, currentRoute);
    const href = getHrefForNav(item.path);
    return `<a href="${escapeHtml(href)}" class="mobile-nav-link ${active ? 'is-active' : ''}">${escapeHtml(item.label[lang])}</a>`;
  }).join('');

  return `
    <div class="utility-bar">
      <div class="container utility-bar-inner">
        <div class="utility-contacts">
          <a href="${escapeHtml(COMPANY_INFO.phones[0].href)}" class="utility-link" dir="ltr">
            ${icon('phone', 'icon-xs')}
            <span>01064611274</span>
          </a>
          <a href="${escapeHtml(COMPANY_INFO.phones[1].href)}" class="utility-link" dir="ltr">
            ${icon('phone', 'icon-xs')}
            <span>01153936569</span>
          </a>
          <a href="mailto:${escapeHtml(COMPANY_INFO.email)}" class="utility-link">
            ${icon('mail', 'icon-xs')}
            <span>${escapeHtml(COMPANY_INFO.email)}</span>
          </a>
          <span class="utility-link" style="opacity:0.65;">
            ${icon('mapPin', 'icon-xs')}
            <span>${escapeHtml(COMPANY_INFO.shortAddress[lang])}</span>
          </span>
        </div>

        <div class="utility-actions">
          <a href="${escapeHtml(buildPageUrl('products'))}" id="shortlist-utility-pill" class="shortlist-pill-link ${shortlistSkus.length > 0 ? '' : 'hidden'}">
            ${lang === 'ar' ? `المختارات (${shortlistSkus.length})` : `Sample Shortlist (${shortlistSkus.length})`}
          </a>
          <button type="button" id="theme-toggle-desktop" class="theme-btn-desktop" aria-label="${theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}">
            ${theme === 'light' ? icon('moon', 'icon-xs') : icon('sun', 'icon-xs')}
            <span>${theme === 'light' ? (lang === 'ar' ? 'ليلي' : 'Dark') : lang === 'ar' ? 'نهاري' : 'Light'}</span>
          </button>
          <div class="lang-group" role="group" aria-label="Language switcher">
            <button type="button" data-set-lang="en" class="lang-btn ${lang === 'en' ? 'is-active' : ''}">EN</button>
            <button type="button" data-set-lang="ar" class="lang-btn ${lang === 'ar' ? 'is-active' : ''}">عربي</button>
          </div>
        </div>
      </div>
    </div>

    <header id="site-header" class="site-header">
      <div class="container header-inner">
        <a href="${escapeHtml(buildPageUrl('home'))}" class="brand-link" aria-label="${escapeHtml(COMPANY_INFO.brand[lang])}">
          ${renderBrandMark('light', 'brand-mark')}
          <span class="brand-text">${escapeHtml(COMPANY_INFO.brand[lang])}</span>
        </a>

        <nav class="primary-nav" aria-label="Primary Navigation">
          ${navLinksHtml}
        </nav>

        <div class="header-cta-zone">
          <a href="${escapeHtml(buildPageUrl('contact'))}" class="btn btn-sm btn-accent header-desktop-cta">
            ${escapeHtml(UI_COPY.ctaQuote[lang])}
          </a>

          <div class="mobile-controls">
            <button type="button" id="theme-toggle-mobile" class="mobile-icon-btn" aria-label="Toggle Theme">
              ${theme === 'light' ? icon('moon', 'icon-md') : icon('sun', 'icon-md')}
            </button>
            <button type="button" id="lang-toggle-mobile" class="mobile-lang-btn">
              ${lang === 'en' ? 'عربي' : 'EN'}
            </button>
          </div>

          <button type="button" id="hamburger-btn" class="hamburger-btn" aria-label="Menu" aria-expanded="${mobileMenuOpen ? 'true' : 'false'}">
            ${mobileMenuOpen ? icon('x', 'icon-lg') : icon('menu', 'icon-lg')}
          </button>
        </div>
      </div>

      <div id="products-mega-menu" class="mega-menu ${megaOpen ? 'is-open' : ''}">
        <div class="container mega-grid">
          <div class="mega-divisions">
            <div class="mega-eyebrow">${lang === 'ar' ? 'أقسام المنتجات' : 'Product Divisions'}</div>
            <ul class="mega-div-list">
              <li>
                <a href="${escapeHtml(buildPageUrl('lock-stone'))}" class="mega-div-link">
                  <span>${lang === 'ar' ? 'نظام لوك ستون للحوائط الساندة' : 'Lock Stone Retaining Walls'}</span>
                  ${icon('layers', 'icon-sm')}
                </a>
              </li>
              <li>
                <a href="${escapeHtml(buildPageUrl('products'))}" class="mega-div-link">
                  <span>${lang === 'ar' ? 'التكسية الحجرية والجي آر سي (GRC)' : 'GRC Stone & Brick Cladding'}</span>
                  ${icon('arrowRight', `icon-sm ${lang === 'ar' ? 'icon-arrow-flip' : ''}`)}
                </a>
              </li>
              <li>
                <a href="${escapeHtml(buildPageUrl('products'))}" class="mega-div-link">
                  <span>${lang === 'ar' ? 'الأصص الخرسانية وأثاث الحدائق' : 'Cast-Stone Planters & Garden'}</span>
                  ${icon('arrowRight', `icon-sm ${lang === 'ar' ? 'icon-arrow-flip' : ''}`)}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div class="mega-featured-head">
              <div class="mega-eyebrow" style="margin-bottom:0;">
                ${lang === 'ar' ? 'نماذج مختارة من الكتالوج' : 'Featured Catalog SKUs'}
              </div>
              <a href="${escapeHtml(buildPageUrl('products'))}" class="text-link-accent" style="font-size:0.75rem;">
                ${lang === 'ar' ? 'عرض جميع الـ 14 منتجاً' : 'View All 14 Items'}
              </a>
            </div>
            <div class="mega-sku-grid">${megaCardsHtml}</div>
          </div>
        </div>
      </div>

      <div class="reading-progress-track">
        <div id="reading-progress-fill" class="reading-progress-fill"></div>
      </div>

      <div id="mobile-drawer" class="mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}">
        <div class="mobile-drawer-inner">
          ${mobileLinksHtml}
          <a href="${escapeHtml(buildPageUrl('contact'))}" class="btn btn-md btn-accent" style="margin-top:0.75rem;text-align:center;">
            ${escapeHtml(UI_COPY.ctaQuote[lang])}
          </a>
        </div>
      </div>
    </header>
  `;
}

function renderFooterHtml() {
  const lang = getLang();
  const quickLinks = NAV_ITEMS.slice(0, 5)
    .map(
      (item) =>
        `<li><a href="${escapeHtml(getHrefForNav(item.path))}" class="footer-link">${escapeHtml(item.label[lang])}</a></li>`
    )
    .join('');

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">
              ${renderBrandMark('dark', 'brand-mark')}
              <span class="footer-brand-name">${escapeHtml(COMPANY_INFO.brand[lang])}</span>
            </div>
            <p class="footer-desc">${escapeHtml(COMPANY_INFO.subtitle[lang])} — ${escapeHtml(COMPANY_INFO.fullName[lang])}</p>
            <div class="font-mono-tech" style="font-size:0.75rem;color:var(--accent);margin-top:0.75rem;">
              ${escapeHtml(COMPANY_INFO.patent[lang])}
            </div>
          </div>

          <div>
            <h4 class="footer-col-title">${lang === 'ar' ? 'أقسام الموقع' : 'Navigation'}</h4>
            <ul class="footer-links">${quickLinks}</ul>
          </div>

          <div>
            <h4 class="footer-col-title">${lang === 'ar' ? 'تواصل مباشر' : 'Direct Contact'}</h4>
            <ul class="footer-links">
              <li><a href="${escapeHtml(COMPANY_INFO.phones[0].href)}" class="footer-link" dir="ltr">01064611274</a></li>
              <li><a href="${escapeHtml(COMPANY_INFO.phones[1].href)}" class="footer-link" dir="ltr">01153936569</a></li>
              <li><a href="mailto:${escapeHtml(COMPANY_INFO.email)}" class="footer-link">${escapeHtml(COMPANY_INFO.email)}</a></li>
              <li style="display:flex;align-items:center;gap:0.375rem;">
                ${icon('globe', 'icon-xs')}
                <span class="font-mono-tech" style="font-size:0.75rem;">${escapeHtml(COMPANY_INFO.websiteDisplay)}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="footer-col-title">${lang === 'ar' ? 'المصنع والمعرض' : 'Factory & Showroom'}</h4>
            <p style="font-size:0.875rem;line-height:1.65;margin-bottom:1.25rem;">${escapeHtml(COMPANY_INFO.address[lang])}</p>
            <a href="${escapeHtml(buildPageUrl('contact'))}" class="btn btn-sm btn-accent">${escapeHtml(UI_COPY.ctaQuote[lang])}</a>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© ${new Date().getFullYear()} ${escapeHtml(COMPANY_INFO.fullName[lang])}</div>
          <div class="footer-social">
            <a href="${escapeHtml(COMPANY_INFO.phones[0].wa)}" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="WhatsApp" title="WhatsApp">
              ${icon('messageCircle', 'icon-md')}
            </a>
            <a href="${escapeHtml(COMPANY_INFO.phones[0].href)}" class="footer-social-btn" aria-label="Phone" title="Call Rock Art">
              ${icon('phone', 'icon-md')}
            </a>
            <a href="mailto:${escapeHtml(COMPANY_INFO.email)}" class="footer-social-btn" aria-label="Email" title="Email Rock Art">
              ${icon('mail', 'icon-md')}
            </a>
          </div>
        </div>
      </div>
    </footer>

    <button type="button" id="back-to-top-btn" class="back-to-top" aria-label="Back to top">
      ${icon('arrowUp', 'icon-lg')}
    </button>

  `;
}

function bindHeaderEvents(container) {
  const megaMenu = container.querySelector('#products-mega-menu');
  const trigger = container.querySelector('#nav-products-trigger');
  const megaToggleBtn = container.querySelector('#mega-toggle-btn');

  const setMegaState = (open) => {
    megaOpen = open;
    if (megaMenu) megaMenu.classList.toggle('is-open', open);
    if (megaToggleBtn) megaToggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  if (trigger && megaMenu) {
    const openMega = () => {
      if (megaCloseTimer) clearTimeout(megaCloseTimer);
      setMegaState(true);
    };
    const closeMegaDelayed = () => {
      megaCloseTimer = setTimeout(() => setMegaState(false), 160);
    };
    trigger.addEventListener('mouseenter', openMega);
    trigger.addEventListener('mouseleave', closeMegaDelayed);
    megaMenu.addEventListener('mouseenter', openMega);
    megaMenu.addEventListener('mouseleave', closeMegaDelayed);
  }

  if (megaToggleBtn) {
    megaToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setMegaState(!megaOpen);
    });
  }

  container.querySelector('#theme-toggle-desktop')?.addEventListener('click', toggleTheme);
  container.querySelector('#theme-toggle-mobile')?.addEventListener('click', toggleTheme);
  container.querySelector('#lang-toggle-mobile')?.addEventListener('click', () => {
    setLang(getLang() === 'en' ? 'ar' : 'en');
  });

  container.querySelectorAll('[data-set-lang]').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.setLang));
  });

  const hamburgerBtn = container.querySelector('#hamburger-btn');
  const drawer = container.querySelector('#mobile-drawer');
  if (hamburgerBtn && drawer) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenuOpen = !mobileMenuOpen;
      drawer.classList.toggle('is-open', mobileMenuOpen);
      hamburgerBtn.setAttribute('aria-expanded', mobileMenuOpen ? 'true' : 'false');
      hamburgerBtn.innerHTML = mobileMenuOpen ? icon('x', 'icon-lg') : icon('menu', 'icon-lg');
    });

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenuOpen = false;
        drawer.classList.remove('is-open');
      });
    });
  }
}

function updateScrollUI() {
  const scrollY = window.scrollY || 0;
  const header = document.getElementById('site-header');
  if (header) header.classList.toggle('is-scrolled', scrollY > 18);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? Math.min(100, Math.round((scrollY / docHeight) * 100)) : 0;
  const fill = document.getElementById('reading-progress-fill');
  if (fill) fill.style.width = `${pct}%`;

  const btt = document.getElementById('back-to-top-btn');
  if (btt) btt.classList.toggle('is-visible', scrollY > 420);
}

export function initShell() {
  const headerMount = document.getElementById('app-header');
  const footerMount = document.getElementById('app-footer');

  const renderShell = () => {
    if (headerMount) {
      headerMount.innerHTML = renderHeaderHtml();
      bindHeaderEvents(headerMount);
    }
    if (footerMount) {
      footerMount.innerHTML = renderFooterHtml();
      footerMount.querySelector('#back-to-top-btn')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    updateScrollUI();
  };

  renderShell();
  onLangChange(renderShell);
  onThemeChange(renderShell);
  onShortlistChange((skus) => {
    const pill = document.getElementById('shortlist-utility-pill');
    if (pill) {
      const lang = getLang();
      pill.textContent =
        lang === 'ar' ? `المختارات (${skus.length})` : `Sample Shortlist (${skus.length})`;
      pill.classList.toggle('hidden', skus.length === 0);
    }
  });

  window.addEventListener('scroll', updateScrollUI, { passive: true });
}

export function renderBreadcrumbs(items, dark = false) {
  const listHtml = items
    .map((item, idx) => {
      const isLast = idx === items.length - 1;
      return `<li class="breadcrumbs-item">
        ${idx > 0 ? icon('chevronRight', 'breadcrumbs-sep') : ''}
        ${
          !isLast && item.href
            ? `<a href="${escapeHtml(item.href)}" class="breadcrumbs-link">${escapeHtml(item.label)}</a>`
            : `<span class="breadcrumbs-current" aria-current="page">${escapeHtml(item.label)}</span>`
        }
      </li>`;
    })
    .join('');

  return `<nav aria-label="Breadcrumb" class="breadcrumbs ${dark ? 'breadcrumbs--dark' : ''}">
    <ol class="breadcrumbs-list">${listHtml}</ol>
  </nav>`;
}

export function renderPageHeroBg(key) {
  const src = PAGE_HERO_IMAGES[key];
  if (!src) return '';
  return `<div class="hero-bg" aria-hidden="true">
    <img src="${escapeHtml(src)}" alt="" class="hero-bg-img" fetchpriority="high" decoding="async" />
    <div class="hero-overlay"></div>
  </div>`;
}

export function renderStrataDivider() {
  return '<div class="strata-divider" role="presentation"></div>';
}

export function openSheetZoomModal({ src, title, caption, badge = '' }) {
  const existing = document.getElementById('rockart-sheet-zoom-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'rockart-sheet-zoom-modal';
  modal.className = 'sheet-modal-backdrop';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <button type="button" class="sheet-modal-close" aria-label="Close">
      ${icon('x', 'icon-lg')}
    </button>
    <img src="${escapeHtml(src)}" alt="${escapeHtml(title)}" class="sheet-modal-img" />
    <div style="margin-top:1rem;max-width:48rem;text-align:center;">
      ${badge ? `<div class="font-mono-tech" style="font-size:0.75rem;color:var(--accent);margin-bottom:0.25rem;">${escapeHtml(badge)}</div>` : ''}
      <div class="font-display" style="color:#FBF9F4;font-weight:600;font-size:1.125rem;margin-bottom:0.25rem;">${escapeHtml(title)}</div>
      ${caption ? `<p style="font-size:0.875rem;color:rgba(251,249,244,0.75);">${escapeHtml(caption)}</p>` : ''}
    </div>
  `;

  const closeModal = () => {
    modal.remove();
    window.removeEventListener('keydown', onKeyDown);
  };
  const onKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('.sheet-modal-close')) closeModal();
  });
  window.addEventListener('keydown', onKeyDown);
  document.body.appendChild(modal);
}
