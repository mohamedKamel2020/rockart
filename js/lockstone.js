import {
  COMPANY_INFO,
  LOCK_STONE_FACE_PROFILES,
  LOCK_STONE_SYSTEM,
  LOCK_STONE_VIDEOS,
  LOCK_STONE_EXTRA,
  SITE_CONSTRUCTION_SEQUENCE,
  UI_COPY,
  UPLOADED_PHOTOS,
} from './data.js';
import { refreshAllInteractions } from './animations.js';
import { escapeHtml } from './icons.js';
import { getLang } from './language.js';
import { openSheetZoomModal, renderBreadcrumbs, renderPageHeroBg, renderStrataDivider } from './navigation.js';
import { buildPageUrl } from './routing.js';

function renderExtraSections(lang) {
  const X = LOCK_STONE_EXTRA;
  const head = (blk) => `<div style="max-width:42rem;margin-bottom:2rem;" class="reveal">
      <div class="eyebrow"><span class="eyebrow-bar"></span><span>${escapeHtml(blk.eyebrow[lang])}</span></div>
      <h2 class="h2-section text-balance">${escapeHtml(blk.title[lang])}</h2>
    </div>`;
  const arrow = (dir) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${dir < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}"/></svg>`;
  return `
      <section class="section-paper">
        <div class="container">
          ${head(X.anatomy)}
          <div style="display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));align-items:center;">
            <figure class="reveal" style="margin:0;"><img src="${escapeHtml(X.anatomy.photo.src)}" alt="${escapeHtml(X.anatomy.photo.alt[lang])}" width="${X.anatomy.photo.width}" height="${X.anatomy.photo.height}" loading="lazy" decoding="async" style="width:100%;height:auto;display:block;border-radius:var(--radius-sm);" /></figure>
            <ul class="reveal" style="margin:0;padding-inline-start:1.25rem;line-height:1.8;color:var(--ink-secondary);">
              ${X.anatomy.points.map((pt) => `<li>${escapeHtml(pt[lang])}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>

      <section class="section-paper">
        <div class="container">
          ${head(X.drainage)}
          <div class="ls-drain-grid">
            <div class="ls-drain-cards">
              ${X.drainage.cards
                .map(
                  (c, idx) => `<div class="spec-matrix-card reveal" data-variant="spec" data-delay="${idx * 45}">
                <div class="font-mono-tech" style="font-size:0.75rem;color:var(--ink-secondary);margin-bottom:0.5rem;">${escapeHtml(c.title[lang])}</div>
                <div style="font-size:0.9375rem;line-height:1.6;color:var(--ink-primary);">${escapeHtml(c.text[lang])}</div>
              </div>`
                )
                .join('')}
            </div>
            <div class="ls-photo-stack">
              ${X.drainage.photos
                .map(
                  (p, idx) => `<button type="button" class="ls-stack-item ls-stack-item--${idx + 1}" data-drain-zoom="${idx}" aria-label="${escapeHtml(p.caption[lang])}">
                <img src="${escapeHtml(p.src)}" alt="${escapeHtml(p.caption[lang])}" width="${p.width}" height="${p.height}" loading="lazy" decoding="async" />
                <span class="ls-stack-cap">${escapeHtml(p.caption[lang])}</span>
              </button>`
                )
                .join('')}
            </div>
          </div>
        </div>
      </section>

      <section class="section-paper">
        <div class="container">
          ${head(X.curved)}
          <div class="ls-slider">
            <button type="button" class="ls-slider-btn ls-slider-btn--left" data-ls-slide="-1" aria-label="${lang === 'ar' ? 'السابق (يسار)' : 'Previous'}">${arrow(-1)}</button>
            <button type="button" class="ls-slider-btn ls-slider-btn--right" data-ls-slide="1" aria-label="${lang === 'ar' ? 'التالي (يمين)' : 'Next'}">${arrow(1)}</button>
          <div class="ls-slider-track" data-ls-track dir="ltr">
            ${X.curved.photos
              .map(
                (p, idx) => `<figure class="ls-slide" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
              <button type="button" class="ls-slide-media" data-curved-zoom="${idx}" aria-label="${escapeHtml(p.caption[lang])}">
                <img src="${escapeHtml(p.src)}" alt="${escapeHtml(p.caption[lang])}" width="${p.width}" height="${p.height}" loading="lazy" decoding="async" />
              </button>
              <figcaption>${escapeHtml(p.caption[lang])}</figcaption>
            </figure>`
              )
              .join('')}
          </div>
          </div>
        </div>
      </section>
`;
}

let videoObserver = null;

export function initLockStonePage(root) {
  function render() {
    const lang = getLang();

    root.innerHTML = `
      <section class="page-header-dark page-hero page-hero--lockstone">
        ${renderPageHeroBg('lockStone')}
        <div class="container page-hero-content">
          ${renderBreadcrumbs(
            [
              { label: lang === 'ar' ? 'الرئيسية' : 'Home', href: buildPageUrl('home') },
              { label: UI_COPY.navLockStone[lang] },
            ],
            true
          )}

          <div class="lockstone-hero-grid">
            <div>
              <div class="eyebrow eyebrow--inverse reveal">
                <span class="eyebrow-bar"></span>
                <span>${escapeHtml(COMPANY_INFO.patent[lang])}</span>
              </div>
              <h1 class="h1-page text-balance">${escapeHtml(LOCK_STONE_SYSTEM.title[lang])}</h1>
              <p class="page-lead" style="margin-bottom:2rem;">${escapeHtml(LOCK_STONE_SYSTEM.description[lang])}</p>
              <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
                <a href="${escapeHtml(buildPageUrl('contact'))}" class="btn btn-lg btn-accent">
                  ${escapeHtml(UI_COPY.ctaQuote[lang])}
                </a>
              </div>
            </div>

            <div style="border-radius:var(--radius-sm);overflow:hidden;border:1px solid var(--border-inverse);aspect-ratio:4/3;background-color:#2C2A26;position:relative;" class="group reveal">
              <img src="${escapeHtml(UPLOADED_PHOTOS.bandedWallWide)}" alt="${lang === 'ar' ? 'حائط ساند لوك ستون منفذ بالرمادي والطوبي' : 'Banded charcoal and terracotta Lock Stone retaining wall'}" class="media-zoom-img--subtle" style="object-fit:cover;" />
              <div style="position:absolute;bottom:0;inset-inline:0;background:linear-gradient(to top,rgba(20,19,17,0.92),transparent);padding:1rem;font-family:var(--f-mono);font-size:0.75rem;color:#FBF9F4;">
                ${lang === 'ar' ? 'حائط ساند مزدوج الألوان منفذ على الطبيعة — مداميك لوك ستون مترابطة' : 'Field execution: alternating charcoal and terracotta Lock Stone courses'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Verified Datasheet Specs Matrix -->
      <section class="section-elevated">
        <div class="container">
          <div style="margin-bottom:2rem;" class="reveal">
            <div class="eyebrow">
              <span class="eyebrow-bar"></span>
              <span>${lang === 'ar' ? 'ملخص فني' : 'Technical Summary'}</span>
            </div>
            <h2 class="h2-section text-balance">
              ${lang === 'ar' ? 'مواصفات منظومة لوك ستون' : 'Lock Stone System Specifications'}
            </h2>
          </div>

          <div class="spec-matrix">
            ${LOCK_STONE_SYSTEM.specs
              .map(
                (spec, idx) => `<div class="spec-matrix-card interactive-card reveal" data-variant="spec" data-delay="${idx * 45}">
                <div class="font-mono-tech" style="font-size:0.75rem;color:var(--ink-secondary);margin-bottom:0.5rem;">${escapeHtml(spec.label[lang])}</div>
                <div class="font-display" style="font-weight:600;font-size:1.375rem;color:var(--ink-primary);">${escapeHtml(typeof spec.value === 'string' ? spec.value : spec.value[lang])}</div>
              </div>`
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- 4-Stage Construction Sequence -->
      <section class="section-inverse">
        <div class="container">
          <div style="max-width:40rem;margin-bottom:2.5rem;" class="reveal">
            <div class="eyebrow eyebrow--inverse">
              <span class="eyebrow-bar"></span>
              <span>${lang === 'ar' ? 'آلية التنفيذ المزدوج' : 'Double-Reinforced Installation'}</span>
            </div>
            <h2 class="h2-section h2-section--inverse text-balance">
              ${lang === 'ar' ? 'تسلسل التنفيذ في 4 مراحل' : 'Four-Stage Construction Sequence'}
            </h2>
          </div>

          <div class="ls-steps-grid">
            ${LOCK_STONE_SYSTEM.steps
              .map(
                (st, idx) => `<article class="ls-step-card reveal" data-delay="${idx * 60}">
              <div style="display:flex;align-items:baseline;gap:0.875rem;margin-bottom:0.75rem;">
                <span class="font-mono-tech" style="font-size:1.25rem;font-weight:600;color:var(--accent);">${escapeHtml(st.course)}</span>
                <h3 class="font-display" style="font-weight:600;font-size:1.125rem;color:#FBF9F4;margin:0;">${escapeHtml(st.title[lang])}</h3>
              </div>
              <p style="font-size:0.875rem;color:rgba(251,249,244,0.75);line-height:1.7;margin:0 0 1rem;">${escapeHtml(st.description[lang])}</p>
              <div class="font-mono-tech ls-step-callout">${escapeHtml(st.specCallout[lang])}</div>
            </article>`
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- Engineering Documentary Videos -->
      <section class="section-elevated">
        <div class="container">
          <div style="max-width:42rem;margin-bottom:2.5rem;" class="reveal">
            <div class="eyebrow">
              <span class="eyebrow-bar"></span>
              <span>${lang === 'ar' ? 'توثيق ميداني وهندسي بالفيديو' : 'Video Demonstrations'}</span>
            </div>
            <h2 class="h2-section text-balance">
              ${lang === 'ar' ? 'شرح النظام وتنفيذه الميداني بالفيديو' : 'System Walkthrough & Field Execution'}
            </h2>
          </div>

          <div class="video-grid">
            ${LOCK_STONE_VIDEOS.map(
              (video, idx) => `<article class="video-card reveal" data-delay="${idx * 70}">
                <div class="video-player-box">
                  <video id="ls-video-${escapeHtml(video.id)}" src="${escapeHtml(video.src)}" poster="${escapeHtml(video.poster)}" controls preload="metadata" playsinline class="video-player-el"></video>
                </div>
                <div style="padding:1.5rem;">
                  <h3 class="cap-title" style="font-size:1.25rem;margin-bottom:0.5rem;">${escapeHtml(video.title[lang])}</h3>
                  <p style="font-size:0.875rem;color:var(--ink-secondary);line-height:1.6;">${escapeHtml(video.description[lang])}</p>
                </div>
              </article>`
            ).join('')}
          </div>
        </div>
      </section>

      ${renderExtraSections(lang)}

      <!-- Face Profiles & On-Site Construction Photos -->
      <section class="section-paper">
        <div class="container">
          <div style="max-width:42rem;margin-bottom:2.5rem;" class="reveal">
            <div class="eyebrow">
              <span class="eyebrow-bar"></span>
              <span>${lang === 'ar' ? 'أشكال الواجهات' : 'Face Variants'}</span>
            </div>
            <h2 class="h2-section text-balance">
              ${lang === 'ar' ? 'أشكال واجهات بلوك لوك ستون' : 'Lock Stone Block Face Variants'}
            </h2>
          </div>

          <div class="projects-grid" style="margin-bottom:4rem;">
            ${LOCK_STONE_FACE_PROFILES.map(
              (item, idx) => `<button type="button" data-ls-sheet="${idx}" class="product-card interactive-card reveal group" data-variant="project" data-delay="${idx * 50}" style="text-align:start;">
                <div class="brochure-sheet-box">
                  <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title[lang])}" loading="lazy" decoding="async" class="brochure-sheet-img" />
                </div>
                <div class="project-card-body">
                  <h3 class="cap-title" style="font-size:1rem;margin-bottom:0.375rem;">${escapeHtml(item.title[lang])}</h3>
                  <p style="font-size:0.75rem;color:var(--ink-secondary);line-height:1.55;">${escapeHtml(item.caption[lang])}</p>
                </div>
              </button>`
            ).join('')}
          </div>

          <div style="max-width:42rem;margin-bottom:2rem;" class="reveal">
            <div class="eyebrow">
              <span class="eyebrow-bar"></span>
              <span>${lang === 'ar' ? 'تنفيذ فعلي بالموقع' : 'On-Site Construction'}</span>
            </div>
            <h3 class="h2-section" style="font-size:1.75rem;">
              ${lang === 'ar' ? 'مراحل شد شبكات الجيوغريد والردم والدمك في الموقع' : 'Highway Retaining Wall Sequence: Geogrid, Backfill & Compaction'}
            </h3>
          </div>

          <div class="projects-grid">
            ${SITE_CONSTRUCTION_SEQUENCE.map(
              (item, idx) => `<button type="button" data-site-sheet="${idx}" class="product-card interactive-card reveal group" data-variant="project" data-delay="${idx * 50}" style="text-align:start;">
                <div style="aspect-ratio:4/3;overflow:hidden;background-color:#1C1B19;">
                  <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title[lang])}" loading="lazy" decoding="async" class="media-zoom-img" style="object-fit:cover;" />
                </div>
                <div class="project-card-body">
                  <h4 class="cap-title" style="font-size:1rem;margin-bottom:0.375rem;">${escapeHtml(item.title[lang])}</h4>
                  <p style="font-size:0.75rem;color:var(--ink-secondary);line-height:1.55;">${escapeHtml(item.caption[lang])}</p>
                </div>
              </button>`
            ).join('')}
          </div>
        </div>
      </section>

      ${renderStrataDivider()}
    `;

    const zoomItem = (item) => item && openSheetZoomModal({ src: item.src, title: item.caption[lang], caption: '' });
    root.querySelectorAll('[data-drain-zoom]').forEach((btn) => {
      btn.addEventListener('click', () => zoomItem(LOCK_STONE_EXTRA.drainage.photos[Number(btn.dataset.drainZoom)]));
    });
    root.querySelectorAll('[data-curved-zoom]').forEach((btn) => {
      btn.addEventListener('click', () => zoomItem(LOCK_STONE_EXTRA.curved.photos[Number(btn.dataset.curvedZoom)]));
    });
    const track = root.querySelector('[data-ls-track]');
    root.querySelectorAll('[data-ls-slide]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const slide = track?.querySelector('.ls-slide');
        if (!slide) return;
        track.scrollBy({ left: Number(btn.dataset.lsSlide) * (slide.getBoundingClientRect().width + 16), behavior: 'smooth' });
      });
    });

    root.querySelectorAll('[data-ls-sheet]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = LOCK_STONE_FACE_PROFILES[Number(btn.dataset.lsSheet)];
        if (item) openSheetZoomModal({ src: item.src, title: item.title[lang], caption: item.caption[lang] });
      });
    });

    root.querySelectorAll('[data-site-sheet]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = SITE_CONSTRUCTION_SEQUENCE[Number(btn.dataset.siteSheet)];
        if (item) openSheetZoomModal({ src: item.src, title: item.title[lang], caption: item.caption[lang] });
      });
    });

    // Videos: only one plays at a time; a playing video pauses when it scrolls
    // out of view and resumes when it comes back.
    const videos = Array.from(root.querySelectorAll('video'));
    const resumeSet = new Set();
    videos.forEach((v) => {
      v.addEventListener('play', () => {
        resumeSet.delete(v);
        videos.forEach((other) => {
          if (other !== v && !other.paused) other.pause();
          if (other !== v) resumeSet.delete(other);
        });
      });
    });
    videoObserver?.disconnect();
    if (typeof IntersectionObserver !== 'undefined') {
      videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const v = entry.target;
            if (!entry.isIntersecting) {
              if (!v.paused && !v.ended) {
                resumeSet.add(v);
                v.pause();
              }
            } else if (resumeSet.has(v)) {
              resumeSet.delete(v);
              v.play?.().catch(() => {});
            }
          });
        },
        { threshold: 0.25 }
      );
      videos.forEach((v) => videoObserver.observe(v));
    }

    refreshAllInteractions(root);
  }

  render();
  return render;
}
