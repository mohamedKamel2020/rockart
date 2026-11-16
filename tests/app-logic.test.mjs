import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  ADDITIONAL_BRICK_VARIATIONS,
  ALL_PRODUCTS,
  CLIENTS,
  CLADDING_PRODUCTS,
  LOCK_STONE_FACE_PROFILES,
  LOCK_STONE_VIDEOS,
  PLANTER_PRODUCTS,
  PROJECTS,
  SHOWROOM_AND_EXPO_GALLERY,
  SITE_CONSTRUCTION_SEQUENCE,
  UPLOADED_PHOTOS,
  getProductMediaSlides,
  isStudioCladdingPhoto,
} from '../js/data.js';
import {
  buildQuoteReference,
  computeTiltValues,
  detectSwipeDirection,
  filterProducts,
  filterProjects,
  resolveInitialTheme,
  toggleShortlistSku,
  validateQuoteForm,
} from '../js/engineering.js';
import { getMaxIndex, getSlidesPerView, stepSlideIndex } from '../js/slider-logic.js';
import {
  SITE_URL,
  buildPageUrl,
  getCanonicalPath,
  getPageMeta,
  getPageStructuredData,
  parseRoute,
} from '../js/routing.js';

test('Preserved product catalog and portfolio project counts', () => {
  assert.equal(CLADDING_PRODUCTS.length, 10);
  assert.equal(PLANTER_PRODUCTS.length, 4);
  assert.equal(ALL_PRODUCTS.length, 14);
  assert.equal(PROJECTS.length, 9);
  assert.equal(ADDITIONAL_BRICK_VARIATIONS.length, 2);
  assert.equal(LOCK_STONE_VIDEOS.length, 2);
  assert.ok(CLIENTS.length >= 14);
});

