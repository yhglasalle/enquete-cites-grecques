/* ============================================================
   LE MONDE DES CITÉS GRECQUES — moteur de l'enquête
   ============================================================ */
(function () {
  'use strict';

  const D = window.GREECE;
  const ART = window.ART;
  const SAVE_KEY = 'cites-grecques-v1';
  const TOTAL = Object.keys(D.QUESTIONS).length;
  const SCENE_ORDER = Object.keys(D.SCENES);
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  let state = load() || defaultState();
  let current = null;
  let beat = 0;
  let typing = false;
  let typeTimer = null;
  let cursorEl = null;
  let noteTimer = null;
  let backTo = null;
  let docBackQ = null;
  let toastTimer = null;
  let selectedDuo = {};

  /* ---------- état ---------- */
  function defaultState() {
    return {
      version: 1,
      started: false,
      scene: 'bus',
      name1: '',
      name2: '',
      seen: {},
      notes: {},
      visited: {},
      completed: false,
      rulesSeen: false,
      startedAt: null
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s || s.version !== 1) return null;
      const d = defaultState();
      return Object.assign(d, s, {
        seen: Object.assign({}, s.seen || {}),
        notes: Object.assign({}, s.notes || {}),
        visited: Object.assign({}, s.visited || {})
      });
    } catch { return null; }
  }

  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch {}
    const el = $('#saveState');
    if (el) {
      el.innerHTML = '<i></i>Sauvegardé';
    }
  }

  function names() {
    const list = [state.name1, state.name2].map((n) => (n || '').trim()).filter(Boolean);
    return list.length ? list.join(' & ') : 'Binôme';
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function actOf(n) { return D.ACTS.find((a) => a.n === n) || D.ACTS[0]; }
  function sceneIndex(id) { return SCENE_ORDER.indexOf(id); }

  /* ---------- écran-titre ---------- */
  function showTitle() {
    const art = $('#art');
    art.innerHTML = ART.scenes.title();
    art.firstChild?.classList.add('scene-in');
    $('#titleScreen').classList.remove('hidden');
    $('#hud').style.display = 'none';
    $('#dialogue').style.display = 'none';
    $('#qrail').style.display = 'none';
    $('.progressline').style.display = 'none';
    $('#actStamp').style.display = 'none';
    $('#hotspots').innerHTML = '';

    $('#name1').value = state.name1 || '';
    $('#name2').value = state.name2 || '';
    const start = $('#btnStart');
    const resume = $('#btnResume');
    if (state.started) {
      start.textContent = 'Recommencer l’enquête';
      start.classList.remove('primary');
      start.classList.add('ghost');
      resume.hidden = false;
      resume.classList.remove('ghost');
      resume.classList.add('primary');
      resume.textContent = state.completed ? 'Revoir mon carnet' : 'Reprendre l’enquête';
    } else {
      start.textContent = 'Commencer l’enquête';
      start.classList.add('primary');
      start.classList.remove('ghost');
      resume.hidden = true;
    }
  }

  function begin(fresh) {
    hideModal();
    if (fresh) {
      const n1 = $('#name1').value.trim();
      const n2 = $('#name2').value.trim();
      state = defaultState();
      state.name1 = n1;
      state.name2 = n2;
      state.started = true;
      state.startedAt = Date.now();
      state.scene = 'bus';
    } else {
      state.name1 = $('#name1').value.trim() || state.name1;
      state.name2 = $('#name2').value.trim() || state.name2;
      if (!state.started) {
        state.started = true;
        state.startedAt = Date.now();
      }
    }
    save();
    $('#titleScreen').classList.add('hidden');
    ['#hud', '#dialogue', '#qrail', '.progressline', '#actStamp'].forEach((sel) => { $(sel).style.display = ''; });
    if (!state.scene || !D.SCENES[state.scene]) state.scene = 'bus';
    showScene(state.scene);
    if (fresh && !state.rulesSeen) setTimeout(() => openRules(true), 320);
  }

  /* ---------- scène ---------- */
  function showScene(id) {
    const scene = D.SCENES[id];
    if (!scene) return;
    current = scene;
    state.scene = id;
    state.visited[id] = true;
    save();

    const art = $('#art');
    art.style.opacity = '0';
    setTimeout(() => {
      art.innerHTML = ART.scenes[id]();
      art.firstChild?.classList.add('scene-in');
      art.style.opacity = '1';
    }, 140);

    const act = actOf(scene.act);
    $('#hudEyebrow').textContent = `Acte ${act.roman} · ${act.title} · 6e`;
    $('#hudTitle').textContent = scene.title;
    $('#hudPlace').textContent = scene.place;
    $('#actStamp').textContent = act.roman;
    $('#actStamp').style.color = `rgba(226,178,100,.10)`;

    renderHotspots(scene);
    renderRail(scene);
    updateProgress();
    renderDialogue();
    updateNextLabel();
  }

  function renderHotspots(scene) {
    const host = $('#hotspots');
    host.innerHTML = (scene.hotspots || []).map((h) => `
      <button class="hotspot" type="button" data-doc="${esc(h.doc)}" style="left:${h.x}%;top:${h.y}%" aria-label="${esc(h.label)}">
        <svg class="ico"><use href="#i-spark"/></svg><span class="hs-label">${esc(h.label)}</span>
      </button>`).join('');
  }

  /* ---------- dialogue ---------- */
  function renderDialogue() {
    beat = 0;
    setBeat();
  }

  function setBeat() {
    if (!current) return;
    const b = current.beats[beat];
    $('#dlgWho').textContent = b.who;
    typeText(b.text);
  }

  function typeText(text) {
    clearTimeout(typeTimer);
    const el = $('#dlgText');
    el.textContent = '';
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { el.textContent = text; typing = false; updateNextLabel(); return; }
    typing = true;
    let i = 0;
    cursorEl = document.createElement('span');
    cursorEl.className = 'cursor';
    const tick = () => {
      if (!typing) return;
      i = Math.min(text.length, i + 2);
      el.textContent = text.slice(0, i);
      if (i < text.length) {
        el.appendChild(cursorEl);
        typeTimer = setTimeout(tick, 16);
      } else {
        typing = false;
        updateNextLabel();
      }
    };
    tick();
  }

  function finishTyping() {
    if (!current || !typing) return;
    typing = false;
    clearTimeout(typeTimer);
    $('#dlgText').textContent = current.beats[beat].text;
    updateNextLabel();
  }

  function advance() {
    if (isModalOpen()) return;
    if (typing) { finishTyping(); return; }
    if (!current) return;
    if (beat < current.beats.length - 1) {
      beat += 1;
      setBeat();
      updateNextLabel();
      return;
    }
    if (!allSeen(current)) {
      const nextQ = current.questions.find((q) => !state.seen[q]);
      toast('Ouvrez les questions de cette étape pour continuer.');
      if (nextQ) setTimeout(() => openQuestion(nextQ), 260);
      return;
    }
    if (current.next) {
      const art = $('#art');
      art.style.opacity = '0';
      setTimeout(() => showScene(current.next), 160);
    } else {
      openCarnet();
    }
  }

  function updateNextLabel() {
    const btn = $('#dlgNext');
    if (!btn || !current) return;
    const last = beat >= current.beats.length - 1;
    const all = allSeen(current);
    let label = 'Continuer';
    if (last) {
      if (!all) label = 'Questions';
      else if (!current.next) label = 'Ouvrir mon carnet';
      else label = 'Continuer';
    }
    btn.innerHTML = `${label} <svg class="ico"><use href="#i-arrow"/></svg>`;
    btn.classList.toggle('locked', last && !all);
    btn.classList.toggle('ready', last && all);
  }

  function allSeen(scene) {
    return (scene.questions || []).every((q) => Boolean(state.seen[q]));
  }

  function allQuestionsSeen() {
    return Object.values(D.QUESTIONS).every((q) => Boolean(state.seen[q.id]));
  }

  /* ---------- rail ---------- */
  function renderRail(scene) {
    const rail = $('#qrail');
    if (!scene.questions.length) { rail.innerHTML = ''; return; }
    rail.innerHTML = `<p class="qrail-head">Questions · ${scene.questions.length}</p>` +
      scene.questions.map((qid) => {
        const q = D.QUESTIONS[qid];
        const done = Boolean(state.seen[qid]);
        return `<button class="qchip ${done ? 'done' : ''}" type="button" data-q="${qid}">
          <span class="num">${done ? '✓' : q.n}</span>
          <span><span class="qt">${esc(q.title)}</span><span class="qs">${done ? 'Question ouverte' : 'À ouvrir'}</span></span>
        </button>`;
      }).join('') +
      `<p class="qrail-hint">${allSeen(scene) ? 'Toutes les questions sont ouvertes. Continuez l’enquête.' : 'Ouvrez chaque question avant de continuer.'}</p>`;
  }

  /* ---------- progression ---------- */
  function updateProgress() {
    const seen = Object.keys(state.seen).filter((k) => D.QUESTIONS[k]).length;
    $('#progressLabel').textContent = `${seen} / ${TOTAL} questions`;
    $('#carnetCount').textContent = `${seen}/${TOTAL}`;
    $('#progressBar').style.width = `${Math.round((seen / TOTAL) * 100)}%`;
    const idx = sceneIndex(state.scene);
    $('#sceneCounter').textContent = `Étape ${idx >= 0 ? idx + 1 : 1} / ${SCENE_ORDER.length}`;
  }

  /* ---------- modale ---------- */
  function isModalOpen() { return $('#modalLayer').classList.contains('open'); }

  function openModal(html, className = '') {
    const panel = $('#panel');
    panel.className = `panel ${className}`.trim();
    panel.innerHTML = html;
    const layer = $('#modalLayer');
    layer.classList.add('open');
    layer.setAttribute('aria-hidden', 'false');
    const body = $('.panel-body', panel);
    if (body) body.scrollTop = 0;
  }

  function hideModal() {
    const layer = $('#modalLayer');
    layer.classList.remove('open');
    layer.setAttribute('aria-hidden', 'true');
    $('#panel').innerHTML = '';
    backTo = null;
    docBackQ = null;
  }

  function closeModal() {
    if (backTo) {
      const target = backTo;
      backTo = null;
      if (target === 'carnet') { openCarnet(); return; }
      if (target === 'map') { openMap(); return; }
    }
    hideModal();
  }

  function head(kicker, title) {
    return `<div class="panel-head">
      <div><p class="panel-kicker">${esc(kicker)}</p><h2 id="panelTitle">${esc(title)}</h2></div>
      <button class="panel-close" type="button" data-close aria-label="Fermer"><svg class="ico"><use href="#i-close"/></svg></button>
    </div>`;
  }

  /* ---------- question ---------- */
  function openQuestion(qid, back = null) {
    const q = D.QUESTIONS[qid];
    if (!q) return;
    backTo = back;
    docBackQ = null;
    if (!state.seen[qid]) {
      state.seen[qid] = true;
      save();
      if (current) renderRail(current);
      updateProgress();
      updateNextLabel();
    }
    selectedDuo = {};
    const act = actOf(q.act);
    let interaction = '';

    if (q.kind === 'choice') {
      interaction = `<div class="q-options" data-choice="${q.id}">
        ${q.options.map((o, i) => `<button class="q-option" type="button" data-opt="${i}"><span class="letter">${'ABCD'[i]}</span>${esc(o)}</button>`).join('')}
      </div><div class="q-feedback" id="qFeedback"></div>`;
    } else if (q.kind === 'duo') {
      interaction = `<div class="q-parts">
        ${q.parts.map((p, pi) => `<div class="q-part"><span class="part-label">${esc(p.label)}</span>
          <div class="q-options">${p.options.map((o, oi) => `<button class="q-option" type="button" data-part="${pi}" data-opt="${oi}"><span class="letter">${'ABCD'[oi]}</span>${esc(o)}</button>`).join('')}</div>
        </div>`).join('')}
      </div>
      <button class="btn ghost small" type="button" id="duoCheck">Vérifier mes réponses</button>
      <div class="q-feedback" id="qFeedback"></div>`;
    } else if (q.kind === 'ticket') {
      interaction = `<div class="ticket-wrap" id="ticketWrap">
        ${ART.docs.billet()}
        <button class="ticket-zone" type="button" data-zone="city" data-label="ΑΘΗΝΑ · Athènes" style="left:8%;top:16.5%;width:25%;height:7%"></button>
        <button class="ticket-zone" type="button" data-zone="museum" data-label="ΜΟΥΣΕΙΟ ΑΚΡΟΠΟΛΗΣ" style="left:12%;top:27%;width:50%;height:13%"></button>
        <button class="ticket-zone" type="button" data-zone="owl" data-label="La chouette" style="left:66%;top:10%;width:12%;height:16%"></button>
      </div>
      <p class="q-sub">Touchez le lieu où vous devez vous rendre sur le billet.</p>
      <div class="q-feedback" id="qFeedback"></div>`;
    }

    const docBtn = q.doc ? `<button class="btn ghost small" type="button" data-doc="${q.doc}" data-back-q="${q.id}">Ouvrir le document</button>` : '';
    const searchBtn = q.search ? `<a class="icon-btn" href="https://www.google.com/search?q=${encodeURIComponent(q.search)}" target="_blank" rel="noopener" title="Rechercher sur internet"><svg class="ico"><use href="#i-wifi"/></svg><span>Rechercher</span></a>` : '';
    const vocab = q.vocab ? `<div class="q-vocab"><b>${esc(q.vocab.term)}</b> — ${esc(q.vocab.def)}</div>` : '';
    const sub = q.sub ? `<p class="q-sub">${esc(q.sub)}</p>` : '';

    openModal(`
      ${head(`Question ${q.n} · Acte ${act.roman}`, q.title)}
      <div class="panel-body">
        <div class="q-meta"><span class="q-num">Question ${q.n}</span><span class="q-act">${esc(act.title)} · ${TOTAL} questions</span></div>
        <p class="q-prompt">${esc(q.prompt)}</p>
        ${sub}
        ${docBtn}
        ${interaction}
        <details class="q-hint"><summary>Coup de pouce</summary><div class="hint-body">${esc(q.hint || '')}</div></details>
        ${vocab}
        <div class="q-notes">
          <label for="qNotes">Mon brouillon (facultatif)</label>
          <textarea id="qNotes" placeholder="Notez ici vos idées, vos phrases ou les mots-clés de votre réponse…">${esc(state.notes[qid] || '')}</textarea>
          <p class="hintline">Le brouillon reste sur cet iPad. La réponse finale se rédige sur la feuille.</p>
        </div>
      </div>
      <div class="panel-foot">
        <span class="foot-note">Question ${q.n} sur ${TOTAL}</span>
        <div class="foot-actions">${searchBtn}<button class="btn primary small" type="button" data-save-close="${q.id}">Enregistrer et fermer</button></div>
      </div>`);

    bindQuestion(q);
  }

  function bindQuestion(q) {
    const panel = $('#panel');
    const ta = $('#qNotes', panel);
    if (ta) {
      ta.addEventListener('input', () => {
        clearTimeout(noteTimer);
        noteTimer = setTimeout(() => { state.notes[q.id] = ta.value; save(); }, 400);
      });
      ta.addEventListener('blur', () => { state.notes[q.id] = ta.value; save(); });
    }

    if (q.kind === 'choice') {
      $$('.q-option', panel).forEach((btn) => {
        btn.addEventListener('click', () => {
          const i = Number(btn.dataset.opt);
          const ok = i === q.correct;
          $$('.q-option', panel).forEach((b) => b.classList.remove('selected', 'correct', 'wrong'));
          btn.classList.add(ok ? 'correct' : 'wrong');
          const fb = $('#qFeedback', panel);
          fb.className = `q-feedback show ${ok ? 'good' : 'bad'}`;
          fb.textContent = ok ? q.good : q.bad;
        });
      });
    }

    if (q.kind === 'duo') {
      $$('.q-option[data-part]', panel).forEach((btn) => {
        btn.addEventListener('click', () => {
          const pi = Number(btn.dataset.part);
          selectedDuo[pi] = Number(btn.dataset.opt);
          $$(`.q-option[data-part="${pi}"]`, panel).forEach((b) => b.classList.remove('selected'));
          btn.classList.add('selected');
        });
      });
      const check = $('#duoCheck', panel);
      check.addEventListener('click', () => {
        const complete = q.parts.every((p, pi) => selectedDuo[pi] !== undefined);
        if (!complete) { toast('Choisissez une réponse pour chaque partie.'); return; }
        let allOk = true;
        q.parts.forEach((p, pi) => {
          const choice = selectedDuo[pi];
          $$(`.q-option[data-part="${pi}"]`, panel).forEach((b) => {
            const oi = Number(b.dataset.opt);
            b.classList.remove('correct', 'wrong', 'selected');
            if (oi === p.correct) b.classList.add('correct');
            else if (oi === choice) b.classList.add('wrong');
          });
          if (choice !== p.correct) allOk = false;
        });
        const fb = $('#qFeedback', panel);
        fb.className = `q-feedback show ${allOk ? 'good' : 'bad'}`;
        fb.textContent = allOk
          ? 'Exact ! La chouette conduit à Athènes, la cité d’Athéna.'
          : 'Pas encore. La chouette est le symbole d’Athènes et de sa déesse protectrice, Athéna.';
      });
    }

    if (q.kind === 'ticket') {
      $$('.ticket-zone', panel).forEach((zone) => {
        zone.addEventListener('click', () => {
          const ok = zone.dataset.zone === 'museum';
          $$('.ticket-zone', panel).forEach((z) => z.classList.remove('correct', 'wrong'));
          zone.classList.add(ok ? 'correct' : 'wrong');
          const fb = $('#qFeedback', panel);
          fb.className = `q-feedback show ${ok ? 'good' : 'bad'}`;
          fb.textContent = ok
            ? 'Bravo ! Vous êtes au musée de l’Acropole. Théodoros y a laissé un nouvel indice.'
            : 'Ce n’est pas le lieu. Cherchez le mot grec ΜΟΥΣΕΙΟ, qui signifie « musée ».';
        });
      });
    }
  }

  /* ---------- documents ---------- */
  function openDoc(key, backQ = null) {
    const d = D.DOCS[key];
    if (!d) return;
    docBackQ = backQ;
    const art = ART.docs[key] ? ART.docs[key]() : '';
    const loupe = d.zoom ? `<button class="btn ghost small" type="button" id="docLoupe">Loupe</button>` : '';
    const zoom = d.zoom ? `<div class="doc-zoom" id="docZoom"><p>${esc(d.zoomText || '')}</p></div>` : '';
    openModal(`
      ${head(d.kicker, d.title)}
      <div class="panel-body">
        <div class="doc-art" id="docArt">${art}</div>
        <p class="doc-caption">${esc(d.caption)}</p>
        <div class="doc-body">${d.body}</div>
        ${zoom}
      </div>
      <div class="panel-foot">
        <span class="foot-note">Document · ${esc(d.kicker.split('·')[1] || 'indice')}</span>
        <div class="foot-actions">${loupe}${backQ ? '<button class="btn ghost small" type="button" data-doc-back>Revenir à la question</button>' : ''}<button class="btn primary small" type="button" data-close>Fermer</button></div>
      </div>`);

    const artEl = $('#docArt');
    const zoomEl = $('#docZoom');
    const loupeBtn = $('#docLoupe');
    if (d.zoom && artEl) {
      artEl.style.setProperty('--z', d.zoom.scale);
      artEl.style.setProperty('--x', d.zoom.x);
      artEl.style.setProperty('--y', d.zoom.y);
      loupeBtn.addEventListener('click', () => {
        const on = artEl.classList.toggle('zoomed');
        if (zoomEl) zoomEl.classList.toggle('show', on);
        loupeBtn.textContent = on ? 'Vue d’ensemble' : 'Loupe';
      });
    }
  }

  /* ---------- consignes ---------- */
  function openRules(first = false) {
    const html = D.RULES.map((r) => `<div class="rule"><span class="ic"><svg class="ico"><use href="#${r.icon}"/></svg></span><div><h4>${esc(r.title)}</h4><p>${esc(r.text)}</p></div></div>`).join('');
    openModal(`
      ${head('Avant de partir', 'Les consignes de l’enquête')}
      <div class="panel-body">
        <p class="doc-body" style="margin-top:0">Vous êtes en binôme. Cette application raconte l’enquête et donne les indices ; c’est vous qui rédigez les réponses sur votre feuille.</p>
        <div class="rules">${html}</div>
        <div class="doc-highlight" style="margin-top:1cqw">Votre mission : retrouver Théodoros, le guide disparu, et comprendre ce que son parcours révèle du monde des cités grecques.</div>
      </div>
      <div class="panel-foot">
        <span class="foot-note">6 actes · 19 questions · environ 55 minutes</span>
        <div class="foot-actions"><button class="btn primary" type="button" data-close>${first ? 'Commencer' : 'J’ai compris'}</button></div>
      </div>`);
  }

  /* ---------- carte ---------- */
  function currentStop() {
    const id = state.scene;
    if (id === 'bus') return 1;
    if (id === 'ferry') return 2;
    if (id === 'patras' || id === 'chambre') return 3;
    if (id === 'delphes' || id === 'stade' || id === 'pythie' || id === 'monnaie') return 4;
    if (id === 'athenes' || id === 'cite' || id === 'musee' || id === 'poseidon') return 5;
    return 6;
  }

  function mapSvg() {
    const here = currentStop();
    const stops = D.MAP_STOPS.map((s) => {
      const x = s.x * 10, y = s.y * 5.6;
      const done = s.n < here, cur = s.n === here;
      return `<g>
        <circle cx="${x}" cy="${y}" r="${cur ? 15 : 11}" fill="${cur ? '#f7dfae' : done ? '#e2b264' : '#0a141c'}" stroke="${cur ? '#f7dfae' : '#e2b264'}" stroke-width="2.5"/>
        <text x="${x}" y="${y + 4}" text-anchor="middle" font-family="Georgia,serif" font-size="${cur ? 14 : 11}" fill="${cur || done ? '#1b1205' : '#e2b264'}">${s.n}</text>
        <text x="${x + 18}" y="${y + 5}" font-family="Georgia,serif" font-size="15" fill="#f4ead6">${esc(s.place)}</text>
        <text x="${x + 18}" y="${y + 23}" font-family="Arial,sans-serif" font-size="10" fill="#bcb09a">${esc(s.detail)}</text>
      </g>`;
    }).join('');
    return `<svg viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="1000" height="560" fill="#0b2330"/>
      <rect y="330" width="1000" height="230" fill="#164a58"/>
      <path d="M0 330c120-40 220-20 320 10s200 20 320-10 180-20 360 0v230H0z" fill="#1d5f6b" opacity=".7"/>
      <path d="M40 200c60-30 120-20 170 10s110 20 160-10 110-20 160 10 110 20 170-10 110-20 160 10 90 10 90 10v160c-100-30-180-20-260 10s-160 20-240-10-160-20-240 10-160 20-220-10z" fill="#c9b58f"/>
      <path d="M40 200c60-30 120-20 170 10s110 20 160-10 110-20 160 10 110 20 170-10 110-20 160 10 90 10 90 10v40c-100-20-180-10-260 20s-160 20-240-10-160-20-240 10-160 20-220-10z" fill="#d8cbb2" opacity=".6"/>
      <path d="M180 330C300 250 420 230 520 250s200 30 300 0 140-30 180-20" fill="none" stroke="#e2b264" stroke-width="4" stroke-dasharray="10 10" opacity=".8"/>
      <path d="M180 330c80-30 180-50 280-40s200 30 300 20 120-20 160-10" fill="none" stroke="#f7dfae" stroke-width="1.5" opacity=".3"/>
      ${stops}
      <text x="60" y="60" font-family="Georgia,serif" font-size="26" fill="#f7dfae" letter-spacing="3">LA PISTE DE THÉODOROS</text>
      <text x="60" y="88" font-family="Arial,sans-serif" font-size="14" fill="#bcb09a">De Montpellier au cap Sounion · carte schématique</text>
      <g transform="translate(860 470)" fill="none" stroke="#e2b264" stroke-width="1.5" opacity=".6"><circle r="30"/><path d="M0-20 5 0 0 20-5 0z" fill="#e2b264"/><text x="-4" y="-34" font-family="Georgia,serif" font-size="12" fill="#e2b264">N</text></g>
      <rect width="1000" height="560" fill="none" stroke="#e2b264" stroke-width="2" opacity=".3"/>
    </svg>`;
  }

  function openMap() {
    const here = currentStop();
    const legend = D.MAP_STOPS.map((s) => `<div class="map-leg ${s.n < here ? 'done' : ''} ${s.n === here ? 'current' : ''}"><span class="n">${s.n}</span><span><span class="t">${esc(s.place)}</span><span class="s">${esc(s.detail)}</span></span></div>`).join('');
    openModal(`
      ${head('Carte du voyage', 'La piste de Théodoros')}
      <div class="panel-body">
        <div class="map-wrap">${mapSvg()}</div>
        <div class="map-legend">${legend}</div>
      </div>
      <div class="panel-foot">
        <span class="foot-note">${here} / 6 étapes</span>
        <div class="foot-actions"><button class="btn primary small" type="button" data-close>Fermer</button></div>
      </div>`);
  }

  /* ---------- carnet ---------- */
  function openCarnet(tab = 'answers') {
    backTo = null;
    const seen = Object.keys(state.seen).filter((k) => D.QUESTIONS[k]).length;
    const done = allQuestionsSeen();
    const tabs = `<div class="carnet-tabs">
      <button class="carnet-tab ${tab === 'answers' ? 'active' : ''}" type="button" data-tab="answers">Mes réponses</button>
      <button class="carnet-tab ${tab === 'conclusions' ? 'active' : ''}" type="button" data-tab="conclusions">À retenir</button>
    </div>`;

    let content = '';
    if (tab === 'conclusions') {
      content = `<div class="carnet-cards">${D.CONCLUSIONS.map((c) => `<div class="carnet-card"><h4>${esc(c.title)}</h4><p>${esc(c.text)}</p></div>`).join('')}</div>`;
    } else {
      content = `<div class="carnet-list">${Object.values(D.QUESTIONS).sort((a, b) => a.n - b.n).map((q) => {
        const isDone = Boolean(state.seen[q.id]);
        const note = (state.notes[q.id] || '').trim();
        return `<div class="carnet-item ${isDone ? 'done' : ''}">
          <span class="n">${isDone ? '✓' : q.n}</span>
          <div class="body">
            <p class="qt">${esc(q.title)}</p>
            <p class="st">Question ${q.n} · ${isDone ? 'ouverte' : 'à ouvrir'}</p>
            ${note ? `<p class="note">${esc(note)}</p>` : ''}
          </div>
          <button class="edit" type="button" data-open-q="${q.id}">${isDone ? 'Revoir' : 'Ouvrir'}</button>
        </div>`;
      }).join('')}</div>`;
    }

    const finish = done
      ? `<button class="btn primary small" type="button" data-complete>Terminer l’enquête</button>`
      : `<span class="foot-note">Ouvrez les 19 questions pour terminer.</span>`;
    const complete = state.completed
      ? `<button class="btn ghost small" type="button" data-complete>Voir la fin</button>`
      : finish;

    openModal(`
      ${head('Mon carnet', 'Conclusions de l’enquête')}
      <div class="panel-body">
        ${tabs}
        ${content}
      </div>
      <div class="panel-foot">
        <span class="foot-note">${seen} / ${TOTAL} questions · ${esc(names())}</span>
        <div class="foot-actions">
          <button class="btn ghost small" type="button" data-print><svg class="ico"><use href="#i-print"/></svg>Imprimer</button>
          ${complete}
          <button class="btn ghost small" type="button" data-close>Fermer</button>
        </div>
      </div>`);
  }

  /* ---------- fin ---------- */
  function laurelSvg() {
    let leaves = '';
    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < 9; i++) {
        const a = (-1.2 + i * .16) * side - Math.PI / 2;
        const x = 50 + Math.cos(a) * (34 - i * 1.2);
        const y = 50 + Math.sin(a) * (34 - i * 1.2);
        leaves += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="2.8" transform="rotate(${((a * 180) / Math.PI + 90).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
      }
    }
    return `<svg class="laurel" viewBox="0 0 100 100" fill="currentColor"><g>${leaves}</g><path d="M50 84q4-14 0-26" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
  }

  function complete() {
    if (!allQuestionsSeen()) { toast('Ouvrez encore quelques questions avant de terminer.'); return; }
    state.completed = true;
    save();
    const minutes = state.startedAt ? Math.max(1, Math.round((Date.now() - state.startedAt) / 60000)) : 1;
    openModal(`
      <div class="complete">
        ${laurelSvg()}
        <h2>Enquête terminée</h2>
        <p class="sub">${esc(names())}, vous avez suivi la piste de Théodoros de Montpellier au cap Sounion.</p>
        <div class="stats">
          <div class="stat"><b>${TOTAL}/${TOTAL}</b><span>questions</span></div>
          <div class="stat"><b>6</b><span>actes</span></div>
          <div class="stat"><b>${minutes} min</b><span>d’enquête</span></div>
        </div>
        <div class="actions">
          <button class="btn primary" type="button" data-carnet>Revoir mon carnet</button>
          <button class="btn ghost" type="button" data-restart>Recommencer</button>
        </div>
        <p class="foot-note" style="margin-top:1.1cqw;color:var(--dim)">Le carnet peut être imprimé pour garder une trace de vos réponses.</p>
      </div>`);
  }

  /* ---------- impression ---------- */
  function printCarnet() {
    const rows = Object.values(D.QUESTIONS).sort((a, b) => a.n - b.n).map((q) => `
      <div class="print-q">
        <div class="n">Question ${q.n} — ${esc(q.title)}</div>
        <div class="p">${esc(q.prompt)}${q.sub ? `<br><i>${esc(q.sub)}</i>` : ''}</div>
        <div class="lines"></div><div class="lines"></div><div class="lines"></div>
      </div>`).join('');
    const notes = Object.values(D.QUESTIONS).sort((a, b) => a.n - b.n).filter((q) => (state.notes[q.id] || '').trim()).map((q) => `<li><b>Question ${q.n}.</b> ${esc(state.notes[q.id])}</li>`).join('');
    $('#printRoot').innerHTML = `
      <div class="print-head">
        <h1>Le monde des cités grecques — mon carnet d’enquête</h1>
        <p class="print-sub">Sur la piste de Théodoros · Histoire · 6e</p>
      </div>
      <p class="print-names">Binôme : ${esc(names())} — Classe : ........ — Date : ....... / ....... / 2026</p>
      ${rows}
      ${notes ? `<div class="print-answers"><h3>Mes brouillons</h3><ul>${notes}</ul></div>` : ''}
      <p class="print-foot">Le monde des cités grecques · adaptation interactive de l’enquête de Yannick Sanchez · 2026</p>`;
    window.print();
  }

  /* ---------- toast ---------- */
  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }

  /* ---------- événements ---------- */
  function bindEvents() {
    $('#btnStart').addEventListener('click', () => {
      if (state.started) {
        if (!window.confirm('Recommencer l’enquête ? Les brouillons enregistrés seront effacés.')) return;
        begin(true);
      } else {
        begin(true);
      }
    });

    $('#btnResume').addEventListener('click', () => {
      if (state.completed) { openCarnet('conclusions'); return; }
      begin(false);
    });

    $('#btnMap').addEventListener('click', openMap);
    $('#btnCarnet').addEventListener('click', () => openCarnet());
    $('#btnHelp').addEventListener('click', () => openRules(false));

    $('#dlgNext').addEventListener('click', advance);
    $('#dlgText').addEventListener('click', advance);

    $('#qrail').addEventListener('click', (e) => {
      const chip = e.target.closest('[data-q]');
      if (chip) openQuestion(chip.dataset.q);
    });
    $('#hotspots').addEventListener('click', (e) => {
      const spot = e.target.closest('[data-doc]');
      if (spot) openDoc(spot.dataset.doc);
    });

    $('#modalLayer').addEventListener('click', (e) => {
      if (e.target === $('#modalLayer')) { closeModal(); return; }
      const t = e.target;

      if (t.closest('[data-close]')) { closeModal(); return; }
      if (t.closest('[data-doc-back]')) {
        const qid = docBackQ;
        if (qid) { docBackQ = null; openQuestion(qid, backTo); }
        return;
      }
      if (t.closest('[data-doc]')) {
        const el = t.closest('[data-doc]');
        const backQ = el.dataset.backQ || null;
        openDoc(el.dataset.doc, backQ);
        return;
      }
      if (t.closest('[data-q]')) { openQuestion(t.closest('[data-q]').dataset.q); return; }
      if (t.closest('[data-open-q]')) {
        const qid = t.closest('[data-open-q]').dataset.openQ;
        openQuestion(qid, 'carnet');
        return;
      }
      if (t.closest('[data-tab]')) { openCarnet(t.closest('[data-tab]').dataset.tab); return; }
      if (t.closest('[data-print]')) { printCarnet(); return; }
      if (t.closest('[data-complete]')) { complete(); return; }
      if (t.closest('[data-carnet]')) { openCarnet('conclusions'); return; }
      if (t.closest('[data-restart]')) {
        if (window.confirm('Recommencer l’enquête ? Les brouillons enregistrés seront effacés.')) {
          begin(true);
        }
        return;
      }
      if (t.closest('[data-save-close]')) {
        const qid = t.closest('[data-save-close]').dataset.saveClose;
        const ta = $('#qNotes');
        if (qid && ta) { state.notes[qid] = ta.value; save(); }
        closeModal();
        toast('Brouillon enregistré sur cet iPad.');
        return;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { if (isModalOpen()) closeModal(); return; }
      if (isModalOpen()) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
        e.preventDefault();
        advance();
      }
    });
  }

  /* ---------- démarrage ---------- */
  function init() {
    bindEvents();
    const params = new URLSearchParams(location.search);
    const isLocal = location.protocol === 'file:' || ['localhost', '127.0.0.1'].includes(location.hostname);
    if (isLocal && params.get('cover')) document.body.classList.add('cover-mode');
    const debugScene = isLocal ? params.get('scene') : null;
    if (debugScene && D.SCENES[debugScene]) {
      $('#game').classList.add('debug');
      state.started = true;
      state.scene = debugScene;
      state.name1 = state.name1 || 'Démo';
      $('#titleScreen').classList.add('hidden');
      ['#hud', '#dialogue', '#qrail', '.progressline', '#actStamp'].forEach((sel) => { $(sel).style.display = ''; });
      showScene(debugScene);
      const q = params.get('q');
      const doc = params.get('doc');
      if (q && D.QUESTIONS[q]) setTimeout(() => openQuestion(q), 650);
      else if (doc && D.DOCS[doc]) setTimeout(() => openDoc(doc), 650);
      else if (params.get('rules')) setTimeout(() => openRules(false), 500);
      else if (params.get('carnet')) setTimeout(() => openCarnet(params.get('carnet') === 'conclusions' ? 'conclusions' : 'answers'), 650);
      else if (params.get('map')) setTimeout(() => openMap(), 650);
      else if (params.get('finish')) {
        Object.keys(D.QUESTIONS).forEach((k) => { state.seen[k] = true; });
        setTimeout(() => complete(), 700);
      }
      return;
    }
    showTitle();
    updateProgress();
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
      window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
