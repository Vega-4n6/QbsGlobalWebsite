// VegaMind Widget Core Engine v3.1 — Shadow DOM + Idempotent Rendering
window.__VegaMindCore = function (cfg, PLAN) {
  var SFN='https://lyiqesxemmisigccslfn.supabase.co/functions/v1';
  var SAK='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aXFlc3hlbW1pc2lnY2NzbGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NTQwNzgsImV4cCI6MjA4ODIzMDA3OH0.QIdGOfuIm4om3nrWBnBb02slLrZLSbN9fuNiKkDgJ9s';
  var sid=null,isOpen=false,isTyping=false,shadow,root;
  function gvid(){try{var id=localStorage.getItem('_vm_vid');if(!id){id='v_'+Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('_vm_vid',id)}return id}catch(e){return 'v_'+Math.random().toString(36).slice(2)}}
  var vid=gvid();

  var TH={
    // Starter light skin — clean white, violet accent, VegaMind-branded
    minimal:{hBg:'linear-gradient(135deg,#7c3aed,#a855f7)',hTxt:'#fff',acc:'#7c3aed',uBg:'linear-gradient(135deg,#7c3aed,#a855f7)',uTxt:'#fff',bBg:'#f0eff8',bTxt:'#1a1a2e',pBg:'#fafafa',iBg:'#fff',iBdr:'#e4e0f5',iTxt:'#18181b',pwBg:'#fff',bbBg:'linear-gradient(135deg,#7c3aed,#a855f7)',rad:'18px'},
    bold:{hBg:'linear-gradient(135deg,#0f0f0f,#1a1a2e)',hTxt:'#fff',acc:'#00D4FF',uBg:'#00D4FF',uTxt:'#0f0f0f',bBg:'#1e1e2e',bTxt:'#e0e0e0',pBg:'#141420',iBg:'#1e1e2e',iBdr:'#333',iTxt:'#fff',pwBg:'#0f0f0f',bbBg:'linear-gradient(135deg,#00D4FF,#0088ff)',rad:'14px'},
    // Starter dark skin — VegaMind void palette, violet glow
    dark:{hBg:'#04040d',hTxt:'#fff',acc:'#7c3aed',uBg:'linear-gradient(135deg,#7c3aed,#a855f7)',uTxt:'#fff',bBg:'#0c0c28',bTxt:'#c8c8e8',pBg:'#07071a',iBg:'#0c0c28',iBdr:'rgba(124,58,237,.28)',iTxt:'#e2e2f0',pwBg:'#04040d',bbBg:'linear-gradient(135deg,#7c3aed,#a855f7)',rad:'16px'},
    qbs:{hBg:'linear-gradient(135deg,#0a0a0a,#111827)',hTxt:'#fff',acc:'#10B981',uBg:'#10B981',uTxt:'#fff',bBg:'#1f2937',bTxt:'#f3f4f6',pBg:'#111827',iBg:'#1f2937',iBdr:'#374151',iTxt:'#f9fafb',pwBg:'#0a0a0a',bbBg:'linear-gradient(135deg,#10B981,#059669)',rad:'12px'},
    soft:{hBg:'linear-gradient(135deg,#667eea,#764ba2)',hTxt:'#fff',acc:'#F093FB',uBg:'linear-gradient(135deg,#667eea,#764ba2)',uTxt:'#fff',bBg:'#fff',bTxt:'#4a4a68',pBg:'#f5f3fa',iBg:'#fff',iBdr:'#e8e0f0',iTxt:'#4a4a68',pwBg:'#fff',bbBg:'linear-gradient(135deg,#667eea,#764ba2)',rad:'20px'},
  };

  var tn=(PLAN==='starter')?(cfg.starterTheme==='light'?'minimal':'dark'):(cfg.theme||'minimal');
  var base=TH[tn]||TH.minimal;
  var T;
  if(PLAN==='starter'){
    T=Object.assign({},base,{hBg:cfg.headerColor||cfg.accentColor||base.hBg,acc:cfg.accentColor||base.acc,uBg:cfg.headerColor||cfg.accentColor||base.uBg,bbBg:cfg.headerColor||cfg.accentColor||base.bbBg});
  } else {
    T=Object.assign({},base,{hBg:cfg.headerColor||base.hBg,acc:cfg.accentColor||base.acc,uBg:cfg.userBubbleColor||base.uBg,bBg:cfg.botBubbleColor||base.bBg,rad:cfg.borderRadius||base.rad,bbBg:cfg.bubbleColor||base.bbBg});
  }

  var cCSS=(PLAN==='enterprise'&&cfg.customCSS)?cfg.customCSS:'';
  var showPW=PLAN==='starter'?true:PLAN==='pro'?(cfg.poweredBy!==false):false;
  var avContent=(PLAN==='enterprise'&&cfg.avatarUrl)?'<img src="'+cfg.avatarUrl+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%" alt="">':'\u{1F916}';
  var bn=cfg.botName||'Assistant';
  var ph=cfg.placeholder||'Type a message\u2026';
  var bsz=cfg.bubbleSize||'58px';
  var zi=cfg.zIndex||'9999';
  var isL=cfg.position==='bottom-left';
  var dk=['bold','dark','qbs'].indexOf(tn)!==-1;
  var bb=dk?'border:1px solid rgba(255,255,255,.08);':'border:1px solid #e8e8ec;';
  var bs=dk?'box-shadow:0 2px 6px rgba(0,0,0,.25);':'box-shadow:0 2px 8px rgba(0,0,0,.06);';
  var FONT="'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif";

  function md(t){if(!t)return '';var h=t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');h=h.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');h=h.replace(/__(.+?)__/g,'<strong>$1</strong>');h=h.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g,'<em>$1</em>');h=h.replace(/`(.+?)`/g,'<code style="background:'+(dk?'rgba(255,255,255,.1)':'rgba(0,0,0,.06)')+';padding:1px 5px;border-radius:3px;font-size:12px;font-family:monospace">$1</code>');h=h.replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank" rel="noopener" style="color:'+T.acc+';text-decoration:underline">$1</a>');h=h.replace(/\n/g,'<br>');h=h.replace(/((?:(?:^|<br>)\s*[\-\*\u2022]\s+.+)+)/g,function(m){var i=m.split('<br>').filter(function(l){return l.trim()}).map(function(l){return '<li style="margin:3px 0">'+l.replace(/^\s*[\-\*\u2022]\s+/,'')+'</li>'}).join('');return '<ul style="margin:6px 0;padding-left:20px;list-style:disc">'+i+'</ul>'});h=h.replace(/((?:(?:^|<br>)\s*\d+[\.\)]\s+.+)+)/g,function(m){var i=m.split('<br>').filter(function(l){return l.trim()}).map(function(l){return '<li style="margin:3px 0">'+l.replace(/^\s*\d+[\.\)]\s+/,'')+'</li>'}).join('');return '<ol style="margin:6px 0;padding-left:20px">'+i+'</ol>'});return h}

  function getCSS(){return `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
:host{all:initial;display:block;position:fixed;${isL?'bottom:24px;left:24px;':'bottom:24px;right:24px;'}z-index:${zi};pointer-events:none}
.vm-wrap{position:fixed;${isL?'bottom:24px;left:24px;':'bottom:24px;right:24px;'}z-index:${zi};font-family:${FONT};font-size:14px;font-weight:400;line-height:1.5;color:#333;display:flex;flex-direction:column;${isL?'align-items:flex-start;':'align-items:flex-end;'}gap:14px;pointer-events:auto}
.panel{width:${cfg.panelWidth||'380px'};height:${cfg.panelHeight||'560px'};max-height:calc(100vh - 120px);background:${T.pBg};border-radius:${T.rad};box-shadow:0 12px 48px rgba(0,0,0,.18),0 2px 8px rgba(0,0,0,.08);display:flex;flex-direction:column;overflow:hidden;transform:scale(.92) translateY(14px);opacity:0;pointer-events:none;transition:transform .28s cubic-bezier(.34,1.56,.64,1),opacity .2s ease;transform-origin:${isL?'bottom left':'bottom right'}}
.panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
.hdr{background:${T.hBg};padding:16px 18px;display:flex;align-items:center;gap:12px;flex-shrink:0}
.hav{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;border:2px solid rgba(255,255,255,.2);overflow:hidden}
.hi{flex:1;min-width:0}
.hn{color:${T.hTxt};font-size:15px;font-weight:700;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hs{color:rgba(255,255,255,.75);font-size:11.5px;font-weight:500;display:flex;align-items:center;gap:5px;margin-top:2px}
.dot{width:7px;height:7px;border-radius:50%;background:#4ade80;display:inline-block;animation:pulse 2.5s ease infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}
.xb{background:rgba(255,255,255,.1);border:none;cursor:pointer;color:rgba(255,255,255,.8);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s;flex-shrink:0;margin-left:auto}
.xb:hover{background:rgba(255,255,255,.2);color:#fff}
.msgs{flex:1;overflow-y:auto;padding:18px 14px;display:flex;flex-direction:column;gap:10px;min-height:0;background:${T.pBg};scroll-behavior:smooth}
.msgs::-webkit-scrollbar{width:4px}
.msgs::-webkit-scrollbar-track{background:transparent}
.msgs::-webkit-scrollbar-thumb{background:${dk?'rgba(255,255,255,.15)':'#d4d4d8'};border-radius:4px}
.msg{max-width:78%;padding:11px 15px;font-size:14px;font-weight:400;line-height:1.6;word-break:break-word;animation:fi .22s ease;letter-spacing:-.01em}
@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.mu{background:${T.uBg};color:${T.uTxt};align-self:flex-end;border-radius:${T.rad} ${T.rad} 4px ${T.rad};padding:11px 16px;box-shadow:0 2px 8px rgba(0,0,0,.1)}
.mb{background:${T.bBg};color:${T.bTxt};align-self:flex-start;border-radius:4px ${T.rad} ${T.rad} ${T.rad};${bb}${bs}}
.mb strong{font-weight:700}
.mb em{font-style:italic;opacity:.85}
.tp{background:${T.bBg};align-self:flex-start;border-radius:4px ${T.rad} ${T.rad} ${T.rad};${bb}${bs}padding:13px 20px;display:flex;gap:5px;align-items:center}
.tp span{display:block;width:7px;height:7px;background:${T.acc};border-radius:50%;opacity:.4;animation:bn 1.4s infinite}
.tp span:nth-child(2){animation-delay:.15s}
.tp span:nth-child(3){animation-delay:.3s}
@keyframes bn{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-5px);opacity:1}}
.ir{display:flex;align-items:center;gap:10px;padding:14px 16px;background:${T.pwBg};border-top:1px solid ${T.iBdr};flex-shrink:0}
.inp{flex:1;border:1.5px solid ${T.iBdr};border-radius:24px;padding:10px 16px;font-size:14px;font-weight:400;font-family:${FONT};outline:none;background:${T.iBg};color:${T.iTxt};transition:border-color .15s,box-shadow .15s;min-width:0}
.inp:focus{border-color:${T.acc};box-shadow:0 0 0 3px ${T.acc}22}
.inp::placeholder{color:${dk?'rgba(255,255,255,.35)':'#a1a1aa'};font-weight:400}
.sb{width:38px;height:38px;border-radius:50%;background:${T.acc};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .12s,filter .15s}
.sb:hover{filter:brightness(1.1);transform:scale(1.06)}
.sb:active{transform:scale(.93)}
.sb svg{display:block}
.sb:disabled{opacity:.4;cursor:not-allowed;transform:none}
.pw{text-align:center;padding:8px 0 10px;font-size:11px;font-weight:500;color:${dk?'rgba(255,255,255,.35)':'#a1a1aa'};background:${T.pwBg};flex-shrink:0;border-top:1px solid ${dk?'rgba(255,255,255,.06)':'#f5f5f5'}}
.pw a{color:${T.acc};text-decoration:none;font-weight:600}
.pw a:hover{text-decoration:underline}
.bbl{width:${bsz};height:${bsz};border-radius:50%;background:${T.bbBg};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(0,0,0,.18);transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .22s ease;position:relative;flex-shrink:0}
.bbl:hover{transform:scale(1.1);box-shadow:0 8px 28px rgba(0,0,0,.22)}
.bbl:active{transform:scale(.95)}
.bbl svg{transition:transform .22s ease,opacity .18s ease}
.bbl.open .ic{transform:scale(0) rotate(-45deg);opacity:0;position:absolute}
.bbl.open .ix{transform:scale(1) rotate(0);opacity:1}
.bbl:not(.open) .ic{transform:scale(1);opacity:1}
.bbl:not(.open) .ix{transform:scale(0) rotate(45deg);opacity:0;position:absolute}
.bdg{position:absolute;top:-3px;right:-3px;width:20px;height:20px;background:#ef4444;border-radius:50%;font-size:10px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(0);transition:opacity .2s,transform .2s cubic-bezier(.34,1.56,.64,1);pointer-events:none;border:2px solid #fff}
.bdg.show{opacity:1;transform:scale(1)}
@media(max-width:480px){.vm-wrap{bottom:16px;right:16px;left:16px}.panel{width:100%;max-height:calc(100vh - 100px)}}
${cCSS}`;}

  function build(){
    // Fix #2: Idempotent rendering — remove any existing instance
    var existingRoot = document.getElementById('vm-root');
    if (existingRoot) existingRoot.remove();

    // Create host element
    root=document.createElement('div');
    root.id='vm-root';
    root.style.cssText='position:fixed;z-index:'+zi+';bottom:0;right:0;left:0;top:0;pointer-events:none;';
    document.body.appendChild(root);

    // Attach Shadow DOM for complete CSS isolation
    shadow=root.attachShadow({mode:'open'});

    // Load font inside Shadow DOM too
    var fontLink=document.createElement('link');
    fontLink.rel='stylesheet';
    fontLink.href='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
    shadow.appendChild(fontLink);

    // Inject styles
    var style=document.createElement('style');
    style.textContent=getCSS();
    shadow.appendChild(style);

    // Build widget HTML inside a wrapper div
    var wrap=document.createElement('div');
    wrap.className='vm-wrap';
    wrap.innerHTML='<div class="panel" id="panel"><div class="hdr"><div class="hav">'+avContent+'</div><div class="hi"><div class="hn" id="hn">'+bn+'</div><div class="hs"><span class="dot"></span>Online</div></div><button class="xb" id="xb"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div><div class="msgs" id="msgs"></div><div class="ir"><input class="inp" id="inp" type="text" placeholder="'+ph+'" autocomplete="off" maxlength="2000"/><button class="sb" id="sb"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>'+(showPW?'<div class="pw">Powered by <a href="https://qbsglobal.ae/VegaMind/VM-landing.html" target="_blank" rel="noopener">VegaMind</a></div>':'')+'</div><button class="bbl" id="bbl"><div class="bdg" id="bdg">1</div><svg class="ic" width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M21 15c0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59H7l-4 4V5c0-.53.21-1.04.59-1.41C3.96 3.21 4.47 3 5 3h14c.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41v10z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><svg class="ix" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg></button>';
    shadow.appendChild(wrap);

    if(cfg.openOnLoad) setTimeout(toggle,600);
  }

  function $(id){return shadow.getElementById(id)}
  function toggle(){isOpen=!isOpen;$('panel').classList.toggle('open',isOpen);$('bbl').classList.toggle('open',isOpen);if(isOpen){hideBdg();setTimeout(function(){$('inp').focus()},280)}}
  function showBdg(){if(!isOpen)$('bdg').classList.add('show')}
  function hideBdg(){$('bdg').classList.remove('show')}

  function addMsg(role,text){
    var m=$('msgs'),d=document.createElement('div');
    d.className='msg '+(role==='assistant'?'mb':'mu');
    if(role==='assistant'){d.innerHTML=md(text)}else{d.textContent=text}
    m.appendChild(d);m.scrollTop=m.scrollHeight;return d;
  }
  function showTp(){var m=$('msgs'),d=document.createElement('div');d.className='tp';d.id='tp';d.innerHTML='<span></span><span></span><span></span>';m.appendChild(d);m.scrollTop=m.scrollHeight}
  function hideTp(){var e=shadow.getElementById('tp');if(e)e.remove()}

  async function send(){
    var inp=$('inp'),text=inp.value.trim();if(!text||isTyping)return;
    inp.value='';isTyping=true;$('sb').disabled=true;
    addMsg('user',text);showTp();
    try{
      var res=await fetch(SFN+'/widget-chat',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+SAK},body:JSON.stringify({widget_key:cfg.widgetKey,message:text,session_id:sid,visitor_id:vid})});
      var data=await res.json();hideTp();
      if(data.reply){sid=data.session_id;addMsg('assistant',data.reply);if(!isOpen)showBdg()}
      else{addMsg('assistant','Sorry, something went wrong. Please try again.')}
    }catch(err){hideTp();addMsg('assistant','Connection error. Please check your internet.')}
    isTyping=false;$('sb').disabled=false;$('inp').focus();
  }

  async function initBot(){
    try{
      var res=await fetch(SFN+'/widget-init?key='+encodeURIComponent(cfg.widgetKey),{headers:{'Authorization':'Bearer '+SAK}});
      if(!res.ok)return;var data=await res.json();
      if(data.name&&!cfg.botName)$('hn').textContent=data.name;
      if(data.welcome_message){addMsg('assistant',data.welcome_message);showBdg()}
    }catch(e){}
  }

  function events(){
    $('bbl').addEventListener('click',toggle);
    $('xb').addEventListener('click',toggle);
    $('sb').addEventListener('click',send);
    $('inp').addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}});
  }

  function boot(){build();events();initBot()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
};