test('Every image & video asset referenced in data catalog exists on disk', () => {
  const root = process.cwd();
  const assetPaths = new Set();

  ALL_PRODUCTS.forEach((p) => {
    if (p.image) assetPaths.add(p.image);
  });
  PROJECTS.forEach((proj) => {
    if (proj.image) assetPaths.add(proj.image);
    proj.gallery?.forEach((g) => assetPaths.add(g.src));
  });
  Object.values(UPLOADED_PHOTOS).forEach((v) => assetPaths.add(v));
  LOCK_STONE_VIDEOS.forEach((v) => {
    assetPaths.add(v.src);
    assetPaths.add(v.poster);
  });
  LOCK_STONE_FACE_PROFILES.forEach((i) => assetPaths.add(i.src));
  SITE_CONSTRUCTION_SEQUENCE.forEach((i) => assetPaths.add(i.src));
  SHOWROOM_AND_EXPO_GALLERY.forEach((i) => assetPaths.add(i.src));

  assetPaths.forEach((relUrl) => {
    const absPath = path.join(root, relUrl.replace(/^\//, ''));
    assert.equal(fs.existsSync(absPath), true, `Missing asset on disk: ${relUrl}`);
  });
});

test('Studio cladding photo detector & media slide generator', () => {
  assert.equal(isStudioCladdingPhoto(UPLOADED_PHOTOS.skuSP227), true);
  assert.equal(isStudioCladdingPhoto(UPLOADED_PHOTOS.bandedWallWide), false);

  const g222 = ALL_PRODUCTS.find((p) => p.sku === 'G-222');
  const slides = getProductMediaSlides(g222);
  assert.ok(slides.length >= 3);
  assert.equal(slides[0].kind, 'photo');
  assert.equal(slides[0].badge, 'G-222');
});

test('Product search & category filters, shortlist max-3 queue, and project category filters', () => {
  const stone = filterProducts(ALL_PRODUCTS, 'stone', '');
  assert.equal(stone.length, 9);
  assert.ok(stone.every((p) => p.category === 'stone'));

  const greek = filterProducts(ALL_PRODUCTS, 'all', '', 'greek');
  assert.ok(greek.length >= 2);
  assert.ok(greek.every((p) => p.styleOrigin.en.toLowerCase().includes('greek')));

  const sp227 = filterProducts(ALL_PRODUCTS, 'all', 'sp-227');
  assert.equal(sp227.length, 1);
  assert.equal(sp227[0].sku, 'SP-227');

  let list = toggleShortlistSku([], 'G-223', 3);
  list = toggleShortlistSku(list, 'SP-227', 3);
  list = toggleShortlistSku(list, 'E-209', 3);
  list = toggleShortlistSku(list, 'POT-04', 3);
  assert.deepEqual(list, ['SP-227', 'E-209', 'POT-04']);

  list = toggleShortlistSku(list, 'E-209', 3);
  assert.deepEqual(list, ['SP-227', 'POT-04']);

  const retainingProjects = filterProjects(PROJECTS, 'retaining');
  assert.ok(retainingProjects.length >= 3);
  assert.ok(retainingProjects.every((p) => p.category === 'retaining'));
});

test('Quote validation handles Arabic & English errors and valid input cleanly', () => {
  const invalid = validateQuoteForm({ name: 'A', phone: '123', email: 'bad', interest: '' }, 'en');
  assert.ok(invalid.name);
  assert.ok(invalid.phone);
  assert.ok(invalid.email);
  assert.ok(invalid.interest);

  const valid = validateQuoteForm(
    { name: 'Eng. Karim', phone: '01064611274', email: 'karim@example.com', interest: 'Lock Stone retaining wall' },
    'ar'
  );
  assert.deepEqual(valid, {});
  assert.match(buildQuoteReference(1700000123456), /^RA-\d{5}$/);
});

test('Product slider shows 4/3/2/1 cards by width and moves one card with wrap-around', () => {
  assert.equal(getSlidesPerView(1400), 4);
  assert.equal(getSlidesPerView(900), 3);
  assert.equal(getSlidesPerView(600), 2);
  assert.equal(getSlidesPerView(375), 1);

  assert.equal(getMaxIndex(14, 4), 10);
  assert.equal(stepSlideIndex(0, 1, 14, 4), 1);
  assert.equal(stepSlideIndex(10, 1, 14, 4), 0);
  assert.equal(stepSlideIndex(0, -1, 14, 4), 10);
  assert.equal(stepSlideIndex(0, 1, 3, 4), 0);
});

test('Interactive card tilt, swipe direction, initial theme, and multi-page routing work cleanly', () => {
  const tilt = computeTiltValues(1, 0, 5);
  assert.equal(tilt.rotateY, 5);
  assert.equal(tilt.rotateX, 5);

  assert.equal(detectSwipeDirection(200, 120, 100, 105), 'next');
  assert.equal(detectSwipeDirection(100, 190, 100, 105), 'prev');
  assert.equal(detectSwipeDirection(100, 110, 100, 100), null);

  assert.equal(resolveInitialTheme(null, true), 'dark');
  assert.equal(resolveInitialTheme('light', true), 'light');

  assert.equal(parseRoute('/').page, 'home');
  assert.equal(parseRoute('/index.html').page, 'home');
  assert.equal(parseRoute('/about.html').page, 'about');
  assert.equal(parseRoute('/products/SP-227').param, 'SP-227');
  assert.equal(parseRoute('/products/sp-227/').param, 'SP-227');
  assert.equal(parseRoute('/projects/multi-level-terracing/').param, 'multi-level-terracing');
  assert.equal(parseRoute('/unknown-path').page, 'not-found');

  assert.equal(buildPageUrl('product-detail', 'SP-227'), '/products/SP-227/');
  assert.equal(buildPageUrl('project-detail', 'multi-level-terracing'), '/projects/multi-level-terracing/');
  assert.ok(getPageMeta({ page: 'home', path: '/' }, 'ar').title.includes('روك آرت'));
});

test('SEO: every page has unique Arabic + English meta, canonical URLs and structured data', () => {
  const routes = [
    { page: 'home', path: '/' },
    { page: 'about', path: '/about' },
    { page: 'lock-stone', path: '/lock-stone' },
    { page: 'products', path: '/products' },
    { page: 'projects', path: '/projects' },
    { page: 'contact', path: '/contact' },
    ...ALL_PRODUCTS.map((p) => ({ page: 'product-detail', param: p.sku, path: `/products/${p.sku}` })),
    ...PROJECTS.map((p) => ({ page: 'project-detail', param: p.slug, path: `/projects/${p.slug}` })),
  ];

  for (const lang of ['ar', 'en']) {
    const titles = new Set();
    for (const route of routes) {
      const meta = getPageMeta(route, lang);
      assert.ok(meta.title && meta.description, `${route.path} (${lang}) meta`);
      assert.ok(meta.title.length <= 90, `${route.path} (${lang}) title too long`);
      titles.add(meta.title);
    }
    assert.equal(titles.size, routes.length, `${lang}: titles must be unique`);
  }

  assert.equal(getCanonicalPath({ page: 'home' }), '/');
  assert.equal(getCanonicalPath({ page: 'contact' }), '/contact.html');
  assert.equal(getCanonicalPath({ page: 'product-detail', param: 'SP-227' }), '/products/SP-227/');

  const ld = getPageStructuredData({ page: 'product-detail', param: 'SP-227', path: '/products/SP-227' }, SITE_URL, 'ar');
  const types = ld['@graph'].map((n) => n['@type']);
  assert.ok(types.includes('LocalBusiness') && types.includes('Product') && types.includes('BreadcrumbList'));
});

test('Arabic is the default language on a fresh visit', async () => {
  const { getLang } = await import('../js/language.js');
  assert.equal(getLang(), 'ar');
});
