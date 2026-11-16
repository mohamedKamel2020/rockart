/** Pure helpers for the product slider (kept DOM-free so they can be unit tested). */

export function getSlidesPerView(width) {
  if (width >= 1100) return 4;
  if (width >= 768) return 3;
  if (width >= 520) return 2;
  return 1;
}

/** Largest valid start index so the last page is always full. */
export function getMaxIndex(total, perView) {
  return Math.max(0, total - perView);
}

/** Moves by `delta` cards and wraps around at both ends. */
export function stepSlideIndex(index, delta, total, perView) {
  const max = getMaxIndex(total, perView);
  if (max === 0) return 0;
  const next = index + delta;
  if (next > max) return 0;
  if (next < 0) return max;
  return next;
}
