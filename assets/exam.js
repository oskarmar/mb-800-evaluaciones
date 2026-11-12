/* MB-800 · Motor de pruebas de nivel (estilo Pearson VUE). Sin dependencias. */
(function () {
  'use strict';
  var D = window.EXAM_DATA, CFG = window.EXAM_CONFIG || {};
  var $app = document.getElementById('app');
  var STORE = 'mb800-' + D.id;
  var TYPE_LABEL = { mc: 'Multiple choice', yn: 'Multiple choice (Yes/No)', mr: 'Multiple response', hotspot: 'HOTSPOT', drag: 'DRAG DROP', build: 'DRAG DROP · Build List Reorder' };
  var state = load() || { name: '', idx: 0, answers: {}, review: {}, start: 0, stage: 'welcome' };
  var ui = { es: lsGet('mb800-es') === '1', progress: true, timer: true, sel: null, buildSel: null };
  var timerId = null;
  var FINAL = D.id === 'final';  // examen final: orden barajado, nota sobre 10, un solo intento
  var SIM = !/^(lp|final)/.test(D.id);  // simulacros: rango de preguntas y botón Ver respuesta
  var HOME = SIM ? 'simulacros.html' : 'index.html';

  var RANGE = (function () {
    var N = D.questions.length, m = location.search.match(/[?&]from=(\d+)/), n = location.search.match(/[?&]to=(\d+)/);
    var a = m ? Math.max(1, Math.min(N, +m[1])) : 1, b = n ? Math.max(a, Math.min(N, +n[1])) : N;
    return [a, b];
  })();

  // ---------- utils ----------
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function load() { try { var s = JSON.parse(lsGet(STORE)); return s && s.stage ? s : null; } catch (e) { return null; } }
  function save() { lsSet(STORE, JSON.stringify(state)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function h(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function QS() {
    if (FINAL && state.order) return state.order.map(function (id) { return optById(D.questions, id); });
    if (!SIM || !state.from) return D.questions; return D.questions.slice(state.from - 1, state.to);
  }
  function shuffled(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function gradeTxt(g) { return (Math.round(g * 100) / 100).toFixed(2).replace('.', ','); }
  function num(i) { return (SIM && state.from ? state.from : 1) + i; }
  function Q() { return QS()[state.idx]; }
  function stripTags(s) { return String(s).replace(/<[^>]+>/g, ''); }
  function optById(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function isAnswered(q) {
    var a = state.answers[q.id];
    if (a === undefined || a === null) return false;
    switch (q.type) {
      case 'mc': case 'yn': return !!a;
      case 'mr': return a.length === q.select;
      case 'hotspot': return a.length === q.rows.length && a.every(Boolean);
      case 'drag': return a.length === q.targets.length && a.every(Boolean);
      case 'build': return a.length === q.slots;
    }
    return false;
  }
  function answeredCount() { return QS().filter(isAnswered).length; }
  function elapsed() { return state.start ? Math.floor((Date.now() - state.start) / 1000) : 0; }
  function hms(s) { function p(n) { return (n < 10 ? '0' : '') + n; } return p(Math.floor(s / 3600)) + ' : ' + p(Math.floor(s / 60) % 60) + ' : ' + p(s % 60); }

  var ICON = {
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 6l6 6-6 6M12 6l6 6-6 6"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M7 9h2M11 9h6M7 13h2M11 13h6M7 17h2M11 17h6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9" stroke-dasharray="3 2"/><path d="M8 12l3 3 6-7"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 9a3 3 0 1 1 4 2.8c-.7.3-1 1-1 1.7V15M12 19v.5"/></svg>',
    reset: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M9 5l7 7-7 7"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M15 5l-7 7 7 7"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M5 15l7-7 7 7"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M5 9l7 7 7-7"/></svg>'
  };

  // ---------- shell ----------
  function sidebar() {
    var inExam = state.stage === 'exam' || state.stage === 'review';
    var sb = h('<nav class="sidebar" aria-label="Herramientas">' +
      '<button class="sb-btn" data-a="home" title="Volver a la lista de pruebas">' + ICON.chev + '</button>' +
      (inExam ? '<button class="sb-btn' + (state.stage === 'review' ? ' on' : '') + '" data-a="review" title="Review: estado de todas las preguntas">' + ICON.list + '</button>' : '') +
      (inExam ? '<button class="sb-btn" data-a="end" title="End Exam: terminar y corregir">' + ICON.check + '</button>' : '') +
      '<hr><button class="sb-btn' + (ui.es ? ' on' : '') + '" data-a="es" title="Mostrar/ocultar traducción al español">' + ICON.globe + '<span class="sb-tag">ES</span></button>' +
      '<button class="sb-btn" data-a="hc" title="Alto contraste">' + ICON.sun + '</button>' +
      '<button class="sb-btn" data-a="help" title="Ayuda">' + ICON.help + '</button></nav>');
    sb.addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]'); if (!b) return;
      var a = b.getAttribute('data-a');
      if (a === 'home') { location.href = HOME; }
      if (a === 'review') { state.stage = 'review'; save(); render(); }
      if (a === 'end') { tryEnd(); }
      if (a === 'es') { ui.es = !ui.es; lsSet('mb800-es', ui.es ? '1' : '0'); render(); }
      if (a === 'hc') { document.body.classList.toggle('hc'); }
      if (a === 'help') { showHelp(); }
    });
    return sb;
  }

  function topbar(title) {
    var n = QS().length, done = answeredCount();
    var cases = QS().filter(function (q) { return q.case; });
    var stand = QS().filter(function (q) { return !q.case; });
    var sDone = stand.filter(isAnswered).length, cDone = cases.filter(isAnswered).length;
    function seg(label, a, b, small) {
      var pct = b ? Math.round(a / b * 100) : 0;
      return '<div class="seg' + (small ? ' small' : '') + '"><span>' + label + (b ? '&nbsp;&nbsp;(' + a + '/' + b + ')' : '') + '</span><div class="bar"' + (small ? '' : ' style="width:' + Math.min(320, Math.max(120, b * 26)) + 'px"') + '><i style="width:' + (b ? pct : (state.stage === 'review' ? 100 : 0)) + '%' + (b && !a ? ';min-width:0' : '') + '"></i></div></div>';
    }
    var tb = h('<header class="topbar"><div class="qtitle">' + title + '</div>' +
      '<div class="progress"><div class="lbl">PROGRESS <button class="toggle' + (ui.progress ? '' : ' off') + '" data-t="progress" aria-label="Mostrar progreso"></button></div>' +
      '<div class="segs' + (ui.progress ? '' : ' hidden-val') + '">' + seg('Standalone Questions', sDone, stand.length) +
      (cases.length ? seg('Case Study', cDone, cases.length) : '') + seg('Review', 0, 0, true) + '</div></div>' +
      '<div class="timer"><div class="lbl" style="justify-content:flex-end">TIME ELAPSED <button class="toggle' + (ui.timer ? '' : ' off') + '" data-t="timer" aria-label="Mostrar tiempo"></button></div>' +
      '<div class="digits' + (ui.timer ? '' : ' hidden-val') + '" id="clock">' + hms(elapsed()) + '</div></div></header>');
    tb.addEventListener('click', function (e) {
      var t = e.target.closest('[data-t]'); if (!t) return;
      ui[t.getAttribute('data-t')] = !ui[t.getAttribute('data-t')]; render();
    });
    void done; void n;
    return tb;
  }

  function startClock() {
    stopClock();
    timerId = setInterval(function () { var c = document.getElementById('clock'); if (c) c.textContent = hms(elapsed()); }, 1000);
  }
  function stopClock() { if (timerId) clearInterval(timerId); timerId = null; }

  function render() {
    $app.innerHTML = '';
    document.title = D.title + (FINAL ? '' : ' · Prueba de nivel');
    var shell = h('<div></div>');
    if (state.stage === 'welcome') { shell.appendChild(sidebar()); shell.appendChild(welcome()); }
    else if (state.stage === 'exam') { shell.appendChild(sidebar()); shell.appendChild(examView()); startClock(); }
    else if (state.stage === 'review') { shell.appendChild(sidebar()); shell.appendChild(reviewView()); startClock(); }
    else if (state.stage === 'results') { stopClock(); shell.appendChild(sidebar()); shell.appendChild(resultsView()); }
    while (shell.firstChild) $app.appendChild(shell.firstChild);
  }

  // ---------- welcome ----------
  function welcome() {
    var app = h('<main class="app"></main>');
    app.appendChild(topbar('Welcome'));
    var cfgOk = CFG.endpoint && /^https:\/\//.test(CFG.endpoint);
    var p = h('<section class="panel"><h1>' + esc(D.title) + '</h1><div style="color:#555;font-size:16px">' + esc(D.title_es) + (FINAL ? '' : ' · MB-800 Prueba de nivel') + '</div>' +
      '<h2>Instrucciones</h2><ul style="line-height:1.7;margin:0;padding-left:20px">' + (FINAL ?
      '<li>El examen tiene <b>' + D.questions.length + ' preguntas</b> de los mismos tipos que el examen oficial (multiple choice, Yes/No, multiple response, HOTSPOT y DRAG DROP), en orden aleatorio.</li>' +
      '<li>Cada pregunta bien respondida vale <b>1 punto</b> (en las de varias partes, solo si todo es correcto). Las erróneas no restan.</li>' +
      '<li>La nota es sobre <b>10</b> (' + D.questions.length + ' aciertos = 10). Se aprueba con un <b>5</b>. No hay límite de tiempo.</li>' +
      '<li>Hay que responder <b>todas</b> las preguntas para poder terminar.</li>' +
      '<li>Los enunciados están en inglés, como en el examen. El botón <b>ES</b> de la barra lateral muestra la traducción al español.</li>' +
      '<li>Hazlo <b>una sola vez</b>: cada envío queda registrado para el instructor. Al terminar verás tu nota y la corrección.</li></ul>' :
      (SIM ? '<li>El banco tiene <b>' + D.questions.length + ' preguntas</b>. Puedes hacerlas todas o elegir un tramo (por ejemplo, de la 1 a la 20 hoy y de la 21 a la 40 otro día).</li><li>En cada pregunta puedes pulsar <b>Ver respuesta</b> para consultar la solución y su explicación; el instructor verá cuántas has consultado.</li><li>Las preguntas son de' : '<li>La prueba tiene <b>' + D.questions.length + ' preguntas</b> de') + ' los mismos tipos que el examen: multiple choice, multiple response, HOTSPOT, DRAG DROP y Build List Reorder' + (Object.keys(D.cases || {}).length ? ', y alguna de Case Study' : '') + '.</li>' +
      '<li>Cada pregunta bien respondida vale <b>1 punto</b> (en las de varias partes, solo si todo es correcto). Las erróneas no restan.</li>' +
      '<li>Hay que responder <b>todas</b> las preguntas para poder terminar. No hay límite de tiempo.</li>' +
      '<li>Los enunciados están en inglés, como en el examen. El botón <b>ES</b> de la barra lateral muestra la traducción al español.</li>' +
      '<li>Al terminar verás tu puntuación, las respuestas correctas y su explicación. El resultado se envía al instructor.</li></ul>') +
      (SIM ? '<div class="field range"><b>Preguntas</b> &nbsp;de la <input id="rf" type="number" min="1" max="' + D.questions.length + '" value="' + RANGE[0] + '"> a la <input id="rt" type="number" min="1" max="' + D.questions.length + '" value="' + RANGE[1] + '"> <span style="color:#555">(de ' + D.questions.length + ')</span><span class="err" id="rgErr"></span></div>' : '') +
      '<div class="field"><label for="nm"><b>Nombre y apellidos</b></label><input id="nm" autocomplete="name" maxlength="80" value="' + esc(state.name || '') + '"><span class="err" id="nmErr"></span></div>' +
      (cfgOk ? '' : '<p class="err">Aviso para el instructor: falta configurar la URL del Apps Script en assets/config.js. Sin ella no se podrá corregir ni registrar el intento.</p>') +
      '</section>');
    app.appendChild(p);
    var f = h('<div class="footer"><button class="navbtn" id="go">Start<span class="chev r">›</span></button></div>');
    app.appendChild(f);
    f.querySelector('#go').addEventListener('click', function () {
      var v = p.querySelector('#nm').value.trim();
      if (v.length < 3) { p.querySelector('#nmErr').textContent = 'Escribe tu nombre para empezar.'; return; }
      var st = { name: v, idx: 0, answers: {}, review: {}, revealed: {}, start: Date.now(), stage: 'exam' };
      if (SIM) {
        var a = parseInt(p.querySelector('#rf').value, 10), b = parseInt(p.querySelector('#rt').value, 10), N = D.questions.length;
        if (!(a >= 1 && b >= a && b <= N)) { p.querySelector('#rgErr').textContent = ' Rango no válido: elige de 1 a ' + N + ' (la primera no puede ser mayor que la última).'; return; }
        st.from = a; st.to = b;
      }
      if (FINAL) st.order = shuffled(D.questions.map(function (q) { return q.id; }));
      state = st; save(); render();
    });
    p.querySelector('#nm').addEventListener('keydown', function (e) { if (e.key === 'Enter') f.querySelector('#go').click(); });
    return app;
  }

  // ---------- exam ----------
  function examView() {
    var q = Q();
    var app = h('<main class="app"></main>');
    app.appendChild(topbar('Question ' + num(state.idx)));
    var box = h('<section class="qbox"></section>');
    if (q.case) {
      var c = D.cases[q.case];
      box.appendChild(h('<details class="case"' + (state.caseOpen ? ' open' : '') + '><summary>' + esc(c.title) + ' — mostrar/ocultar escenario</summary><div class="case-body">' + c.en + (ui.es ? '<div class="es-block">' + c.es + '</div>' : '') + '</div></details>'));
      box.lastChild.addEventListener('toggle', function (e) { state.caseOpen = e.target.open; });
    }
    box.appendChild(h('<div class="qtype">(' + TYPE_LABEL[q.type] + ')</div>'));
    box.appendChild(h('<div class="stem">' + q.en + '</div>'));
    if (ui.es) box.appendChild(h('<div class="es-block">' + q.es + '</div>'));
    var area = h('<div class="answers"></div>');
    renderAnswer(q, area);
    box.appendChild(area);
    if (SIM && state.revealed && state.revealed[q.id]) box.appendChild(revealBox(q, state.revealed[q.id]));
    var ctrl = h('<div class="qctrl"><div><button class="pill" id="rst">' + ICON.reset + ' Reset Answer</button>' + (SIM ? ' <button class="pill reveal" id="shw">' + (state.revealed && state.revealed[q.id] && !state.revealed[q.id].hidden ? 'Ocultar respuesta' : 'Ver respuesta') + '</button>' : '') + '</div>' +
      '<div class="checks"><label class="chk"><input type="checkbox" id="rv"' + (state.review[q.id] ? ' checked' : '') + '> Review later</label>' +
      '<label class="chk"><input type="checkbox" id="esChk"' + (ui.es ? ' checked' : '') + '> Mostrar traducción (ES)</label></div></div>');
    box.appendChild(ctrl);
    ctrl.querySelector('#rst').addEventListener('click', function () { delete state.answers[q.id]; ui.sel = null; ui.buildSel = null; save(); render(); });
    var shw = ctrl.querySelector('#shw');
    if (shw) shw.addEventListener('click', function () {
      state.revealed = state.revealed || {};
      if (state.revealed[q.id]) { state.revealed[q.id].hidden = !state.revealed[q.id].hidden; save(); render(); return; }
      shw.disabled = true; shw.textContent = 'Cargando…';
      post({ action: 'reveal', lp: D.id, id: q.id }).then(function (res) {
        if (!res || !res.ok) throw new Error(res && res.error ? res.error : 'Respuesta no válida');
        state.revealed[q.id] = { answer: res.answer, expl: res.expl, ref: res.ref, note: res.note }; save(); render();
      }).catch(function (err) { shw.disabled = false; shw.textContent = 'Ver respuesta'; modal('No disponible', '<p style="margin:0">No se ha podido obtener la respuesta: ' + esc(err.message) + '</p>', 'Cerrar'); });
    });
    ctrl.querySelector('#rv').addEventListener('change', function (e) { state.review[q.id] = e.target.checked; save(); });
    ctrl.querySelector('#esChk').addEventListener('change', function (e) { ui.es = e.target.checked; lsSet('mb800-es', ui.es ? '1' : '0'); render(); });
    app.appendChild(box);
    var last = state.idx === QS().length - 1;
    var f = h('<div class="footer"><button class="navbtn" id="prev"' + (state.idx === 0 ? ' disabled' : '') + '><span class="chev l">‹</span>Previous</button>' +
      '<button class="navbtn" id="next">' + (last ? 'Review' : 'Next') + '<span class="chev r">›</span></button></div>');
    f.querySelector('#prev').addEventListener('click', function () { go(state.idx - 1); });
    f.querySelector('#next').addEventListener('click', function () { if (last) { state.stage = 'review'; save(); render(); } else go(state.idx + 1); });
    app.appendChild(f);
    return app;
  }
  function go(i) { state.idx = Math.max(0, Math.min(QS().length - 1, i)); ui.sel = null; ui.buildSel = null; save(); render(); window.scrollTo(0, 0); }
  function setAns(q, v) { state.answers[q.id] = v; save(); }

  function esInline(t) { return ui.es && t ? '<span class="es-inline">' + t + '</span>' : ''; }

  function renderAnswer(q, area) {
    if (q.type === 'mc' || q.type === 'yn' || q.type === 'mr') return renderChoice(q, area);
    if (q.type === 'hotspot') return renderHotspot(q, area);
    if (q.type === 'drag') return renderDrag(q, area);
    if (q.type === 'build') return renderBuild(q, area);
  }

  function renderChoice(q, area) {
    var multi = q.type === 'mr';
    var cur = state.answers[q.id] || (multi ? [] : null);
    if (multi) area.appendChild(h('<div class="hint">Selecciona ' + q.select + ' respuestas. (' + cur.length + '/' + q.select + ' seleccionadas)</div>'));
    q.options.forEach(function (o) {
      var on = multi ? cur.indexOf(o.id) >= 0 : cur === o.id;
      var el = h('<div class="opt' + (multi ? ' sq' : '') + (on ? ' checked' : '') + '" role="' + (multi ? 'checkbox' : 'radio') + '" aria-checked="' + on + '" tabindex="0"><span class="mark"></span><span class="letter">' + o.id + '.</span><span>' + o.en + esInline(o.es !== o.en ? o.es : '') + '</span></div>');
      function pick() {
        if (multi) {
          var arr = (state.answers[q.id] || []).slice(), i = arr.indexOf(o.id);
          if (i >= 0) arr.splice(i, 1); else { if (arr.length >= q.select) arr.shift(); arr.push(o.id); }
          setAns(q, arr);
        } else setAns(q, o.id);
        render();
      }
      el.addEventListener('click', pick);
      el.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); pick(); } });
      area.appendChild(el);
    });
  }

  function renderHotspot(q, area) {
    area.appendChild(h('<div class="sep"></div>'));
    area.appendChild(h('<div class="dots"><i></i><i></i><i></i><i></i><i></i></div>'));
    area.appendChild(h('<div class="answer-area-title">Answer Area</div>'));
    var cur = (state.answers[q.id] || []).slice();
    area.appendChild(h('<div class="hs-row hs-head"><div class="hs-lbl">' + esc(q.rowsHeader[0]) + '</div><div>' + esc(q.rowsHeader[1]) + '</div></div>'));
    q.rows.forEach(function (r, i) {
      var opts = '<option value=""></option>' + r.options.map(function (o) {
        return '<option value="' + o.id + '"' + (cur[i] === o.id ? ' selected' : '') + '>' + esc(ui.es && o.es !== o.en ? o.en + ' — ' + o.es : o.en) + '</option>';
      }).join('');
      var row = h('<div class="hs-row"><div class="hs-lbl">' + r.en + esInline(r.es !== r.en ? r.es : '') + '</div><div><select class="hs" aria-label="' + esc(stripTags(r.en)) + '">' + opts + '</select></div></div>');
      row.querySelector('select').addEventListener('change', function (e) {
        var a = (state.answers[q.id] || q.rows.map(function () { return ''; })).slice();
        while (a.length < q.rows.length) a.push('');
        a[i] = e.target.value; setAns(q, a); render();
      });
      area.appendChild(row);
    });
  }

  function renderDrag(q, area) {
    area.appendChild(h('<div class="sep"></div>'));
    area.appendChild(h('<div class="dots"><i></i><i></i><i></i><i></i><i></i></div>'));
    area.appendChild(h('<div class="hint">Arrastra cada valor a su casilla (o haz clic en un valor y luego en la casilla). Haz clic en una casilla ocupada para vaciarla.</div>'));
    var cur = (state.answers[q.id] || q.targets.map(function () { return ''; })).slice();
    var wrap = h('<div class="dd"><div><h4>' + esc(q.valuesTitle) + '</h4><div class="vals"></div></div><div><h4>Answer Area</h4><table class="dd-table"><thead><tr><th>' + esc(q.targetHeader[0]) + '</th><th style="width:45%">' + esc(q.targetHeader[1]) + '</th></tr></thead><tbody></tbody></table></div></div>');
    var vals = wrap.querySelector('.vals');
    q.values.forEach(function (v) {
      var t = h('<div class="tile' + (ui.sel === v.id ? ' sel' : '') + '" draggable="true" tabindex="0"><span class="grip">⠿</span><span>' + v.en + esInline(v.es !== v.en ? v.es : '') + '</span></div>');
      t.addEventListener('click', function () { ui.sel = ui.sel === v.id ? null : v.id; render(); });
      t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.click(); } });
      t.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text/plain', v.id); t.classList.add('dragging'); });
      t.addEventListener('dragend', function () { t.classList.remove('dragging'); });
      vals.appendChild(t);
    });
    var tb = wrap.querySelector('tbody');
    q.targets.forEach(function (tg, i) {
      var val = cur[i] ? optById(q.values, cur[i]) : null;
      var tr = h('<tr><td>' + tg.en + esInline(tg.es !== tg.en ? tg.es : '') + '</td><td><div class="drop' + (val ? ' filled' : '') + '" tabindex="0">' + (val ? val.en : '<span class="ph">' + esc(q.targetHeader[1]) + '</span>') + '</div></td></tr>');
      var d = tr.querySelector('.drop');
      function put(id) { var a = (state.answers[q.id] || q.targets.map(function () { return ''; })).slice(); a[i] = id; setAns(q, a); ui.sel = null; render(); }
      d.addEventListener('click', function () { if (ui.sel) put(ui.sel); else if (val) put(''); });
      d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); d.click(); } });
      d.addEventListener('dragover', function (e) { e.preventDefault(); d.classList.add('over'); });
      d.addEventListener('dragleave', function () { d.classList.remove('over'); });
      d.addEventListener('drop', function (e) { e.preventDefault(); var id = e.dataTransfer.getData('text/plain'); if (optById(q.values, id)) put(id); });
      tb.appendChild(tr);
    });
    area.appendChild(wrap);
  }

  function renderBuild(q, area) {
    area.appendChild(h('<div class="sep"></div>'));
    area.appendChild(h('<div class="dots"><i></i><i></i><i></i><i></i><i></i></div>'));
    area.appendChild(h('<div class="hint">Mueve ' + q.slots + ' acciones al Answer Area y ordénalas de arriba abajo (botones ›  ‹  ˄  ˅, doble clic o arrastrar).</div>'));
    var ans = (state.answers[q.id] || []).slice();
    var left = q.actions.filter(function (a) { return ans.indexOf(a.id) < 0; });
    var w = h('<div class="bl"><div><h4>Actions</h4><div class="list" data-z="L"></div></div>' +
      '<div class="ctrls"><button class="circ" data-m="in" title="Mover al Answer Area">' + ICON.right + '</button><button class="circ" data-m="out" title="Devolver a Actions">' + ICON.left + '</button></div>' +
      '<div><h4>Answer Area</h4><div class="area" data-z="R"></div></div>' +
      '<div class="ctrls"><button class="circ" data-m="up" title="Subir">' + ICON.up + '</button><button class="circ" data-m="down" title="Bajar">' + ICON.down + '</button></div></div>');
    function tile(a, zone, n) {
      var t = h('<div class="tile' + (ui.buildSel === a.id ? ' sel' : '') + '" draggable="true" tabindex="0">' + (zone === 'R' ? '<span class="slotnum">' + n + '.</span>' : '<span class="grip">⠿</span>') + '<span>' + a.en + esInline(a.es !== a.en ? a.es : '') + '</span></div>');
      t.addEventListener('click', function () { ui.buildSel = ui.buildSel === a.id ? null : a.id; render(); });
      t.addEventListener('dblclick', function () { ui.buildSel = a.id; move(zone === 'L' ? 'in' : 'out'); });
      t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.click(); } });
      t.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text/plain', a.id); });
      return t;
    }
    left.forEach(function (a) { w.querySelector('[data-z=L]').appendChild(tile(a, 'L')); });
    ans.forEach(function (id, i) { w.querySelector('[data-z=R]').appendChild(tile(optById(q.actions, id), 'R', i + 1)); });
    function move(m) {
      var id = ui.buildSel; if (!id) return;
      var a = (state.answers[q.id] || []).slice(), i = a.indexOf(id);
      if (m === 'in' && i < 0) a.push(id);
      if (m === 'out' && i >= 0) { a.splice(i, 1); ui.buildSel = null; }
      if (m === 'up' && i > 0) { a.splice(i, 1); a.splice(i - 1, 0, id); }
      if (m === 'down' && i >= 0 && i < a.length - 1) { a.splice(i, 1); a.splice(i + 1, 0, id); }
      setAns(q, a); render();
    }
    w.querySelectorAll('[data-m]').forEach(function (b) {
      var m = b.getAttribute('data-m'), inR = ans.indexOf(ui.buildSel) >= 0;
      if (!ui.buildSel || (m === 'in' && inR) || (m !== 'in' && !inR)) b.disabled = true;
      b.addEventListener('click', function () { move(m); });
    });
    ['L', 'R'].forEach(function (z) {
      var el = w.querySelector('[data-z=' + z + ']');
      el.addEventListener('dragover', function (e) { e.preventDefault(); });
      el.addEventListener('drop', function (e) {
        e.preventDefault(); var id = e.dataTransfer.getData('text/plain'); if (!optById(q.actions, id)) return;
        var a = (state.answers[q.id] || []).slice(), i = a.indexOf(id);
        if (z === 'R') {
          if (i >= 0) a.splice(i, 1);
          var tiles = Array.prototype.slice.call(el.querySelectorAll('.tile')), pos = a.length;
          for (var k = 0; k < tiles.length; k++) { var r = tiles[k].getBoundingClientRect(); if (e.clientY < r.top + r.height / 2) { pos = k; break; } }
          if (i >= 0 && i < pos) pos--;
          a.splice(Math.max(0, Math.min(pos, a.length)), 0, id);
        } else if (i >= 0) a.splice(i, 1);
        ui.buildSel = null; setAns(q, a); render();
      });
    });
    area.appendChild(w);
  }

  // ---------- review ----------
  function reviewView() {
    var app = h('<main class="app"></main>');
    app.appendChild(topbar('Review'));
    var n = QS().length, done = answeredCount();
    var rows = QS().map(function (q, i) {
      var ok = isAnswered(q);
      return '<tr><td><a data-i="' + i + '">Question ' + num(i) + '</a></td><td>' + TYPE_LABEL[q.type] + (q.case ? ' · Case Study' : '') + (state.revealed && state.revealed[q.id] ? ' · <i>respuesta vista</i>' : '') + '</td><td>' + (ok ? '<span class="badge ok">Answered</span>' : '<span class="badge ko">Incomplete</span>') + '</td><td>' + (state.review[q.id] ? '<span class="badge flag">Review later</span>' : '') + '</td></tr>';
    }).join('');
    var p = h('<section class="panel"><h1>Review</h1><p>Has respondido <b>' + done + ' de ' + n + '</b> preguntas. Haz clic en una pregunta para volver a ella.' + (done < n ? ' <span class="err">Debes responder todas las preguntas antes de terminar.</span>' : '') + '</p>' +
      '<table class="rv-table"><thead><tr><th>Question</th><th>Type</th><th>Status</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></section>');
    p.addEventListener('click', function (e) { var a = e.target.closest('[data-i]'); if (a) { state.stage = 'exam'; go(+a.getAttribute('data-i')); } });
    app.appendChild(p);
    var f = h('<div class="footer"><button class="navbtn" id="back"><span class="chev l">‹</span>Back to questions</button><button class="navbtn" id="end"' + (done < n ? ' disabled' : '') + '>End Exam<span class="chev r">›</span></button></div>');
    f.querySelector('#back').addEventListener('click', function () { state.stage = 'exam'; save(); render(); });
    f.querySelector('#end').addEventListener('click', tryEnd);
    app.appendChild(f);
    return app;
  }

  function modal(title, body, okText, onOk, cancelText) {
    var m = h('<div class="modal-bg"><div class="modal" role="dialog" aria-modal="true"><h3>' + title + '</h3><div>' + body + '</div><div class="row">' +
      (cancelText ? '<button class="btn-s" data-x>' + cancelText + '</button>' : '') + '<button class="btn-p" data-ok>' + okText + '</button></div></div></div>');
    document.body.appendChild(m);
    m.querySelector('[data-ok]').addEventListener('click', function () { m.remove(); if (onOk) onOk(); });
    var x = m.querySelector('[data-x]'); if (x) x.addEventListener('click', function () { m.remove(); });
    m.querySelector('[data-ok]').focus();
  }
  function showHelp() {
    modal('Ayuda', '<p style="line-height:1.6;margin:0">Usa <b>Next</b> y <b>Previous</b> para moverte. Marca <b>Review later</b> para revisar una pregunta después. El icono de lista abre la pantalla <b>Review</b>; el de check termina la prueba. El botón <b>ES</b> muestra la traducción. Tus respuestas se guardan en este navegador mientras haces la prueba.</p>', 'Cerrar');
  }

  function tryEnd() {
    var n = QS().length, done = answeredCount();
    if (done < n) {
      var miss = QS().map(function (q, i) { return isAnswered(q) ? null : num(i); }).filter(Boolean).join(', ');
      modal('Faltan respuestas', '<p style="margin:0">Debes responder todas las preguntas. Pendientes: <b>' + miss + '</b>.</p>', 'Ir a Review', function () { state.stage = 'review'; save(); render(); });
      return;
    }
    modal('End Exam', '<p style="margin:0">¿Terminar la prueba y enviarla para corregir? Después no podrás cambiar las respuestas.</p>', 'Terminar', submit, 'Cancelar');
  }

  function post(payload) {
    if (CFG.endpoint === 'LOCAL_TEST' && window.LOCAL_GRADER) return Promise.resolve(window.LOCAL_GRADER(payload));
    if (!CFG.endpoint || !/^https:\/\//.test(CFG.endpoint)) return Promise.reject(new Error('No está configurada la URL del Apps Script (assets/config.js).'));
    return fetch(CFG.endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }
  function revealBox(q, r) {
    if (r.hidden) return h('<div></div>');
    return h('<div class="reveal-box"><b>Respuesta correcta</b><div>' + describe(q, r.answer) + '</div>' +
      '<div class="expl"><b>Por qué:</b> ' + r.expl + (r.ref ? ' <br><a href="' + esc(r.ref) + '" target="_blank" rel="noopener">Microsoft Learn ↗</a>' : '') + '</div>' +
      (r.note ? '<div class="note">Nota: ' + r.note + '</div>' : '') + '</div>');
  }

  // ---------- submit ----------
  function submit() {
    var dur = elapsed();
    stopClock();
    $app.innerHTML = '';
    var app = h('<main class="app"></main>');
    $app.appendChild(sidebar());
    app.appendChild(topbar('Scoring'));
    var p = h('<section class="panel"><div class="loading"><span class="spin"></span>Corrigiendo y enviando el resultado…</div></section>');
    app.appendChild(p); $app.appendChild(app);
    var payload = { lp: D.id, name: state.name, answers: state.answers, durationSec: dur, ua: navigator.userAgent.slice(0, 120) };
    if (SIM) { payload.ids = QS().map(function (q) { return q.id; }); payload.revealed = Object.keys(state.revealed || {}); }
    if (FINAL) payload.order = state.order;
    post(payload).then(function (res) {
      if (!res || !res.ok) throw new Error(res && res.error ? res.error : 'Respuesta no válida del servidor');
      state.result = res; state.durationSec = dur; state.stage = 'results'; save(); render(); window.scrollTo(0, 0);
    }).catch(function (err) {
      p.innerHTML = '<p class="err">No se ha podido enviar la prueba: ' + esc(err.message) + '</p><p>Tus respuestas siguen guardadas en este navegador. Comprueba la conexión y vuelve a intentarlo.</p>';
      var f = h('<div class="footer"><button class="navbtn" id="retry">Reintentar</button><button class="navbtn alt" id="bk">Volver a Review</button></div>');
      f.querySelector('#retry').addEventListener('click', submit);
      f.querySelector('#bk').addEventListener('click', function () { state.stage = 'review'; save(); render(); });
      app.appendChild(f);
    });
  }

  // ---------- results ----------
  function txtOpt(o) { return o ? o.en + (ui.es && o.es !== o.en ? ' <span class="es-inline">' + o.es + '</span>' : '') : '—'; }
  function describe(q, v) {
    if (v === null || v === undefined || (Array.isArray(v) && !v.length)) return '<i>Sin respuesta</i>';
    if (q.type === 'mc' || q.type === 'yn') return '<b>' + v + '.</b> ' + txtOpt(optById(q.options, v));
    if (q.type === 'mr') return '<ul>' + v.slice().sort().map(function (id) { return '<li><b>' + id + '.</b> ' + txtOpt(optById(q.options, id)) + '</li>'; }).join('') + '</ul>';
    if (q.type === 'hotspot') return '<ul>' + q.rows.map(function (r, i) { return '<li>' + stripTags(r.en) + ' → ' + txtOpt(optById(r.options, v[i])) + '</li>'; }).join('') + '</ul>';
    if (q.type === 'drag') return '<ul>' + q.targets.map(function (t, i) { return '<li>' + stripTags(t.en) + ' → ' + txtOpt(optById(q.values, v[i])) + '</li>'; }).join('') + '</ul>';
    if (q.type === 'build') return '<ol>' + v.map(function (id) { return '<li>' + txtOpt(optById(q.actions, id)) + '</li>'; }).join('') + '</ol>';
    return esc(JSON.stringify(v));
  }
  function resultsView() {
    var r = state.result, pct = Math.round(r.score / r.total * 100);
    var app = h('<main class="app"></main>');
    app.appendChild(topbar('Score Report'));
    var p = h('<section class="panel"><h1>' + esc(D.title) + '</h1><div style="color:#555">' + (SIM && state.from && (state.from > 1 || state.to < D.questions.length) ? 'Preguntas ' + state.from + '–' + state.to + ' · ' : '') + esc(r.name || state.name) + ' · ' + new Date().toLocaleDateString('es-ES') + ' · ' + Math.round((state.durationSec || 0) / 60) + ' min</div>' +
      (FINAL ? '<div class="score"><span class="big">' + gradeTxt(r.grade) + ' / 10</span><span class="pct">' + r.score + ' de ' + r.total + ' aciertos · <b style="color:' + (r.passed ? '#107c10">APROBADO' : '#c50f1f">SUSPENSO') + '</b></span></div>'
        : '<div class="score"><span class="big">' + r.score + ' / ' + r.total + '</span><span class="pct">' + pct + ' %</span></div>') +
      '<p style="margin:0 0 6px">El resultado se ha enviado al instructor. Revisa abajo las respuestas correctas y su explicación' + (ui.es ? '' : ' (pulsa <b>ES</b> para ver también la traducción de enunciados y opciones)') + '.</p></section>');
    r.results.forEach(function (res) {
      var q = optById(D.questions, res.id);
      var card = h('<div class="res' + (res.correct ? '' : ' ko') + '"><h3>Question ' + res.n + ' <span class="badge ' + (res.correct ? 'ok">✔ Correcta · 1 punto' : 'ko">✘ Incorrecta · 0 puntos') + '</span>' + (res.revealed ? ' <span class="badge flag">respuesta vista</span>' : '') + '<span class="src">' + TYPE_LABEL[q.type] + ' · ' + esc(res.src || q.src) + '</span></h3>' +
        '<details class="qtext"><summary>Ver enunciado</summary>' + (q.case ? '<p><i>' + esc(D.cases[q.case].title) + '</i></p>' : '') + q.en + (ui.es ? '<div class="es-block">' + q.es + '</div>' : '') + '</details>' +
        '<div class="ans"><b>Tu respuesta</b><div>' + describe(q, state.answers[q.id]) + '</div><b>Respuesta correcta</b><div>' + describe(q, res.answer) + '</div></div>' +
        '<div class="expl"><b>Por qué:</b> ' + res.expl + (res.ref ? ' <br><a href="' + esc(res.ref) + '" target="_blank" rel="noopener">Microsoft Learn ↗</a>' : '') + '</div>' +
        (res.note ? '<div class="note">Nota: ' + res.note + '</div>' : '') + '</div>');
      p.appendChild(card);
    });
    app.appendChild(p);
    var f = h(FINAL ? '<div class="footer"></div>' : '<div class="footer"><button class="navbtn" id="again">Nuevo intento<span class="chev r">›</span></button><button class="navbtn alt" id="home">Todas las pruebas</button></div>');
    if (FINAL) { app.appendChild(f); return app; }
    f.querySelector('#again').addEventListener('click', function () { var nm = state.name; lsDel(STORE); state = { name: nm, idx: 0, answers: {}, review: {}, start: 0, stage: 'welcome' }; render(); });
    f.querySelector('#home').addEventListener('click', function () { location.href = HOME; });
    app.appendChild(f);
    return app;
  }

  render();
})();
