import { refreshAllInteractions } from './animations.js';
import { UI_COPY } from './data.js';
import { escapeHtml, icon } from './icons.js';
import { getLang, isRtl } from './language.js';
import { renderStrataDivider } from './navigation.js';
import { buildPageUrl } from './routing.js';

export function initNotFoundPage(root) {
  function render() {
    const lang = getLang();
    const rtl = isRtl();

    const links = [
      { href: buildPageUrl('home'), label: UI_COPY.navHome[lang] },
      { href: buildPageUrl('lock-stone'), label: UI_COPY.navLockStone[lang] },
      { href: buildPageUrl('products'), label: UI_COPY.navProducts[lang] },
      { href: buildPageUrl('projects'), label: UI_COPY.navProjects[lang] },
    ];

    root.innerHTML = `
      <section class="section-paper" style="padding-block:6rem;">
        <div class="container">
          <div style="max-width:42rem;">
            <div class="eyebrow">
              <span class="eyebrow-bar"></span>
              <span>HTTP 404 — ${lang === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}</span>
            </div>

            <h1 class="hero-title" style="color:var(--ink-primary);font-size:clamp(3.25rem,8vw,4.5rem);">
              ${lang === 'ar' ? 'المسار المطلوب غير متوفر' : 'Route Not Found'}
            </h1>

            <p class="page-lead" style="color:var(--ink-secondary);margin-bottom:2.25rem;">
              ${
                lang === 'ar'
                  ? 'تعذر العثور على الصفحة المطلوبة. يمكنك الانتقال مباشرة إلى أحد الأقسام الرئيسية لموقع روك آرت أدناه.'
                  : 'The page or catalog item you requested is unavailable. Jump directly to one of Rock Art’s core engineering sections below.'
              }
            </p>

            <div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-bottom:3rem;">
              <a href="${escapeHtml(buildPageUrl('home'))}" class="btn btn-lg btn-accent">
                ${icon('compass', 'icon-md')}
                <span>${lang === 'ar' ? 'العودة للرئيسية' : 'Back to Homepage'}</span>
              </a>
              <a href="${escapeHtml(buildPageUrl('contact'))}" class="btn btn-lg btn-outline">
                ${escapeHtml(UI_COPY.ctaQuote[lang])}
              </a>
            </div>
          </div>

          <div class="notfound-grid">
            ${links
              .map(
                (item) => `<a href="${escapeHtml(item.href)}" class="notfound-card interactive-card group" data-variant="spec">
                  <div style="display:flex;align-items:center;justify-content:space-between;font-family:var(--f-display);font-weight:600;color:var(--ink-primary);">
                    <span>${escapeHtml(item.label)}</span>
                    ${icon('arrowRight', `icon-sm icon-arrow-move ${rtl ? 'icon-arrow-flip' : ''}`)}
                  </div>
                </a>`
              )
              .join('')}
          </div>
        </div>
      </section>
      ${renderStrataDivider()}
    `;

    refreshAllInteractions(root);
  }

  render();
  return render;
}
