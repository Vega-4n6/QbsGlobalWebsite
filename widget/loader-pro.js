/**
 * VegaMind Widget — Pro Plan v3.1
 * ─────────────────────────────────────────────────────────────
 * Themes: minimal | bold | dark | soft | qbs
 * EMBED:
 *   <script>
 *     window.VegaMindConfig = {
 *       widgetKey: 'your-key-here',
 *       theme: 'dark',
 *       poweredBy: false,
 *       accentColor: '#FF6B35',
 *     };
 *   </script>
 *   <script src="https://qbsglobal.ae/widget/loader-pro.js" async></script>
 */
(function () {
  'use strict';
  if (document.getElementById('vm-root')) return;

  var ALLOWED = ['minimal', 'bold', 'dark', 'soft', 'qbs'];

  var scriptEl = document.currentScript || document.querySelector('script[data-vegamind-key]');
  var da = {};
  if (scriptEl) {
    if (scriptEl.dataset.vegamindKey) da.widgetKey   = scriptEl.dataset.vegamindKey;
    if (scriptEl.dataset.name)        da.botName     = scriptEl.dataset.name;
    if (scriptEl.dataset.color)       da.accentColor = scriptEl.dataset.color;
    if (scriptEl.dataset.header)      da.headerColor = scriptEl.dataset.header;
    if (scriptEl.dataset.theme)       da.theme       = scriptEl.dataset.theme;
    if (scriptEl.dataset.position)    da.position    = scriptEl.dataset.position;
  }

  var cfg = Object.assign({
    widgetKey: '', theme: 'minimal', botName: '', placeholder: 'Type a message\u2026',
    position: 'bottom-right', bubbleSize: '58px', zIndex: '9999', poweredBy: true,
    accentColor: null, headerColor: null, userBubbleColor: null, botBubbleColor: null,
    fontFamily: null, borderRadius: null, bubbleColor: null,
    panelWidth: '380px', panelHeight: '560px', avatarEmoji: null, openOnLoad: false,
  }, da, window.VegaMindConfig || {});

  if (!cfg.widgetKey) { console.warn('[VegaMind Pro] widgetKey missing'); return; }
  if (ALLOWED.indexOf(cfg.theme) === -1) { cfg.theme = 'minimal'; }

  function loadCore() {
    if (window.__VegaMindCore) { window.__VegaMindCore(cfg, 'pro'); }
    else { setTimeout(loadCore, 50); }
  }

  var cs = document.createElement('script');
  cs.src = 'https://qbsglobal.ae/widget/widget-core.js';
  cs.onload = loadCore;
  document.head.appendChild(cs);
})();
