import { isStudioCladdingPhoto } from './data.js';

export function escapeHtml(str) {
  return String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function renderBrandMark(variant = 'light', className = 'brand-mark') {
  const baseFill = variant === 'dark' ? '#EDE6D6' : '#1C1B19';
  const topPiece =
    variant === 'light'
      ? `<path d="M50 4 L72 34 L58 34 L58 70 L42 70 L42 34 L28 34 Z" fill="${baseFill}" />`
      : '';
  return `<svg viewBox="0 0 100 80" fill="none" class="${escapeHtml(className)}" aria-hidden="true">
    ${topPiece}
    <path d="M14 50 L38 16 L38 50 Z" fill="#3550C8" />
    <path d="M38 16 L50 4 L50 50 L38 50 Z" fill="#3550C8" />
    <path d="M50 4 L62 16 L62 50 L50 50 Z" fill="#3550C8" />
    <path d="M62 16 L86 50 L62 50 Z" fill="#3550C8" />
    <path d="M14 50 L38 50 L26 64 Z" fill="${baseFill}" />
    <path d="M38 50 L62 50 L50 64 Z" fill="${baseFill}" />
    <path d="M62 50 L86 50 L74 64 Z" fill="${baseFill}" />
  </svg>`;
}

const SVG_PATHS = {
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail:
    '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  mapPin:
    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  sun:
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowUp: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  layers:
    '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  globe:
    '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  messageCircle:
    '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  shieldCheck:
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  image:
    '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  film:
    '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>',
  expand:
    '<path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/>',
  checkCircle2:
    '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  award:
    '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
  building2:
    '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  maximize2:
    '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>',
  minimize2:
    '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/>',
  zoomIn:
    '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>',
  zoomOut:
    '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/>',
  copy:
    '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  printer:
    '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
  compass:
    '<path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/>',
};

export function icon(name, className = 'icon-sm', style = '') {
  const path = SVG_PATHS[name] || '';
  const styleAttr = style ? ` style="${style}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${escapeHtml(className)}"${styleAttr} aria-hidden="true">${path}</svg>`;
}

let swatchUidCounter = 0;

function renderMaterialTexturePattern(product, className = 'media-zoom-img') {
  swatchUidCounter += 1;
  const sheenId = `sheen-${product.sku.replace(/[^a-zA-Z0-9_-]/g, '')}-${swatchUidCounter}`;
  const c0 = product.colors[0] || '#8C857B';
  const c1 = product.colors[1] || product.colors[0] || '#5B5650';
  const c2 = product.colors[2] || product.colors[1] || '#2C2A26';
  const c3 = product.colors[3] || product.colors[0] || '#EDE6D6';
  const palette = [c0, c1, c2, c3];

  if (product.category === 'brick') {
    let bricksSvg = '';
    for (let r = 0; r < 6; r++) {
      const offset = r % 2 === 0 ? 0 : -40;
      const y = r * 40 + 3;
      for (let col = 0; col < 5; col++) {
        const fill = palette[(r + col) % 4];
        const x = col * 80 + offset + 3;
        bricksSvg += `
          <g>
            <rect x="${x}" y="${y}" width="74" height="34" rx="2" fill="${fill}" />
            <rect x="${x + 3}" y="${y + 4}" width="68" height="6" fill="rgba(255,255,255,0.12)" />
            <rect x="${x}" y="${y + 28}" width="74" height="6" fill="rgba(0,0,0,0.14)" />
          </g>`;
      }
    }
    return `<svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" class="${escapeHtml(className)}" role="img" aria-label="${escapeHtml(product.sku)} ${escapeHtml(product.name.en)} brick texture">
      <rect width="320" height="240" fill="#2C2A26" />
      ${bricksSvg}
    </svg>`;
  }

  const stoneCourses = [
    { y: 0, h: 42, splits: [0, 108, 232] },
    { y: 44, h: 36, splits: [0, 74, 196, 268] },
    { y: 82, h: 46, splits: [0, 146, 238] },
    { y: 130, h: 38, splits: [0, 90, 178, 260] },
    { y: 170, h: 34, splits: [0, 126, 224] },
    { y: 206, h: 34, splits: [0, 82, 194] },
  ];

  let stonesSvg = '';
  stoneCourses.forEach((course, rIdx) => {
    course.splits.forEach((xStart, cIdx) => {
      const xEnd = cIdx < course.splits.length - 1 ? course.splits[cIdx + 1] - 2 : 320;
      const w = Math.max(20, xEnd - xStart);
      const color = palette[(rIdx * 2 + cIdx) % 4];
      stonesSvg += `
        <g>
          <rect x="${xStart}" y="${course.y}" width="${w}" height="${course.h}" fill="${color}" />
          <polygon points="${xStart},${course.y} ${xStart + w},${course.y} ${xStart + w * 0.72},${course.y + course.h * 0.38} ${xStart + w * 0.18},${course.y + course.h * 0.25}" fill="rgba(255,255,255,0.13)" />
          <polygon points="${xStart},${course.y + course.h} ${xStart + w},${course.y + course.h} ${xStart + w * 0.85},${course.y + course.h * 0.62} ${xStart + w * 0.24},${course.y + course.h * 0.74}" fill="rgba(0,0,0,0.18)" />
          <rect x="${xStart}" y="${course.y}" width="${w}" height="${course.h}" fill="url(#${sheenId})" />
        </g>`;
    });
  });

  return `<svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" class="${escapeHtml(className)}" role="img" aria-label="${escapeHtml(product.sku)} ${escapeHtml(product.name.en)} stone cladding strata">
    <defs>
      <linearGradient id="${sheenId}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.18)" />
        <stop offset="55%" stop-color="rgba(255,255,255,0)" />
        <stop offset="100%" stop-color="rgba(0,0,0,0.22)" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="#1C1B19" />
    ${stonesSvg}
  </svg>`;
}

export function renderMaterialSwatch(product, className = '') {
  if (product.category === 'planter') {
    const imgHtml = product.image
      ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.sku)} ${escapeHtml(product.name.en)}" loading="lazy" decoding="async" class="swatch-img-planter media-zoom-img" />`
      : '';
    return `<div class="swatch-wrap swatch-wrap--planter ${escapeHtml(className)}">
      ${imgHtml}
      <div class="swatch-veil-planter"></div>
    </div>`;
  }

  if (product.image && isStudioCladdingPhoto(product.image)) {
    return `<div class="swatch-wrap ${escapeHtml(className)}">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.sku)} ${escapeHtml(product.name.en)} real cast-stone sample" loading="lazy" decoding="async" class="swatch-img-cladding media-zoom-img" />
      <div class="swatch-veil-cladding"></div>
    </div>`;
  }

  return renderMaterialTexturePattern(product, `media-zoom-img ${className}`);
}
