import {
  COMPANY_INFO,
  LOCK_STONE_FACE_PROFILES,
  LOCK_STONE_SYSTEM,
  LOCK_STONE_VIDEOS,
  SITE_CONSTRUCTION_SEQUENCE,
  UI_COPY,
  UPLOADED_PHOTOS,
} from './data.js';
import { refreshAllInteractions } from './animations.js';
import { escapeHtml } from './icons.js';
import { getLang } from './language.js';
import { openSheetZoomModal, renderBreadcrumbs, renderPageHeroBg, renderStrataDivider } from './navigation.js';
import { buildPageUrl } from './routing.js';

function renderSectionalSvg(selectedStep) {
  return `<svg viewBox="0 0 420 260" class="diagram-svg" role="img" aria-label="Lock Stone retaining wall sectional assembly diagram">
    <!-- Ground / Soil Backfill Zone -->
    <polygon points="185,40 410,40 410,210 185,210" fill="rgba(181,86,42,0.12)" />

    <!-- Concrete Footing (Step 0/1) -->
    <rect
      x="60"
      y="208"
      width="175"
      height="26"
      rx="2"
      fill="${selectedStep === 0 || selectedStep === 1 ? '#CE6838' : '#3C3934'}"
      stroke="${selectedStep === 0 || selectedStep === 1 ? '#FBF9F4' : '#5B5650'}"
      stroke-width="1.5"
    />
    <text x="148" y="225" text-anchor="middle" fill="#FBF9F4" font-size="10" font-family="IBM Plex Mono">
      CONCRETE FOOTING (0.6–1.2m × 20cm)
    </text>

    <!-- Block Courses -->
    <g>
      <rect x="82" y="170" width="96" height="34" fill="#5B5650" stroke="#1C1B19" stroke-width="1.5" />
      <rect x="90" y="132" width="96" height="34" fill="#5B5650" stroke="#1C1B19" stroke-width="1.5" />
      <rect x="98" y="94" width="96" height="34" fill="#B5562A" stroke="#1C1B19" stroke-width="1.5" />
      <rect x="106" y="56" width="96" height="34" fill="#5B5650" stroke="#1C1B19" stroke-width="1.5" />
    </g>

    <!-- Geogrid Tie-Backs (Step 2/3) -->
    <g stroke="${selectedStep === 3 ? '#CE6838' : '#736D63'}" stroke-width="${selectedStep === 3 ? 3 : 1.8}" stroke-dasharray="6 4">
      <line x1="178" y1="168" x2="390" y2="168" />
      <line x1="194" y1="130" x2="390" y2="130" />
      <line x1="202" y1="92" x2="390" y2="92" />
    </g>
    <text x="295" y="118" text-anchor="middle" fill="#EDE6D6" font-size="10" font-family="IBM Plex Mono">
      G-TEX GEOGRID 60–160 kN/m
    </text>

    <!-- Fiberglass Rebar + Pour (Step 2/3) -->
    <g>
      <line
        x1="130"
        y1="56"
        x2="130"
        y2="208"
        stroke="${selectedStep === 2 || selectedStep === 3 ? '#CE6838' : '#EDE6D6'}"
        stroke-width="${selectedStep === 2 || selectedStep === 3 ? 4 : 2.5}"
      />
      <line
        x1="164"
        y1="56"
        x2="164"
        y2="208"
        stroke="${selectedStep === 2 || selectedStep === 3 ? '#CE6838' : '#EDE6D6'}"
        stroke-width="${selectedStep === 2 || selectedStep === 3 ? 4 : 2.5}"
      />
    </g>

    <!-- Compaction arrows (Step 3) -->
    <g opacity="${selectedStep === 3 ? 1 : 0.45}">
      <line x1="270" y1="45" x2="270" y2="75" stroke="#CE6838" stroke-width="2" />
      <polygon points="265,70 275,70 270,80" fill="#CE6838" />
      <line x1="330" y1="45" x2="330" y2="75" stroke="#CE6838" stroke-width="2" />
      <polygon points="325,70 335,70 330,80" fill="#CE6838" />
      <text x="300" y="34" text-anchor="middle" fill="#CE6838" font-size="9" font-family="IBM Plex Mono">
        30cm COMPACTED LIFTS
      </text>
    </g>
  </svg>`;
}

let videoObserver = null;

