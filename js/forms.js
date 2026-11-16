import { COMPANY_INFO, QUOTE_INTERESTS, REGION_OPTIONS, UI_COPY } from './data.js';
import { buildQuoteReference, validateQuoteForm } from './engineering.js';
import { refreshAllInteractions } from './animations.js';
import { escapeHtml, icon } from './icons.js';
import {
  clearQuotePrefill,
  getLang,
  getQuotePrefill,
  isRtl,
} from './language.js';
import { renderBreadcrumbs, renderPageHeroBg, renderStrataDivider } from './navigation.js';
import { buildPageUrl } from './routing.js';

const QUOTES_STORAGE_KEY = 'rockart-quotes';
const QUOTE_ENDPOINT = '/send-quote.php';

function buildSummaryText(sub, lang) {
  const interestObj = QUOTE_INTERESTS.find((q) => q.value === sub.interest);
  const regionObj = REGION_OPTIONS.find((r) => r.value === sub.region);
  return [
    `Reference: ${sub.reference}`,
    `Name: ${sub.name}`,
    `Phone: ${sub.phone}`,
    sub.email ? `Email: ${sub.email}` : '',
    `Interest: ${interestObj ? interestObj.label[lang] : sub.interest}`,
    `Region: ${regionObj ? regionObj.label[lang] : sub.region}`,
    sub.notes ? `Notes: ${sub.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

async function postQuote(submission, lang, startedAt, honeypot) {
  const body = new FormData();
  Object.entries({ ...submission, lang, started: String(startedAt), website: honeypot }).forEach(([k, v]) =>
    body.append(k, v ?? '')
  );
  const res = await fetch(QUOTE_ENDPOINT, { method: 'POST', body, headers: { Accept: 'application/json' } });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.ok) throw new Error(json?.error || `HTTP ${res.status}`);
}

function readSavedQuotes() {
  try {
    const raw = window.localStorage.getItem(QUOTES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveQuoteSubmission(submission) {
  try {
    const prev = readSavedQuotes();
    const updated = [submission, ...prev].slice(0, 5);
    window.localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
}

export function initContactPage(root) {
  const sessionPrefill = getQuotePrefill();
  const params = new URLSearchParams(window.location.search || '');
  const paramInterest = params.get('interest');
  const paramNotes = params.get('notes');

  let name = '';
  let phone = '';
  let email = '';
  let interest =
    sessionPrefill?.interest || paramInterest || QUOTE_INTERESTS[0].value;
  let region = REGION_OPTIONS[0].value;
  let notes = sessionPrefill?.notes || paramNotes || '';

  if (sessionPrefill) {
    clearQuotePrefill();
  }

  let errors = {};
  let confirmedSubmission = null;
  let copied = false;
  let sending = false;
  let submitFailed = false;
  let honeypot = '';
  const startedAt = Date.now();

  function renderFormOrConfirmation(lang, rtl) {
    if (confirmedSubmission) {
      const interestObj = QUOTE_INTERESTS.find((q) => q.value === confirmedSubmission.interest);
      const regionObj = REGION_OPTIONS.find((r) => r.value === confirmedSubmission.region);
      const waUrl = `${COMPANY_INFO.phones[0].wa}?text=${encodeURIComponent(buildSummaryText(confirmedSubmission, lang))}`;

      return `<div class="confirmation-card">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;">
          <div style="display:flex;align-items:center;gap:0.75rem;">
            ${icon('checkCircle2', 'icon-xl', 'color:var(--accent);flex-shrink:0;')}
            <div>
              <h2 class="h2-section h2-section--inverse" style="font-size:1.5rem;margin-bottom:0;">
                ${lang === 'ar' ? 'تم إرسال طلب عرض السعر بنجاح' : 'Quote Request Sent'}
              </h2>
              <div class="font-mono-tech" style="font-size:0.75rem;color:var(--accent);margin-top:0.25rem;">
                REF ${escapeHtml(confirmedSubmission.reference)}
              </div>
            </div>
          </div>
          <span class="font-mono-tech" style="font-size:0.75rem;background-color:rgba(251,249,244,0.1);padding:0.25rem 0.625rem;border-radius:var(--radius-xs);color:#FBF9F4;">
            ${escapeHtml(confirmedSubmission.submittedAt)}
          </span>
        </div>

        <p style="font-size:0.875rem;color:rgba(251,249,244,0.8);line-height:1.6;">
          ${
            lang === 'ar'
              ? 'وصلنا طلبك وسيتواصل معك فريق المبيعات في أقرب وقت. للمتابعة الفورية يمكنك أيضاً إرسال ملخص الطلب على واتساب.'
              : 'We received your request and our sales team will contact you shortly. For an immediate reply you can also send the summary on WhatsApp.'
          }
        </p>

        <div class="confirmation-summary">
          <div style="display:flex;justify-content:space-between;gap:1rem;">
            <span style="color:rgba(237,230,214,0.6);">${lang === 'ar' ? 'الاسم:' : 'Name:'}</span>
            <span style="color:#FBF9F4;font-weight:500;">${escapeHtml(confirmedSubmission.name)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem;">
            <span style="color:rgba(237,230,214,0.6);">${lang === 'ar' ? 'الهاتف:' : 'Phone:'}</span>
            <span class="font-mono-tech" dir="ltr" style="color:#FBF9F4;">${escapeHtml(confirmedSubmission.phone)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem;">
            <span style="color:rgba(237,230,214,0.6);">${lang === 'ar' ? 'القسم:' : 'Scope:'}</span>
            <span style="color:#FBF9F4;">${escapeHtml(interestObj ? interestObj.label[lang] : confirmedSubmission.interest)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem;">
            <span style="color:rgba(237,230,214,0.6);">${lang === 'ar' ? 'المنطقة:' : 'Region:'}</span>
            <span style="color:#FBF9F4;">${escapeHtml(regionObj ? regionObj.label[lang] : confirmedSubmission.region)}</span>
          </div>
          ${
            confirmedSubmission.notes
              ? `<div style="padding-top:0.625rem;border-top:1px solid rgba(251,249,244,0.1);">
                  <div style="font-size:0.75rem;color:rgba(237,230,214,0.6);margin-bottom:0.25rem;">${lang === 'ar' ? 'ملاحظات المشروع:' : 'Project Brief:'}</div>
                  <div style="color:rgba(251,249,244,0.9);font-size:0.8125rem;line-height:1.55;">${escapeHtml(confirmedSubmission.notes)}</div>
                </div>`
              : ''
          }
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
          <a href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-md" style="background-color:#25D366;color:#FFFFFF;">
            ${icon('messageCircle', 'icon-md')}
            <span>${lang === 'ar' ? 'إرسال الطلب عبر واتساب' : 'Send via WhatsApp'}</span>
          </a>

          <button type="button" id="copy-quote-btn" class="btn btn-md btn-outline-inverse">
            ${copied ? icon('check', 'icon-md') : icon('copy', 'icon-md')}
            <span>${copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : lang === 'ar' ? 'نسخ الملخص' : 'Copy Summary'}</span>
          </button>

          <button type="button" id="print-quote-btn" class="btn btn-md btn-outline-inverse">
            ${icon('printer', 'icon-md')}
            <span>${lang === 'ar' ? 'طباعة' : 'Print Brief'}</span>
          </button>
        </div>

        <button type="button" id="reset-quote-btn" class="text-link-accent" style="align-self:flex-start;font-size:0.8125rem;text-decoration:underline;">
          ${lang === 'ar' ? 'إعداد طلب عرض سعر آخر' : 'Submit Another Request'}
        </button>
      </div>`;
    }

    return `<form id="rockart-quote-form" novalidate class="quote-form">
      <div class="form-row-2">
        <div>
          <label for="f-name" class="form-label">${escapeHtml(UI_COPY.formName[lang])} *</label>
          <input
            id="f-name"
            name="name"
            type="text"
            autocomplete="name"
            maxlength="120"
            value="${escapeHtml(name)}"
            placeholder="${lang === 'ar' ? 'م. أحمد علي / الشركة' : 'Eng. Ahmed Ali / Company'}"
            aria-invalid="${Boolean(errors.name)}"
            class="form-input"
          />
          ${errors.name ? `<p class="field-error" role="alert">${escapeHtml(errors.name)}</p>` : ''}
        </div>

        <div>
          <label for="f-phone" class="form-label">${escapeHtml(UI_COPY.formPhone[lang])} *</label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            maxlength="30"
            dir="ltr"
            value="${escapeHtml(phone)}"
            placeholder="010XXXXXXXX"
            aria-invalid="${Boolean(errors.phone)}"
            class="form-input"
          />
          ${errors.phone ? `<p class="field-error" role="alert">${escapeHtml(errors.phone)}</p>` : ''}
        </div>
      </div>

      <div class="form-row-2">
        <div>
          <label for="f-email" class="form-label">${escapeHtml(UI_COPY.formEmail[lang])}</label>
          <input
            id="f-email"
            name="email"
            type="email"
            autocomplete="email"
            maxlength="120"
            dir="ltr"
            value="${escapeHtml(email)}"
            placeholder="name@company.com"
            aria-invalid="${Boolean(errors.email)}"
            class="form-input"
          />
          ${errors.email ? `<p class="field-error" role="alert">${escapeHtml(errors.email)}</p>` : ''}
        </div>

        <div>
          <label for="f-region" class="form-label">${lang === 'ar' ? 'موقع المشروع' : 'Project Location'}</label>
          <select id="f-region" name="region" class="form-select">
            ${REGION_OPTIONS.map(
              (r) =>
                `<option value="${escapeHtml(r.value)}" ${region === r.value ? 'selected' : ''}>${escapeHtml(r.label[lang])}</option>`
            ).join('')}
          </select>
        </div>
      </div>

      <div>
        <label for="f-interest" class="form-label">${escapeHtml(UI_COPY.formInterest[lang])} *</label>
        <select id="f-interest" name="interest" aria-invalid="${Boolean(errors.interest)}" class="form-select">
          ${QUOTE_INTERESTS.map(
            (q) =>
              `<option value="${escapeHtml(q.value)}" ${interest === q.value ? 'selected' : ''}>${escapeHtml(q.label[lang])}</option>`
          ).join('')}
        </select>
        ${errors.interest ? `<p class="field-error" role="alert">${escapeHtml(errors.interest)}</p>` : ''}
      </div>

      <div>
        <label for="f-notes" class="form-label">${escapeHtml(UI_COPY.formNotes[lang])}</label>
        <textarea
          id="f-notes"
          name="notes"
          rows="4"
          maxlength="2000"
          placeholder="${
            lang === 'ar'
              ? 'الارتفاع والطول التقريبي، أو كود التكسية الحجرية المطلوبة، وموعد التوريد المتوقع...'
              : 'Estimated wall dimensions, cladding SKUs, and target delivery schedule...'
          }"
          class="form-textarea"
        >${escapeHtml(notes)}</textarea>
      </div>

      <div aria-hidden="true" style="position:absolute;inset-inline-start:-9999px;width:1px;height:1px;overflow:hidden;">
        <label for="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off" value="${escapeHtml(honeypot)}" />
      </div>

      ${
        submitFailed
          ? `<p class="field-error" role="alert" style="font-size:0.875rem;">${
              lang === 'ar'
                ? 'تعذر إرسال الطلب الآن. حاول مرة أخرى أو تواصل معنا مباشرة على الهاتف أو الواتساب.'
                : 'We could not send your request right now. Please try again or contact us directly by phone or WhatsApp.'
            }</p>`
          : ''
      }

      <button type="submit" class="btn btn-lg btn-accent" style="width:100%;" ${sending ? 'disabled aria-busy="true"' : ''}>
        <span>${escapeHtml(sending ? (lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...') : UI_COPY.formSubmit[lang])}</span>
        ${icon('arrowRight', `icon-md ${rtl ? 'icon-arrow-flip' : ''}`)}
      </button>
    </form>`;
  }

  function render() {
    const lang = getLang();
    const rtl = isRtl();
    const savedQuotes = readSavedQuotes();

    root.innerHTML = `
      <section class="page-header-dark page-hero" style="border-bottom:1px solid var(--border-inverse);">
        ${renderPageHeroBg('contact')}
        <div class="container page-hero-content">
          ${renderBreadcrumbs(
            [
              { label: lang === 'ar' ? 'الرئيسية' : 'Home', href: buildPageUrl('home') },
              { label: UI_COPY.navContact[lang] },
            ],
            true
          )}

          <div class="eyebrow eyebrow--inverse reveal">
            <span class="eyebrow-bar"></span>
            <span>${escapeHtml(UI_COPY.contactEyebrow[lang])}</span>
          </div>
          <h1 class="h1-page text-balance">${escapeHtml(UI_COPY.contactHeading[lang])}</h1>
          <p class="page-lead">${escapeHtml(UI_COPY.contactLead[lang])}</p>
        </div>
      </section>

      <section class="section-inverse">
        <div class="container">
          <div class="contact-grid">
            <div style="display:flex;flex-direction:column;gap:2rem;">
              <div>
                <h2 class="h2-section h2-section--inverse" style="font-size:1.5rem;margin-bottom:1rem;">
                  ${lang === 'ar' ? 'قنوات التواصل المباشر' : 'Direct Engineering Channels'}
                </h2>

                <div class="channel-list">
                  <div class="channel-item">
                    ${icon('phone', 'icon-lg', 'color:var(--accent);margin-top:0.25rem;')}
                    <div>
                      <div class="font-mono-tech" style="font-size:0.75rem;color:rgba(237,230,214,0.6);text-transform:uppercase;">
                        ${lang === 'ar' ? 'الهاتف والواتساب' : 'Phone & WhatsApp'}
                      </div>
                      <div style="display:flex;flex-wrap:wrap;gap:1rem;margin-top:0.25rem;font-family:var(--f-mono);font-size:1rem;" dir="ltr">
                        <a href="${escapeHtml(COMPANY_INFO.phones[0].href)}" style="color:#FBF9F4;">01064611274</a>
                        <span style="opacity:0.35;">/</span>
                        <a href="${escapeHtml(COMPANY_INFO.phones[1].href)}" style="color:#FBF9F4;">01153936569</a>
                      </div>
                    </div>
                  </div>

                  <div class="channel-item">
                    ${icon('mail', 'icon-lg', 'color:var(--accent);margin-top:0.25rem;')}
                    <div>
                      <div class="font-mono-tech" style="font-size:0.75rem;color:rgba(237,230,214,0.6);text-transform:uppercase;">
                        ${lang === 'ar' ? 'البريد الإلكتروني الرسمي' : 'Official Email'}
                      </div>
                      <a href="mailto:${escapeHtml(COMPANY_INFO.email)}" class="font-mono-tech" style="display:inline-block;margin-top:0.25rem;font-size:1rem;color:#FBF9F4;">
                        ${escapeHtml(COMPANY_INFO.email)}
                      </a>
                    </div>
                  </div>

                  <div class="channel-item">
                    ${icon('mapPin', 'icon-lg', 'color:var(--accent);margin-top:0.25rem;')}
                    <div>
                      <div class="font-mono-tech" style="font-size:0.75rem;color:rgba(237,230,214,0.6);text-transform:uppercase;">
                        ${lang === 'ar' ? 'عنوان المصنع والمعرض' : 'Factory & Showroom'}
                      </div>
                      <div style="font-size:0.875rem;color:#FBF9F4;margin-top:0.25rem;line-height:1.6;">
                        ${escapeHtml(COMPANY_INFO.address[lang])}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style="background-color:var(--surface-inverse-soft);border:1px solid var(--border-inverse);border-radius:var(--radius-sm);padding:1.25rem;font-size:0.8125rem;color:rgba(237,230,214,0.8);line-height:1.6;">
                <div class="font-mono-tech" style="font-size:0.75rem;color:var(--accent);text-transform:uppercase;margin-bottom:0.375rem;">
                  ${lang === 'ar' ? 'مواعيد العمل والاستشارات' : 'Operating Hours & Site Visits'}
                </div>
                ${
                  lang === 'ar'
                    ? 'السبت إلى الخميس: 9:00 صباحاً – 5:00 مساءً. يمكن حجز موعد مسبق لزيارة المعرض بالكيلو 26 أو طلب زيارة معاينة لموقع المشروع.'
                    : 'Saturday to Thursday: 9:00 AM – 5:00 PM. Appointments available for factory sample reviews at Abu Rawash Kilo 26 or project site inspections.'
                }
              </div>

              ${
                savedQuotes.length > 0
                  ? `<div>
                      <div class="font-mono-tech" style="font-size:0.75rem;color:rgba(237,230,214,0.6);text-transform:uppercase;margin-bottom:0.5rem;">
                        ${lang === 'ar' ? 'آخر الطلبات المسجلة على هذا المتصفح' : 'Recent Saved Quote Inquiries'}
                      </div>
                      <div style="display:flex;flex-direction:column;gap:0.5rem;">
                        ${savedQuotes
                          .slice(0, 3)
                          .map(
                            (sq) => `<div class="recent-quote-item">
                              <div>
                                <span class="font-mono-tech" style="color:var(--accent);font-weight:600;">${escapeHtml(sq.reference)}</span>
                                <span style="margin-inline-start:0.5rem;color:#FBF9F4;">${escapeHtml(sq.interest)}</span>
                              </div>
                              <span style="color:rgba(237,230,214,0.6);">${escapeHtml(sq.submittedAt)}</span>
                            </div>`
                          )
                          .join('')}
                      </div>
                    </div>`
                  : ''
              }
            </div>

            <div>${renderFormOrConfirmation(lang, rtl)}</div>
          </div>
        </div>
      </section>

      ${renderStrataDivider()}
    `;

    // Bind Form or Confirmation Events
    const formEl = root.querySelector('#rockart-quote-form');
    if (formEl) {
      formEl.querySelector('#f-name')?.addEventListener('input', (e) => {
        name = e.target.value;
        if (errors.name) delete errors.name;
      });
      formEl.querySelector('#f-phone')?.addEventListener('input', (e) => {
        phone = e.target.value;
        if (errors.phone) delete errors.phone;
      });
      formEl.querySelector('#f-email')?.addEventListener('input', (e) => {
        email = e.target.value;
        if (errors.email) delete errors.email;
      });
      formEl.querySelector('#f-region')?.addEventListener('change', (e) => {
        region = e.target.value;
      });
      formEl.querySelector('#f-interest')?.addEventListener('change', (e) => {
        interest = e.target.value;
        if (errors.interest) delete errors.interest;
      });
      formEl.querySelector('#f-notes')?.addEventListener('input', (e) => {
        notes = e.target.value;
      });

      formEl.querySelector('#f-website')?.addEventListener('input', (e) => {
        honeypot = e.target.value;
      });

      formEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (sending) return;
        const foundErrors = validateQuoteForm({ name, phone, email, interest }, lang);
        if (Object.keys(foundErrors).length > 0) {
          errors = foundErrors;
          render();
          return;
        }
        errors = {};
        submitFailed = false;
        const now = Date.now();
        const submission = {
          reference: buildQuoteReference(now),
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          interest,
          region,
          notes: notes.trim(),
          submittedAt: new Date(now).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB'),
        };

        sending = true;
        render();
        try {
          await postQuote(submission, lang, startedAt, honeypot);
          confirmedSubmission = submission;
          saveQuoteSubmission(submission);
        } catch {
          submitFailed = true;
        }
        sending = false;
        render();
      });
    }

    root.querySelector('#copy-quote-btn')?.addEventListener('click', () => {
      if (!confirmedSubmission) return;
      navigator.clipboard?.writeText(buildSummaryText(confirmedSubmission, lang)).catch(() => {});
      copied = true;
      render();
      setTimeout(() => {
        copied = false;
        render();
      }, 2500);
    });

    root.querySelector('#print-quote-btn')?.addEventListener('click', () => window.print());

    root.querySelector('#reset-quote-btn')?.addEventListener('click', () => {
      confirmedSubmission = null;
      name = '';
      phone = '';
      email = '';
      notes = '';
      errors = {};
      render();
    });

    refreshAllInteractions(root);
  }

  render();
  return render;
}
