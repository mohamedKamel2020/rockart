import { initAboutPage } from './about.js';
import { initContactPage } from './forms.js';
import { initHomePage } from './home.js';
import { applyLanguageAndMeta, onLangChange } from './language.js';
import { initLockStonePage } from './lockstone.js';
import { initShell } from './navigation.js';
import { initNotFoundPage } from './notfound.js';
import { initProductDetailPage, initProductsPage } from './products.js';
import { initProjectDetailPage, initProjectsPage } from './projects.js';
import { parseRoute } from './routing.js';
import { applyTheme } from './theme.js';

function bootstrap() {
  applyTheme();
  applyLanguageAndMeta();
  initShell();

  const pageRoot = document.getElementById('page-root');
  if (!pageRoot) return;

  const route = parseRoute(window.location.pathname);
  let rerenderPage = null;

  switch (route.page) {
    case 'home':
      rerenderPage = initHomePage(pageRoot);
      break;
    case 'about':
      rerenderPage = initAboutPage(pageRoot);
      break;
    case 'lock-stone':
      rerenderPage = initLockStonePage(pageRoot);
      break;
    case 'products':
      rerenderPage = initProductsPage(pageRoot);
      break;
    case 'product-detail':
      rerenderPage = initProductDetailPage(pageRoot, route.param);
      break;
    case 'projects':
      rerenderPage = initProjectsPage(pageRoot);
      break;
    case 'project-detail':
      rerenderPage = initProjectDetailPage(pageRoot, route.param);
      break;
    case 'contact':
      rerenderPage = initContactPage(pageRoot);
      break;
    default:
      rerenderPage = initNotFoundPage(pageRoot);
      break;
  }

  if (typeof rerenderPage === 'function') {
    onLangChange(() => {
      rerenderPage();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
