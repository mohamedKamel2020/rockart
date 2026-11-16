import {
  ADDITIONAL_BRICK_VARIATIONS,
  ALL_PRODUCTS,
  getProductMediaSlides,
  isStudioCladdingPhoto,
  UI_COPY,
  UPLOADED_PHOTOS,
} from './data.js';
import { filterProducts } from './engineering.js';
import { refreshAllInteractions } from './animations.js';
import { mountProductSlider } from './gallery.js';
import { escapeHtml, icon, renderMaterialSwatch } from './icons.js';
import {
  clearShortlist,
  getLang,
  getShortlistSkus,
  isRtl,
  navigateWithQuotePrefill,
  onShortlistChange,
  toggleShortlist,
} from './language.js';
import { openSheetZoomModal, renderBreadcrumbs, renderPageHeroBg, renderStrataDivider } from './navigation.js';
import { buildPageUrl } from './routing.js';

export function initProductsPage(root) {
  let category = 'all';
  let styleFilter = 'all';
  let search = '';
  let galleryCtrl = null;
  let unsubShortlist = null;

  function renderShortlistAndGrid() {
    const lang = getLang();
    const rtl = isRtl();
    const shortlistSkus = getShortlistSkus();
    const filtered = filterProducts(ALL_PRODUCTS, category, search, styleFilter);

    const shortlistHost = root.querySelector('#shortlist-bar-host');
    if (shortlistHost) {
      if (shortlistSkus.length === 0) {
        shortlistHost.innerHTML = '';
      } else {
        shortlistHost.innerHTML = `<div class="shortlist-bar">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem;">
            <span class="font-mono-tech" style="font-size:0.75rem;color:var(--accent);text-transform:uppercase;">
              ${lang === 'ar' ? `قائمة العينات (${shortlistSkus.length}/3)` : `Sample Shortlist (${shortlistSkus.length}/3)`}
            </span>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
              ${shortlistSkus
                .map(
                  (sku) => `<button type="button" data-remove-pin="${escapeHtml(sku)}" class="shortlist-chip-btn">
                    <span>${escapeHtml(sku)}</span>
                    ${icon('x', 'icon-xs')}
                  </button>`
                )
                .join('')}
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:0.75rem;">
            <button type="button" id="clear-shortlist-btn" style="font-size:0.75rem;color:rgba(237,230,214,0.65);">
              ${lang === 'ar' ? 'مسح الكل' : 'Clear'}
            </button>
            <button type="button" id="quote-shortlist-btn" class="btn btn-sm btn-accent">
              ${lang === 'ar' ? 'اطلب عرض سعر للعينات' : 'Quote Selected Samples'}
            </button>
          </div>
        </div>`;

        shortlistHost.querySelectorAll('[data-remove-pin]').forEach((btn) => {
          btn.addEventListener('click', () => toggleShortlist(btn.dataset.removePin));
        });
        shortlistHost.querySelector('#clear-shortlist-btn')?.addEventListener('click', clearShortlist);
        shortlistHost.querySelector('#quote-shortlist-btn')?.addEventListener('click', () => {
          navigateWithQuotePrefill({
            interest: 'GRC decorative cladding',
            notes: `${lang === 'ar' ? 'طلب عرض سعر وعينات للأكواد التالية' : 'Sample request & quote for SKUs'}: ${shortlistSkus.join(', ')}`,
          });
        });
      }
    }

    const gridHost = root.querySelector('#products-grid-host');
    if (gridHost) {
      if (filtered.length === 0) {
        gridHost.innerHTML = `<div style="background-color:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:3rem;text-align:center;">
          <p class="font-display" style="font-size:1.25rem;color:var(--ink-primary);margin-bottom:0.5rem;">
            ${lang === 'ar' ? 'لا توجد منتجات مطابقة لبحثك' : 'No matching catalog SKUs'}
          </p>
          <button type="button" id="reset-catalog-filters" class="btn btn-md btn-accent" style="margin-top:0.5rem;">
            ${lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
          </button>
        </div>`;
        gridHost.querySelector('#reset-catalog-filters')?.addEventListener('click', () => {
          category = 'all';
          styleFilter = 'all';
          search = '';
          const searchInput = root.querySelector('#catalog-search-input');
          if (searchInput) searchInput.value = '';
          syncFilterButtonStates();
          if (galleryCtrl) galleryCtrl.setCategory('all');
          renderShortlistAndGrid();
        });
      } else {
        gridHost.innerHTML = `<div class="catalog-grid">
          ${filtered
            .map((product, idx) => {
              const pinned = shortlistSkus.includes(product.sku);
              return `<article class="product-card interactive-card reveal group" data-variant="product" data-delay="${idx * 35}">
                <div class="product-card-media">
                  <a href="${escapeHtml(buildPageUrl('product-detail', product.sku))}" style="display:block;width:100%;height:100%;">
                    ${renderMaterialSwatch(product)}
                  </a>
                  <span class="badge-card-top">${escapeHtml(product.sku)}</span>
                  <button
                    type="button"
                    data-pin-sku="${escapeHtml(product.sku)}"
                    aria-label="${pinned ? 'Remove sample' : 'Pin sample'}"
                    aria-pressed="${pinned ? 'true' : 'false'}"
                    class="pin-btn ${pinned ? 'is-pinned' : ''}"
                  >
                    ${pinned ? icon('check', 'icon-sm') : icon('bookmark', 'icon-sm')}
                  </button>
                </div>

                <div class="product-card-body">
                  <div>
                    <div class="product-card-meta">${escapeHtml(product.styleOrigin[lang])}</div>
                    <a href="${escapeHtml(buildPageUrl('product-detail', product.sku))}">
                      <h3 class="product-card-title">${escapeHtml(product.name[lang])}</h3>
                    </a>
                    <p class="product-card-desc">${escapeHtml(product.description[lang])}</p>
                  </div>

                  <div class="product-card-foot">
                    <span>${escapeHtml(product.dimensions)}</span>
                    <a href="${escapeHtml(buildPageUrl('product-detail', product.sku))}" class="text-link-accent" style="font-size:0.75rem;">
                      <span>${lang === 'ar' ? 'المواصفات' : 'Specs'}</span>
                      ${icon('arrowRight', `icon-xs ${rtl ? 'icon-arrow-flip' : ''}`)}
                    </a>
                  </div>
                </div>
              </article>`;
            })
            .join('')}
        </div>`;

        gridHost.querySelectorAll('[data-pin-sku]').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleShortlist(btn.dataset.pinSku);
          });
        });

        refreshAllInteractions(gridHost);
      }
    }

    const clearBtn = root.querySelector('#clear-search-btn');
    if (clearBtn) {
      clearBtn.classList.toggle('hidden', !search);
    }
  }

  function syncFilterButtonStates() {
    root.querySelectorAll('[data-prod-cat]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.prodCat === category);
    });
    root.querySelectorAll('[data-style-filter]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.styleFilter === styleFilter);
    });
  }

  function render() {
    if (galleryCtrl) {
      galleryCtrl.destroy();
      galleryCtrl = null;
    }
    if (unsubShortlist) {
      unsubShortlist();
      unsubShortlist = null;
    }

    const lang = getLang();
    const filterCategories = [
      { id: 'all', label: UI_COPY.filterAll[lang] },
      { id: 'stone', label: UI_COPY.filterStone[lang] },
      { id: 'brick', label: UI_COPY.filterBrick[lang] },
      { id: 'planter', label: UI_COPY.filterPlanter[lang] },
    ];
    const stylePills = [
      { id: 'all', en: 'All Origins', ar: 'جميع الطرز' },
      { id: 'greek', en: 'Greek Court', ar: 'طراز يوناني' },
      { id: 'spanish', en: 'Spanish Court', ar: 'طراز أسباني' },
      { id: 'english', en: 'English Brick', ar: 'طوب إنجليزي' },
      { id: 'garden', en: 'Garden Cast Concrete', ar: 'خرسانة حدائق' },
    ];

    root.innerHTML = `
      <section class="page-header-dark page-hero">
        ${renderPageHeroBg('products')}
        <div class="container page-hero-content">
          ${renderBreadcrumbs([
            { label: lang === 'ar' ? 'الرئيسية' : 'Home', href: buildPageUrl('home') },
            { label: UI_COPY.navProducts[lang] },
          ], true)}
          <div class="eyebrow eyebrow--inverse reveal">
            <span class="eyebrow-bar"></span>
            <span>${escapeHtml(UI_COPY.claddingEyebrow[lang])}</span>
          </div>
          <h1 class="h1-page text-balance">${escapeHtml(UI_COPY.claddingHeading[lang])}</h1>
          <p class="page-lead">${escapeHtml(UI_COPY.claddingLead[lang])}</p>
        </div>
      </section>

      <!-- Auto-playing Product Slider -->
      <section class="section-paper-compact gallery-section-clip" style="border-bottom:1px solid var(--border-subtle);">
        <div class="container">
          <div style="margin-bottom:1.5rem;" class="reveal">
            <div class="eyebrow">
              <span class="eyebrow-bar"></span>
              <span>${lang === 'ar' ? 'معرض المنتجات' : 'Product Showcase'}</span>
            </div>
            <h2 class="h2-section" style="font-size:1.75rem;">
              ${lang === 'ar' ? 'تصفّح ألواح التكسية والأصص' : 'Browse Cladding & Planters'}
            </h2>
          </div>

          <div id="products-immersive-gallery"></div>
        </div>
      </section>

      <!-- Interactive Filter, Search & Full Catalog Grid -->
      <section class="section-paper">
        <div class="container">
          <div class="catalog-controls-top">
            <div class="filter-btn-row" role="group" aria-label="Filter by division">
              ${filterCategories
                .map(
                  (btn) =>
                    `<button type="button" data-prod-cat="${btn.id}" class="filter-pill-btn ${
                      category === btn.id ? 'is-active' : ''
                    }">${escapeHtml(btn.label)}</button>`
                )
                .join('')}
            </div>

            <div class="search-wrap">
              ${icon('search', 'search-icon')}
              <input
                id="catalog-search-input"
                type="search"
                value="${escapeHtml(search)}"
                placeholder="${lang === 'ar' ? 'ابحث بالكود أو الاسم (مثال SP-227)...' : 'Search by SKU or name (e.g. SP-227)...'}"
                class="search-input"
              />
              <button type="button" id="clear-search-btn" class="search-clear-btn ${search ? '' : 'hidden'}" aria-label="Clear search">
                ${icon('x', 'icon-sm')}
              </button>
            </div>
          </div>

          <div class="style-filter-bar">
            <div class="filter-btn-row">
              <span class="font-mono-tech" style="font-size:0.75rem;color:var(--ink-secondary);margin-inline-end:0.5rem;">
                ${lang === 'ar' ? 'الطراز:' : 'Tile Style:'}
              </span>
              ${stylePills
                .map(
                  (st) =>
                    `<button type="button" data-style-filter="${st.id}" class="style-pill-btn ${
                      styleFilter === st.id ? 'is-active' : ''
                    }">${escapeHtml(st[lang])}</button>`
                )
                .join('')}
            </div>
          </div>

          <div id="shortlist-bar-host"></div>
          <div id="products-grid-host"></div>

          <!-- Extended English Brick Studio Finishes + Official Catalog Sheets -->
          <div style="margin-top:4rem;padding-top:3rem;border-top:1px solid var(--border-subtle);">
            <div style="max-width:42rem;margin-bottom:2rem;" class="reveal">
              <div class="eyebrow">
                <span class="eyebrow-bar"></span>
                <span>${lang === 'ar' ? 'عينات إضافية ونشرات الكتالوج المعتمدة' : 'Additional Factory Swatches & Reference Sheets'}</span>
              </div>
              <h2 class="h2-section" style="font-size:1.75rem;">
                ${lang === 'ar' ? 'أكواد الطوب الإنجليزي الإضافية ونشرات روك آرت' : 'Extended English Brick Finishes & Official Catalog Plates'}
              </h2>
            </div>

            <div class="extended-grid">
              ${ADDITIONAL_BRICK_VARIATIONS.map(
                (brick) => `<button type="button" data-brick-zoom="${escapeHtml(brick.sku)}" class="product-card interactive-card reveal group" data-variant="product" style="text-align:start;">
                  <div class="product-card-media" style="background-color:#F6F4EF;">
                    <img src="${escapeHtml(brick.image)}" alt="${escapeHtml(brick.sku)} ${escapeHtml(brick.name[lang])}" loading="lazy" class="swatch-img-cladding media-zoom-img" />
                    <span class="badge-card-top">${escapeHtml(brick.sku)}</span>
                  </div>
                  <div style="padding:1rem;">
                    <div class="font-display" style="font-weight:600;color:var(--ink-primary);margin-bottom:0.25rem;">${escapeHtml(brick.name[lang])}</div>
                    <p style="font-size:0.75rem;color:var(--ink-secondary);line-height:1.55;">${escapeHtml(brick.description[lang])}</p>
                  </div>
                </button>`
              ).join('')}

              <button type="button" data-plate-zoom="sheet9" class="product-card interactive-card reveal group" data-variant="project" style="text-align:start;">
                <div class="brochure-sheet-box" style="aspect-ratio:4/3;">
                  <img src="${escapeHtml(UPLOADED_PHOTOS.brochureSlide9GreekStoneGrid)}" alt="${lang === 'ar' ? 'لوحة 9: 6 خامات للحجر اليوناني المُصنع' : 'Greek Manufactured Stone 6-Texture Brochure Grid'}" loading="lazy" class="brochure-sheet-img" />
                </div>
                <div style="padding:1rem;">
                  <div class="font-mono-tech" style="font-size:0.6875rem;color:var(--accent-eyebrow);margin-bottom:0.125rem;">BROCHURE SHEET 09</div>
                  <div class="font-display" style="font-weight:600;color:var(--ink-primary);">
                    ${lang === 'ar' ? 'تشكيلة الحجر اليوناني المُصنع (6 خامات)' : 'Greek Stone 6-Texture Reference'}
                  </div>
                </div>
              </button>

              <button type="button" data-plate-zoom="sheet10" class="product-card interactive-card reveal group" data-variant="project" style="text-align:start;">
                <div class="brochure-sheet-box" style="aspect-ratio:4/3;">
                  <img src="${escapeHtml(UPLOADED_PHOTOS.brochureSlide10CurbsGrc)}" alt="${lang === 'ar' ? 'لوحة 10: كتالوج البردورات والإنترلوك ومنتجات GRC' : 'Curbs Interlocks and GRC 2001-2009 Catalog Plate'}" loading="lazy" class="brochure-sheet-img" />
                </div>
                <div style="padding:1rem;">
                  <div class="font-mono-tech" style="font-size:0.6875rem;color:var(--accent-eyebrow);margin-bottom:0.125rem;">BROCHURE SHEET 10</div>
                  <div class="font-display" style="font-weight:600;color:var(--ink-primary);">
                    ${lang === 'ar' ? 'البردورات والإنترلوك ومنتجات G.R.C' : 'Curbs, Pavers & GRC (2001–2009)'}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      ${renderStrataDivider()}
    `;

    const galleryMount = root.querySelector('#products-immersive-gallery');
    if (galleryMount) {
      galleryCtrl = mountProductSlider(galleryMount, {
        products: ALL_PRODUCTS,
        initialCategory: category,
        showCategoryFilter: true,
        onCategorySelect: (nextCat) => {
          category = nextCat;
          syncFilterButtonStates();
          renderShortlistAndGrid();
        },
      });
    }

    root.querySelectorAll('[data-prod-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        category = btn.dataset.prodCat;
        syncFilterButtonStates();
        if (galleryCtrl) galleryCtrl.setCategory(category);
        renderShortlistAndGrid();
      });
    });

    root.querySelectorAll('[data-style-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        styleFilter = btn.dataset.styleFilter;
        syncFilterButtonStates();
        renderShortlistAndGrid();
      });
    });

    const searchInput = root.querySelector('#catalog-search-input');
    searchInput?.addEventListener('input', (e) => {
      search = e.target.value;
      renderShortlistAndGrid();
    });

    root.querySelector('#clear-search-btn')?.addEventListener('click', () => {
      search = '';
      if (searchInput) searchInput.value = '';
      renderShortlistAndGrid();
    });

    root.querySelectorAll('[data-brick-zoom]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const brick = ADDITIONAL_BRICK_VARIATIONS.find((b) => b.sku === btn.dataset.brickZoom);
        if (brick) {
          openSheetZoomModal({
            src: brick.image,
            badge: brick.sku,
            title: brick.name[lang],
            caption: brick.description[lang],
          });
        }
      });
    });

    root.querySelectorAll('[data-plate-zoom]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.plateZoom === 'sheet9') {
          openSheetZoomModal({
            src: UPLOADED_PHOTOS.brochureSlide9GreekStoneGrid,
            title: lang === 'ar' ? 'الحجر اليوناني المُصنع — 6 خامات' : 'Greek Manufactured Stone 6-Texture Guide',
          });
        } else {
          openSheetZoomModal({
            src: UPLOADED_PHOTOS.brochureSlide10CurbsGrc,
            title: lang === 'ar' ? 'البردورات والإنترلوك ومنتجات GRC (2001–2009)' : 'Precast Curbs, Interlocks & GRC (Codes 2001–2009)',
          });
        }
      });
    });

    unsubShortlist = onShortlistChange(renderShortlistAndGrid);
    renderShortlistAndGrid();
    refreshAllInteractions(root);
  }

  render();
  return render;
}

export function initProductDetailPage(root, skuParam) {
  const product =
    ALL_PRODUCTS.find((p) => p.sku.toLowerCase() === (skuParam || '').toLowerCase()) || ALL_PRODUCTS[0];
  let slideIdx = 0;
  let unsubShortlist = null;

  function render() {
    if (unsubShortlist) {
      unsubShortlist();
      unsubShortlist = null;
    }

    const lang = getLang();
    const rtl = isRtl();
    const slides = getProductMediaSlides(product);
    const activeSlide = slides[slideIdx] || slides[0];
    const pinned = getShortlistSkus().includes(product.sku);
    const related = ALL_PRODUCTS.filter((p) => p.sku !== product.sku).slice(0, 3);
    const isStudioMain = Boolean(activeSlide?.src && isStudioCladdingPhoto(activeSlide.src));

    root.innerHTML = `
      <section class="section-header-light">
        <div class="container">
          ${renderBreadcrumbs([
            { label: lang === 'ar' ? 'الرئيسية' : 'Home', href: buildPageUrl('home') },
            { label: UI_COPY.navProducts[lang], href: buildPageUrl('products') },
            { label: `${product.sku} — ${product.name[lang]}` },
          ])}

          <div class="product-detail-layout">
            <!-- Left: Multi-Slide Material Inspector -->
            <div class="product-inspector-col">
              <div class="slide-stage ${isStudioMain ? 'slide-stage--studio' : ''} group">
                ${
                  activeSlide?.kind === 'photo' && activeSlide.src
                    ? `<img
                        src="${escapeHtml(activeSlide.src)}"
                        alt="${escapeHtml(activeSlide.title[lang])}"
                        class="${isStudioMain ? 'sheet-contain-studio' : 'sheet-cover-img'}"
                      />`
                    : renderMaterialSwatch(product)
                }

                <span class="badge-card-top">${escapeHtml(activeSlide?.badge || product.sku)}</span>

                ${
                  activeSlide?.kind === 'photo' && activeSlide.src
                    ? `<button type="button" id="detail-zoom-btn" class="zoom-hint-pill" style="position:absolute;bottom:0.75rem;inset-inline-end:0.75rem;">
                        ${icon('expand', 'icon-xs')}
                        <span>${lang === 'ar' ? 'عرض مكبر' : 'Inspect Full Size'}</span>
                      </button>`
                    : ''
                }
              </div>

              <div style="background-color:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:0.875rem;">
                <div class="font-mono-tech" style="font-size:0.75rem;color:var(--accent-eyebrow);font-weight:600;">
                  ${escapeHtml(activeSlide.title[lang])}
                </div>
                <p style="font-size:0.75rem;color:var(--ink-secondary);margin-top:0.25rem;line-height:1.55;">
                  ${escapeHtml(activeSlide.caption[lang])}
                </p>
              </div>

              <div class="slide-thumbs">
                ${slides
                  .map((s, idx) => {
                    const isStudioThumb = Boolean(s.src && isStudioCladdingPhoto(s.src));
                    return `<button type="button" data-slide-idx="${idx}" class="slide-thumb-btn ${
                      idx === slideIdx ? 'is-active' : ''
                    }" aria-label="${escapeHtml(s.title[lang])}">
                      ${
                        s.kind === 'photo' && s.src
                          ? `<img src="${escapeHtml(s.src)}" alt="" class="${isStudioThumb ? 'swatch-img-cladding' : 'sheet-cover-img'}" />`
                          : renderMaterialSwatch(product)
                      }
                      <span class="slide-thumb-label">${escapeHtml(s.badge || (idx === 0 ? product.sku : s.title[lang]))}</span>
                    </button>`;
                  })
                  .join('')}
              </div>
            </div>

            <!-- Right: Technical Datasheet & Actions -->
            <div class="product-spec-col">
              <div class="eyebrow">
                <span class="eyebrow-bar" style="width:1.25rem;"></span>
                <span>${escapeHtml(product.typeLabel[lang])}</span>
              </div>
              <h1 class="h2-section" style="font-size:2.25rem;margin-bottom:0.75rem;">${escapeHtml(product.name[lang])}</h1>
              <p style="font-size:1rem;color:var(--ink-secondary);line-height:1.65;margin-bottom:1.5rem;">${escapeHtml(product.description[lang])}</p>

              <div class="spec-table">
                <div class="spec-table-row">
                  <span class="font-mono-tech" style="color:var(--ink-secondary);">${lang === 'ar' ? 'رمز المنتج (SKU)' : 'Catalog Code (SKU)'}</span>
                  <span class="font-mono-tech" style="font-weight:600;color:var(--ink-primary);">${escapeHtml(product.sku)}</span>
                </div>
                <div class="spec-table-row">
                  <span class="font-mono-tech" style="color:var(--ink-secondary);">${lang === 'ar' ? 'الأبعاد' : 'Dimensions'}</span>
                  <span class="font-mono-tech" style="font-weight:500;color:var(--ink-primary);">${escapeHtml(product.dimensions)}</span>
                </div>
                <div class="spec-table-row">
                  <span class="font-mono-tech" style="color:var(--ink-secondary);">${lang === 'ar' ? 'النمط المعماري' : 'Architectural Style'}</span>
                  <span style="font-weight:500;color:var(--ink-primary);">${escapeHtml(product.styleOrigin[lang])}</span>
                </div>
                <div class="spec-table-row">
                  <span class="font-mono-tech" style="color:var(--ink-secondary);">${lang === 'ar' ? 'الخامة والتصنيع' : 'Material Composition'}</span>
                  <span style="font-weight:500;color:var(--ink-primary);">
                    ${product.category === 'planter' ? (lang === 'ar' ? 'خرسانة مصبوبة معزولة' : 'Waterproof Cast Stone') : 'Fiberglass-Reinforced Concrete (GRC)'}
                  </span>
                </div>
              </div>

              <div style="margin-bottom:1.75rem;">
                <div class="font-mono-tech" style="font-size:0.75rem;color:var(--ink-secondary);margin-bottom:0.5rem;">
                  ${lang === 'ar' ? 'درجات الألوان المتوفرة بالكتالوج:' : 'Factory Colorway Swatch Palette:'}
                </div>
                <div class="swatch-row">
                  ${product.colors
                    .map(
                      (color) =>
                        `<span class="swatch-chip-lg" style="background-color:${escapeHtml(color)};" title="${escapeHtml(color)}"></span>`
                    )
                    .join('')}
                </div>
              </div>

              <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
                <button type="button" id="detail-quote-btn" class="btn btn-lg btn-accent">
                  ${lang === 'ar' ? `اطلب عرض سعر لكود ${escapeHtml(product.sku)}` : `Request Quote for ${escapeHtml(product.sku)}`}
                </button>
                <button type="button" id="detail-pin-btn" class="btn btn-lg ${pinned ? 'btn-dark' : 'btn-outline'}">
                  ${pinned ? icon('check', 'icon-md') : icon('bookmark', 'icon-md')}
                  <span>${pinned ? (lang === 'ar' ? 'تمت الإضافة للعينة' : 'Sample Pinned') : lang === 'ar' ? 'أضف للمختارات' : 'Pin Sample'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products -->
      <section class="section-paper">
        <div class="container">
          <div class="section-head-row" style="margin-bottom:1.75rem;">
            <h2 class="h2-section" style="font-size:1.5rem;margin-bottom:0;">
              ${lang === 'ar' ? 'أنظمة وعينات أخرى' : 'Related Systems & Finishes'}
            </h2>
            <a href="${escapeHtml(buildPageUrl('products'))}" class="text-link-accent group">
              <span>${lang === 'ar' ? 'الكتالوج الكامل' : 'Full Catalog'}</span>
              ${icon('arrowRight', `icon-sm icon-arrow-move ${rtl ? 'icon-arrow-flip' : ''}`)}
            </a>
          </div>

          <div class="projects-grid">
            ${related
              .map(
                (item, idx) => `<a href="${escapeHtml(buildPageUrl('product-detail', item.sku))}" class="product-card interactive-card reveal group" data-variant="product" data-delay="${idx * 55}">
                  <div class="product-card-media">
                    ${renderMaterialSwatch(item)}
                    <span class="badge-card-top">${escapeHtml(item.sku)}</span>
                  </div>
                  <div style="padding:1.25rem;">
                    <div class="product-card-title">${escapeHtml(item.name[lang])}</div>
                    <div class="font-mono-tech" style="font-size:0.75rem;color:var(--ink-secondary);margin-top:0.25rem;">${escapeHtml(item.dimensions)}</div>
                  </div>
                </a>`
              )
              .join('')}
          </div>
        </div>
      </section>

      ${renderStrataDivider()}
    `;

    root.querySelector('#detail-zoom-btn')?.addEventListener('click', () => {
      if (activeSlide?.kind === 'photo' && activeSlide.src) {
        openSheetZoomModal({
          src: activeSlide.src,
          badge: activeSlide.badge || product.sku,
          title: activeSlide.title[lang],
          caption: activeSlide.caption[lang],
        });
      }
    });

    root.querySelectorAll('[data-slide-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        slideIdx = Number(btn.dataset.slideIdx);
        render();
      });
    });

    root.querySelector('#detail-quote-btn')?.addEventListener('click', () => {
      navigateWithQuotePrefill({
        interest: product.category === 'planter' ? 'Planters & garden range' : 'GRC decorative cladding',
        notes: `${lang === 'ar' ? 'طلب عرض سعر للمنتج' : 'Requesting quote and availability for'} ${product.sku} (${product.name[lang]}, ${product.dimensions})`,
      });
    });

    root.querySelector('#detail-pin-btn')?.addEventListener('click', () => {
      toggleShortlist(product.sku);
    });

    refreshAllInteractions(root);
  }

  onShortlistChange(() => {
    if (document.body.contains(root)) render();
  });

  render();
  return render;
}