export function initLockStonePage(root) {
  let selectedStep = 0;

  function updateDiagramAndSteps() {
    const lang = getLang();
    const stepData = LOCK_STONE_SYSTEM.steps[selectedStep];

    root.querySelectorAll('[data-course-idx]').forEach((btn) => {
      const idx = Number(btn.dataset.courseIdx);
      btn.classList.toggle('is-selected', idx === selectedStep);
      btn.setAttribute('aria-pressed', idx === selectedStep ? 'true' : 'false');
    });

    const svgWrap = root.querySelector('#ls-diagram-svg-wrap');
    if (svgWrap) svgWrap.innerHTML = renderSectionalSvg(selectedStep);

    const callout = root.querySelector('#ls-diagram-callout');
    if (callout && stepData) {
      callout.innerHTML = `
        <div class="font-mono-tech" style="font-size:0.75rem;color:var(--accent);margin-bottom:0.25rem;">
          ${escapeHtml(stepData.course)} — ${escapeHtml(stepData.title[lang])}
        </div>
        <div style="font-size:0.875rem;color:rgba(251,249,244,0.85);">
          ${escapeHtml(stepData.specCallout[lang])}
        </div>
      `;
    }
  }

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
              <img src="${escapeHtml(UPLOADED_PHOTOS.bandedWallWide)}" alt="${lang === 'ar' ? 'حائط ساند لوك ستون منفذ بالرمادي والطوبي' : 'Banded black basalt and terracotta Lock Stone retaining wall'}" class="media-zoom-img--subtle" style="object-fit:cover;" />
              <div style="position:absolute;bottom:0;inset-inline:0;background:linear-gradient(to top,rgba(20,19,17,0.92),transparent);padding:1rem;font-family:var(--f-mono);font-size:0.75rem;color:#FBF9F4;">
                ${lang === 'ar' ? 'حائط ساند مزدوج الألوان منفذ على الطبيعة — مداميك لوك ستون مترابطة' : 'Field execution: Alternating basalt & terracotta split-face Lock Stone courses'}
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
              <span>${lang === 'ar' ? 'مواصفات ومقاسات معتمدة' : 'Technical Datasheet'}</span>
            </div>
            <h2 class="h2-section text-balance">
              ${lang === 'ar' ? 'الخصائص الإنشائية والفيزيائية للبلوك' : 'Engineering & Testing Specifications'}
            </h2>
          </div>

          <div class="spec-matrix">
            ${LOCK_STONE_SYSTEM.specs
              .map(
                (spec, idx) => `<div class="spec-matrix-card interactive-card reveal" data-variant="spec" data-delay="${idx * 45}">
                <div class="font-mono-tech" style="font-size:0.75rem;color:var(--ink-secondary);margin-bottom:0.5rem;">${escapeHtml(spec.label[lang])}</div>
                <div class="font-display" style="font-weight:600;font-size:1.375rem;color:var(--ink-primary);">${escapeHtml(spec.value)}</div>
              </div>`
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- Interactive 4-Course Assembly Sequence & SVG -->
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

          <div class="course-assembly-grid">
            <div class="course-selector-list">
              ${LOCK_STONE_SYSTEM.steps
                .map(
                  (st, idx) => `<button type="button" data-course-idx="${idx}" aria-pressed="${selectedStep === idx ? 'true' : 'false'}" class="course-step-btn ${selectedStep === idx ? 'is-selected' : ''}">
                  <div style="display:flex;align-items:flex-start;gap:1rem;">
                    <span class="font-mono-tech" style="font-size:1.125rem;font-weight:600;color:var(--accent);">${escapeHtml(st.course)}</span>
                    <div>
                      <div class="font-display" style="font-weight:600;font-size:1.125rem;color:#FBF9F4;margin-bottom:0.25rem;">${escapeHtml(st.title[lang])}</div>
                      <p style="font-size:0.875rem;color:rgba(251,249,244,0.72);line-height:1.6;">${escapeHtml(st.description[lang])}</p>
                    </div>
                  </div>
                </button>`
                )
                .join('')}
            </div>

            <div class="diagram-box reveal">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;">
                <span class="font-mono-tech" style="font-size:0.75rem;color:var(--accent);text-transform:uppercase;letter-spacing:0.08em;">
                  ${lang === 'ar' ? 'قطاع هندسي تفاعلي' : 'Sectional Assembly Diagram'}
                </span>
                <span class="font-mono-tech" style="font-size:0.75rem;color:rgba(237,230,214,0.65);">Patent No. 2018/1412</span>
              </div>
              <div id="ls-diagram-svg-wrap">${renderSectionalSvg(selectedStep)}</div>
              <div id="ls-diagram-callout" class="diagram-callout"></div>
            </div>
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

      <!-- Face Profiles & On-Site Construction Photos -->
      <section class="section-paper">
        <div class="container">
          <div style="max-width:42rem;margin-bottom:2.5rem;" class="reveal">
            <div class="eyebrow">
              <span class="eyebrow-bar"></span>
              <span>${lang === 'ar' ? 'أشكال الواجهات والنشرات الفنية' : 'Face Profiles & Spec Sheets'}</span>
            </div>
            <h2 class="h2-section text-balance">
              ${lang === 'ar' ? 'الواجهات المعمارية للبلوك وتفاصيل التأسيس الرسمية' : 'Keystone Face Variants & Official Installation Diagrams'}
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
              <span>${lang === 'ar' ? 'تنفيذ فعلي بمواقع الطرق والجسور' : 'On-Site Embankment Construction'}</span>
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

    root.querySelectorAll('[data-course-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedStep = Number(btn.dataset.courseIdx);
        updateDiagramAndSteps();
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

    updateDiagramAndSteps();
    refreshAllInteractions(root);
  }

  render();
  return render;
}
