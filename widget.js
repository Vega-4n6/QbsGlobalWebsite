/* ══════════════════════════════════════════════
   QBS Global — AI Chat Widget (Fully Custom UI)
   No n8n renderer — direct webhook, total design control
   ══════════════════════════════════════════════ */

(function() {
  var WEBHOOK = 'https://n8n.srv1381788.hstgr.cloud/webhook/0c7aa318-bc4b-4258-862c-f9d765199649/chat';
  var chatOpen = false;
  var teaserDismissed = false;
  var demoStarted = false;
  var chatInited = false;
  var thinking = false;
  var sessionId = 'qbs_' + Date.now() + '_' + Math.random().toString(36).slice(2,7);

  /* ── Utilities ──────────────────────────────────── */
  function esc(t) {
    return String(t)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\n/g,'<br>');
  }
  function ts() {
    var d=new Date(), h=d.getHours(), m=d.getMinutes();
    return (h%12||12)+':'+(m<10?'0':'')+m+(h<12?' am':' pm');
  }
  function scroll() {
    var el=document.getElementById('qcpMessages');
    if (el) setTimeout(function(){ el.scrollTop=el.scrollHeight; },30);
  }

  /* ── Add message bubble ─────────────────────────── */
  function addMsg(text, role) {
    var box = document.getElementById('qcpMessages');
    if (!box) return;
    var row = document.createElement('div');
    row.className = 'qcp-msg ' + role;
    var avatarSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffe500" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>';
    var html = '';
    if (role === 'bot') html += '<div class="qcp-msg-avatar">' + avatarSvg + '</div>';
    html += '<div class="qcp-msg-body"><div class="qcp-bubble">' + esc(text) + '</div><div class="qcp-time">' + ts() + '</div></div>';
    row.innerHTML = html;
    box.appendChild(row);
    scroll();
    return row;
  }

  /* ── Thinking indicator ─────────────────────────── */
  function showThinking() {
    var box = document.getElementById('qcpMessages');
    if (!box) return;
    var row = document.createElement('div');
    row.className = 'qcp-msg bot'; row.id = 'qcpThinking';
    var avatarSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffe500" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>';
    row.innerHTML = '<div class="qcp-msg-avatar">' + avatarSvg + '</div>'
      + '<div class="qcp-msg-body"><div class="qcp-bubble"><span class="typing-dots"><span></span><span></span><span></span></span></div></div>';
    box.appendChild(row);
    scroll();
  }
  function hideThinking() {
    var el = document.getElementById('qcpThinking');
    if (el) el.remove();
  }

  /* ── Init greeting ──────────────────────────────── */
  function initChat() {
    if (chatInited) return;
    chatInited = true;
    showThinking();
    setTimeout(function() {
      hideThinking();
      addMsg("Hi! I'm the QBS AI assistant. Ask me about our automation services, pricing, or how we can transform your business. I'm here to help!", 'bot');
    }, 900);
  }

  /* ── Send message ───────────────────────────────── */
  window.sendMessage = function() {
    var inp = document.getElementById('qcpInput');
    var text = inp ? inp.value.trim() : '';
    if (!text || thinking) return;

    var suggs = document.getElementById('qcpSuggs');
    if (suggs) suggs.style.display = 'none';

    addMsg(text, 'user');
    inp.value = ''; inp.style.height = 'auto';

    thinking = true;
    var btn = document.getElementById('qcpSend');
    if (btn) btn.disabled = true;
    showThinking();

    fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sendMessage', sessionId: sessionId, chatInput: text })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      hideThinking();
      var reply = (data && (data.output || data.text || data.message || data.reply ||
        (Array.isArray(data) && data[0] && (data[0].output || data[0].text)) ||
        JSON.stringify(data))) || "Got it! Let me look into that for you.";
      addMsg(reply, 'bot');
    })
    .catch(function() {
      hideThinking();
      addMsg("Sorry, I'm having a connection issue right now. Please try again or reach us directly at sales@qbsglobal.ae", 'bot');
    })
    .finally(function() {
      thinking = false;
      if (btn) btn.disabled = false;
    });
  };

  window.sendSugg = function(el) {
    var text = el ? el.textContent.trim() : '';
    if (!text) return;
    var suggs = document.getElementById('qcpSuggs');
    if (suggs) suggs.style.display = 'none';
    var inp = document.getElementById('qcpInput');
    if (inp) inp.value = text;
    sendMessage();
  };

  /* ── Teaser demo ────────────────────────────────── */
  var DEMO = [
    { msg:'tMsg1', row:null,   type:'bot',  text:"Hi! I can automate your workflows, deploy AI agents, and connect all your business tools. What is slowing your team down?", speed:24 },
    { msg:'tMsg2', row:'tRow2',type:'user', text:"We waste hours processing invoices manually.", speed:42 },
    { msg:'tMsg3', row:'tRow3',type:'bot',  text:"We can fix that. Extract invoice data automatically, validate it, and push it into your accounting system. Usually live in 48 hours. Want a free audit?", speed:20 }
  ];
  function dDots(el) { el.innerHTML='<span class="typing-dots"><span></span><span></span><span></span></span>'; }
  function dType(el, txt, spd, cb) {
    el.classList.add('typing-cursor'); el.textContent='';
    var i=0, iv=setInterval(function(){
      el.textContent+=txt[i++];
      if(i>=txt.length){clearInterval(iv);el.classList.remove('typing-cursor');if(cb)setTimeout(cb,500);}
    },spd);
  }
  function dShowRow(id){var el=document.getElementById(id);if(el){el.style.opacity='1';el.style.transform='translateY(0)';}}
  function dStep(n) {
    if(n>=DEMO.length)return;
    var d=DEMO[n], el=document.getElementById(d.msg);
    if(!el)return;
    if(d.row)dShowRow(d.row);
    if(d.type==='bot'){dDots(el);setTimeout(function(){dType(el,d.text,d.speed,function(){dStep(n+1);});},850);}
    else{dType(el,d.text,d.speed,function(){dStep(n+1);});}
  }
  function startDemo(){if(demoStarted)return;demoStarted=true;dStep(0);}

  /* ── Hover trigger ──────────────────────────────── */
  setTimeout(function(){
    var btn=document.getElementById('af-chat-launcher');
    if(!btn)return;
    var ht=null;
    btn.addEventListener('mouseenter',function(){
      if(teaserDismissed||chatOpen)return;
      ht=setTimeout(function(){
        var t=document.getElementById('ai-teaser');
        if(t&&!chatOpen){t.classList.add('visible');startDemo();}
      },250);
    });
    btn.addEventListener('mouseleave',function(){clearTimeout(ht);});
  },400);

  /* ── Public API ─────────────────────────────────── */
  window.dismissTeaser = function(permanent) {
    if(permanent)teaserDismissed=true;
    var t=document.getElementById('ai-teaser');
    if(t)t.classList.remove('visible');
  };
  window.openChat = function() { window.dismissTeaser(true); if(!chatOpen)window.toggleChat(); };
  window.openWithQ = function(q) {
    window.dismissTeaser(true);
    if(!chatOpen)window.toggleChat();
    setTimeout(function(){
      var inp=document.getElementById('qcpInput');
      if(inp){inp.value=q;inp.focus();}
    },400);
  };

  window.toggleChat = function() {
    chatOpen = !chatOpen;
    var panel    = document.getElementById('qbs-chat-panel');
    var launcher = document.getElementById('af-chat-launcher');
    var dot      = document.getElementById('notifDot');
    if(panel)    panel.classList.toggle('is-open', chatOpen);
    if(launcher) launcher.classList.toggle('is-open', chatOpen);
    if(chatOpen){
      if(dot) dot.style.display='none';
      window.dismissTeaser(false);
      document.body.style.overflow = (window.innerWidth<=600)?'hidden':'';
      initChat();
      setTimeout(function(){ var inp=document.getElementById('qcpInput'); if(inp)inp.focus(); },400);
    } else {
      document.body.style.overflow='';
    }
  };

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){ if(chatOpen)window.toggleChat(); else window.dismissTeaser(true); }
  });

})();
