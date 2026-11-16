import { resolveInitialTheme } from './engineering.js';

const THEME_STORAGE_KEY = 'rockart-theme';
const listeners = new Set();

function readInitialTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return resolveInitialTheme(stored, prefersDark);
  } catch {
    return 'light';
  }
}

let currentTheme = readInitialTheme();

export function getTheme() {
  return currentTheme;
}

export function applyTheme(theme = currentTheme) {
  currentTheme = theme === 'dark' ? 'dark' : 'light';
  const root = document.documentElement;
  root.setAttribute('data-theme', currentTheme);
  root.style.colorScheme = currentTheme;

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', currentTheme === 'dark' ? '#141311' : '#FBF9F4');
  }
}

function setTheme(nextTheme) {
  const normalized = nextTheme === 'dark' ? 'dark' : 'light';
  if (normalized === currentTheme) return;
  currentTheme = normalized;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  } catch {
    // ignore storage failures
  }
  applyTheme(currentTheme);
  [...listeners].forEach((cb) => {
    try {
      cb(currentTheme);
    } catch {
      // ignore listener errors
    }
  });
}

export function toggleTheme() {
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

export function onThemeChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
