import { UI_COPY } from './data.js';
import { prefersReducedMotion } from './animations.js';
import { detectSwipeDirection } from './engineering.js';
import { escapeHtml, icon, renderMaterialSwatch } from './icons.js';
import { getLang, isRtl } from './language.js';
import { buildPageUrl } from './routing.js';
import { getMaxIndex, getSlidesPerView, stepSlideIndex } from './slider-logic.js';

const AUTOPLAY_MS = 3800;

/**
 * Responsive auto-playing product slider (4 / 3 / 2 / 1 cards per view).
 * Arrows and swipe move one card at a time; autoplay pauses on hover, focus,
 * touch, when scrolled out of view and when the tab is hidden.
 * Returns a controller `{ setCategory, rerender, destroy }`.
 */
export function mountProductSlider(containerEl, options = {}) {
  const { products = [], initialCategory = 'all', showCategoryFilter = true, onCategorySelect = null } = options;

  let activeCategory = initialCategory;
  let index = 0;
  let perView = getSlidesPerView(containerEl.clientWidth || window.innerWidth);
  let timer = null;
  let inView = true;
  let hovering = false;
  let touching = false;
  let touchStart = null;
  const reduced = prefersReducedMotion();

  let trackEl = null;
  let viewportEl = null;
  let dotsEl = null;
  let observer = null;

  function items() {
    if (activeCategory === 'all') return products;
    const filtered = products.filter((p) => p.category === activeCategory);
    return filtered.length > 0 ? filtered : products;
  }

  function applyPosition() {
    if (!trackEl) return;
    const rtl = isRtl();
    const shift = (index * 100) / perView;
    trackEl.style.transform = `translate3d(${rtl ? '' : '-'}${shift}%,0,0)`;
    trackEl.querySelectorAll('.pslider-slide').forEach((slide, i) => {
      const visible = i >= index && i < index + perView;
      slide.setAttribute('aria-hidden', visible ? 'false' : 'true');
      slide.querySelector('a').tabIndex = visible ? 0 : -1;
    });
    if (dotsEl) {
      dotsEl.querySelectorAll('[data-dot]').forEach((d) => {
        d.classList.toggle('is-active', Number(d.dataset.dot) === index);
      });
    }
  }

  function go(delta) {
    index = stepSlideIndex(index, delta, items().length, perView);
    applyPosition();
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function syncAutoplay() {
    stopAutoplay();
    if (reduced || hovering || touching || !inView || document.hidden) return;
    if (getMaxIndex(items().length, perView) === 0) return;
    timer = setInterval(() => go(1), AUTOPLAY_MS);
  }

  function slideHtml(product, lang) {
    return `<div class="pslider-slide" style="flex-basis:${100 / perView}%">
      <a href="${escapeHtml(buildPageUrl('product-detail', product.sku))}" class="pslider-card" aria-label="${escapeHtml(product.sku)} ${escapeHtml(product.name[lang])}" draggable="false">
        <div class="pslider-media">
          ${renderMaterialSwatch(product)}
          <span class="chip-sku pslider-sku">${escapeHtml(product.sku)}</span>
        </div>
        <div class="pslider-body">
          <div class="pslider-name font-display">${escapeHtml(product.name[lang])}</div>
          <div class="pslider-meta">
            <span>${escapeHtml(product.dimensions)}</span>
            <span class="pslider-origin">${escapeHtml(product.styleOrigin[lang])}</span>
          </div>
        </div>
      </a>
    </div>`;
  }

  function buildTrack() {
    const lang = getLang();
    const list = items();
    index = Math.min(index, getMaxIndex(list.length, perView));
    trackEl.innerHTML = list.map((p) => slideHtml(p, lang)).join('');

    const pages = getMaxIndex(list.length, perView) + 1;
    dotsEl.innerHTML =
      pages > 1
        ? Array.from({ length: pages }, (_, i) => `<button type="button" class="pslider-dot" data-dot="${i}" aria-label="${i + 1}"></button>`).join('')
        : '';
    dotsEl.querySelectorAll('[data-dot]').forEach((d) =>
      d.addEventListener('click', () => {
        index = Number(d.dataset.dot);
        applyPosition();
      })
    );
    applyPosition();
    syncAutoplay();
  }

  function render() {
    const lang = getLang();
    const rtl = isRtl();
    const filterCategories = [
      { id: 'all', label: UI_COPY.filterAll[lang] },
      { id: 'stone', label: UI_COPY.filterStone[lang] },
      { id: 'brick', label: UI_COPY.filterBrick[lang] },
      { id: 'planter', label: UI_COPY.filterPlanter[lang] },
    ];

    containerEl.innerHTML = `
      <div class="pslider">
        ${
          showCategoryFilter
            ? `<div class="pslider-filters filter-btn-row" data-role="filters">
                ${filterCategories
                  .map(
                    (cat) =>
                      `<button type="button" data-cat="${cat.id}" class="filter-pill-btn ${activeCategory === cat.id ? 'is-active' : ''}">${escapeHtml(cat.label)}</button>`
                  )
                  .join('')}
              </div>`
            : ''
        }
        <div class="pslider-frame">
          <button type="button" class="pslider-arrow pslider-arrow--prev" data-role="prev" aria-label="${lang === 'ar' ? 'السابق' : 'Previous'}">
            ${icon(rtl ? 'chevronRight' : 'chevronLeft', 'icon-md')}
          </button>
          <div class="pslider-viewport" data-role="viewport" tabindex="0" aria-roledescription="carousel" aria-label="${lang === 'ar' ? 'منتجات روك آرت' : 'Rock Art products'}">
            <div class="pslider-track" data-role="track"></div>
          </div>
          <button type="button" class="pslider-arrow pslider-arrow--next" data-role="next" aria-label="${lang === 'ar' ? 'التالي' : 'Next'}">
            ${icon(rtl ? 'chevronLeft' : 'chevronRight', 'icon-md')}
          </button>
        </div>
        <div class="pslider-dots" data-role="dots"></div>
      </div>`;

    trackEl = containerEl.querySelector('[data-role="track"]');
    viewportEl = containerEl.querySelector('[data-role="viewport"]');
    dotsEl = containerEl.querySelector('[data-role="dots"]');

    containerEl.querySelectorAll('[data-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setCategory(btn.dataset.cat);
        if (typeof onCategorySelect === 'function') onCategorySelect(btn.dataset.cat);
      });
    });

    const prevBtn = containerEl.querySelector('[data-role="prev"]');
    const nextBtn = containerEl.querySelector('[data-role="next"]');
    prevBtn.addEventListener('click', () => go(-1));
    nextBtn.addEventListener('click', () => go(1));

    viewportEl.addEventListener('mouseenter', () => { hovering = true; syncAutoplay(); });
    viewportEl.addEventListener('mouseleave', () => { hovering = false; syncAutoplay(); });
    viewportEl.addEventListener('focusin', () => { hovering = true; syncAutoplay(); });
    viewportEl.addEventListener('focusout', () => { hovering = false; syncAutoplay(); });
    prevBtn.addEventListener('mouseenter', () => { hovering = true; syncAutoplay(); });
    prevBtn.addEventListener('mouseleave', () => { hovering = false; syncAutoplay(); });
    nextBtn.addEventListener('mouseenter', () => { hovering = true; syncAutoplay(); });
    nextBtn.addEventListener('mouseleave', () => { hovering = false; syncAutoplay(); });

    viewportEl.addEventListener('touchstart', (e) => {
      if (!e.touches.length) return;
      touching = true;
      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      syncAutoplay();
    }, { passive: true });
    viewportEl.addEventListener('touchend', (e) => {
      touching = false;
      if (touchStart && e.changedTouches.length) {
        const t = e.changedTouches[0];
        const dir = detectSwipeDirection(touchStart.x, t.clientX, touchStart.y, t.clientY, 38);
        if (dir) go((dir === 'next' ? 1 : -1) * (isRtl() ? -1 : 1));
      }
      touchStart = null;
      syncAutoplay();
    }, { passive: true });
    viewportEl.addEventListener('touchcancel', () => { touching = false; syncAutoplay(); }, { passive: true });

    viewportEl.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      go(isRtl() ? -dir : dir);
    });

    if (typeof IntersectionObserver !== 'undefined') {
      observer?.disconnect();
      observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        syncAutoplay();
      }, { threshold: 0.2 });
      observer.observe(containerEl);
    }

    buildTrack();
  }

  function setCategory(next) {
    activeCategory = next;
    index = 0;
    containerEl.querySelectorAll('[data-cat]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.cat === next);
    });
    buildTrack();
  }

  function handleResize() {
    const next = getSlidesPerView(containerEl.clientWidth || window.innerWidth);
    if (next !== perView) {
      perView = next;
      buildTrack();
    }
  }

  function handleVisibility() {
    syncAutoplay();
  }

  window.addEventListener('resize', handleResize);
  document.addEventListener('visibilitychange', handleVisibility);
  render();

  return {
    setCategory,
    rerender: () => {
      perView = getSlidesPerView(containerEl.clientWidth || window.innerWidth);
      render();
    },
    destroy: () => {
      stopAutoplay();
      observer?.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    },
  };
}
