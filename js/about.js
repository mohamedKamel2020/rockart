import {
  ABOUT_CONTENT,
  CLIENTS,
  COMPANY_INFO,
  SHOWROOM_AND_EXPO_GALLERY,
  UI_COPY,
  UPLOADED_PHOTOS,
} from './data.js';
import { refreshAllInteractions } from './animations.js';
import { escapeHtml, icon } from './icons.js';
import { getLang } from './language.js';
import { openSheetZoomModal, renderBreadcrumbs, renderPageHeroBg, renderStrataDivider } from './navigation.js';
import { buildPageUrl } from './routing.js';

export function initAboutPage(root) {
  function render() {
    const lang = getLang();
    const certIcons = ['award', 'shieldCheck', 'building2'];

    root.innerHTML = `
      <section class="page-header-dark page-hero">
        ${renderPageHeroBg('about')}
        <div class="container page-hero-content">
          ${renderBreadcrumbs(
            [
              { label: lang === 'ar' ? 'الرئيسية' : 'Home', href: buildPageUrl('home') },
              { label: UI_COPY.navAbout[lang] },
            ],
            true
          )}
          <div class="eyebrow eyebrow--inverse reveal">
            <span class="eyebrow-bar"></span>
            <span>${escapeHtml(ABOUT_CONTENT.eyebrow[lang])}</span>
          </div>
          <h1 class="h1-page text-balance">${escapeHtml(ABOUT_CONTENT.headline[lang])}</h1>
          <p class="page-lead">${escapeHtml(COMPANY_INFO.fullName[lang])} — ${escapeHtml(COMPANY_INFO.address[lang])}</p>
        </div>
      </section>

      <!-- Who We Are -->
      <section class="section-paper about-intro">
        <div class="container">
          <div class="about-intro-grid">
            <div class="about-intro-text reveal">
              <div class="eyebrow">
                <span class="eyebrow-bar"></span>
                <span>${lang === 'ar' ? 'من نحن' : 'Who We Are'}</span>
              </div>
              <p class="about-lead">${escapeHtml(ABOUT_CONTENT.paragraphs[lang][0])}</p>
              <p class="about-body">${escapeHtml(ABOUT_CONTENT.paragraphs[lang][1])}</p>

              <dl class="about-facts">
                <div class="about-fact">
                  <dt>2018/1412</dt>
                  <dd>${lang === 'ar' ? 'براءة اختراع مصرية' : 'Egyptian patent'}</dd>
                </div>
                <div class="about-fact">
                  <dt>60-160 kN/m</dt>
                  <dd>${lang === 'ar' ? 'مقاومة شد الجيوجريد HDPE' : 'HDPE geogrid tensile strength'}</dd>
                </div>
                <div class="about-fact">
                  <dt>${ABOUT_CONTENT.capabilities.length}</dt>
                  <dd>${lang === 'ar' ? 'خطوط إنتاج' : 'Product lines'}</dd>
                </div>
                <div class="about-fact">
                  <dt>${lang === 'ar' ? 'كيلو 26' : 'Kilo 26'}</dt>
                  <dd>${lang === 'ar' ? 'مصنع أبو رواش، الجيزة' : 'Abu Rawash, Giza'}</dd>
                </div>
              </dl>

              <div class="about-intro-actions">
                <a href="${escapeHtml(buildPageUrl('lock-stone'))}" class="btn btn-md btn-accent">
                  ${lang === 'ar' ? 'نظام لوك ستون الهندسي' : 'Explore Lock Stone System'}
                </a>
                <a href="${escapeHtml(buildPageUrl('contact'))}" class="btn btn-md btn-outline">
                  ${escapeHtml(UI_COPY.ctaQuote[lang])}
                </a>
              </div>
            </div>

            <div class="about-mosaic">
              <figure class="about-mosaic-main group reveal">
                <img src="${escapeHtml(UPLOADED_PHOTOS.gardenFountainShowroom)}" alt="${lang === 'ar' ? 'معرض مصنع روك آرت بأبو رواش: حدائق وأعمال صخور صناعية' : 'Rock Art Abu Rawash showroom: gardens and artificial rockwork'}" loading="lazy" decoding="async" class="media-zoom-img--subtle" />
                <figcaption class="about-mosaic-badge">${lang === 'ar' ? 'معرض المصنع — أبو رواش' : 'Factory showroom — Abu Rawash'}</figcaption>
              </figure>
              <figure class="about-mosaic-tile group reveal" data-delay="70">
                <img src="${escapeHtml(UPLOADED_PHOTOS.courtyardSteppedPyramidFront)}" alt="${lang === 'ar' ? 'بلوك لوك ستون مرصوص بشكل هرمي بأرض المعرض' : 'Lock Stone blocks stacked in a stepped pyramid in the showroom yard'}" loading="lazy" decoding="async" class="media-zoom-img--subtle" />
              </figure>
              <figure class="about-mosaic-tile group reveal" data-delay="140">
                <img src="${escapeHtml(UPLOADED_PHOTOS.courtyardSteppedPyramidOblique)}" alt="${lang === 'ar' ? 'بلوك لوك ستون بالألوان الطبيعية بجوار التكسية' : 'Lock Stone blocks in natural tones beside cladding'}" loading="lazy" decoding="async" class="media-zoom-img--subtle" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <!-- Production Divisions -->
      <section class="section-elevated">
        <div class="container">
          <div style="max-width:36rem;margin-bottom:2.5rem;" class="reveal">
            <div class="eyebrow">
              <span class="eyebrow-bar"></span>
              <span>${lang === 'ar' ? 'خطوط الإنتاج والتصنيع' : 'Production Lines'}</span>
            </div>
            <h2 class="h2-section text-balance">
              ${lang === 'ar' ? 'أربعة خطوط إنتاج من مصنع واحد' : 'Four Product Lines from One Factory'}
            </h2>
          </div>

          <div class="cap-full-grid">
            ${ABOUT_CONTENT.capabilities
              .map(
                (cap, idx) => `<div class="cap-full-card interactive-card reveal" data-variant="spec" data-delay="${idx * 65}">
                <div class="cap-full-code">${escapeHtml(cap.code)}</div>
                <div>
                  <h3 class="cap-title" style="font-size:1.25rem;">${escapeHtml(cap.title[lang])}</h3>
                  <p style="font-size:0.875rem;color:var(--ink-secondary);line-height:1.65;">${escapeHtml(cap.description[lang])}</p>
                </div>
              </div>`
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- Certifications & Lab Standards -->
      <section class="section-paper">
        <div class="container">
          <div style="max-width:36rem;margin-bottom:2.5rem;" class="reveal">
            <div class="eyebrow">
              <span class="eyebrow-bar"></span>
              <span>${lang === 'ar' ? 'البراءة والخامات' : 'Patent & Materials'}</span>
            </div>
            <h2 class="h2-section text-balance">
              ${lang === 'ar' ? 'براءة الاختراع ومكونات المنظومة' : 'Official Patent & System Materials'}
            </h2>
          </div>

          <div class="cert-cards-grid">
            ${ABOUT_CONTENT.certifications
              .map((cert, idx) => {
                const iconName = certIcons[idx] || 'award';
                return `<div class="cert-card interactive-card reveal" data-variant="spec" data-delay="${idx * 70}">
                <div>
                  <div class="cert-card-icon">${icon(iconName, 'icon-lg')}</div>
                  <h3 class="cap-title" style="font-size:1.25rem;margin-bottom:0.25rem;">${escapeHtml(cert.title[lang])}</h3>
                  <div class="font-mono-tech" style="font-size:0.75rem;color:var(--accent-eyebrow);margin-bottom:0.625rem;">${escapeHtml(cert.subtitle[lang])}</div>
                  <p style="font-size:0.875rem;color:var(--ink-secondary);line-height:1.65;">${escapeHtml(cert.detail[lang])}</p>
                </div>
              </div>`;
              })
              .join('')}
          </div>
        </div>
      </section>

      <!-- Abu Rawash Outdoor Showroom & Expo Booth A16 -->
      <section class="section-elevated">
        <div class="container">
          <div class="showroom-header-row reveal">
            <div style="max-width:40rem;">
              <div class="eyebrow">
                <span class="eyebrow-bar"></span>
                <span>${lang === 'ar' ? 'أرض المعارض والمعرض المفتوح بالمصنع' : 'Showroom & Exhibition Booth A16'}</span>
              </div>
              <h2 class="h2-section text-balance">
                ${lang === 'ar' ? 'معرض روك آرت — عرض عملي لمنتجاتنا والفيبر جلاس' : 'Rock Art Showroom — A Hands-On Look at Our Products & Fiberglass'}
              </h2>
              <p class="section-lead">
                ${
                  lang === 'ar'
                    ? 'زيارة ميدانية مصوّرة لحديقة العرض المفتوحة بمصنع الكيلو 26 وجناح روك آرت بالمعارض لعرض أسياخ وشبكات الفيبر جلاس ولوحات العينات المحمولة.'
                    : 'Direct photographic documentation of our outdoor landscape showroom at Kilo 26 Abu Rawash alongside Exhibition Booth A16 highlighting our fiberglass rebar and sample boards.'
                }
              </p>
            </div>

          </div>

          <div class="showroom-grid">
            ${SHOWROOM_AND_EXPO_GALLERY.map((item, idx) => {
              const isBrochure = item.id.startsWith('brochure-');
              return `<button type="button" data-showroom-idx="${idx}" class="product-card interactive-card reveal group" data-variant="project" data-delay="${idx * 55}" style="text-align:start;">
                <div style="aspect-ratio:4/3;overflow:hidden;position:relative;${isBrochure ? 'background-color:#F4F3EF;' : 'background-color:#141311;'}">
                  <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title[lang])}" loading="lazy" decoding="async" class="${isBrochure ? 'brochure-sheet-img' : 'media-zoom-img'}" style="${isBrochure ? '' : 'object-fit:cover;'}" />
                </div>
                <div class="project-card-body">
                  <h3 class="cap-title" style="font-size:1rem;margin-bottom:0.375rem;">${escapeHtml(item.title[lang])}</h3>
                  <p style="font-size:0.75rem;color:var(--ink-secondary);line-height:1.55;">${escapeHtml(item.caption[lang])}</p>
                </div>
              </button>`;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- Selected Contracting Partners -->
      <section class="section-inverse">
        <div class="container">
          <div style="max-width:36rem;margin-bottom:2rem;" class="reveal">
            <div class="eyebrow eyebrow--inverse">
              <span class="eyebrow-bar"></span>
              <span>${escapeHtml(UI_COPY.clientsEyebrow[lang])}</span>
            </div>
            <h2 class="h2-section h2-section--inverse text-balance">
              ${lang === 'ar' ? 'عملاء وشركاء عملنا معهم' : 'Clients and Partners We Have Worked With'}
            </h2>
          </div>

          <div class="partners-grid">
            ${CLIENTS.map(
              (client, idx) => `<div class="partner-tile interactive-card reveal" data-variant="partner" data-delay="${idx * 30}">
                ${icon('checkCircle2', 'icon-md')}
                <span class="font-display" style="font-weight:500;color:#FBF9F4;">${escapeHtml(client)}</span>
              </div>`
            ).join('')}
          </div>
        </div>
      </section>

      ${renderStrataDivider()}
    `;


    root.querySelectorAll('[data-showroom-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = SHOWROOM_AND_EXPO_GALLERY[Number(btn.dataset.showroomIdx)];
        if (item) {
          openSheetZoomModal({
            src: item.src,
            title: item.title[lang],
            caption: item.caption[lang],
          });
        }
      });
    });

    refreshAllInteractions(root);
  }

  render();
  return render;
}
