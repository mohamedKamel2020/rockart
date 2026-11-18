import { PORTFOLIO_REFERENCES, PROJECTS, UI_COPY } from './data.js';
import { filterProjects } from './engineering.js';
import { escapeHtml, icon } from './icons.js';
import { getLang, isRtl, navigateWithQuotePrefill } from './language.js';
import { renderBreadcrumbs, renderPageHeroBg, renderStrataDivider } from './navigation.js';
import { refreshAllInteractions } from './animations.js';
import { buildPageUrl } from './routing.js';

function resolveProjectPhotos(project) {
  if (project.gallery && project.gallery.length > 0) return project.gallery;
  return [{ src: project.image, caption: project.caption }];
}

/**
 * Interactive multi-photo Lightbox modal with category filtering, sub-photo switcher,
 * click-to-zoom, pointer pan, Fullscreen API toggle, keyboard shortcuts, and touch swipe.
 */
export function openLightbox(initialProjectIndex = 0) {
  const existing = document.getElementById('rockart-lightbox');
  if (existing) existing.remove();

  let activeCategory = 'all';
  let filteredProjects = PROJECTS;
  let currentProject = PROJECTS[initialProjectIndex] || PROJECTS[0];
  let subPhotoIndex = 0;
  let zoomed = false;
  let pan = { x: 0, y: 0 };
  let isFullscreen = false;
  let touchStartX = null;

  const backdrop = document.createElement('div');
  backdrop.id = 'rockart-lightbox';
  backdrop.className = 'lightbox-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');

  function getCurrentFiltered() {
    if (activeCategory === 'all') return PROJECTS;
    const list = PROJECTS.filter((p) => p.category === activeCategory);
    return list.length > 0 ? list : PROJECTS;
  }

  function stepProject(delta) {
    filteredProjects = getCurrentFiltered();
    const idx = Math.max(
      0,
      filteredProjects.findIndex((p) => p.slug === currentProject.slug)
    );
    const nextIdx = (idx + delta + filteredProjects.length) % filteredProjects.length;
    currentProject = filteredProjects[nextIdx];
    subPhotoIndex = 0;
    zoomed = false;
    pan = { x: 0, y: 0 };
    renderModal();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      backdrop.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  function cleanup() {
    backdrop.remove();
    window.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('fullscreenchange', onFsChange);
  }

  function onFsChange() {
    isFullscreen = Boolean(document.fullscreenElement);
    renderModal();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') cleanup();
    else if (e.key === 'ArrowRight') stepProject(1);
    else if (e.key === 'ArrowLeft') stepProject(-1);
    else if (e.key === 'z' || e.key === 'Z') {
      zoomed = !zoomed;
      pan = { x: 0, y: 0 };
      renderModal();
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  }

  function renderModal() {
    const lang = getLang();
    const rtl = isRtl();
    filteredProjects = getCurrentFiltered();
    const safeIdx = Math.max(
      0,
      filteredProjects.findIndex((p) => p.slug === currentProject.slug)
    );
    currentProject = filteredProjects[safeIdx];
    const photos = resolveProjectPhotos(currentProject);
    const activePhoto = photos[subPhotoIndex] || photos[0];

    const categoryButtons = [
      { id: 'all', en: 'All', ar: 'الكل' },
      { id: 'retaining', en: 'Retaining Walls', ar: 'الحوائط الساندة' },
      { id: 'cladding', en: 'Cladding', ar: 'التكسية' },
      { id: 'landscape', en: 'Landscaping', ar: 'تنسيق الحدائق' },
    ];

    backdrop.innerHTML = `
      <div class="lightbox-topbar">
        <div class="filter-btn-row">
          ${categoryButtons
            .map(
              (btn) =>
                `<button type="button" data-lb-cat="${btn.id}" class="lightbox-filter-pill ${
                  activeCategory === btn.id ? 'is-active' : ''
                }">${escapeHtml(btn[lang])}</button>`
            )
            .join('')}
          ${
            photos.length > 1
              ? `<div style="display:flex;align-items:center;gap:0.25rem;background-color:rgba(28,27,25,0.8);border:1px solid rgba(251,249,244,0.15);border-radius:var(--radius-sm);padding:0.1875rem 0.5rem;">
                  <button type="button" data-sub-step="-1" aria-label="Previous photo" style="padding:0.25rem;color:rgba(251,249,244,0.8);">${icon('chevronLeft', 'icon-xs')}</button>
                  <span class="font-mono-tech" style="font-size:0.6875rem;color:#FBF9F4;padding-inline:0.25rem;">${subPhotoIndex + 1}/${photos.length}</span>
                  <button type="button" data-sub-step="1" aria-label="Next photo" style="padding:0.25rem;color:rgba(251,249,244,0.8);">${icon('chevronRight', 'icon-xs')}</button>
                </div>`
              : ''
          }
        </div>

        <div style="display:flex;align-items:center;gap:0.5rem;margin-inline-start:auto;">
          <button type="button" id="lb-zoom-btn" class="lightbox-icon-btn ${zoomed ? 'is-active' : ''}" aria-label="${zoomed ? 'Zoom Out' : 'Zoom In'}" title="Toggle Zoom (Z)">
            ${zoomed ? icon('zoomOut', 'icon-md') : icon('zoomIn', 'icon-md')}
          </button>
          <button type="button" id="lb-fs-btn" class="lightbox-icon-btn" aria-label="Toggle Fullscreen" title="Fullscreen (F)">
            ${isFullscreen ? icon('minimize2', 'icon-md') : icon('maximize2', 'icon-md')}
          </button>
          <button type="button" id="lb-close-btn" class="lightbox-icon-btn" aria-label="Close" title="Close (Esc)">
            ${icon('x', 'icon-lg')}
          </button>
        </div>
      </div>

      <div class="lightbox-stage">
        <button type="button" data-lb-step="-1" class="lightbox-nav-btn lightbox-nav-btn--prev" aria-label="Previous project">
          ${icon('chevronLeft', 'icon-lg')}
        </button>

        <div id="lb-img-box" class="lightbox-img-box ${zoomed ? 'is-zoomed' : ''}">
          <img
            id="lb-main-img"
            src="${escapeHtml(activePhoto.src)}"
            alt="${escapeHtml(currentProject.title[lang])}"
            draggable="false"
            class="lightbox-img"
            style="transform: ${
              zoomed ? `scale(1.85) translate3d(${pan.x}%, ${pan.y}%, 0)` : 'scale(1)'
            };"
          />
          <div style="position:absolute;top:0.75rem;inset-inline-start:0.75rem;display:flex;align-items:center;gap:0.5rem;pointer-events:none;">
            <span class="badge-dark-pill" style="border:1px solid rgba(251,249,244,0.15);">${safeIdx + 1} / ${filteredProjects.length}</span>
            <span class="badge-accent-pill" style="background-color:rgba(181,86,42,0.9);color:#FBF9F4;">${escapeHtml(currentProject.categoryLabel[lang])}</span>
          </div>
          ${
            !zoomed
              ? `<div class="zoom-hint-pill" style="position:absolute;bottom:0.75rem;inset-inline-end:0.75rem;pointer-events:none;">
                  ${lang === 'ar' ? 'انقر للتكبير' : 'Click to Zoom'}
                </div>`
              : ''
          }
        </div>

        <button type="button" data-lb-step="1" class="lightbox-nav-btn lightbox-nav-btn--next" aria-label="Next project">
          ${icon('chevronRight', 'icon-lg')}
        </button>
      </div>

      <div class="lightbox-footer">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;color:#FBF9F4;">
          <div>
            <div class="font-mono-tech" style="font-size:0.75rem;color:#CE6838;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.125rem;">
              ${escapeHtml(currentProject.title[lang])}
            </div>
            <p style="font-size:0.875rem;color:rgba(251,249,244,0.85);">
              ${escapeHtml(activePhoto.caption[lang])}
            </p>
          </div>

          <div style="display:flex;align-items:center;gap:1rem;">
            <span class="lightbox-shortcuts font-mono-tech" style="font-size:0.6875rem;color:rgba(237,230,214,0.5);">
              ← → · Z · F · Esc
            </span>
            <a href="${escapeHtml(buildPageUrl('project-detail', currentProject.slug))}" class="btn btn-sm btn-accent">
              <span>${lang === 'ar' ? 'فتح التفاصيل' : 'Open Brief'}</span>
              ${icon('arrowRight', `icon-sm ${rtl ? 'icon-arrow-flip' : ''}`)}
            </a>
          </div>
        </div>

        <div class="lightbox-thumbs-row">
          ${filteredProjects
            .map(
              (item) =>
                `<button type="button" data-lb-slug="${escapeHtml(item.slug)}" class="lightbox-thumb ${
                  item.slug === currentProject.slug ? 'is-selected' : ''
                }" aria-label="${escapeHtml(item.title[lang])}">
                  <img src="${escapeHtml(item.image)}" alt="" style="width:100%;height:100%;object-fit:cover;" />
                </button>`
            )
            .join('')}
        </div>
      </div>
    `;

    backdrop.querySelectorAll('[data-lb-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.lbCat;
        const nextList = getCurrentFiltered();
        currentProject = nextList[0];
        subPhotoIndex = 0;
        zoomed = false;
        renderModal();
      });
    });

    backdrop.querySelectorAll('[data-sub-step]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const photosLen = resolveProjectPhotos(currentProject).length;
        subPhotoIndex = (subPhotoIndex + Number(btn.dataset.subStep) + photosLen) % photosLen;
        zoomed = false;
        renderModal();
      });
    });

    backdrop.querySelectorAll('[data-lb-step]').forEach((btn) => {
      btn.addEventListener('click', () => stepProject(Number(btn.dataset.lbStep)));
    });

    backdrop.querySelectorAll('[data-lb-slug]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const found = filteredProjects.find((p) => p.slug === btn.dataset.lbSlug);
        if (found) {
          currentProject = found;
          subPhotoIndex = 0;
          zoomed = false;
          renderModal();
        }
      });
    });

    backdrop.querySelector('#lb-zoom-btn')?.addEventListener('click', () => {
      zoomed = !zoomed;
      pan = { x: 0, y: 0 };
      renderModal();
    });

    backdrop.querySelector('#lb-fs-btn')?.addEventListener('click', toggleFullscreen);
    backdrop.querySelector('#lb-close-btn')?.addEventListener('click', cleanup);

    const imgBox = backdrop.querySelector('#lb-img-box');
    const mainImg = backdrop.querySelector('#lb-main-img');
    if (imgBox && mainImg) {
      imgBox.addEventListener('click', () => {
        zoomed = !zoomed;
        pan = { x: 0, y: 0 };
        renderModal();
      });

      imgBox.addEventListener('mousemove', (e) => {
        if (!zoomed) return;
        const rect = imgBox.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * -32;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -32;
        pan = { x, y };
        mainImg.style.transform = `scale(1.85) translate3d(${x}%, ${y}%, 0)`;
      });
    }
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) cleanup();
  });

  backdrop.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  backdrop.addEventListener(
    'touchend',
    (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(dx) > 55) stepProject(dx < 0 ? 1 : -1);
    },
    { passive: true }
  );

  window.addEventListener('keydown', onKeyDown);
  document.addEventListener('fullscreenchange', onFsChange);
  document.body.appendChild(backdrop);
  renderModal();
}

export function initProjectsPage(root) {
  let category = 'all';

  function render() {
    const lang = getLang();
    const rtl = isRtl();
    const items = filterProjects(PROJECTS, category);

    const filterBtns = [
      { id: 'all', label: UI_COPY.filterAll[lang].replace(/\s*\(\d+\)/, ''), count: PROJECTS.length },
      {
        id: 'retaining',
        label: lang === 'ar' ? 'الحوائط الساندة' : 'Retaining Walls',
        count: PROJECTS.filter((p) => p.category === 'retaining').length,
      },
      {
        id: 'cladding',
        label: lang === 'ar' ? 'التكسية الحجرية' : 'Cladding & GRC',
        count: PROJECTS.filter((p) => p.category === 'cladding').length,
      },
      {
        id: 'landscape',
        label: lang === 'ar' ? 'تنسيق الحدائق' : 'Landscaping & Planters',
        count: PROJECTS.filter((p) => p.category === 'landscape').length,
      },
    ];

    root.innerHTML = `
      <section class="page-header-dark page-hero">
        ${renderPageHeroBg('projects')}
        <div class="container page-hero-content">
          ${renderBreadcrumbs(
            [
              { label: lang === 'ar' ? 'الرئيسية' : 'Home', href: buildPageUrl('home') },
              { label: UI_COPY.navProjects[lang] },
            ],
            true
          )}
          <div class="eyebrow eyebrow--inverse reveal">
            <span class="eyebrow-bar"></span>
            <span>${lang === 'ar' ? 'سجل الأعمال والتنفيذ' : 'Project Portfolio'}</span>
          </div>
          <h1 class="h1-page text-balance">${escapeHtml(UI_COPY.projectsHeading[lang])}</h1>
          <p class="page-lead">${
            lang === 'ar'
              ? 'مشروعات حوائط ساندة مدرجة، واجهات تكسية حجرية من الجي آر سي، وأعمال تنسيق حدائق وأصص منفذة مع كبرى شركات المقاولات في مصر.'
              : 'Completed Lock Stone terraced retaining walls, GRC facade cladding installations, and cast-stone landscape works across Egypt.'
          }</p>
        </div>
      </section>

      <section class="section-paper">
        <div class="container">
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;padding-bottom:1.5rem;margin-bottom:2rem;border-bottom:1px solid var(--border-subtle);">
            <div class="filter-btn-row" role="group" aria-label="Filter projects">
              ${filterBtns
                .map(
                  (btn) =>
                    `<button type="button" data-proj-cat="${btn.id}" class="filter-pill-btn ${
                      category === btn.id ? 'is-active' : ''
                    }">${escapeHtml(btn.label)} (${btn.count})</button>`
                )
                .join('')}
            </div>

            <button type="button" id="open-full-lightbox-btn" class="text-link-accent font-mono-tech" style="font-size:0.75rem;">
              ${icon('expand', 'icon-sm')}
              <span>${lang === 'ar' ? 'عرض الشاشة الكاملة' : 'Open Lightbox Viewer'}</span>
            </button>
          </div>

          <div class="projects-grid">
            ${items
              .map((project, idx) => {
                const origIdx = PROJECTS.findIndex((p) => p.slug === project.slug);
                const photoCount = resolveProjectPhotos(project).length;
                return `<article class="project-card interactive-card reveal group" data-variant="project" data-delay="${idx * 50}">
                  <button type="button" data-open-lb="${origIdx}" class="project-card-media-btn">
                    <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title[lang])}" loading="lazy" decoding="async" class="media-zoom-img" style="object-fit:cover;" />
                    <span class="badge-card-top">${escapeHtml(project.categoryLabel[lang])}</span>
                    ${
                      photoCount > 1
                        ? `<span class="badge-card-top-end">${icon('image', 'icon-xs')}<span>${photoCount}</span></span>`
                        : ''
                    }
                    <div class="project-card-hover-veil">
                      <span class="zoom-hint-pill">${icon('expand', 'icon-xs')}<span>${lang === 'ar' ? 'عرض مكبر' : 'Expand'}</span></span>
                    </div>
                  </button>

                  <div class="project-card-body">
                    <div>
                      <a href="${escapeHtml(buildPageUrl('project-detail', project.slug))}">
                        <h2 class="cap-title" style="font-size:1.25rem;margin-bottom:0.375rem;">${escapeHtml(project.title[lang])}</h2>
                      </a>
                      <p style="font-size:0.875rem;color:var(--ink-secondary);line-height:1.6;">${escapeHtml(project.summary[lang])}</p>
                    </div>

                    <div style="margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--border-subtle);display:flex;align-items:center;justify-content:space-between;">
                      <span class="font-mono-tech" style="font-size:0.75rem;color:var(--ink-secondary);">
                        ${escapeHtml(project.specs[0] || '')}
                      </span>
                      <a href="${escapeHtml(buildPageUrl('project-detail', project.slug))}" class="text-link-accent" style="font-size:0.8125rem;">
                        <span>${lang === 'ar' ? 'التفاصيل' : 'Case Brief'}</span>
                        ${icon('arrowRight', `icon-sm ${rtl ? 'icon-arrow-flip' : ''}`)}
                      </a>
                    </div>
                  </div>
                </article>`;
              })
              .join('')}
          </div>
        </div>
      </section>

      <section class="section-paper">
        <div class="container">
          <div style="max-width:42rem;margin-bottom:2rem;" class="reveal">
            <div class="eyebrow"><span class="eyebrow-bar"></span><span>${escapeHtml(PORTFOLIO_REFERENCES.eyebrow[lang])}</span></div>
            <h2 class="h2-section text-balance">${escapeHtml(PORTFOLIO_REFERENCES.title[lang])}</h2>
          </div>
          <ul class="reveal" style="columns:2 18rem;column-gap:2rem;margin:0;padding-inline-start:1.25rem;line-height:1.9;color:var(--ink-primary);">
            ${PORTFOLIO_REFERENCES.items.map((it) => `<li>${escapeHtml(it[lang])}</li>`).join('')}
          </ul>
        </div>
      </section>

      ${renderStrataDivider()}
    `;

    root.querySelectorAll('[data-proj-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        category = btn.dataset.projCat;
        render();
      });
    });

    root.querySelector('#open-full-lightbox-btn')?.addEventListener('click', () => openLightbox(0));

    root.querySelectorAll('[data-open-lb]').forEach((btn) => {
      btn.addEventListener('click', () => openLightbox(Number(btn.dataset.openLb)));
    });

    refreshAllInteractions(root);
  }

  render();
  return render;
}

export function initProjectDetailPage(root, slugParam) {
  const project = PROJECTS.find((p) => p.slug === slugParam) || PROJECTS[0];
  let activePhotoIdx = 0;

  function render() {
    const lang = getLang();
    const rtl = isRtl();
    const photos = resolveProjectPhotos(project);
    const activePhoto = photos[activePhotoIdx] || photos[0];
    const originIdx = PROJECTS.findIndex((p) => p.slug === project.slug);
    const related = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

    root.innerHTML = `
      <section class="section-header-light">
        <div class="container">
          ${renderBreadcrumbs([
            { label: lang === 'ar' ? 'الرئيسية' : 'Home', href: buildPageUrl('home') },
            { label: UI_COPY.navProjects[lang], href: buildPageUrl('projects') },
            { label: project.title[lang] },
          ])}

          <div class="project-detail-layout">
            <div>
              <div style="border-radius:var(--radius-sm);overflow:hidden;border:1px solid var(--border-subtle);background-color:#141311;position:relative;aspect-ratio:16/10;" class="group">
                <button type="button" id="proj-detail-main-lb" style="width:100%;height:100%;display:block;position:relative;" aria-label="${escapeHtml(project.title[lang])}">
                  <img src="${escapeHtml(activePhoto.src)}" alt="${escapeHtml(project.title[lang])}" class="media-zoom-img--subtle" style="object-fit:cover;" />
                  <span class="zoom-hint-pill" style="position:absolute;bottom:0.75rem;inset-inline-end:0.75rem;">
                    ${icon('expand', 'icon-xs')}
                    <span>${lang === 'ar' ? 'تكبير الصورة' : 'Zoom Photo'}</span>
                  </span>
                  ${
                    photos.length > 1
                      ? `<span class="badge-card-top">${activePhotoIdx + 1} / ${photos.length}</span>`
                      : ''
                  }
                </button>
              </div>

              ${
                photos.length > 1
                  ? `<div style="margin-top:0.75rem;display:flex;flex-direction:column;gap:0.5rem;">
                      <p class="font-mono-tech" style="font-size:0.75rem;color:var(--ink-secondary);background-color:var(--surface-paper);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:0.5rem 0.75rem;">
                        ${escapeHtml(activePhoto.caption[lang])}
                      </p>
                      <div class="project-thumbs">
                        ${photos
                          .map(
                            (ph, idx) => `<button type="button" data-ph-idx="${idx}" class="project-thumb-btn ${
                              idx === activePhotoIdx ? 'is-active' : ''
                            }" aria-label="${escapeHtml(ph.caption[lang])}">
                              <img src="${escapeHtml(ph.src)}" alt="" style="width:100%;height:100%;object-fit:cover;" />
                            </button>`
                          )
                          .join('')}
                      </div>
                    </div>`
                  : ''
              }
            </div>

            <div style="background-color:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:2rem;">
              <div class="eyebrow">
                <span class="eyebrow-bar" style="width:1.25rem;"></span>
                <span>${escapeHtml(project.categoryLabel[lang])}</span>
              </div>
              <h1 class="h2-section" style="font-size:2rem;margin-bottom:0.75rem;">${escapeHtml(project.title[lang])}</h1>
              <p style="font-size:1rem;color:var(--ink-secondary);line-height:1.65;margin-bottom:1.5rem;">${escapeHtml(project.summary[lang])}</p>

              <div style="border-block:1px solid var(--border-subtle);padding-block:1rem;margin-bottom:1.5rem;display:flex;flex-direction:column;gap:0.75rem;">
                <div>
                  <div class="font-mono-tech" style="font-size:0.75rem;color:var(--ink-muted);text-transform:uppercase;margin-bottom:0.25rem;">
                    ${lang === 'ar' ? 'نطاق العمل' : 'Scope of Supply & Execution'}
                  </div>
                  <div style="font-size:0.875rem;color:var(--ink-primary);font-weight:500;">${escapeHtml(project.scope[lang])}</div>
                </div>

                <div>
                  <div class="font-mono-tech" style="font-size:0.75rem;color:var(--ink-muted);text-transform:uppercase;margin-bottom:0.5rem;">
                    ${lang === 'ar' ? 'المواصفات الفنية للمشروع' : 'Technical Keynotes'}
                  </div>
                  <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
                    ${project.specs
                      .map(
                        (s) =>
                          `<span style="background-color:var(--surface-elevated);border:1px solid var(--border-subtle);font-family:var(--f-mono);font-size:0.75rem;padding:0.25rem 0.625rem;border-radius:var(--radius-xs);">${escapeHtml(s)}</span>`
                      )
                      .join('')}
                  </div>
                </div>
              </div>

              <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem;">
                <button type="button" id="proj-request-similar-btn" class="btn btn-md btn-accent">
                  ${lang === 'ar' ? 'اطلب تنفيذ مشروع مماثل' : 'Request Similar Scope'}
                </button>
                <a href="${escapeHtml(buildPageUrl('projects'))}" class="btn btn-md btn-outline">
                  ${lang === 'ar' ? 'كافة المشروعات' : 'All Projects'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-paper">
        <div class="container">
          <h2 class="h2-section" style="font-size:1.5rem;margin-bottom:1.5rem;">
            ${lang === 'ar' ? 'مشروعات أخرى منفذة' : 'More Completed Projects'}
          </h2>
          <div class="projects-grid">
            ${related
              .map(
                (item, idx) => `<a href="${escapeHtml(buildPageUrl('project-detail', item.slug))}" class="project-card interactive-card reveal group" data-variant="project" data-delay="${idx * 60}">
                  <div style="aspect-ratio:16/10;overflow:hidden;background-color:#1C1B19;">
                    <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title[lang])}" loading="lazy" class="media-zoom-img" style="object-fit:cover;" />
                  </div>
                  <div style="padding:1.25rem;">
                    <div class="font-mono-tech" style="font-size:0.75rem;color:var(--accent-eyebrow);margin-bottom:0.25rem;">${escapeHtml(item.categoryLabel[lang])}</div>
                    <div class="font-display" style="font-weight:600;font-size:1.125rem;color:var(--ink-primary);display:flex;align-items:center;justify-content:space-between;">
                      <span>${escapeHtml(item.title[lang])}</span>
                      ${icon('arrowRight', `icon-sm ${rtl ? 'icon-arrow-flip' : ''}`)}
                    </div>
                  </div>
                </a>`
              )
              .join('')}
          </div>
        </div>
      </section>

      ${renderStrataDivider()}
    `;

    root.querySelector('#proj-detail-main-lb')?.addEventListener('click', () => {
      openLightbox(originIdx >= 0 ? originIdx : 0);
    });

    root.querySelectorAll('[data-ph-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activePhotoIdx = Number(btn.dataset.phIdx);
        render();
      });
    });

    root.querySelector('#proj-request-similar-btn')?.addEventListener('click', () => {
      navigateWithQuotePrefill({
        interest:
          project.category === 'retaining'
            ? 'Lock Stone retaining wall'
            : project.category === 'cladding'
            ? 'GRC decorative cladding'
            : 'Planters & garden range',
        notes: `${lang === 'ar' ? 'استفسار عن مشروع مشابه لـ' : 'Inquiry regarding project scope similar to'}: ${project.title[lang]}`,
      });
    });

    refreshAllInteractions(root);
  }

  render();
  return render;
}
