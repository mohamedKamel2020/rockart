/* Tiny classic script, runs before first paint (no flash of wrong theme / direction).
   Language: Arabic by default; English only if chosen earlier in this browser session. */
(function () {
  var root = document.documentElement;
  try {
    var theme = localStorage.getItem('rockart-theme');
    if (theme !== 'dark' && theme !== 'light') {
      theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#141311' : '#FBF9F4');
  } catch (e) {}
  try {
    var lang = sessionStorage.getItem('rockart-lang') === 'en' ? 'en' : 'ar';
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  } catch (e) {}
})();
