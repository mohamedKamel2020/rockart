export function filterProducts(products, category, searchQuery, styleFilter = 'all') {
  const q = (searchQuery || '').trim().toLowerCase();
  return products.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;

    if (styleFilter !== 'all') {
      const origin = item.styleOrigin.en.toLowerCase();
      if (styleFilter === 'greek' && !origin.includes('greek')) return false;
      if (styleFilter === 'spanish' && !origin.includes('spanish')) return false;
      if (styleFilter === 'english' && !origin.includes('english')) return false;
      if (styleFilter === 'garden' && !origin.includes('garden')) return false;
    }

    if (!q) return true;
    return (
      item.sku.toLowerCase().includes(q) ||
      item.name.en.toLowerCase().includes(q) ||
      item.name.ar.toLowerCase().includes(q) ||
      item.description.en.toLowerCase().includes(q) ||
      item.description.ar.toLowerCase().includes(q)
    );
  });
}

export function toggleShortlistSku(current, sku, maxItems = 3) {
  if (current.includes(sku)) {
    return current.filter((item) => item !== sku);
  }
  if (current.length >= maxItems) {
    return [...current.slice(1), sku];
  }
  return [...current, sku];
}

export function filterProjects(projects, category) {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
}

export function validateQuoteForm(data, lang) {
  const errors = {};
  const trimmedName = (data.name || '').trim();
  const trimmedPhone = (data.phone || '').trim();
  const trimmedEmail = (data.email || '').trim();

  if (trimmedName.length < 2) {
    errors.name =
      lang === 'ar'
        ? 'يرجى إدخال الاسم بالكامل (حرفان على الأقل).'
        : 'Please enter your full name (at least 2 characters).';
  }

  const digitsOnly = trimmedPhone.replace(/[\s\-()+]/g, '');
  if (!/^\d{8,15}$/.test(digitsOnly)) {
    errors.phone =
      lang === 'ar'
        ? 'يرجى إدخال رقم هاتف صحيح مكون من 8 إلى 15 رقماً.'
        : 'Please enter a valid phone number (8 to 15 digits).';
  }

  if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email =
      lang === 'ar'
        ? 'يرجى إدخال بريد إلكتروني صحيح.'
        : 'Please enter a valid email address.';
  }

  if (!(data.interest || '').trim()) {
    errors.interest =
      lang === 'ar'
        ? 'يرجى اختيار الخدمة المطلوبة.'
        : 'Please select a product or system of interest.';
  }

  return errors;
}

export function buildQuoteReference(seedTime = Date.now()) {
  const suffix = String(seedTime).slice(-5);
  return `RA-${suffix}`;
}

export function computeTiltValues(normX, normY, maxDeg = 5.5) {
  const clampedX = Math.min(1, Math.max(0, Number.isFinite(normX) ? normX : 0.5));
  const clampedY = Math.min(1, Math.max(0, Number.isFinite(normY) ? normY : 0.5));

  const rotateY = Math.round((clampedX - 0.5) * 2 * maxDeg * 100) / 100;
  const rotateX = Math.round((0.5 - clampedY) * 2 * maxDeg * 100) / 100;

  return {
    rotateX,
    rotateY,
    sheenX: Math.round(clampedX * 1000) / 10,
    sheenY: Math.round(clampedY * 1000) / 10,
  };
}

export function detectSwipeDirection(startX, endX, startY, endY, thresholdPx = 48) {
  const dx = endX - startX;
  const dy = endY - startY;
  if (Math.abs(dx) < thresholdPx || Math.abs(dx) <= Math.abs(dy)) {
    return null;
  }
  return dx < 0 ? 'next' : 'prev';
}

export function resolveInitialTheme(storedTheme, systemPrefersDark) {
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }
  return systemPrefersDark ? 'dark' : 'light';
}
