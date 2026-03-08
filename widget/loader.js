/**
 * VegaMind Widget — Starter Plan v3.1
 * ─────────────────────────────────────────────────────────────
 * EMBED:
 *   <script>
 *     window.VegaMindConfig = {
 *       widgetKey: 'your-key-here',
 *       botName:   'Aria',
 *       accentColor: '#2ECC71',
 *       headerColor: '#1B4F72',
 *     };
 *   </script>
 *   <script src="https://qbsglobal.ae/widget/loader.js" async></script>
 */
(function () {
  'use strict';

  // Fix #1: Check DOM element instead of global flag — survives SPA navigation
  if (document.getElementById('vm-root')) return;

  // Fix #3: Use highly specific data attribute to avoid collisions
  var scriptEl = document.currentScript || document.querySelector('script[data-vegamind-key]');
  var da = {};
  if (scriptEl) {
    if (scriptEl.dataset.vegamindKey) da.widgetKey   = scriptEl.dataset.vegamindKey;
    if (scriptEl.dataset.name)        da.botName     = scriptEl.dataset.name;
    if (scriptEl.dataset.color)       da.accentColor = scriptEl.dataset.color;
    if (scriptEl.dataset.header)      da.headerColor = scriptEl.dataset.header;
  }

  var cfg = Object.assign({
    widgetKey: '', accentColor: '#2ECC71', headerColor: '#1B4F72', botName: '',
    placeholder: 'Type a message\u2026', bubbleSize: '58px', zIndex: '9999',
  }, da, window.VegaMindConfig || {});

  if (!cfg.widgetKey) { console.warn('[VegaMind] widgetKey missing'); return; }

  function loadCore() {
    if (window.__VegaMindCore) { window.__VegaMindCore(cfg, 'starter'); }
    else { setTimeout(loadCore, 50); }
  }

  var cs = document.createElement('script');
  cs.src = 'https://qbsglobal.ae/widget/widget-core.js';
  cs.onload = loadCore;
  document.head.appendChild(cs);
})();
