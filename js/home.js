import {
  ABOUT_CONTENT,
  ALL_PRODUCTS,
  CLIENTS,
  COMPANY_INFO,
  HERO_IMAGE,
  HOME_FIELD_STRIP,
  PROJECT_PHOTOS,
  SITE_PHOTOS,
  HERO_CONTENT,
  COMPANY_VIDEO,
  LOCK_STONE_SYSTEM,
  LOCK_STONE_VIDEOS,
  PLANTER_PRODUCTS,
  PROJECTS,
  UI_COPY,
  UPLOADED_PHOTOS,
} from './data.js';
import { refreshAllInteractions } from './animations.js';
import { mountProductSlider } from './gallery.js';
import { escapeHtml, icon } from './icons.js';
import { getLang, isRtl } from './language.js';
import { renderStrataDivider } from './navigation.js';
import { openLightbox } from './projects.js';
import { buildPageUrl } from './routing.js';

export function initHomePage(root) {
  let showcaseMode = 'photo';
  let galleryCtrl = null;
  let videoObserver = null;
  let watchVideos = () => {};

  function render() {
    if (galleryCtrl) {
      galleryCtrl.destroy();
      galleryCtrl = null;
    }

    const lang = getLang();
    const rtl = isRtl();
    const lockVideo = LOCK_STONE_VIDEOS.find((v) => v.id === 'lock-stone-intro') || LOCK_STONE_VIDEOS[0];

    root.innerHTML = `
      <!-- 1. ARCHITECTURAL HERO -->
      <section class="hero">
        <div class="hero-bg">
          <img src="${escapeHtml(HERO_IMAGE)}" alt="${escapeHtml(HERO_CONTENT.headlineStart[lang])}" class="hero-bg-img" fetchpriority="high" decoding="async" />
          <div class="hero-overlay"></div>
        </div>

        <div class="container hero-content">
          <div class="hero-copy-box">
            <div class="eyebrow eyebrow--inverse reveal">
              <span class="eyebrow-bar"></span>
              <span>${escapeHtml(HERO_CONTENT.eyebrow[lang])}</span>
            </div>

            <h1 class="hero-title text-balance reveal" data-delay="60">
              ${escapeHtml(HERO_CONTENT.headlineStart[lang])}
              <em>${escapeHtml(HERO_CONTENT.headlineAccent[lang])}</em>
            </h1>

            <p class="hero-lead reveal" data-delay="120">${escapeHtml(HERO_CONTENT.description[lang])}</p>

            <div class="hero-actions reveal" data-delay="180">
              <a href="${escapeHtml(buildPageUrl('lock-stone'))}" class="magnetic btn btn-lg btn-accent group" data-strength="0.18">
                <span>${escapeHtml(UI_COPY.ctaExplore[lang])}</span>
                ${icon('arrowRight', `icon-arrow icon-arrow-move ${rtl ? 'icon-arrow-flip' : ''}`)}
              </a>
              <a href="${escapeHtml(buildPageUrl('contact'))}" class="btn btn-lg btn-outline-inverse">
                ${lang === 'ar' ? 'تواصل مع مهندسينا' : 'Talk to an Engineer'}
              </a>
            </div>
          </div>
        </div>

        <div class="hero-stats-bar">
          <div class="container">
            <div class="hero-stats-grid">
              ${HERO_CONTENT.stats
                .map(
                  (stat, idx) => `<div class="hero-stat reveal" data-delay="${idx * 50}">
                  <div class="hero-stat-value tabular-nums">${escapeHtml(stat.value)}</div>
                  <div class="hero-stat-label">${escapeHtml(stat.label[lang])}</div>
                </div>`
                )
                .join('')}
            </div>
          </div>
        </div>
      </section>

      ${renderStrataDivider()}

      <!-- 2. COMPANY BRIEF + 4 PRODUCTION DIVISIONS -->
      <section class="section-paper">
        <div class="container">
          <div class="split-about split-about--center">
            <div class="split-about-text reveal">
              <div class="eyebrow">
                <span class="eyebrow-bar"></span>
                <span>${escapeHtml(ABOUT_CONTENT.eyebrow[lang])}</span>
              </div>
              <h2 class="h2-section text-balance">${escapeHtml(ABOUT_CONTENT.headline[lang])}</h2>

              <div class="body-copy-stack" style="margin-top:1.25rem;">
                ${ABOUT_CONTENT.paragraphs[lang].map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
              </div>

              <div class="cert-strip">
                ${ABOUT_CONTENT.certifications
                  .map(
                    (cert) => `<div class="cert-mini">
                    ${icon('shieldCheck', 'cert-mini-icon')}
                    <div>
                      <div class="cert-mini-title">${escapeHtml(cert.title[lang])}</div>
                      <div class="cert-mini-sub">${escapeHtml(cert.subtitle[lang])}</div>
                    </div>
                  </div>`
                  )
                  .join('')}
              </div>

              <div style="margin-top:1.75rem;">
                <a href="${escapeHtml(buildPageUrl('about'))}" class="text-link-accent group">
                  <span>${lang === 'ar' ? 'المزيد عن المصنع والاعتمادات' : 'Factory Profile & Full Specs'}</span>
                  ${icon('arrowRight', `icon-sm icon-arrow-move ${rtl ? 'icon-arrow-flip' : ''}`)}
                </a>
              </div>
            </div>

            <div class="split-about-aside">
              <div class="cap-grid">
                ${ABOUT_CONTENT.capabilities
                  .map(
                    (cap, idx) => `<div class="cap-card interactive-card reveal" data-variant="spec" data-delay="${idx * 65}">
                    <div class="cap-card-head">
                      <span class="cap-code">${escapeHtml(cap.code)}</span>
                      <span class="cap-line"></span>
                    </div>
                    <h3 class="cap-title">${escapeHtml(cap.title[lang])}</h3>
                    <p class="cap-desc">${escapeHtml(cap.description[lang])}</p>
                  </div>`
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2b. COMPANY INTRO VIDEO -->
      <section class="section-card">
        <div class="container">
          <div class="company-video-layout">
            <div class="reveal">
              <div class="eyebrow">
                <span class="eyebrow-bar"></span>
                <span>${escapeHtml(COMPANY_VIDEO.eyebrow[lang])}</span>
              </div>
              <h2 class="h2-section text-balance">${escapeHtml(COMPANY_VIDEO.title[lang])}</h2>
              <p class="section-lead">${escapeHtml(COMPANY_VIDEO.description[lang])}</p>
            </div>
            <div class="reveal" data-delay="80">
              <div class="company-video-frame" id="company-video-stage">
                <img src="${escapeHtml(COMPANY_VIDEO.poster)}" alt="" class="company-video-poster" width="1280" height="720" loading="lazy" decoding="async" />
                <button type="button" class="company-video-play" id="company-video-play" aria-label="${lang === 'ar' ? 'تشغيل الفيديو التعريفي' : 'Play company video'}">
                  <span class="company-video-play-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. PATENTED LOCK STONE RETAINING WALL PREVIEW -->
      <section class="section-inverse">
        <div class="container">
          <div class="section-head-row reveal">
            <div class="section-head-copy">
              <div class="eyebrow eyebrow--inverse">
                <span class="eyebrow-bar"></span>
                <span>${escapeHtml(LOCK_STONE_SYSTEM.eyebrow[lang])}</span>
              </div>
              <h2 class="h2-section h2-section--inverse text-balance">${escapeHtml(LOCK_STONE_SYSTEM.title[lang])}</h2>
              <p class="section-lead section-lead--inverse">${escapeHtml(LOCK_STONE_SYSTEM.description[lang])}</p>
            </div>

            <a href="${escapeHtml(buildPageUrl('lock-stone'))}" class="btn btn-md btn-accent group">
              <span>${lang === 'ar' ? 'المواصفات الكاملة للنظام' : 'Full Technical Specs'}</span>
              ${icon('arrowRight', `icon-sm icon-arrow-move ${rtl ? 'icon-arrow-flip' : ''}`)}
            </a>
          </div>

          <div class="lockstone-layout">
            <div class="lockstone-media-card reveal">
              <div>
                <div id="home-lockstone-stage" class="lockstone-preview-stage">
                  ${renderLockStonePreviewStage(showcaseMode, lockVideo, lang)}
                </div>

                <div class="showcase-tabs">
                  <button type="button" data-ls-mode="photo" class="showcase-tab-btn ${showcaseMode === 'photo' ? 'is-active' : ''}">
                    ${icon('image', 'icon-sm')}
                    <span>${lang === 'ar' ? 'صورة موقع فعلي' : 'Site Photo'}</span>
                  </button>
                  <button type="button" data-ls-mode="video" class="showcase-tab-btn ${showcaseMode === 'video' ? 'is-active' : ''}">
                    ${icon('film', 'icon-sm')}
                    <span>${lang === 'ar' ? 'فيديو نظام لوك ستون' : 'Lock Stone Video'}</span>
                  </button>
                </div>

                <div style="padding:1.25rem;border-top:1px solid rgba(255,255,255,0.1);">
                  <div class="font-mono-tech" style="font-size:0.75rem;color:var(--accent);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.25rem;">
                    ${escapeHtml(COMPANY_INFO.patent[lang])}
                  </div>
                  <div style="font-size:0.875rem;color:rgba(251,249,244,0.8);">
                    ${
                      showcaseMode === 'video'
                        ? escapeHtml(lockVideo.title[lang])
                        : lang === 'ar'
                        ? 'حائط ساند مزدوج الألوان منفذ فعلياً بالرمادي والطوبي (مداميك لوك ستون مترابطة)'
                        : 'Alternating charcoal and terracotta Lock Stone courses on site'
                    }
                  </div>
                </div>
              </div>

              <div class="spec-rows">
                ${LOCK_STONE_SYSTEM.specs
                  .slice(0, 4)
                  .map(
                    (sp) => `<div class="spec-row">
                      <span style="color:rgba(237,230,214,0.65);">${escapeHtml(sp.label[lang])}</span>
                      <span style="color:#FBF9F4;font-weight:500;">${escapeHtml(typeof sp.value === 'string' ? sp.value : sp.value[lang])}</span>
                    </div>`
                  )
                  .join('')}
              </div>
            </div>

            <div class="steps-grid">
              ${LOCK_STONE_SYSTEM.steps
                .map(
                  (st, idx) => `<div class="step-card interactive-card reveal" data-variant="spec" data-delay="${idx * 65}">
                  <div>
                    <div class="font-mono-tech" style="font-size:1.5rem;font-weight:600;color:var(--accent);margin-bottom:0.75rem;">${escapeHtml(st.course)}</div>
                    <h3 class="cap-title" style="color:#FBF9F4;">${escapeHtml(st.title[lang])}</h3>
                    <p style="font-size:0.875rem;color:rgba(251,249,244,0.75);line-height:1.6;">${escapeHtml(st.description[lang])}</p>
                  </div>
                  <div class="step-card-foot">${escapeHtml(st.specCallout[lang])}</div>
                </div>`
                )
                .join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- 4. CLADDING & CAST-STONE PRODUCT SLIDER -->
      <section class="section-paper gallery-section-clip">
        <div class="container">
          <div class="gallery-header-row reveal">
            <div class="section-head-copy">
              <div class="eyebrow">
                <span class="eyebrow-bar"></span>
                <span>${escapeHtml(UI_COPY.claddingEyebrow[lang])}</span>
              </div>
              <h2 class="h2-section text-balance">${escapeHtml(UI_COPY.claddingHeading[lang])}</h2>
              <p class="section-lead">${escapeHtml(UI_COPY.claddingLead[lang])}</p>
            </div>

            <a href="${escapeHtml(buildPageUrl('products'))}" class="btn btn-md btn-dark group">
              <span>${lang === 'ar' ? 'تصفح الكتالوج الكامل (14 منتجاً)' : 'Explore Full Catalog (14 Items)'}</span>
              ${icon('arrowRight', `icon-sm icon-arrow-move ${rtl ? 'icon-arrow-flip' : ''}`)}
            </a>
          </div>

          <div id="home-immersive-gallery"></div>

          <!-- Planters & Garden Accents Banner -->
          <div class="planter-banner interactive-card reveal group" data-variant="spec">
            <div class="planter-banner-media">
              <img src="${escapeHtml(UPLOADED_PHOTOS.gardenFountainShowroom)}" alt="${escapeHtml(UI_COPY.planterSectionTitle[lang])}" loading="lazy" decoding="async" class="media-zoom-img" style="object-fit:cover;" />
            </div>
            <div class="planter-banner-body">
              <div class="eyebrow">
                <span class="eyebrow-bar" style="width:1.25rem;"></span>
                <span>${lang === 'ar' ? 'تنسيق الحدائق والديكور الخارجي' : 'Landscape & Cast Concrete'}</span>
              </div>
              <h3 class="h2-section" style="font-size:1.75rem;margin-bottom:0.75rem;">${escapeHtml(UI_COPY.planterSectionTitle[lang])}</h3>
              <p class="section-lead" style="margin-bottom:1.5rem;">${escapeHtml(UI_COPY.planterSectionLead[lang])}</p>
              <div class="planter-chip-row">
                ${PLANTER_PRODUCTS.map(
                  (pl) => `<a href="${escapeHtml(buildPageUrl('product-detail', pl.sku))}" class="planter-chip-link">
                    <span style="font-weight:600;color:var(--accent-eyebrow);">${escapeHtml(pl.sku)}</span>
                    <span style="color:var(--ink-secondary);">${escapeHtml(pl.dimensions)}</span>
                  </a>`
                ).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. FEATURED PROJECTS + LIGHTBOX LAUNCHER -->
      <section class="section-card">
        <div class="container">
          <div class="section-head-row reveal">
            <div class="section-head-copy">
              <div class="eyebrow">
                <span class="eyebrow-bar"></span>
                <span>${escapeHtml(UI_COPY.projectsEyebrow[lang])}</span>
              </div>
              <h2 class="h2-section text-balance">${escapeHtml(UI_COPY.projectsHeading[lang])}</h2>
            </div>

            <a href="${escapeHtml(buildPageUrl('projects'))}" class="text-link-accent group">
              <span>${lang === 'ar' ? 'عرض جميع المشروعات (9)' : 'View All 9 Projects'}</span>
              ${icon('arrowRight', `icon-sm icon-arrow-move ${rtl ? 'icon-arrow-flip' : ''}`)}
            </a>
          </div>

          <div class="projects-grid">
            ${PROJECTS.slice(0, 3)
              .map(
                (project, idx) => `<article class="project-card interactive-card reveal group" data-variant="project" data-delay="${idx * 70}">
                  <button type="button" data-open-lb="${idx}" class="project-card-media-btn">
                    <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title[lang])}" loading="lazy" decoding="async" class="media-zoom-img" style="object-fit:cover;" />
                    <span class="badge-card-top">${escapeHtml(project.categoryLabel[lang])}</span>
                    <div class="project-card-hover-veil">
                      <span class="zoom-hint-pill">${icon('expand', 'icon-xs')}<span>${lang === 'ar' ? 'معرض الصور' : 'Lightbox'}</span></span>
                    </div>
                  </button>
                  <div class="project-card-body">
                    <div>
                      <a href="${escapeHtml(buildPageUrl('project-detail', project.slug))}">
                        <h3 class="cap-title">${escapeHtml(project.title[lang])}</h3>
                      </a>
                      <p style="font-size:0.875rem;color:var(--ink-secondary);line-height:1.55;">${escapeHtml(project.caption[lang])}</p>
                    </div>
                    <div style="margin-top:1rem;">
                      <a href="${escapeHtml(buildPageUrl('project-detail', project.slug))}" class="text-link-accent" style="font-size:0.75rem;">
                        <span>${lang === 'ar' ? 'تفاصيل المشروع' : 'Project Brief'}</span>
                        ${icon('arrowRight', `icon-xs ${rtl ? 'icon-arrow-flip' : ''}`)}
                      </a>
                    </div>
                  </div>
                </article>`
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- 5b. FIELD PHOTO STRIP -->
      <section class="section-paper">
        <div class="container">
          <div style="max-width:42rem;margin-bottom:2rem;" class="reveal">
            <div class="eyebrow"><span class="eyebrow-bar"></span><span>${escapeHtml(HOME_FIELD_STRIP.eyebrow[lang])}</span></div>
            <h2 class="h2-section text-balance">${escapeHtml(HOME_FIELD_STRIP.title[lang])}</h2>
          </div>
          <div class="projects-grid">
            ${HOME_FIELD_STRIP.numbers
              .map((n) => PROJECT_PHOTOS.find((p) => p.src.includes('project-' + n + '-')))
              .filter(Boolean)
              .map(
                (p, idx) => `<figure class="product-card reveal" data-delay="${idx * 50}" style="margin:0;overflow:hidden;">
              <div style="aspect-ratio:4/3;overflow:hidden;background-color:#1C1B19;">
                <img src="${escapeHtml(p.src)}" alt="${escapeHtml(p.caption[lang])}" width="${p.width}" height="${p.height}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block;" />
              </div>
              <figcaption style="padding:0.75rem 1rem;font-size:0.8125rem;color:var(--ink-secondary);line-height:1.5;">${escapeHtml(p.caption[lang])}</figcaption>
            </figure>`
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- 6. CLIENTS MARQUEE -->
      <section class="marquee-section">
        <div class="container" style="margin-bottom:1.25rem;text-align:center;">
          <div class="eyebrow" style="margin-bottom:0;">
            <span>${escapeHtml(UI_COPY.clientsEyebrow[lang])}</span>
          </div>
        </div>

        <div style="position:relative;overflow:hidden;">
          <div class="clients-marquee">
            ${[...CLIENTS, ...CLIENTS]
              .map((client) => `<span class="client-marquee-name">${escapeHtml(client)}</span>`)
              .join('')}
          </div>
        </div>
      </section>

      <!-- 7. BOTTOM QUOTE CTA -->
      <section class="section-inverse">
        <div class="container">
          <div class="bottom-cta-inner reveal">
            <div class="bottom-cta-copy">
              <h2 class="h2-section h2-section--inverse text-balance">${escapeHtml(UI_COPY.contactHeading[lang])}</h2>
              <p class="bottom-cta-sub">${escapeHtml(UI_COPY.contactLead[lang])}</p>
            </div>
            <a href="${escapeHtml(buildPageUrl('contact'))}" class="magnetic btn btn-lg btn-accent group" data-strength="0.18">
              <span>${escapeHtml(UI_COPY.ctaQuote[lang])}</span>
              ${icon('arrowRight', `icon-arrow icon-arrow-move ${rtl ? 'icon-arrow-flip' : ''}`)}
            </a>
          </div>
        </div>
      </section>

      ${renderStrataDivider()}
    `;

    const galleryMount = root.querySelector('#home-immersive-gallery');
    if (galleryMount) {
      galleryCtrl = mountProductSlider(galleryMount, {
        products: ALL_PRODUCTS,
        initialCategory: 'all',
        showCategoryFilter: true,
      });
    }

    // Pause any playing video when it scrolls out of view; resume it when it returns.
    if (typeof IntersectionObserver !== 'undefined') {
      const resumeSet = new WeakSet();
      videoObserver?.disconnect();
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
      watchVideos = (scope) => scope.querySelectorAll('video').forEach((v) => videoObserver.observe(v));
    }

    const companyStage = root.querySelector('#company-video-stage');
    root.querySelector('#company-video-play')?.addEventListener('click', () => {
      if (!companyStage) return;
      companyStage.innerHTML = `<video src="${escapeHtml(COMPANY_VIDEO.src)}" poster="${escapeHtml(COMPANY_VIDEO.poster)}" controls autoplay playsinline preload="metadata"></video>`;
      watchVideos(companyStage);
    });

    const stageHost = root.querySelector('#home-lockstone-stage');
    root.querySelectorAll('[data-ls-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        showcaseMode = btn.dataset.lsMode;
        root.querySelectorAll('[data-ls-mode]').forEach((b) => {
          b.classList.toggle('is-active', b.dataset.lsMode === showcaseMode);
        });
        if (stageHost) {
          stageHost.innerHTML = renderLockStonePreviewStage(showcaseMode, lockVideo, lang);
          watchVideos(stageHost);
        }
      });
    });

    root.querySelectorAll('[data-open-lb]').forEach((btn) => {
      btn.addEventListener('click', () => openLightbox(Number(btn.dataset.openLb)));
    });

    refreshAllInteractions(root);
  }

  render();
  return render;
}

function renderLockStonePreviewStage(mode, lockVideo, lang) {
  if (mode === 'video') {
    return `<video
      src="${escapeHtml(lockVideo.src)}"
      poster="${escapeHtml(lockVideo.poster)}"
      controls
      preload="metadata"
      playsinline
      class="sheet-cover-img"
      style="background-color:#141311;"
    ></video>`;
  }
  return `<img
    src="${escapeHtml(UPLOADED_PHOTOS.bandedWallWide)}"
    alt="${lang === 'ar' ? 'حائط ساند لوك ستون مزدوج الألوان' : 'Banded black and terracotta Lock Stone site wall'}"
    loading="lazy"
    decoding="async"
    class="media-zoom-img--subtle"
    style="object-fit:cover;"
  />`;
}
