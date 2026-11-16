import { computeTiltValues } from './engineering.js';

let revealObserver = null;

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function initRevealObservers(root = document) {
  const nodes = Array.from(root.querySelectorAll('.reveal'));
  if (!nodes.length) return;

  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    nodes.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
  );

  nodes.forEach((el) => {
    const delay = el.dataset.delay;
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      el.classList.add('is-visible');
    } else {
      revealObserver.observe(el);
    }
  });
}

function initInteractiveCards(root = document) {
  if (prefersReducedMotion()) return;
  const finePointer =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!finePointer) return;

  const cards = root.querySelectorAll('.interactive-card');
  cards.forEach((card) => {
    if (card.dataset.tiltBound === '1') return;
    card.dataset.tiltBound = '1';

    const variant = card.dataset.variant || 'product';
    if (variant !== 'product' && variant !== 'project') return;

    const maxDeg = variant === 'product' ? 4.8 : 3.2;

    card.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const normX = (e.clientX - rect.left) / rect.width;
      const normY = (e.clientY - rect.top) / rect.height;
      const { rotateX, rotateY, sheenX, sheenY } = computeTiltValues(normX, normY, maxDeg);

      card.style.setProperty('--sheen-x', `${sheenX}%`);
      card.style.setProperty('--sheen-y', `${sheenY}%`);
      card.style.transform = `perspective(920px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, -4px, 0) scale(1.01)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--sheen-x', '50%');
      card.style.setProperty('--sheen-y', '50%');
      card.style.transform = '';
    });
  });
}

function initMagneticElements(root = document) {
  if (prefersReducedMotion()) return;
  const els = root.querySelectorAll('.magnetic');
  els.forEach((el) => {
    if (el.dataset.magBound === '1') return;
    el.dataset.magBound = '1';

    const strength = Number(el.dataset.strength) || 0.2;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate3d(${relX * strength}px, ${relY * strength}px, 0)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

export function refreshAllInteractions(root = document) {
  initRevealObservers(root);
  initInteractiveCards(root);
  initMagneticElements(root);
}
