// Renames/optimises the client's WhatsApp photos to WebP (max 1600 px long side) and crops phone watermarks.
// Run once: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { rename } from 'node:fs/promises';

const dir = 'assets/images';
const P = (t) => `WhatsApp Image 2026-11-17 at 10.59.${t}.jpeg`;
const MAP = {
  [P('07 AM (1)')]: 'terraced-turf-curved-edge',
  [P('07 AM (2)')]: 'curved-stepped-wall-a',
  [P('07 AM (3)')]: 'curved-stepped-wall-b',
  [P('07 AM (4)')]: 'stepped-wall-trees',
  [P('07 AM (5)')]: 'terraced-turf-vertical',
  [P('07 AM (6)')]: 'terraced-turf-plaza',
  [P('08 AM (1)')]: 'terraced-turf-wide',
  [P('08 AM (3)')]: 'terraced-turf-landscape',
  [P('08 AM')]: 'terraced-turf-plaza-tower',
  [P('09 AM (1)')]: 'beige-lockstone-garden',
  [P('09 AM (2)')]: 'block-two-holes-grass',
  [P('10 AM (1)')]: 'block-face-top',
};
for (const [src, name] of Object.entries(MAP)) {
  const out = `${dir}/${name}.webp`;
  const meta = await sharp(`${dir}/${src}`).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 }).toFile(out);
  console.log(name, meta.width + 'x' + meta.height);
}

// Crop the "REDMI NOTE 8 AI QUAD CAMERA" watermark (bottom-left) in place.
for (const f of ['188539360_139591008196688_6404296255395645944_n_bbbbc417.jpg', '187990650_139591094863346_8994469899080939827_n_bae1c599.jpg']) {
  const p = `${dir}/${f}`;
  const { width, height } = await sharp(p).metadata();
  const buf = await sharp(p).extract({ left: 0, top: 0, width, height: height - 130 }).jpeg({ quality: 85 }).toBuffer();
  await sharp(buf).toFile(`${p}.tmp`);
  await rename(`${p}.tmp`, p);
  console.log('cropped', f, width, height - 130);
}
