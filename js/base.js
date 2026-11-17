/* Base path support — lets the site run from a sub-folder (e.g. GitHub Pages: user.github.io/repo/)
   as well as from a domain root. It is derived from where this file is served: <base>/js/base.js */
const root = new URL('../', import.meta.url);

/** '' on a domain root, '/repo' on GitHub project pages. */
export const BASE_PATH = root.protocol.startsWith('http') ? root.pathname.replace(/\/+$/, '') : '';

/** '/assets/x.jpg' → '/repo/assets/x.jpg' */
export const withBase = (path) => `${BASE_PATH}${path}`;

/** '/repo/products/SP-1/' → '/products/SP-1/' */
export function stripBase(pathname) {
  if (BASE_PATH && (pathname === BASE_PATH || pathname.startsWith(`${BASE_PATH}/`))) {
    return pathname.slice(BASE_PATH.length) || '/';
  }
  return pathname;
}
