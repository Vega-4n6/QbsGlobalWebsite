/**
 * VegaMind Widget — Starter Plan v3.2
 * ─────────────────────────────────────────────────────────────
 * Two built-in themes: dark (default) and light.
 *
 * EMBED via data attributes (recommended):
 *   <script src="https://qbsglobal.ae/widget/loader.js?v=3.2" async
 *           data-vegamind-key="your-key-here"
 *           data-name="Aria"
 *           data-theme="dark"></script>
 *
 * EMBED via global config:
 *   <script>
 *     window.VegaMindConfig = {
 *       widgetKey: 'your-key-here',
 *       botName:   'Aria',
 *       starterTheme: 'light',   // 'dark' | 'light'  (default: 'dark')
 *     };
 *   </script>
 *   <script src="https://qbsglobal.ae/widget/loader.js?v=3.2" async></script>
 */
(function () {
  'use strict';

  // Idempotent — bail if already mounted
  if (document.getElementById('vm-root')) return;

  // Capture currentScript synchronously at parse time (safe for async scripts
  // in all modern browsers; fallback selector catches edge cases).
  var scriptEl = document.currentScript ||
                 document.querySelector('script[src*="loader.js"]');

  var da = {};
  if (scriptEl) {
    if (scriptEl.dataset.vegamindKey) da.widgetKey     = scriptEl.dataset.vegamindKey;
    if (scriptEl.dataset.name)        da.botName       = scriptEl.dataset.name;
    if (scriptEl.dataset.color)       da.accentColor   = scriptEl.dataset.color;
    if (scriptEl.dataset.header)      da.headerColor   = scriptEl.dataset.header;
    // data-theme="light" | "dark"  — selects the starter widget skin
    if (scriptEl.dataset.theme)       da.starterTheme  = scriptEl.dataset.theme;
  }

  var cfg = Object.assign({
    widgetKey:    '',
    botName:      '',
    placeholder:  'Type a message\u2026',
    bubbleSize:   '58px',
    zIndex:       '9999',
    starterTheme: 'dark',   // default to VegaMind dark skin
  }, da, window.VegaMindConfig || {});

  if (!cfg.widgetKey) {
    console.warn('[VegaMind] widgetKey missing — set data-vegamind-key on the script tag or window.VegaMindConfig.widgetKey');
    return;
  }

  // Derive core URL from the loader's own src so local testing works automatically.
  // e.g. http://localhost:8080/widget/loader.js → http://localhost:8080/widget/widget-core.js
  var loaderBase = scriptEl && scriptEl.src
    ? scriptEl.src.replace(/loader\.js[^/]*$/, '')
    : 'https://qbsglobal.ae/widget/';
  var CORE_URL     = loaderBase + 'widget-core.js?v=3.2';
  var LOAD_TIMEOUT = 8000;

  var cs = document.createElement('script');
  cs.src = CORE_URL;

  var timer = setTimeout(function () {
    console.warn('[VegaMind] Core script did not load within ' + LOAD_TIMEOUT + 'ms');
  }, LOAD_TIMEOUT);

  cs.onload = function () {
    clearTimeout(timer);
    if (typeof window.__VegaMindCore === 'function') {
      window.__VegaMindCore(cfg, 'starter');
    } else {
      console.error('[VegaMind] Core script loaded but __VegaMindCore is not a function');
    }
  };

  cs.onerror = function () {
    clearTimeout(timer);
    console.error('[VegaMind] Failed to load widget core from ' + CORE_URL);
  };

  document.head.appendChild(cs);
})();
