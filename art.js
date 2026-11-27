/* ============================================================
   LE MONDE DES CITÉS GRECQUES — décors et documents (SVG)
   Toutes les illustrations sont originales : restitutions
   graphiques, sans photographies de manuels.
   ============================================================ */
(function () {
  'use strict';

  const C = {
    night: '#040d14', deep: '#071a24', sea: '#0d3b4a', sea2: '#1d6b78',
    gold: '#e2b264', gold2: '#f7dfae', gold3: '#a8782d',
    ivory: '#f4ead6', muted: '#bcb09a', terra: '#c06a48', terra2: '#8f4530',
    marble: '#d9cdb8', marble2: '#b7a98f', bronze: '#9a6a35',
    olive: '#6f7d56', olive2: '#4f5c3c', ink: '#2c2822'
  };

  let seq = 0;

  function svg(w, h, body) {
    const u = 'g' + (++seq) + '_';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">${defs(u)}${body(u)}${dots(u, w, h)}</svg>`;
  }

  function defs(u) {
    return `<defs>
      <linearGradient id="${u}night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#02070b"/><stop offset=".52" stop-color="#08202b"/><stop offset="1" stop-color="#0d3542"/>
      </linearGradient>
      <linearGradient id="${u}dawn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1b2c46"/><stop offset=".42" stop-color="#7b4a45"/><stop offset=".72" stop-color="#e8a866"/><stop offset="1" stop-color="#f3cf9b"/>
      </linearGradient>
      <linearGradient id="${u}day" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7fb6c4"/><stop offset=".55" stop-color="#cfe0d8"/><stop offset="1" stop-color="#f3e6c8"/>
      </linearGradient>
      <linearGradient id="${u}sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0a2632"/><stop offset=".55" stop-color="#145a68"/><stop offset="1" stop-color="#2b8b96"/>
      </linearGradient>
      <linearGradient id="${u}seaDawn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#243a4a"/><stop offset=".5" stop-color="#8a5a4a"/><stop offset="1" stop-color="#d99a63"/>
      </linearGradient>
      <linearGradient id="${u}gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f7dfae"/><stop offset=".55" stop-color="#e2b264"/><stop offset="1" stop-color="#a8782d"/>
      </linearGradient>
      <linearGradient id="${u}marble" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4ead6"/><stop offset=".6" stop-color="#e2d5bd"/><stop offset="1" stop-color="#b7a98f"/>
      </linearGradient>
      <linearGradient id="${u}bronze" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#d9a35a"/><stop offset=".45" stop-color="#9a6a35"/><stop offset="1" stop-color="#4f3418"/>
      </linearGradient>
      <linearGradient id="${u}silver" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f2f0e8"/><stop offset=".4" stop-color="#c7c4b8"/><stop offset=".7" stop-color="#8e8f88"/><stop offset="1" stop-color="#d8d5c9"/>
      </linearGradient>
      <radialGradient id="${u}glow"><stop offset="0" stop-color="#f7dfae" stop-opacity=".55"/><stop offset=".5" stop-color="#e2b264" stop-opacity=".16"/><stop offset="1" stop-color="#e2b264" stop-opacity="0"/></radialGradient>
      <radialGradient id="${u}moon"><stop offset="0" stop-color="#fff8e6"/><stop offset=".68" stop-color="#f3dfae"/><stop offset="1" stop-color="#d9b978"/></radialGradient>
      <radialGradient id="${u}sun"><stop offset="0" stop-color="#fff3c9"/><stop offset=".55" stop-color="#f6c877"/><stop offset="1" stop-color="#e08a4a"/></radialGradient>
      <linearGradient id="${u}shadow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02060a" stop-opacity="0"/><stop offset="1" stop-color="#02060a" stop-opacity=".9"/></linearGradient>
      <pattern id="${u}dots" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#f4ead6" opacity=".055"/></pattern>
      <filter id="${u}soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="9"/></filter>
      <filter id="${u}soft2" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="24"/></filter>
    </defs>`;
  }

  function dots(u, w, h) { return `<rect width="${w}" height="${h}" fill="url(#${u}dots)"/>`; }

  function stars(n = 90, seed = 7, maxY = 520) {
    let out = '', s = seed;
    const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    for (let i = 0; i < n; i++) {
      const x = rnd() * 1600, y = rnd() * maxY, r = rnd() * 1.35 + .3;
      out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(2)}" fill="#f4ead6" opacity="${(.16 + rnd() * .55).toFixed(2)}"/>`;
    }
    return out;
  }

  function sea(u, y, h = 900, extra = '') {
    return `<rect x="0" y="${y}" width="1600" height="${h - y}" fill="url(#${u}sea)"/>
    <g opacity=".35" stroke="#bfe3e4" fill="none" stroke-width="2">
      <path d="M0 ${y + 46}q60 -10 120 0t120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0" opacity=".35"/>
      <path d="M-40 ${y + 105}q70 -12 140 0t140 0 140 0 140 0 140 0 140 0 140 0 140 0" opacity=".28"/>
      <path d="M-80 ${y + 178}q80 -14 160 0t160 0 160 0 160 0 160 0 160 0 160 0" opacity=".2"/>
    </g>${extra}`;
  }

  function sun(u, cx, cy, r, fill = `url(#${u}sun)`) {
    return `<circle cx="${cx}" cy="${cy}" r="${r * 2.6}" fill="url(#${u}glow)"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
  }

  function moon(u, cx, cy, r) {
    return `<circle cx="${cx}" cy="${cy}" r="${r * 3}" fill="url(#${u}glow)" opacity=".7"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${u}moon)"/>
    <circle cx="${cx - r * .28}" cy="${cy - r * .18}" r="${r * .14}" fill="#d9b978" opacity=".35"/>
    <circle cx="${cx + r * .22}" cy="${cy + r * .24}" r="${r * .1}" fill="#d9b978" opacity=".25"/>`;
  }

  function mountain(pts, fill, opacity = 1) {
    return `<path d="${pts}" fill="${fill}" opacity="${opacity}"/>`;
  }

  function column(u, x, y, h, w, fill = 'url(#marble)', flutes = true) {
    const cap = w * .22;
    return `<g>
      <rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="${fill}"/>
      <rect x="${x - w / 2 - cap * .5}" y="${y - h - cap}" width="${w + cap}" height="${cap}" fill="${fill}"/>
      <rect x="${x - w / 2 - cap * .8}" y="${y - cap * .38}" width="${w + cap * 1.6}" height="${cap * .38}" fill="${fill}"/>
      <rect x="${x - w / 2 - cap * .4}" y="${y - cap * .1}" width="${w + cap * .8}" height="${cap * .35}" fill="${fill}"/>
      ${flutes ? `<g stroke="#7c6f5a" stroke-width="${Math.max(.7, w * .035)}" opacity=".28"><line x1="${x - w * .22}" y1="${y - h + cap}" x2="${x - w * .22}" y2="${y - cap}"/><line x1="${x + w * .22}" y1="${y - h + cap}" x2="${x + w * .22}" y2="${y - cap}"/></g>` : ''}
    </g>`;
  }

  function temple(x, y, w, h, opts = {}) {
    const n = opts.columns || 6, fill = opts.fill || 'url(#marble)', lit = opts.lit || false;
    const baseH = h * .07, colH = h * .58, entH = h * .15, pedH = h * .2;
    const top = y - baseH - colH - entH - pedH;
    const gap = w / n, cw = gap * .46;
    let out = `<g>`;
    // marches
    out += `<rect x="${x - w * .04}" y="${y - baseH * .35}" width="${w * 1.08}" height="${baseH * .35}" fill="${fill}" opacity=".92"/>`;
    out += `<rect x="${x - w * .02}" y="${y - baseH * .7}" width="${w * 1.04}" height="${baseH * .35}" fill="${fill}"/>`;
    out += `<rect x="${x}" y="${y - baseH}" width="${w}" height="${baseH * .35}" fill="${fill}"/>`;
    // colonnes
    for (let i = 0; i < n; i++) {
      const cx = x + gap * (i + .5);
      out += column('', cx, y - baseH, colH, cw, fill, true);
    }
    // entablement
    out += `<rect x="${x - w * .015}" y="${y - baseH - colH - entH}" width="${w * 1.03}" height="${entH * .38}" fill="${fill}"/>`;
    out += `<rect x="${x - w * .01}" y="${y - baseH - colH - entH * .62}" width="${w * 1.02}" height="${entH * .3}" fill="${fill}" opacity=".92"/>`;
    out += `<g fill="${lit ? '#e8c07a' : '#7c6f5a'}" opacity="${lit ? .55 : .25}">`;
    for (let i = 0; i < n * 2; i++) out += `<rect x="${x + (w / (n * 2)) * i + 4}" y="${y - baseH - colH - entH * .62}" width="${(w / (n * 2)) * .4}" height="${entH * .3}"/>`;
    out += `</g>`;
    // fronton
    out += `<path d="M${x - w * .03} ${y - baseH - colH - entH} L${x + w / 2} ${top} L${x + w * 1.03} ${y - baseH - colH - entH} Z" fill="${fill}"/>`;
    out += `<path d="M${x + w * .05} ${y - baseH - colH - entH - 4} L${x + w / 2} ${top + pedH * .22} L${x + w * .95} ${y - baseH - colH - entH - 4} Z" fill="#2c2822" opacity="${lit ? .35 : .55}"/>`;
    out += `<circle cx="${x + w / 2}" cy="${top - 4}" r="${h * .022}" fill="${fill}"/>`;
    out += `<circle cx="${x - w * .03}" cy="${y - baseH - colH - entH}" r="${h * .018}" fill="${fill}"/>`;
    out += `<circle cx="${x + w * 1.03}" cy="${y - baseH - colH - entH}" r="${h * .018}" fill="${fill}"/>`;
    out += `</g>`;
    return out;
  }

  function cypress(x, y, h, fill = '#2f3a2b') {
    return `<path d="M${x} ${y} C${x - h * .16} ${y - h * .3} ${x - h * .13} ${y - h * .72} ${x} ${y - h} C${x + h * .13} ${y - h * .72} ${x + h * .16} ${y - h * .3} ${x} ${y}Z" fill="${fill}"/>`;
  }

  function olive(x, y, s, fill = '#4d5a3d') {
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}">
      <path d="M0 0c-4-24 4-42 14-58 3 20 2 40-2 58z"/>
      <path d="M10-40c-18-8-32-4-44 8 16 4 30 2 44-8z" opacity=".85"/>
      <path d="M12-46c16-12 32-12 46-2-16 8-31 9-46 2z" opacity=".85"/>
      <path d="M8-28c-14 0-24 8-30 20 14 0 24-6 30-20z" opacity=".75"/>
    </g>`;
  }

  function figure(x, y, s, fill = '#02070b', pose = 'stand') {
    const arm = pose === 'wave' ? `<path d="M8-42 24-62" stroke="${fill}" stroke-width="5" stroke-linecap="round"/>` :
      pose === 'guide' ? `<path d="M8-42 26-46" stroke="${fill}" stroke-width="5" stroke-linecap="round"/>` :
      `<path d="M8-42 16-20" stroke="${fill}" stroke-width="5" stroke-linecap="round"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}">
      <circle cx="0" cy="-64" r="9"/>
      <path d="M-7-52h14l4 30-7 2-4-16-4 16-7-2z"/>
      <path d="M-6-22h5l2 22h-5zM1-22h5l2 22h-5z"/>
      ${arm}
      <path d="M-7-44-18-24" stroke="${fill}" stroke-width="5" stroke-linecap="round"/>
    </g>`;
  }

  function traveler(x, y, s, fill = '#02070b') {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-12-46c0-10 6-16 12-16s12 6 12 16v18h-24z" fill="#3a332a"/>
      <circle cx="0" cy="-64" r="9" fill="${fill}"/>
      <path d="M-7-52h14l4 30-7 2-4-16-4 16-7-2z" fill="${fill}"/>
      <path d="M-6-22h5l2 22h-5zM1-22h5l2 22h-5z" fill="${fill}"/>
      <path d="M7-44 20-34" stroke="${fill}" stroke-width="5" stroke-linecap="round"/>
      <path d="M-7-44-16-26" stroke="${fill}" stroke-width="5" stroke-linecap="round"/>
      <path d="M22-2v-12" stroke="#3a332a" stroke-width="2"/>
    </g>`;
  }

  function owl(x, y, s, fill = '#d9c9a8', accent = '#2c2822') {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="0" rx="26" ry="34" fill="${fill}"/>
      <circle cx="0" cy="-30" r="20" fill="${fill}"/>
      <path d="M-18-44l-4-14 12 8M18-44l4-14-12 8" fill="${fill}"/>
      <circle cx="-8" cy="-32" r="7" fill="${accent}"/><circle cx="8" cy="-32" r="7" fill="${accent}"/>
      <circle cx="-8" cy="-32" r="3" fill="#f4ead6"/><circle cx="8" cy="-32" r="3" fill="#f4ead6"/>
      <path d="M-3-24l3 5 3-5z" fill="${accent}"/>
      <path d="M-26-4c-8 8-8 20 0 26 6-8 7-18 0-26zM26-4c8 8 8 20 0 26-6-8-7-18 0-26z" fill="${accent}" opacity=".55"/>
      <path d="M-10 30l-3 6m6-6 2 6M10 30l3 6m-6-6-2 6" stroke="${accent}" stroke-width="2.5"/>
    </g>`;
  }

  function laurel(cx, cy, r, fill = C.gold) {
    let out = `<g fill="${fill}">`;
    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < 9; i++) {
        const a = (-1.15 + i * .15) * side - Math.PI / 2;
        const x = cx + Math.cos(a) * (r - i * r * .035), y = cy + Math.sin(a) * (r - i * r * .035);
        out += `<ellipse cx="${x}" cy="${y}" rx="${r * .16}" ry="${r * .07}" transform="rotate(${(a * 180 / Math.PI) + 90} ${x} ${y})"/>`;
      }
    }
    out += `<path d="M${cx - r * .1} ${cy + r * .95}q${r * .1} ${-r * .35} ${r * .16} ${-r * .5}" stroke="${fill}" stroke-width="${r * .05}" fill="none" stroke-linecap="round"/>`;
    out += `</g>`;
    return out;
  }

  function boat(x, y, s, hull = '#2b3a3d', sail = '#e8dcc2') {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-34 0h68l-10 14h-48z" fill="${hull}"/>
      <path d="M-2-2v-46" stroke="${hull}" stroke-width="2.5"/>
      <path d="M0-44 30-8H0z" fill="${sail}" opacity=".92"/>
      <path d="M-3-40-26-8h23z" fill="${sail}" opacity=".72"/>
    </g>`;
  }

  function gull(x, y, s, stroke = '#f4ead6') {
    return `<path d="M${x - 10 * s} ${y}q${5 * s} ${-6 * s} ${10 * s} 0q${5 * s} ${-6 * s} ${10 * s} 0" fill="none" stroke="${stroke}" stroke-width="${1.8 * s}" stroke-linecap="round" opacity=".8"/>`;
  }

  function bus(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-150" y="-74" width="300" height="74" rx="14" fill="#d8c7a4"/>
      <rect x="-150" y="-38" width="300" height="20" fill="#b85c3e"/>
      <rect x="-136" y="-64" width="54" height="22" rx="4" fill="#17323c"/>
      <rect x="-72" y="-64" width="54" height="22" rx="4" fill="#17323c"/>
      <rect x="-8" y="-64" width="54" height="22" rx="4" fill="#17323c"/>
      <rect x="56" y="-64" width="54" height="22" rx="4" fill="#17323c"/>
      <rect x="118" y="-64" width="20" height="22" rx="3" fill="#17323c"/>
      <circle cx="-92" cy="2" r="19" fill="#1a1d1f"/><circle cx="-92" cy="2" r="8" fill="#6d6a62"/>
      <circle cx="92" cy="2" r="19" fill="#1a1d1f"/><circle cx="92" cy="2" r="8" fill="#6d6a62"/>
      <rect x="-150" y="-18" width="300" height="5" fill="#8f4530"/>
      <circle cx="142" cy="-30" r="5" fill="#f7dfae"/>
      <path d="M-150-74h20v74h-20z" fill="#c9b58f"/>
    </g>`;
  }

  function ferry(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-170 0h340l-24 46h-292z" fill="#e6dcc8"/>
      <path d="M-170 0h340l-6 12h-328z" fill="#b85c3e"/>
      <rect x="-150" y="-54" width="300" height="54" fill="#f1e8d8"/>
      <rect x="-132" y="-48" width="264" height="12" fill="#8fb9c2"/>
      <rect x="-132" y="-30" width="264" height="12" fill="#8fb9c2"/>
      <rect x="-100" y="-96" width="200" height="42" fill="#f1e8d8"/>
      <rect x="-86" y="-90" width="172" height="10" fill="#8fb9c2"/>
      <rect x="-86" y="-74" width="172" height="10" fill="#8fb9c2"/>
      <rect x="-34" y="-132" width="60" height="38" fill="#b85c3e"/>
      <rect x="-28" y="-140" width="48" height="10" fill="#8f4530"/>
      <rect x="-40" y="-158" width="16" height="20" fill="#8f4530"/>
      <g fill="#f7dfae"><rect x="-120" y="-46" width="12" height="8"/><rect x="-100" y="-46" width="12" height="8"/><rect x="-80" y="-46" width="12" height="8"/><rect x="-60" y="-46" width="12" height="8"/><rect x="-40" y="-46" width="12" height="8"/><rect x="-20" y="-46" width="12" height="8"/><rect x="0" y="-46" width="12" height="8"/><rect x="20" y="-46" width="12" height="8"/><rect x="40" y="-46" width="12" height="8"/><rect x="60" y="-46" width="12" height="8"/><rect x="80" y="-46" width="12" height="8"/><rect x="100" y="-46" width="12" height="8"/></g>
      <path d="M-170 46h340" stroke="#bfe3e4" stroke-width="3" opacity=".45"/>
    </g>`;
  }

  function bridge(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="#5c7f86" stroke-width="2" opacity=".85">
      <path d="M-170 40h340"/>
      <path d="M-110 40V-50M110 40V-50"/>
      <path d="M-110-50 0 34M110-50 0 34M-110-50 0-50 110-50"/>
      <path d="M-110-50-150 40M110-50 150 40"/>
      <path d="M-70-18v34M-30-34v68M30-34v68M70-18v34" stroke-width="1.2"/>
    </g>`;
  }

  function waves(u, y, op = .4) {
    return `<g fill="none" stroke="#bfe3e4" stroke-width="2" opacity="${op}">
      <path d="M0 ${y}q50 -9 100 0t100 0 100 0 100 0 100 0 100 0 100 0 100 0 100 0"/>
      <path d="M-40 ${y + 22}q55 -8 110 0t110 0 110 0 110 0 110 0 110 0 110 0 110 0" opacity=".7"/>
    </g>`;
  }

  function paper(w = 900, h = 620, fill = '#e8dcc2') {
    return `<rect width="${w}" height="${h}" fill="#0a141c"/><rect x="22" y="18" width="${w - 44}" height="${h - 36}" rx="4" fill="${fill}"/><rect x="22" y="18" width="${w - 44}" height="${h - 36}" rx="4" fill="none" stroke="#b7a98f" stroke-width="1" opacity=".7"/>`;
  }

  function handText(x, y, text, size = 28, fill = '#2c3a44', rotate = 0) {
    return `<text x="${x}" y="${y}" font-family="'Segoe Print','Bradley Hand','Comic Sans MS',cursive" font-size="${size}" fill="${fill}" transform="rotate(${rotate} ${x} ${y})">${text}</text>`;
  }

  /* ============================================================
     SCÈNES
     ============================================================ */

  const scenes = {};

  scenes.title = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="url(#${u}night)"/>
    ${stars(130, 11, 560)}
    ${moon(u, 1210, 245, 88)}
    <path d="M0 604c120-22 240-18 360 2s250 18 390-6 300-20 430 4 260 14 420-8v304H0z" fill="url(#${u}sea)"/>
    <path d="M1210 610v260" stroke="#f7dfae" stroke-width="2" opacity=".16"/>
    <g stroke="#f7dfae" opacity=".22"><path d="M1120 700h180M1080 746h260M1160 792h120" stroke-width="2"/></g>
    <path d="M0 596c70-30 150-36 230-18 70 16 120 12 180-6l40 26H0z" fill="#06121a"/>
    <path d="M840 900 980 690 1100 640 1210 620 1360 646 1600 690v210z" fill="#040d13"/>
    <g opacity=".95">${temple(1090, 690, 390, 196, { columns: 6, fill: '#081820', lit: true })}</g>
    <g opacity=".65">${temple(1000, 706, 130, 74, { columns: 4, fill: '#07131a', lit: false })}</g>
    <path d="M840 900 980 690 1100 640" fill="none" stroke="#e2b264" stroke-width="1.2" opacity=".18"/>
    <g opacity=".9">${olive(150, 790, 2.6, '#0a1a1c')}${olive(1530, 760, 3.2, '#081518')}</g>
    ${traveler(720, 812, 1.45, '#02070b')}
    <g transform="translate(787 750)">${owl(0, 0, .55, '#d9c9a8', '#2c2822')}</g>
    <g transform="translate(430 300)">${gull(0, 0, 1.1, '#e8dcc2')}${gull(70, 28, .8, '#e8dcc2')}</g>
    <path d="M0 898h1600" stroke="#e2b264" stroke-width="1" opacity=".2"/>
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".25"/>
  `);

  scenes.bus = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="url(#${u}dawn)"/>
    ${sun(u, 300, 210, 72)}
    <path d="M0 430c180-40 300-24 430 0s250 26 390-4 270-24 410 4 230 18 370-2v472H0z" fill="#1c3d47"/>
    <path d="M0 500c200-26 340-16 470 8s240 20 380-6 280-16 420 6 230 12 330-6v398H0z" fill="url(#${u}seaDawn)" opacity=".85"/>
    <path d="M0 552c170-18 300-10 430 14s260 14 400-10 280-12 420 8 240 8 350-10v346H0z" fill="#1c2024"/>
    <path d="M-80 900 610 900 830 540 760 540z" fill="#262a2b"/>
    <path d="M-40 900 560 900 800 560 770 560z" fill="#303436"/>
    <path d="M800 560 770 560M610 900 560 900" stroke="none"/>
    <g stroke="#f4ead6" stroke-width="3" stroke-dasharray="26 30" opacity=".55"><path d="M780 580 600 900"/></g>
    <path d="M780 580 600 900" stroke="none"/>
    <g stroke="#e2b264" stroke-width="2.2" stroke-dasharray="20 26" opacity=".45"><path d="M792 590 640 900"/></g>
    ${bus(1160, 716, 1.05)}
    <g fill="#0d1a1c" opacity=".9">${cypress(100, 600, 260)}${cypress(165, 610, 200)}${cypress(220, 620, 160)}</g>
    <g fill="#4d5a3d" opacity=".75">${olive(1360, 610, 3.2)}${olive(1500, 640, 2.4)}</g>
    <g transform="translate(1290 520)">
      <rect x="0" y="0" width="240" height="78" rx="6" fill="#173b3f" stroke="#e2b264" stroke-width="2"/>
      <text x="18" y="32" font-family="Georgia,serif" font-size="22" fill="#f7dfae" letter-spacing="2">RAVENNE</text>
      <text x="18" y="60" font-family="Arial,sans-serif" font-size="17" fill="#e8dcc2">900 km · 9 h 30</text>
      <path d="M120 78v46" stroke="#8e8270" stroke-width="6"/>
    </g>
    <g transform="translate(1180 470)">
      <rect x="0" y="0" width="110" height="42" rx="4" fill="#0d2b30" stroke="#8fbf8a" stroke-width="1.5"/>
      <text x="14" y="27" font-family="Arial,sans-serif" font-size="17" fill="#d9efd5" letter-spacing="2">A 7</text>
    </g>
    <g stroke="#e8dcc2" stroke-width="3" opacity=".35"><path d="M0 690h300M0 720h340"/></g>
    ${gull(500, 260, .9, '#f4ead6')}${gull(560, 230, .7, '#f4ead6')}
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".16"/>
  `);

  scenes.ferry = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="url(#${u}night)"/>
    ${stars(80, 23, 430)}
    ${moon(u, 310, 190, 54)}
    <path d="M0 500h1600v400H0z" fill="url(#${u}sea)"/>
    ${bridge(1120, 430, .8)}
    <path d="M0 520c200-16 360-10 520 10s300 12 440-8 300-10 460 8 180 8 180 8v362H0z" fill="url(#${u}seaDawn)" opacity=".55"/>
    ${ferry(880, 610, 1.08)}
    <g stroke="#f7dfae" opacity=".28" stroke-width="2"><path d="M700 690q100 14 200 0M660 730q140 18 280 0M740 770q80 10 160 0"/></g>
    <g transform="translate(480 690)">${boat(0, 0, .65, '#16323a', '#d8c7a4')}</g>
    <g fill="none" stroke="#9fd6d6" stroke-width="3" opacity=".7">
      <path d="M330 620q30-18 60 0M400 640q24-14 48 0M290 660q20-12 40 0"/>
    </g>
    ${gull(220, 300, .9, '#e8dcc2')}${gull(270, 275, .65, '#e8dcc2')}
    <g transform="translate(120 470)">
      <text x="0" y="0" font-family="Georgia,serif" font-style="italic" font-size="24" fill="#e8dcc2" opacity=".55">Adriatique</text>
      <text x="760" y="120" font-family="Georgia,serif" font-style="italic" font-size="24" fill="#e8dcc2" opacity=".55">Ionienne</text>
    </g>
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".22"/>
  `);

  scenes.patras = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="url(#${u}dawn)"/>
    ${sun(u, 1180, 300, 64)}
    <path d="M0 500h1600v400H0z" fill="url(#${u}seaDawn)" opacity=".9"/>
    <g stroke="#f7dfae" opacity=".22" stroke-width="2"><path d="M1120 540q90 10 180 0M1080 590q140 14 280 0M1160 640q80 10 160 0"/></g>
    <path d="M0 730c160-60 300-52 430-18s260 44 400 10 290-30 430-2 230 16 340-8v188H0z" fill="#3a2b28"/>
    <g>
      <rect x="60" y="470" width="260" height="240" fill="#efe4cf"/><path d="M40 470h300l-40-52H80z" fill="#b85c3e"/>
      <rect x="270" y="420" width="150" height="290" fill="#e6d8bf"/><path d="M250 420h190l-30-44h-130z" fill="#a04e36"/>
      <rect x="380" y="500" width="190" height="210" fill="#f2e8d4"/><path d="M360 500h230l-34-48h-162z" fill="#b85c3e"/>
      <g fill="#17323c"><rect x="100" y="520" width="34" height="44" rx="3"/><rect x="160" y="520" width="34" height="44" rx="3"/><rect x="220" y="520" width="34" height="44" rx="3"/><rect x="300" y="470" width="30" height="38" rx="3"/><rect x="350" y="470" width="30" height="38" rx="3"/></g>
      <g fill="#5f7d4a"><path d="M70 690q30-80 60 0z"/><path d="M320 420q20-50 60 0z"/></g>
    </g>
    <g transform="translate(760 690)">
      <ellipse cx="0" cy="0" rx="210" ry="26" fill="#1b1a18" opacity=".35"/>
      <rect x="-120" y="-12" width="240" height="16" rx="5" fill="#6b4e33"/>
      <rect x="-100" y="4" width="12" height="54" fill="#4d3826"/><rect x="88" y="4" width="12" height="54" fill="#4d3826"/>
      <g><rect x="-170" y="-6" width="34" height="10" rx="4" fill="#7d5a3c"/><rect x="136" y="-6" width="34" height="10" rx="4" fill="#7d5a3c"/><rect x="-166" y="4" width="8" height="50" fill="#4d3826"/><rect x="158" y="4" width="8" height="50" fill="#4d3826"/></g>
      <g fill="#e8dcc2"><circle cx="-60" cy="-22" r="7"/><path d="M-68-12h16v14h-16z"/><circle cx="60" cy="-22" r="7"/><path d="M52-12h16v14H52z"/></g>
    </g>
    <g transform="translate(1040 700) scale(1.15)">
      <circle cx="0" cy="-70" r="10" fill="#2b211a"/>
      <path d="M-8-58h16l6 34-10 2-5-20-5 20-10-2z" fill="#3a4a3a"/>
      <path d="M-7-24h5l3 24h-6zM2-24h5l3 24h-6z" fill="#2b211a"/>
      <path d="M8-46 30-40" stroke="#3a4a3a" stroke-width="6" stroke-linecap="round"/>
      <path d="M-8-46-22-38" stroke="#3a4a3a" stroke-width="6" stroke-linecap="round"/>
      <path d="M-12-80q12-14 24 0z" fill="#c9b58f"/>
    </g>
    <g stroke="#f7dfae" stroke-width="1.6" opacity=".75" fill="none">
      <path d="M480 370q80 40 170 0M1060 360q80 40 170 0"/>
      <g fill="#f7dfae" stroke="none"><circle cx="500" cy="382" r="4"/><circle cx="560" cy="398" r="4"/><circle cx="620" cy="386" r="4"/><circle cx="1080" cy="372" r="4"/><circle cx="1140" cy="388" r="4"/><circle cx="1200" cy="376" r="4"/></g>
    </g>
    ${gull(1350, 240, .9, '#f4ead6')}${gull(1400, 210, .7, '#f4ead6')}
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".18"/>
  `);

  scenes.chambre = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="#050b0f"/>
    <path d="M0 900V180L720 330V760z" fill="#0b1418"/>
    <path d="M1600 900V180L880 330V760z" fill="#0a1115"/>
    <path d="M720 330 880 330 1600 180 0 180z" fill="#070d11"/>
    <path d="M720 760 880 760 1600 900 0 900z" fill="#0d1518"/>
    <path d="M720 330 880 330 880 760 720 760z" fill="#101a1e"/>
    <g stroke="#1d2a2e" stroke-width="2" opacity=".8"><path d="M720 380h160M720 500h160M720 620h160"/></g>
    <g>
      <rect x="930" y="300" width="300" height="470" rx="4" fill="#3a2a20"/>
      <rect x="948" y="320" width="264" height="430" rx="2" fill="#171f21"/>
      <rect x="960" y="330" width="240" height="410" rx="2" fill="#241d18"/>
      <path d="M960 330h240v410H960z" fill="url(#${u}gold)" opacity=".12"/>
      <circle cx="1180" cy="540" r="7" fill="#e2b264"/>
      <text x="1070" y="300" font-family="Georgia,serif" font-size="30" fill="#c9b58f" letter-spacing="4">12</text>
    </g>
    <path d="M1200 320 1480 380 1480 760 1200 740z" fill="#0a0f12"/>
    <path d="M1205 330 1470 386 1470 752 1205 734z" fill="#2b2118" opacity=".55"/>
    <g transform="translate(1140 520) rotate(-4)">
      <rect x="0" y="0" width="96" height="66" fill="#efe4cf"/>
      <path d="M0 0h96v10H0z" fill="#b85c3e"/>
      ${handText(10, 30, 'Suivez', 15, '#2c3a44')}
      ${handText(10, 50, 'les dieux.', 15, '#2c3a44')}
      <circle cx="80" cy="8" r="5" fill="#b85c3e"/>
    </g>
    <g transform="translate(760 690) rotate(8)">
      <rect x="0" y="0" width="100" height="66" fill="#e8dcc2"/>
      <rect x="4" y="4" width="92" height="58" fill="none" stroke="#b7a98f"/>
      ${handText(16, 30, 'Δελφοί', 22, '#2c3a44')}
      ${handText(16, 52, '— T.', 13, '#6b5a45')}
    </g>
    <g opacity=".5"><rect x="0" y="0" width="1600" height="900" fill="url(#${u}shadow)"/></g>
    <g transform="translate(540 430)" opacity=".55">
      <path d="M0 0v-120" stroke="#e2b264" stroke-width="3"/>
      <path d="M0-120q-40 30 0 60q40-30 0-60z" fill="#e2b264"/>
    </g>
    <rect width="1600" height="900" fill="#02060a" opacity=".18"/>
  `);

  scenes.delphes = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="url(#${u}day)"/>
    ${sun(u, 1230, 190, 58)}
    <path d="M0 360c180-90 330-70 470-10s280 58 420-2 290-40 430 8 210 22 280 0v544H0z" fill="#9fb7b0"/>
    <path d="M0 470c180-70 320-52 450 0s270 42 410-8 300-30 430 10 200 18 310 0v428H0z" fill="#7d9a83"/>
    <path d="M0 620c200-54 350-38 500 6s270 30 410-10 300-26 430 12 180 14 260 0v272H0z" fill="#5d7a5f"/>
    <path d="M0 760h1600v140H0z" fill="#b9a98c"/>
    <path d="M660 900 820 620 900 620 760 900z" fill="#d8cbb2"/>
    <g>${temple(560, 620, 520, 246, { columns: 6, fill: 'url(#marble)', lit: true })}</g>
    <g opacity=".92">${temple(250, 560, 170, 92, { columns: 4, fill: '#d8cbb2', lit: false })}</g>
    <g opacity=".9">${temple(1200, 600, 150, 82, { columns: 4, fill: '#d8cbb2', lit: false })}</g>
    <g fill="#4d5a3d">${cypress(90, 650, 260)}${cypress(160, 670, 200)}${cypress(1410, 640, 280)}${cypress(1480, 670, 210)}</g>
    <g fill="#6f7d56" opacity=".9">${olive(420, 780, 2.2)}${olive(1150, 790, 2.4)}${olive(1360, 760, 1.8)}</g>
    <g stroke="#8e8270" stroke-width="3" opacity=".5"><path d="M700 900 860 640M760 900 900 640M820 900 940 640"/></g>
    <g transform="translate(640 700)">
      <rect x="-40" y="0" width="80" height="12" fill="#b7a98f"/>
      <rect x="-28" y="-60" width="56" height="60" fill="#d9cdb8"/>
      <path d="M-28-60h56l-12-18h-32z" fill="#b7a98f"/>
    </g>
    <g transform="translate(980 690)">
      <rect x="-34" y="0" width="68" height="10" fill="#b7a98f"/>
      <path d="M-18 0v-52h36V0" fill="#d9cdb8"/>
      <path d="M-18-52 0-70 18-52z" fill="#b7a98f"/>
    </g>
    ${gull(380, 240, 1, '#f4ead6')}${gull(440, 210, .8, '#f4ead6')}${gull(1050, 260, .9, '#f4ead6')}
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".12"/>
  `);

  scenes.stade = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="url(#${u}day)"/>
    ${sun(u, 300, 170, 54)}
    <path d="M0 360c180-70 320-50 460 0s280 50 420 0 300-40 440 0 200 20 280 0v540H0z" fill="#a9bda8"/>
    <path d="M0 520c190-50 340-36 480 2s270 30 410-8 300-24 430 10 180 12 280 0v376H0z" fill="#708a68"/>
    <path d="M0 900 0 690 250 620 1360 620 1600 700 1600 900z" fill="#cbbd9f"/>
    <path d="M200 690 1400 690 1300 650 300 650z" fill="#b7a98f"/>
    <path d="M300 650 1300 650 1200 620 400 620z" fill="#d9cdb8"/>
    <g stroke="#9a8d76" stroke-width="2" opacity=".55">
      <path d="M220 700 1380 700M240 730 1360 730M260 760 1340 760M280 790 1320 790M300 820 1300 820M320 850 1280 850"/>
    </g>
    <path d="M420 640 1180 640 1020 780 580 780z" fill="#d7b98c"/>
    <path d="M470 660 1130 660 1000 760 600 760z" fill="#c89f6d"/>
    <g stroke="#efe4cf" stroke-width="2" opacity=".5"><path d="M600 670 1000 670M620 700 980 700M640 730 960 730"/></g>
    <g fill="#4d5a3d">${cypress(100, 690, 240)}${cypress(1500, 670, 260)}${cypress(80, 640, 180)}</g>
    <g>
      <g transform="translate(650 720)"><circle cx="0" cy="-8" r="5" fill="#2c2822"/><path d="M-4 0h8l4 18-4 1-3-10-3 10-4-1z" fill="#2c2822"/><path d="M-4 1-12 8M4 1 12 8" stroke="#2c2822" stroke-width="3" stroke-linecap="round"/><path d="M-3 19-8 30M3 19 8 30" stroke="#2c2822" stroke-width="3" stroke-linecap="round"/></g>
      <g transform="translate(780 716)"><circle cx="0" cy="-8" r="5" fill="#2c2822"/><path d="M-4 0h8l4 18-4 1-3-10-3 10-4-1z" fill="#2c2822"/><path d="M-4 1-13 5M4 1 13 5" stroke="#2c2822" stroke-width="3" stroke-linecap="round"/><path d="M-3 19-9 30M3 19 9 30" stroke="#2c2822" stroke-width="3" stroke-linecap="round"/></g>
      <g transform="translate(910 722)"><circle cx="0" cy="-8" r="5" fill="#2c2822"/><path d="M-4 0h8l4 18-4 1-3-10-3 10-4-1z" fill="#2c2822"/><path d="M-4 1-12 8M4 1 12 8" stroke="#2c2822" stroke-width="3" stroke-linecap="round"/><path d="M-3 19-8 30M3 19 8 30" stroke="#2c2822" stroke-width="3" stroke-linecap="round"/></g>
    </g>
    <g transform="translate(1180 690)">
      <rect x="-60" y="0" width="120" height="18" fill="#b7a98f"/>
      <rect x="-48" y="-12" width="96" height="12" fill="#d9cdb8"/>
      <g transform="translate(0 -40) scale(1.1)">${laurel(0, 0, 34, C.gold)}</g>
    </g>
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".1"/>
  `);

  scenes.pythie = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="#070c10"/>
    <path d="M0 900V200L560 260V760z" fill="#0d181d"/>
    <path d="M1600 900V200L1040 260V760z" fill="#0b1519"/>
    <path d="M560 260 1040 260 1600 200 0 200z" fill="#050a0d"/>
    <path d="M560 760 1040 760 1600 900 0 900z" fill="#101a1e"/>
    <g>${column(u, 250, 760, 470, 74, '#1b2a2e', true)}${column(u, 390, 760, 470, 74, '#1b2a2e', true)}${column(u, 1210, 760, 470, 74, '#1b2a2e', true)}${column(u, 1350, 760, 470, 74, '#1b2a2e', true)}</g>
    <path d="M720 0 880 0 960 680 640 680z" fill="#f7dfae" opacity=".12"/>
    <path d="M760 0 840 0 900 640 700 640z" fill="#f7dfae" opacity=".08"/>
    <g transform="translate(800 640)">
      <ellipse cx="0" cy="70" rx="180" ry="28" fill="#02060a" opacity=".55"/>
      <path d="M-90 40h180l-16-16h-148z" fill="#2b2118"/>
      <path d="M-60 24 0-90 60 24z" fill="#3a2a20"/>
      <path d="M-60 24 0-90 0 24z" fill="#2b1e16"/>
      <g stroke="#b8a986" stroke-width="4"><path d="M-54 8h108M-44 24h88"/></g>
      <circle cx="0" cy="-100" r="9" fill="#c9b58f"/>
      <path d="M-8-92h16l8 34-10 3-6-18-6 18-10-3z" fill="#c9b58f"/>
      <path d="M-8-58h5l4 30h-6zM3-58h5l4 30h-6z" fill="#c9b58f"/>
      <path d="M8-86 30-100" stroke="#c9b58f" stroke-width="5" stroke-linecap="round"/>
      <path d="M-8-86-28-96" stroke="#c9b58f" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g fill="none" stroke="#9fd6d6" stroke-width="10" opacity=".13" filter="url(#${u}soft)">
      <path d="M420 700c80-60 240-40 300-140s260-120 340-60"/>
      <path d="M460 760c90-50 230-30 290-120s250-90 330-40"/>
      <path d="M500 820c80-40 210-20 270-100s230-70 310-30"/>
    </g>
    <g opacity=".9">
      <path d="M1040 720v-120" stroke="#c9b58f" stroke-width="6"/>
      <circle cx="1040" cy="590" r="10" fill="#c9b58f"/>
      <path d="M1030 608h20l10 40-12 3-8-22-8 22-12-3z" fill="#c9b58f"/>
      <path d="M1030 648h6l4 36h-7zM1044 648h6l4 36h-7z" fill="#c9b58f"/>
      <path d="M1048 616 1074 606" stroke="#c9b58f" stroke-width="6" stroke-linecap="round"/>
    </g>
    <g transform="translate(1240 740) scale(1.2)" fill="#6f7d56" opacity=".85">
      <path d="M0 0c-8-40 4-70 24-96 6 34 2 68-8 96z"/>
      <path d="M18-70c-30-12-52-4-70 12 26 8 50 2 70-12z"/>
      <path d="M22-80c26-18 50-16 70-2-24 12-50 14-70 2z"/>
    </g>
    <g transform="translate(380 470)" opacity=".55"><path d="M0 0v120" stroke="#e2b264" stroke-width="2"/><circle cx="0" cy="0" r="4" fill="#e2b264"/></g>
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".25"/>
  `);

  scenes.monnaie = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="#050b0f"/>
    <radialGradient id="${u}v" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#1d3a42"/><stop offset="1" stop-color="#050b0f"/></radialGradient>
    <rect width="1600" height="900" fill="url(#${u}v)"/>
    <g transform="translate(820 450)">
      <circle cx="0" cy="0" r="300" fill="#000" opacity=".5" filter="url(#${u}soft2)"/>
      <circle cx="0" cy="0" r="254" fill="#3d3a33"/>
      <circle cx="0" cy="0" r="244" fill="url(#${u}silver)"/>
      <circle cx="0" cy="0" r="232" fill="none" stroke="#6f6c63" stroke-width="2" opacity=".55"/>
      <circle cx="0" cy="0" r="212" fill="none" stroke="#f4ead6" stroke-width="1.2" opacity=".3"/>
      ${owl(10, 20, 3.2, '#b9b5a7', '#3a3833')}
      <g fill="#6f6c63" opacity=".9">
        <path d="M-168-80c-18 30-18 60 0 90 8-30 8-60 0-90z"/>
        <path d="M-150-96c-12 16-14 34-6 52 6-18 8-34 6-52z"/>
        <path d="M-186-60c-14 10-22 24-24 40 14-10 22-24 24-40z"/>
      </g>
      <text x="120" y="130" font-family="Georgia,serif" font-size="62" fill="#4f4c45" letter-spacing="8">ΑΘΕ</text>
      <text x="-210" y="180" font-family="Georgia,serif" font-size="22" fill="#4f4c45" opacity=".7">ΑΘΗΝΑΙΩΝ</text>
      <circle cx="-120" cy="-150" r="8" fill="#f7dfae" opacity=".55"/>
      <circle cx="150" cy="-170" r="5" fill="#f7dfae" opacity=".45"/>
    </g>
    <path d="M1180 0 1320 0 940 900 800 900z" fill="#f7dfae" opacity=".04"/>
    <g stroke="#e2b264" stroke-width="1" opacity=".22"><path d="M300 760q220-40 440 0M260 800q260-40 520 0"/></g>
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".2"/>
  `);

  scenes.athenes = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="url(#${u}dawn)"/>
    ${sun(u, 1160, 220, 70)}
    <path d="M0 560h1600v340H0z" fill="url(#${u}seaDawn)" opacity=".55"/>
    <path d="M0 660c200-40 360-20 520 16s300 22 460-10 300-18 460 10 160 10 160 10v214H0z" fill="#6b6a58"/>
    <path d="M0 720c220-30 380-10 540 20s300 16 460-14 300-14 460 12 140 8 140 8v154H0z" fill="#8f8a70"/>
    <path d="M560 760c120-100 260-150 430-150s320 50 430 150z" fill="#5c5a4a"/>
    <path d="M610 740c120-80 240-110 390-110s260 30 370 110z" fill="#7a755e"/>
    <g>${temple(660, 700, 330, 140, { columns: 6, fill: '#e6dcc8', lit: true })}</g>
    <g>${temple(1060, 690, 260, 118, { columns: 6, fill: '#e6dcc8', lit: true })}</g>
    <g>${temple(980, 712, 70, 42, { columns: 4, fill: '#d9cdb8', lit: false })}</g>
    <g opacity=".9">
      <g transform="translate(760 690)"><rect x="-10" y="-40" width="20" height="40" fill="#d9cdb8"/><circle cx="0" cy="-50" r="10" fill="#d9cdb8"/><path d="M-14-40h28" stroke="#b7a98f" stroke-width="3"/></g>
    </g>
    <g fill="#4d5a3d">${olive(340, 780, 3.4)}${olive(470, 800, 2.6)}${olive(1450, 790, 2.8)}</g>
    <g fill="#0d1a1c" opacity=".9">${cypress(240, 730, 210)}${cypress(290, 750, 160)}</g>
    <g transform="translate(380 620) scale(2.4)">${owl(0, 0, 1, '#d9c9a8', '#2c2822')}</g>
    <g transform="translate(380 620)"><ellipse cx="0" cy="34" rx="70" ry="12" fill="#2b2a22" opacity=".45"/></g>
    <g stroke="#f7dfae" opacity=".2"><path d="M0 820q200-20 400 0t400 0 400 0 400 0" fill="none" stroke-width="2"/></g>
    ${gull(1200, 320, .9, '#f4ead6')}${gull(1260, 290, .7, '#f4ead6')}
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".14"/>
  `);

  scenes.cite = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="#e8dcc2"/>
    <rect width="1600" height="260" y="640" fill="#9fc4c4"/>
    <path d="M0 640c120-30 220-14 320 8s200 18 300-8 190-16 300 10 210 16 340-8 240-12 340 8v-80c-140-26-260-26-380-4s-220 22-340-4-210-18-330 8-220 16-350-8-200-2-200-2z" fill="#d8cbb2"/>
    <path d="M0 650c160-24 300-10 440 10s250 8 390-12 280-8 430 12 220 10 340-10v80c-120 22-240 22-360 2s-230-16-350 6-230 16-350-6-220-18-340 2-160 16-200 10z" fill="#cbbd9f" opacity=".55"/>
    <path d="M180 660 520 660 480 860 220 860z" fill="#b7a98f"/>
    <path d="M520 660 760 660 700 860 480 860z" fill="#c9b58f"/>
    <g stroke="#8e8270" stroke-width="2" opacity=".4">
      <path d="M260 700 470 700M270 740 480 740M280 780 490 780M300 820 500 820"/>
      <path d="M300 680 300 850M350 680 350 850M400 680 400 850M450 680 450 850"/>
    </g>
    <path d="M760 660 1000 660 960 860 700 860z" fill="#d8cbb2"/>
    <path d="M240 560 520 560 520 660 240 660z" fill="#e2d5bd"/>
    <path d="M260 540 540 540 540 560 260 560z" fill="#b7a98f"/>
    <path d="M280 520 520 520 520 540 280 540z" fill="#d8cbb2"/>
    <path d="M300 500 500 500 500 520 300 520z" fill="#b7a98f"/>
    <g>${temple(330, 500, 140, 80, { columns: 4, fill: '#e6dcc8', lit: false })}</g>
    <g transform="translate(700 560)">
      <path d="M0 0h180v70H0z" fill="#d8cbb2"/>
      <path d="M10 10h160v50H10z" fill="#cbbd9f"/>
      <g stroke="#8e8270" stroke-width="2"><path d="M30 70V20M70 70V20M110 70V20M150 70V20"/></g>
      <path d="M0 0h180" stroke="#8e8270" stroke-width="3"/>
    </g>
    <g fill="#c9b58f"><rect x="980" y="520" width="60" height="40"/><rect x="1060" y="500" width="70" height="60"/><rect x="1160" y="530" width="50" height="30"/><rect x="1240" y="510" width="80" height="50"/><rect x="1350" y="540" width="60" height="30"/></g>
    <g fill="#8f4530"><path d="M980 520h60l-10-14h-40z"/><path d="M1060 500h70l-12-16h-46z"/><path d="M1240 510h80l-12-16h-56z"/></g>
    <g stroke="#8e8270" stroke-width="2" opacity=".5"><path d="M520 600 700 600M880 600 980 600M1320 560 1420 560M1000 700 1200 700M1200 700 1400 760"/></g>
    <g fill="#6f7d56" opacity=".8">
      <g transform="translate(1120 700)">${olive(0, 0, 1.4)}</g><g transform="translate(1260 720)">${olive(0, 0, 1.2)}</g><g transform="translate(1360 690)">${olive(0, 0, 1.1)}</g>
    </g>
    <g stroke="#8e8270" stroke-width="3" fill="none" opacity=".55"><path d="M760 660 700 860M1000 660 960 860"/></g>
    <g transform="translate(820 820)">${boat(0, 0, .8, '#6b5a45', '#f4ead6')}${boat(90, -14, .6, '#6b5a45', '#f4ead6')}</g>
    <g font-family="Georgia,serif" fill="#4a3a26" letter-spacing="3">
      <text x="300" y="480" font-size="26">ACROPOLE</text>
      <text x="660" y="540" font-size="24">AGORA</text>
      <text x="1040" y="470" font-size="24">VILLE BASSE</text>
      <text x="1180" y="660" font-size="24">CHÔRA</text>
      <text x="760" y="880" font-size="24">PORT</text>
    </g>
    <g transform="translate(140 120)" opacity=".7">
      <circle r="42" fill="none" stroke="#4a3a26" stroke-width="1.5"/>
      <path d="M0-32 8 0 0 32-8 0z" fill="#4a3a26"/><text x="-5" y="-46" font-family="Georgia,serif" font-size="18" fill="#4a3a26">N</text>
    </g>
    <g transform="translate(1260 850)" stroke="#4a3a26" fill="none" opacity=".6">
      <path d="M0 0h180M0-5v10M90-5v10M180-5v10" stroke-width="2"/><text x="0" y="-12" font-family="Arial,sans-serif" font-size="13" fill="#4a3a26">0</text><text x="80" y="-12" font-family="Arial,sans-serif" font-size="13" fill="#4a3a26">500 m</text>
    </g>
    <rect width="1600" height="900" fill="none" stroke="#b7a98f" stroke-width="18" opacity=".5"/>
  `);

  scenes.musee = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="#0c151a"/>
    <path d="M0 900V260h1600v640z" fill="#131f24"/>
    <path d="M0 260h1600v40H0z" fill="#1f2c31"/>
    <path d="M80 300h1440v600H80z" fill="#1b262a"/>
    <path d="M960 300h520v470H960z" fill="#2b4a52"/>
    <g clip-path="none">
      <rect x="980" y="320" width="480" height="430" fill="#8fb9c2" opacity=".55"/>
      <path d="M1060 620h300l30 130H1030z" fill="#7a755e"/>
      <g opacity=".75">${temple(1080, 620, 220, 110, { columns: 6, fill: '#e6dcc8', lit: true })}</g>
      <path d="M980 750h480" stroke="#d9cdb8" stroke-width="3" opacity=".4"/>
    </g>
    <path d="M80 900h1440V760H80z" fill="#202a2c"/>
    <g stroke="#3a4a4a" stroke-width="1" opacity=".5"><path d="M200 760 0 900M500 760 300 900M800 760 600 900M1100 760 900 900M1400 760 1200 900"/></g>
    <g>
      <rect x="240" y="420" width="70" height="340" fill="#d9cdb8"/>
      <path d="M225 420h100l-20-26h-60z" fill="#c9b58f"/>
      <rect x="360" y="470" width="54" height="290" fill="#c9b58f"/>
      <path d="M348 470h78l-14-22h-50z" fill="#b7a98f"/>
      <rect x="520" y="440" width="60" height="320" fill="#e6dcc8"/>
      <path d="M506 440h88l-16-24h-56z" fill="#d9cdb8"/>
    </g>
    <g transform="translate(760 650)">
      <rect x="-70" y="0" width="140" height="110" fill="#c9b58f"/>
      <rect x="-60" y="-90" width="120" height="90" fill="#e6dcc8" opacity=".9"/>
      <g transform="translate(0 -40) scale(.8)">${owl(0, 0, 1, '#8f8677', '#2c2822')}</g>
    </g>
    <g transform="translate(680 690)">
      <rect x="-130" y="0" width="260" height="14" fill="#b7a98f"/>
      <rect x="-110" y="-8" width="220" height="8" fill="#d9cdb8"/>
      <g transform="translate(0 -26) rotate(-4)">
        <rect x="-90" y="-50" width="180" height="56" rx="3" fill="#efe4cf"/>
        <rect x="-82" y="-42" width="164" height="40" fill="none" stroke="#b7a98f"/>
        <text x="-72" y="-20" font-family="Georgia,serif" font-size="14" fill="#4a3a26">ΜΟΥΣΕΙΟ ΑΚΡΟΠΟΛΗΣ</text>
        <text x="-72" y="-6" font-family="Arial,sans-serif" font-size="8" fill="#6b5a45">ATHÈNES · 2026</text>
      </g>
    </g>
    <g opacity=".8">
      <path d="M420 0 520 0 700 760 560 760z" fill="#f7dfae" opacity=".08"/>
      <path d="M1020 0 1100 0 1220 760 1120 760z" fill="#f7dfae" opacity=".07"/>
    </g>
    <g transform="translate(1400 600) scale(1.2)">
      <circle cx="0" cy="-60" r="9" fill="#2c2822"/><path d="M-8-50h16l6 36-10 2-5-20-5 20-10-2z" fill="#2c2822"/><path d="M-7-14h5l3 26h-6zM2-14h5l3 26h-6z" fill="#2c2822"/>
    </g>
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".16"/>
  `);

  scenes.sphinx = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="#0b1318"/>
    <path d="M0 0h1600v760H0z" fill="#162126"/>
    <path d="M0 760h1600v140H0z" fill="#202a2c"/>
    <path d="M820 0 980 0 1180 760 980 760z" fill="#f7dfae" opacity=".09"/>
    <g transform="translate(1020 690)">
      <rect x="-210" y="0" width="420" height="30" fill="#b7a98f"/>
      <rect x="-180" y="-20" width="360" height="20" fill="#d9cdb8"/>
      <g transform="translate(0 -20)">
        <path d="M-120 0c-20-60-10-120 30-160 40-40 100-50 150-20 40 24 60 70 50 120-8 40-30 60-60 60z" fill="#d9cdb8"/>
        <path d="M-90-120c-40-30-60-80-40-130 30 10 60 40 70 80z" fill="#e6dcc8"/>
        <path d="M-70-110c-30-20-50-60-40-100 20 8 40 30 50 60z" fill="#c9b58f" opacity=".8"/>
        <path d="M20-170c20-40 60-60 100-50-10 36-36 64-70 78z" fill="#e6dcc8"/>
        <path d="M60-40c-10-50 10-90 50-110 20 30 20 70 0 100z" fill="#c9b58f" opacity=".7"/>
        <circle cx="80" cy="-160" r="36" fill="#e6dcc8"/>
        <path d="M56-186c0-30 10-46 24-46s24 16 24 46c-6-10-14-14-24-14s-18 4-24 14z" fill="#c9b58f"/>
        <path d="M50-156c-18-6-26-18-26-30 12-2 22 2 30 10M110-156c18-6 26-18 26-30-12-2-22 2-30 10" fill="#c9b58f"/>
        <circle cx="66" cy="-164" r="3.2" fill="#2c2822"/><circle cx="94" cy="-164" r="3.2" fill="#2c2822"/>
        <path d="M74-150h12l-6 7z" fill="#8f7d63"/>
        <path d="M64-142c8 4 16 4 24 0" stroke="#8f7d63" stroke-width="1.6" fill="none"/>
        <path d="M-120 0h210" stroke="#b7a98f" stroke-width="2" opacity=".5"/>
      </g>
    </g>
    <g transform="translate(430 650)">
      <rect x="-100" y="0" width="200" height="16" fill="#b7a98f"/>
      <path d="M-80 0 0-40 80 0z" fill="#c9b58f"/>
      <g transform="translate(0 -60) rotate(-3)">
        <rect x="-110" y="-80" width="220" height="120" rx="3" fill="#dfe8c8"/>
        <rect x="-102" y="-72" width="204" height="104" fill="none" stroke="#9db07d"/>
        ${handText(-88, -40, 'Quel est l’animal', 19, '#3a4a2c')}
        ${handText(-88, -14, 'qui marche à quatre', 19, '#3a4a2c')}
        ${handText(-88, 12, 'pieds le matin, à deux', 19, '#3a4a2c')}
        ${handText(-88, 38, 'le midi, à trois le soir ?', 19, '#3a4a2c')}
      </g>
    </g>
    <g opacity=".5" stroke="#f7dfae" fill="none"><path d="M300 740q120-30 240 0M1060 760q100-24 200 0" stroke-width="2"/></g>
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".2"/>
  `);

  scenes.poseidon = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="#0a1216"/>
    <path d="M0 0h1600v720H0z" fill="#152127"/>
    <path d="M0 720h1600v180H0z" fill="#1d282a"/>
    <path d="M700 0 900 0 1080 720 820 720z" fill="#f7dfae" opacity=".1"/>
    <g stroke="#2c3a3a" stroke-width="2" opacity=".6"><path d="M0 200h1600M0 420h1600M200 0v720M1400 0v720"/></g>
    <g transform="translate(820 700)">
      <rect x="-170" y="0" width="340" height="26" fill="#b7a98f"/>
      <rect x="-140" y="-18" width="280" height="18" fill="#d9cdb8"/>
      <g transform="translate(0 -18)" fill="url(#${u}bronze)" stroke="#3a2a18" stroke-width="2">
        <path d="M-60 0c-20-40-14-90 10-120 10-14 26-22 44-22s34 8 44 22c24 30 30 80 10 120z"/>
        <circle cx="0" cy="-160" r="22"/>
        <path d="M-14-150c0-16 6-26 14-26s14 10 14 26c-4-6-8-9-14-9s-10 3-14 9z" fill="#4f3418"/>
        <path d="M-40-120-150-150M40-120 150-150" stroke="url(#${u}bronze)" stroke-width="14" stroke-linecap="round"/>
        <path d="M-150-150-166-160M150-150 166-158" stroke="url(#${u}bronze)" stroke-width="10" stroke-linecap="round"/>
        <path d="M-22-60-30 10M22-60 30 10" stroke="url(#${u}bronze)" stroke-width="18" stroke-linecap="round"/>
        <path d="M-30 0h-14M30 0h14" stroke="url(#${u}bronze)" stroke-width="12" stroke-linecap="round"/>
      </g>
      <path d="M150-150 190-260" stroke="#6f6c63" stroke-width="5"/>
      <path d="M176-292v-60M156-330h40M162-316h28M168-302h16" stroke="#c9b58f" stroke-width="4" stroke-linecap="round"/>
      <g transform="translate(176 -230) rotate(-8)">
        <rect x="-16" y="-2" width="32" height="40" rx="3" fill="#efe4cf"/>
        <path d="M-16-2h32v8h-32z" fill="#b85c3e"/>
        <text x="-9" y="24" font-family="Arial,sans-serif" font-size="8" fill="#4a3a26">GUIDE</text>
        <path d="M0-2v-18" stroke="#b85c3e" stroke-width="2"/>
      </g>
    </g>
    <g fill="#0a0f12" opacity=".85"><g transform="translate(250 760)"><circle cx="0" cy="-60" r="8"/><path d="M-7-50h14l5 30-8 2-4-16-4 16-8-2z"/><path d="M-6-20h5l2 22h-5zM1-20h5l2 22h-5z"/></g><g transform="translate(380 770)"><circle cx="0" cy="-64" r="8"/><path d="M-7-54h14l5 32-8 2-4-18-4 18-8-2z"/><path d="M-6-22h5l2 22h-5zM1-22h5l2 22h-5z"/></g></g>
    <g opacity=".55"><path d="M480 0 560 0 700 720 600 720z" fill="#f7dfae" opacity=".08"/></g>
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".18"/>
  `);

  scenes.sounion = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="url(#${u}dawn)"/>
    ${sun(u, 430, 340, 86)}
    <path d="M0 470h1600v430H0z" fill="url(#${u}seaDawn)"/>
    <g stroke="#f7dfae" opacity=".3" stroke-width="2"><path d="M360 500q100 12 200 0M320 550q160 16 320 0M380 610q120 10 240 0M340 680q180 18 360 0"/></g>
    <path d="M900 900 1020 520 1180 440 1360 430 1600 500 1600 900z" fill="#3a2b28"/>
    <path d="M980 900 1080 560 1200 500 1380 500 1600 560 1600 900z" fill="#4a3830"/>
    <g transform="translate(1180 540)">
      ${temple(0, 0, 330, 180, { columns: 6, fill: '#2b2118', lit: true })}
    </g>
    <g fill="#2b2118"><path d="M1020 900 1080 700 1200 660 1400 680 1600 740 1600 900z" opacity=".55"/></g>
    <g transform="translate(740 620)">
      <path d="M-40 0h80l-12 22h-56z" fill="#2b2118"/>
      <path d="M0 0v-50" stroke="#2b2118" stroke-width="3"/>
      <path d="M0-48 34-10H0z" fill="#e8dcc2" opacity=".9"/>
      <path d="M-3-44-30-12h27z" fill="#e8dcc2" opacity=".7"/>
    </g>
    <g transform="translate(830 650)">${boat(0, 0, .8, '#2b2118', '#e8dcc2')}</g>
    <g transform="translate(890 680)">${boat(0, 0, .6, '#2b2118', '#e8dcc2')}</g>
    <g transform="translate(960 640)">
      <circle cx="0" cy="-26" r="6" fill="#2b2118"/><path d="M-5-18h10l4 22-6 1-3-12-3 12-6-1z" fill="#2b2118"/><path d="M5-12 22-30" stroke="#2b2118" stroke-width="4" stroke-linecap="round"/><path d="M-4-8-10 10M4-8 10 10" stroke="#2b2118" stroke-width="4" stroke-linecap="round"/>
    </g>
    <g transform="translate(860 590)" opacity=".9"><path d="M-20 0h40l-6 12h-28z" fill="#2b2118"/><path d="M0 0v-26" stroke="#2b2118" stroke-width="2"/><path d="M0-24 18-6H0z" fill="#e8dcc2" opacity=".8"/></g>
    ${gull(820, 300, 1, '#f4ead6')}${gull(880, 270, .8, '#f4ead6')}${gull(1250, 340, .9, '#f4ead6')}
    <path d="M0 900h1600" stroke="#f7dfae" stroke-width="1" opacity=".2"/>
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".13"/>
  `);

  scenes.final = () => svg(1600, 900, (u) => `
    <rect width="1600" height="900" fill="url(#${u}night)"/>
    ${stars(110, 31, 480)}
    ${moon(u, 1250, 220, 62)}
    <path d="M0 540h1600v360H0z" fill="url(#${u}sea)"/>
    <path d="M0 540c180-20 340-12 500 10s300 12 450-8 300-10 470 8 180 8 180 8v342H0z" fill="#0b2c36" opacity=".65"/>
    <g stroke="#f7dfae" opacity=".16" stroke-width="2"><path d="M1120 600q80 10 160 0M1080 660q120 14 240 0M1160 720q80 10 160 0"/></g>
    <path d="M760 900 900 620 1050 560 1220 550 1450 600 1600 640 1600 900z" fill="#040d13"/>
    <g transform="translate(1120 620)">${temple(0, 0, 300, 160, { columns: 6, fill: '#081820', lit: true })}</g>
    <g transform="translate(720 660)">
      <g transform="translate(0 0)">${traveler(0, 0, 1.1, '#02070b')}</g>
      <g transform="translate(80 10)">${figure(0, 0, 1, '#02070b', 'stand')}</g>
      <g transform="translate(-80 10)">${figure(0, 0, 1, '#02070b', 'stand')}</g>
    </g>
    <g transform="translate(560 660) scale(1.2)">
      <circle cx="0" cy="-70" r="10" fill="#02070b"/>
      <path d="M-8-58h16l6 34-10 2-5-20-5 20-10-2z" fill="#02070b"/>
      <path d="M-7-24h5l3 24h-6zM2-24h5l3 24h-6z" fill="#02070b"/>
      <path d="M8-46 24-40" stroke="#02070b" stroke-width="6" stroke-linecap="round"/>
      <path d="M-12-80q12-14 24 0z" fill="#c9b58f"/>
    </g>
    <g transform="translate(1040 680)">
      <rect x="-70" y="0" width="140" height="12" rx="4" fill="#2b2118"/>
      <rect x="-56" y="12" width="10" height="40" fill="#2b2118"/><rect x="46" y="12" width="10" height="40" fill="#2b2118"/>
      <path d="M-14-30h28l-6 30h-16z" fill="#e2b264" opacity=".8"/>
      <circle cx="0" cy="-38" r="6" fill="#f7dfae" opacity=".7"/>
    </g>
    <g stroke="#f7dfae" stroke-width="1.5" opacity=".55" fill="none"><path d="M900 600q40-30 80 0M1020 580q40-30 80 0"/></g>
    <g fill="#f7dfae" opacity=".4"><circle cx="700" cy="500" r="2"/><circle cx="760" cy="470" r="1.6"/><circle cx="820" cy="510" r="2"/><circle cx="600" cy="520" r="1.4"/></g>
    <rect width="1600" height="900" fill="url(#${u}shadow)" opacity=".16"/>
  `);

  /* ============================================================
     DOCUMENTS
     ============================================================ */

  const docs = {};

  docs.route = () => svg(1000, 620, (u) => `
    <rect width="1000" height="620" fill="#0b2330"/>
    <path d="M0 480c100-40 180-20 260 10s160 30 240-10 160-30 240 10 160 20 260-10v140H0z" fill="#164a58"/>
    <path d="M0 180c80-30 160-20 220 10s130 20 200-10 150-20 220 10 140 10 220-20 140-10 140-10v430c-100-30-180-20-260 10s-160 30-240-10-160-30-240 10-160 20-260-10z" fill="#c9b58f"/>
    <path d="M0 180c80-30 160-20 220 10s130 20 200-10 150-20 220 10 140 10 220-20 140-10 140-10v60c-100-20-180-10-260 20s-160 30-240-10-160-30-240 10-160 20-260-10z" fill="#d8cbb2" opacity=".6"/>
    <path d="M0 480c100-40 180-20 260 10s160 30 240-10 160-30 240 10 160 20 260-10v60c-100 30-180 20-260-10s-160-30-240 10-160 30-240-10-160-20-260 10z" fill="#b7a98f" opacity=".45"/>
    <g stroke="#8f8677" stroke-width="2" opacity=".5"><path d="M0 300h1000M0 380h1000M300 0v620M600 0v620"/></g>
    <g transform="translate(170 400)">
      <circle r="9" fill="#b85c3e"/><circle r="17" fill="none" stroke="#b85c3e" stroke-width="2" opacity=".5"/>
      <text x="28" y="7" font-family="Georgia,serif" font-size="22" fill="#f4ead6">Montpellier</text>
    </g>
    <g transform="translate(700 250)">
      <circle r="9" fill="#b85c3e"/><circle r="17" fill="none" stroke="#b85c3e" stroke-width="2" opacity=".5"/>
      <text x="28" y="7" font-family="Georgia,serif" font-size="22" fill="#f4ead6">Ravenne</text>
    </g>
    <path d="M178 392C300 470 430 420 520 360S640 280 692 256" fill="none" stroke="#e2b264" stroke-width="5" stroke-dasharray="14 12" stroke-linecap="round"/>
    <g transform="translate(410 430) rotate(-8)">
      <rect x="-60" y="-22" width="120" height="36" rx="6" fill="#d8c7a4"/><rect x="-60" y="-8" width="120" height="10" fill="#b85c3e"/><circle cx="-34" cy="14" r="8" fill="#1a1d1f"/><circle cx="34" cy="14" r="8" fill="#1a1d1f"/>
    </g>
    <g transform="translate(70 70)">
      <text x="0" y="0" font-family="Georgia,serif" font-size="26" fill="#f7dfae" letter-spacing="3">DE MONTPELLIER À RAVENNE</text>
      <text x="0" y="34" font-family="Arial,sans-serif" font-size="17" fill="#bcb09a">Route par la côte méditerranéenne · carte schématique</text>
    </g>
    <g transform="translate(60 540)" stroke="#f4ead6" fill="none">
      <path d="M0 0h260M0-8v16M130-8v16M260-8v16" stroke-width="3"/>
      <text x="0" y="-18" font-family="Arial,sans-serif" font-size="15" fill="#f4ead6">0</text>
      <text x="112" y="-18" font-family="Arial,sans-serif" font-size="15" fill="#f4ead6">100</text>
      <text x="238" y="-18" font-family="Arial,sans-serif" font-size="15" fill="#f4ead6">200 km</text>
    </g>
    <g transform="translate(760 520)" fill="#f4ead6" opacity=".85">
      <text x="0" y="0" font-family="Arial,sans-serif" font-size="15">MER MÉDITERRANÉE</text>
      <path d="M0 14q40-10 80 0t80 0" stroke="#9fd6d6" fill="none" stroke-width="2"/>
    </g>
    <rect width="1000" height="620" fill="none" stroke="#e2b264" stroke-width="2" opacity=".3"/>
  `);

  docs.mers = () => svg(1000, 620, (u) => `
    <rect width="1000" height="620" fill="#0b2330"/>
    <path d="M0 0h1000v620H0z" fill="#9fc4c4"/>
    <path d="M80 0c40 80 30 160 80 220s110 80 120 160-20 140 40 240h180c-40-80-80-140-60-220s80-120 60-200-80-120-60-200z" fill="#d8cbb2"/>
    <path d="M560 0c30 70 80 110 80 180s-40 120 0 200 80 140 40 240h220c-20-80-60-140-40-220s70-120 40-200-80-120-60-200z" fill="#d8cbb2"/>
    <path d="M600 140c40 20 80 20 120 0s80-20 120 0 60 20 100 0" fill="none" stroke="#8f8677" stroke-width="3"/>
    <g font-family="Georgia,serif" fill="#3a4a4a" font-style="italic">
      <text x="420" y="180" font-size="28" transform="rotate(72 420 180)">ADRIATIQUE</text>
      <text x="330" y="430" font-size="26" transform="rotate(64 330 430)">IONIENNE</text>
      <text x="660" y="300" font-size="26">ÉGÉE</text>
      <text x="640" y="470" font-size="26">MÉDITERRANÉE</text>
    </g>
    <g transform="translate(610 110)">
      <circle r="8" fill="#b85c3e"/><text x="16" y="6" font-family="Georgia,serif" font-size="20" fill="#2c2822">Ravenne</text>
    </g>
    <g transform="translate(680 400)">
      <circle r="8" fill="#b85c3e"/><text x="16" y="6" font-family="Georgia,serif" font-size="20" fill="#2c2822">Patras</text>
    </g>
    <path d="M616 118C560 200 500 260 500 320s80 60 170 80" fill="none" stroke="#e2b264" stroke-width="5" stroke-dasharray="12 10"/>
    <g transform="translate(500 250) rotate(60)">
      <path d="M-30 0h60l-8 12h-44z" fill="#2b2118"/><rect x="-14" y="-18" width="28" height="18" fill="#f1e8d8"/><rect x="-10" y="-32" width="20" height="14" fill="#b85c3e"/>
    </g>
    <g transform="translate(60 550)" stroke="#2c2822" fill="none"><path d="M0 0h240M0-7v14M120-7v14M240-7v14" stroke-width="2"/><text x="0" y="-14" font-family="Arial,sans-serif" font-size="14" fill="#2c2822">0</text><text x="104" y="-14" font-family="Arial,sans-serif" font-size="14" fill="#2c2822">200</text><text x="220" y="-14" font-family="Arial,sans-serif" font-size="14" fill="#2c2822">400 km</text></g>
    <rect width="1000" height="620" fill="none" stroke="#e2b264" stroke-width="2" opacity=".3"/>
  `);

  docs.patras = () => svg(900, 620, (u) => `
    <rect width="900" height="620" fill="#0b2330"/>
    <rect width="900" height="620" fill="#9fc4c4"/>
    <path d="M0 80c80 40 120 100 100 180s-60 160 0 240 80 100 60 120H0z" fill="#d8cbb2"/>
    <path d="M300 0c40 80 40 160 20 240s-20 160 40 220 60 100 40 160H260c-20-80-40-140-20-220s40-160 0-240S260 60 280 0z" fill="#d8cbb2"/>
    <path d="M520 120c60 20 100 60 120 120s20 120 60 160 80 60 100 60" fill="none" stroke="#8f8677" stroke-width="2" opacity=".5"/>
    <path d="M420 340c80 10 140 40 200 80s120 60 200 60" fill="none" stroke="#8f8677" stroke-width="2" opacity=".5"/>
    <g transform="translate(330 300)">
      <circle r="10" fill="#b85c3e"/><circle r="20" fill="none" stroke="#b85c3e" stroke-width="2" opacity=".5"/>
      <text x="26" y="7" font-family="Georgia,serif" font-size="22" fill="#2c2822">Patras</text>
      <text x="26" y="30" font-family="Arial,sans-serif" font-size="14" fill="#4a3a26">Achaïe · Péloponnèse</text>
    </g>
    <g transform="translate(390 250)">
      <path d="M-30 0h60" stroke="#2c2822" stroke-width="3"/><path d="M-20 0v-20M20 0v-20" stroke="#2c2822" stroke-width="2"/><path d="M-30-20h60" stroke="#2c2822" stroke-width="2"/><text x="34" y="5" font-family="Arial,sans-serif" font-size="13" fill="#2c2822">pont Rion-Antirion</text>
    </g>
    <g transform="translate(620 380)">
      <circle r="7" fill="#2c2822"/><text x="14" y="5" font-family="Georgia,serif" font-size="19" fill="#2c2822">Athènes</text>
    </g>
    <g transform="translate(520 210)">
      <circle r="6" fill="#2c2822"/><text x="12" y="5" font-family="Georgia,serif" font-size="18" fill="#2c2822">Delphes</text>
    </g>
    <text x="60" y="80" font-family="Georgia,serif" font-size="28" fill="#f7dfae" letter-spacing="2">LA GRÈCE ET LE PÉLOPONNÈSE</text>
    <text x="60" y="110" font-family="Arial,sans-serif" font-size="15" fill="#bcb09a">Carte schématique · repères du voyage</text>
    <g transform="translate(680 500)" stroke="#2c2822" fill="none"><path d="M0 0h160M0-7v14M80-7v14M160-7v14" stroke-width="2"/><text x="0" y="-12" font-family="Arial,sans-serif" font-size="13" fill="#2c2822">0</text><text x="64" y="-12" font-family="Arial,sans-serif" font-size="13" fill="#2c2822">100</text><text x="140" y="-12" font-family="Arial,sans-serif" font-size="13" fill="#2c2822">200 km</text></g>
    <rect width="900" height="620" fill="none" stroke="#e2b264" stroke-width="2" opacity=".3"/>
  `);

  docs.note = () => svg(900, 600, (u) => `
    ${paper(900, 600, '#efe4cf')}
    <g transform="translate(450 70)" fill="#b85c3e"><circle r="9"/><circle r="4" fill="#8f4530"/></g>
    ${handText(120, 190, 'Si vous voulez me retrouver,', 34, '#2c3a44')}
    ${handText(120, 250, 'suivez les dieux.', 34, '#2c3a44')}
    ${handText(120, 340, 'La Grèce vous attend.', 30, '#3a4a44')}
    ${handText(600, 470, '— T.', 40, '#8f4530', -6)}
    <g transform="translate(110 420)" opacity=".5">${laurel(0, 0, 52, '#8f8677')}</g>
    <path d="M60 120h780" stroke="#b7a98f" stroke-width="1" opacity=".5"/>
    <rect width="900" height="600" fill="none" stroke="#b7a98f" stroke-width="2" opacity=".4"/>
  `);

  docs.papier = () => svg(900, 620, (u) => `
    ${paper(900, 620, '#e8dcc2')}
    <g transform="translate(450 130)">
      <text text-anchor="middle" font-family="Georgia,serif" font-size="96" fill="#2c3a44" letter-spacing="8">ΔΕΛΦΟΙ</text>
      <text text-anchor="middle" y="42" font-family="Arial,sans-serif" font-size="18" fill="#6b5a45" letter-spacing="4">Δ · Ε · Λ · Φ · Ο · Ι</text>
    </g>
    <g font-family="Georgia,serif" fill="#4a3a26">
      <text x="90" y="270" font-size="16" letter-spacing="2">ALPHABET GREC</text>
      <g font-size="22">
        <text x="90" y="310">Α α</text><text x="190" y="310">Β β</text><text x="290" y="310">Γ γ</text><text x="390" y="310">Δ δ</text><text x="490" y="310">Ε ε</text><text x="590" y="310">Ζ ζ</text>
        <text x="90" y="350">Η η</text><text x="190" y="350">Θ θ</text><text x="290" y="350">Ι ι</text><text x="390" y="350">Κ κ</text><text x="490" y="350">Λ λ</text><text x="590" y="350">Μ μ</text>
        <text x="90" y="390">Ν ν</text><text x="190" y="390">Ξ ξ</text><text x="290" y="390">Ο ο</text><text x="390" y="390">Π π</text><text x="490" y="390">Ρ ρ</text><text x="590" y="390">Σ σ</text>
        <text x="90" y="430">Τ τ</text><text x="190" y="430">Υ υ</text><text x="290" y="430">Φ φ</text><text x="390" y="430">Χ χ</text><text x="490" y="430">Ψ ψ</text><text x="590" y="430">Ω ω</text>
      </g>
    </g>
    <g transform="translate(690 460)" opacity=".65">${laurel(0, 0, 54, '#8f8677')}</g>
    <text x="90" y="560" font-family="Arial,sans-serif" font-size="14" fill="#6b5a45">Δ = D · ε = e · λ = l · φ = ph · ο = o · ι = i</text>
    <rect width="900" height="620" fill="none" stroke="#b7a98f" stroke-width="2" opacity=".4"/>
  `);

  docs.sanctuaire = () => svg(1000, 620, (u) => `
    <rect width="1000" height="620" fill="#e8dcc2"/>
    <path d="M0 470c100-40 200-20 300 10s200 20 300-10 200-20 300 10 100 20 100 20v120H0z" fill="#cbbd9f"/>
    <path d="M0 520h1000v100H0z" fill="#b7a98f" opacity=".5"/>
    <g transform="translate(470 420)">${temple(0, 0, 280, 140, { columns: 6, fill: '#d9cdb8', lit: true })}</g>
    <g transform="translate(150 390)">${temple(0, 0, 110, 70, { columns: 4, fill: '#d9cdb8' })}</g>
    <g transform="translate(800 410)">${temple(0, 0, 90, 60, { columns: 4, fill: '#d9cdb8' })}</g>
    <g transform="translate(500 520)">
      <rect x="-40" y="-30" width="80" height="30" fill="#c9b58f"/><path d="M-50-30h100l-14-12h-72z" fill="#b7a98f"/>
    </g>
    <path d="M120 600C220 540 300 520 400 500s160-10 230-30 160-20 240 10" fill="none" stroke="#8e8270" stroke-width="8" opacity=".5" stroke-dasharray="16 12"/>
    <g font-family="Georgia,serif" fill="#4a3a26" font-size="18">
      <text x="560" y="390">TEMPLE D'APOLLON</text>
      <text x="110" y="360">TRÉSOR</text>
      <text x="760" y="380">AUTEL</text>
      <text x="430" y="570">VOIE SACRÉE</text>
    </g>
    <g transform="translate(760 120)">
      <circle r="46" fill="none" stroke="#8e8270" stroke-width="2" stroke-dasharray="6 6"/>
      <text text-anchor="middle" y="8" font-family="Georgia,serif" font-size="18" fill="#4a3a26">STADE</text>
      <path d="M-20 20h40" stroke="#8e8270" stroke-width="2"/>
    </g>
    <g transform="translate(180 120)">
      <circle r="40" fill="none" stroke="#8e8270" stroke-width="2" stroke-dasharray="6 6"/>
      <text text-anchor="middle" y="7" font-family="Georgia,serif" font-size="17" fill="#4a3a26">THÉÂTRE</text>
    </g>
    <rect width="1000" height="620" fill="none" stroke="#b7a98f" stroke-width="2" opacity=".4"/>
  `);

  docs.jeux = () => svg(900, 600, (u) => `
    ${paper(900, 600, '#e8dcc2')}
    <g transform="translate(450 90)">${laurel(0, 0, 54, C.gold3)}</g>
    <text x="450" y="180" text-anchor="middle" font-family="Georgia,serif" font-size="26" fill="#4a3a26" letter-spacing="4">LES JEUX PYTHIQUES</text>
    <g stroke="#b7a98f" stroke-width="2" opacity=".6"><path d="M120 210h660M120 230h660M120 250h660M120 270h660M120 290h660M120 310h660M120 330h660M120 350h660M120 370h660M120 390h660M120 410h660M120 430h540"/></g>
    <text x="90" y="520" font-family="Arial,sans-serif" font-size="14" fill="#6b5a45">D'après les Jeux Pythiques, Larousse.</text>
    <rect width="900" height="600" fill="none" stroke="#b7a98f" stroke-width="2" opacity=".4"/>
  `);

  docs.pythie = () => svg(900, 600, (u) => `
    <rect width="900" height="600" fill="#0b1318"/>
    <path d="M0 0h900v500H0z" fill="#18242a"/>
    <path d="M300 0 560 0 620 500 220 500z" fill="#f7dfae" opacity=".12"/>
    <g transform="translate(450 460)">
      <ellipse cx="0" cy="50" rx="130" ry="20" fill="#02060a" opacity=".55"/>
      <path d="M-70 30h140l-14-14H-56z" fill="#2b2118"/>
      <path d="M-46 16 0-80 46 16z" fill="#3a2a20"/>
      <path d="M-46 16 0-80V16z" fill="#2b1e16"/>
      <g stroke="#b8a986" stroke-width="3"><path d="M-40 2h80M-32 16h64"/></g>
      <circle cx="0" cy="-88" r="8" fill="#c9b58f"/>
      <path d="M-7-80h14l7 30-9 2-5-16-5 16-9-2z" fill="#c9b58f"/>
      <path d="M-7-48h4l3 26h-5zM3-48h4l3 26h-5z" fill="#c9b58f"/>
      <path d="M7-76 26-88" stroke="#c9b58f" stroke-width="4" stroke-linecap="round"/>
    </g>
    <g fill="none" stroke="#9fd6d6" stroke-width="8" opacity=".16" filter="url(#${u}soft)">
      <path d="M180 470c60-50 160-30 200-110s160-90 220-40"/>
      <path d="M220 510c60-40 150-20 190-90s150-70 210-20"/>
    </g>
    <g transform="translate(720 430)" fill="#6f7d56" opacity=".8">
      <path d="M0 0c-8-40 4-70 24-96 6 34 2 68-8 96z"/><path d="M18-70c-30-12-52-4-70 12 26 8 50 2 70-12z"/><path d="M22-80c26-18 50-16 70-2-24 12-50 14-70 2z"/>
    </g>
    <text x="60" y="70" font-family="Georgia,serif" font-size="24" fill="#f7dfae" letter-spacing="3">L'ADYTON DU TEMPLE</text>
    <text x="60" y="100" font-family="Arial,sans-serif" font-size="15" fill="#bcb09a">La Pythie, assise sur un trépied, parle au nom d'Apollon.</text>
    <rect width="900" height="600" fill="none" stroke="#e2b264" stroke-width="2" opacity=".25"/>
  `);

  docs.coin = () => svg(1000, 620, (u) => `
    <rect width="1000" height="620" fill="#050b0f"/>
    <radialGradient id="${u}v" cx=".42" cy=".45" r=".62"><stop offset="0" stop-color="#1d3a42"/><stop offset="1" stop-color="#050b0f"/></radialGradient>
    <rect width="1000" height="620" fill="url(#${u}v)"/>
    <g transform="translate(330 310)">
      <circle r="220" fill="#000" opacity=".45" filter="url(#${u}soft2)"/>
      <circle r="196" fill="#3d3a33"/>
      <circle r="188" fill="url(#${u}silver)"/>
      <circle r="178" fill="none" stroke="#6f6c63" stroke-width="2" opacity=".55"/>
      ${owl(0, 10, 2.7, '#b9b5a7', '#3a3833')}
      <g fill="#6f6c63" opacity=".8"><path d="M-130-60c-14 24-14 48 0 72 6-24 6-48 0-72z"/><path d="M-114-72c-10 12-12 26-5 40 5-14 7-26 5-40z"/></g>
      <text x="80" y="100" font-family="Georgia,serif" font-size="48" fill="#4f4c45" letter-spacing="5">ΑΘΕ</text>
    </g>
    <g font-family="Arial,sans-serif" fill="#e8dcc2">
      <g stroke="#e2b264" stroke-width="1" opacity=".5"><path d="M520 180h120M545 310h140M520 440h120"/></g>
      <text x="660" y="176" font-size="20">La chouette</text>
      <text x="660" y="202" font-size="15" fill="#bcb09a">attribut d'Athéna</text>
      <text x="700" y="306" font-size="20">La branche d'olivier</text>
      <text x="700" y="332" font-size="15" fill="#bcb09a">symbole de la cité</text>
      <text x="660" y="436" font-size="20">ΑΘΕ</text>
      <text x="660" y="462" font-size="15" fill="#bcb09a">« des Athéniens »</text>
    </g>
    <text x="60" y="570" font-family="Georgia,serif" font-size="22" fill="#f7dfae" letter-spacing="2">TÉTRADRACHME D'ARGENT · ATHÈNES, VERS 470 AV. J.-C.</text>
    <rect width="1000" height="620" fill="none" stroke="#e2b264" stroke-width="2" opacity=".25"/>
  `);

  docs.acropole = () => svg(1000, 620, (u) => `
    <rect width="1000" height="620" fill="#e8dcc2"/>
    <path d="M0 480c120-60 220-50 320-10s200 40 300 0 200-30 380 20v130H0z" fill="#cbbd9f"/>
    <path d="M0 520h1000v100H0z" fill="#b7a98f" opacity=".45"/>
    <g transform="translate(450 400)">${temple(0, 0, 300, 150, { columns: 8, fill: '#d9cdb8', lit: true })}</g>
    <g transform="translate(180 420)">${temple(0, 0, 140, 80, { columns: 4, fill: '#d9cdb8' })}</g>
    <g transform="translate(780 430)">${temple(0, 0, 100, 58, { columns: 4, fill: '#d9cdb8' })}</g>
    <g transform="translate(660 300)">
      <rect x="-8" y="-50" width="16" height="50" fill="#d9cdb8"/><circle cx="0" cy="-62" r="10" fill="#d9cdb8"/><path d="M-14-50h28" stroke="#b7a98f" stroke-width="3"/>
    </g>
    <g font-family="Georgia,serif" fill="#4a3a26" font-size="18">
      <text x="530" y="380">PARTHÉNON</text>
      <text x="120" y="400">PROPYLÉES</text>
      <text x="760" y="410">ÉRECHTHEION</text>
      <text x="630" y="250">ATHÉNA</text>
    </g>
    <g transform="translate(820 520)">
      <circle r="40" fill="none" stroke="#8e8270" stroke-width="2" stroke-dasharray="6 6"/>
      <text text-anchor="middle" y="6" font-family="Georgia,serif" font-size="14" fill="#4a3a26">MUSÉE</text>
    </g>
    <g transform="translate(120 520)">
      <circle r="42" fill="none" stroke="#8e8270" stroke-width="2" stroke-dasharray="6 6"/>
      <text text-anchor="middle" y="5" font-family="Georgia,serif" font-size="12" fill="#4a3a26">THÉÂTRE</text>
    </g>
    <text x="60" y="70" font-family="Georgia,serif" font-size="26" fill="#4a3a26" letter-spacing="3">L'ACROPOLE D'ATHÈNES</text>
    <text x="60" y="100" font-family="Arial,sans-serif" font-size="15" fill="#6b5a45">La « ville haute », centre religieux de la cité.</text>
    <rect width="1000" height="620" fill="none" stroke="#b7a98f" stroke-width="2" opacity=".4"/>
  `);

  docs.billet = () => svg(1000, 560, (u) => `
    <rect width="1000" height="560" fill="#0b1318"/>
    <g transform="translate(90 50)">
      <rect width="820" height="460" rx="6" fill="#efe4cf"/>
      <rect x="14" y="14" width="792" height="432" fill="none" stroke="#b7a98f" stroke-width="2"/>
      <rect x="14" y="14" width="792" height="432" fill="none" stroke="#b85c3e" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
      <g transform="translate(40 40)">
        <text x="0" y="0" font-family="Georgia,serif" font-size="18" fill="#8f4530" letter-spacing="4">ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ</text>
        <text x="0" y="34" font-family="Georgia,serif" font-size="15" fill="#6b5a45">ΜΟΥΣΕΙΟ ΑΚΡΟΠΟΛΗΣ · MUSÉE DE L'ACROPOLE</text>
        <text x="0" y="62" font-family="Arial,sans-serif" font-size="13" fill="#6b5a45">ΑΘΗΝΑ · ATHÈNES</text>
      </g>
      <g transform="translate(620 60)">
        ${owl(0, 0, 1.1, '#c9b58f', '#4a3a26')}
      </g>
      <g transform="translate(40 140)">
        <text x="0" y="0" font-family="Arial,sans-serif" font-size="12" fill="#6b5a45" letter-spacing="2">ΕΙΣΙΤΗΡΙΟ · BILLET D'ENTRÉE</text>
        <text x="0" y="42" font-family="Georgia,serif" font-size="34" fill="#2c2822">ΜΟΥΣΕΙΟ ΑΚΡΟΠΟΛΗΣ</text>
        <text x="0" y="72" font-family="Arial,sans-serif" font-size="14" fill="#6b5a45">Musée de l'Acropole · Athènes</text>
      </g>
      <g transform="translate(40 280)" font-family="Arial,sans-serif" fill="#4a3a26" font-size="13">
        <text x="0" y="0">Date : 12 avril 2026</text>
        <text x="0" y="24">Heure : 10 h 30</text>
        <text x="0" y="48">Tarif : 10 €</text>
        <text x="0" y="72">N° 004217</text>
      </g>
      <g transform="translate(470 280)">
        <rect width="120" height="120" fill="none" stroke="#2c2822" stroke-width="2"/>
        <g fill="#2c2822"><rect x="10" y="10" width="30" height="30"/><rect x="80" y="10" width="30" height="30"/><rect x="10" y="80" width="30" height="30"/><rect x="45" y="45" width="30" height="30"/></g>
        <text x="0" y="140" font-family="Arial,sans-serif" font-size="10" fill="#6b5a45">004217</text>
      </g>
      <path d="M600 20v420" stroke="#b7a98f" stroke-width="1" stroke-dasharray="4 6" opacity=".6"/>
      <g transform="translate(650 170)" font-family="Georgia,serif" fill="#8f4530">
        <text x="0" y="0" font-size="14" letter-spacing="2">SUIVEZ LA CHOUETTE</text>
        <path d="M0 20h120" stroke="#8f4530" stroke-width="1" opacity=".5"/>
        <text x="0" y="50" font-size="12" fill="#6b5a45">— T.</text>
      </g>
    </g>
    <rect width="1000" height="560" fill="none" stroke="#e2b264" stroke-width="2" opacity=".25"/>
  `);

  docs.sphinx = () => svg(900, 600, (u) => `
    <rect width="900" height="600" fill="#0b1318"/>
    <path d="M0 0h900v520H0z" fill="#162126"/>
    <path d="M320 0 520 0 600 520 240 520z" fill="#f7dfae" opacity=".1"/>
    <g transform="translate(500 480)">
      <rect x="-130" y="0" width="260" height="20" fill="#b7a98f"/>
      <g>
        <path d="M-100 0c-20-50-10-100 20-130 30-30 80-40 120-15 30 20 45 55 35 95-8 35-30 50-55 50z" fill="#d9cdb8"/>
        <path d="M-60-100c-30-20-45-60-30-100 25 8 45 30 50 60z" fill="#e6dcc8"/>
        <path d="M40-140c15-30 45-45 75-38-8 28-28 50-55 62z" fill="#e6dcc8"/>
        <circle cx="55" cy="-130" r="28" fill="#e6dcc8"/>
        <path d="M38-150c0-22 8-34 17-34s17 12 17 34c-4-8-10-11-17-11s-13 3-17 11z" fill="#c9b58f"/>
        <circle cx="45" cy="-133" r="2.6" fill="#2c2822"/><circle cx="66" cy="-133" r="2.6" fill="#2c2822"/>
        <path d="M52-122h8l-4 6z" fill="#8f7d63"/>
      </g>
    </g>
    <g transform="translate(720 460)" opacity=".7">${laurel(0, 0, 42, C.gold3)}</g>
    <text x="50" y="60" font-family="Georgia,serif" font-size="24" fill="#f7dfae" letter-spacing="3">LE SPHINX DU MUSÉE</text>
    <text x="50" y="90" font-family="Arial,sans-serif" font-size="15" fill="#bcb09a">Corps de lion, ailes d'oiseau, tête de femme.</text>
    <rect width="900" height="600" fill="none" stroke="#e2b264" stroke-width="2" opacity=".25"/>
  `);

  docs.sounion = () => svg(900, 620, (u) => `
    <rect width="900" height="620" fill="#0b2330"/>
    <rect width="900" height="620" fill="#9fc4c4"/>
    <path d="M0 0h300c20 80 0 160-40 240s-60 160-20 240l40 140H0z" fill="#d8cbb2"/>
    <path d="M300 0c60 80 80 160 60 240s-20 160 40 220 60 100 40 160H300c-20-80-40-140-20-220s40-160 0-240S260 60 280 0z" fill="#cbbd9f"/>
    <path d="M560 260c60-10 100 20 120 80s20 120 60 160 80 60 160 60" fill="none" stroke="#8f8677" stroke-width="2" opacity=".4"/>
    <g transform="translate(620 340)">
      <circle r="9" fill="#b85c3e"/><text x="18" y="6" font-family="Georgia,serif" font-size="20" fill="#2c2822">Athènes</text>
    </g>
    <g transform="translate(690 520)">
      <circle r="9" fill="#b85c3e"/><text x="18" y="6" font-family="Georgia,serif" font-size="20" fill="#2c2822">Cap Sounion</text>
      <path d="M-4 0h-50" stroke="#b85c3e" stroke-width="2"/>
    </g>
    <path d="M626 346C670 380 700 430 690 512" fill="none" stroke="#e2b264" stroke-width="4" stroke-dasharray="10 8"/>
    <g transform="translate(740 540) scale(.7)">${temple(0, 0, 80, 50, { columns: 4, fill: '#2b2118' })}</g>
    <text x="60" y="70" font-family="Georgia,serif" font-size="26" fill="#f7dfae" letter-spacing="2">L'ATTIQUE ET LE CAP SOUNION</text>
    <text x="60" y="100" font-family="Arial,sans-serif" font-size="15" fill="#bcb09a">Au sud d'Athènes, à la pointe de la péninsule.</text>
    <g transform="translate(60 550)" stroke="#2c2822" fill="none"><path d="M0 0h220M0-7v14M110-7v14M220-7v14" stroke-width="2"/><text x="0" y="-14" font-family="Arial,sans-serif" font-size="13" fill="#2c2822">0</text><text x="94" y="-14" font-family="Arial,sans-serif" font-size="13" fill="#2c2822">20</text><text x="200" y="-14" font-family="Arial,sans-serif" font-size="13" fill="#2c2822">40 km</text></g>
    <rect width="900" height="620" fill="none" stroke="#e2b264" stroke-width="2" opacity=".3"/>
  `);

  docs.littoral = () => svg(1000, 620, (u) => `
    <rect width="1000" height="620" fill="#e8dcc2"/>
    <rect y="260" width="1000" height="360" fill="#9fc4c4"/>
    <path d="M0 300c120-40 220-20 320 20s200 30 320-10 180-20 360 0v310H0z" fill="#d8cbb2"/>
    <path d="M0 400c150-20 260 0 380 30s220 20 340-10 180-10 280 10v190H0z" fill="#cbbd9f" opacity=".65"/>
    <g transform="translate(150 520)">
      <rect x="-40" y="-20" width="80" height="30" fill="#8f4530"/><path d="M-50-20h100l-16-14h-68z" fill="#b85c3e"/>
    </g>
    <g transform="translate(250 560)">${boat(0, 0, .6, '#2b2118', '#f4ead6')}</g>
    <g transform="translate(330 580)">${boat(0, 0, .45, '#2b2118', '#f4ead6')}</g>
    <g transform="translate(480 470)">
      <rect x="-70" y="-60" width="140" height="60" fill="#f1e8d8"/><path d="M-80-60h160l-20-24h-120z" fill="#b85c3e"/>
      <g fill="#17323c"><rect x="-50" y="-44" width="20" height="20"/><rect x="-20" y="-44" width="20" height="20"/><rect x="10" y="-44" width="20" height="20"/></g>
    </g>
    <g transform="translate(650 430)">
      <rect x="-90" y="-90" width="180" height="90" fill="#e6dcc8"/><path d="M-100-90h200l-24-28h-152z" fill="#a04e36"/>
      <g fill="#17323c"><rect x="-66" y="-70" width="24" height="24"/><rect x="-30" y="-70" width="24" height="24"/><rect x="6" y="-70" width="24" height="24"/><rect x="42" y="-70" width="24" height="24"/></g>
    </g>
    <g transform="translate(820 500)">
      <rect x="-80" y="-50" width="160" height="50" fill="#efe4cf"/><path d="M-90-50h180l-20-20h-140z" fill="#b85c3e"/>
      <g fill="#17323c"><rect x="-56" y="-36" width="20" height="20"/><rect x="-26" y="-36" width="20" height="20"/><rect x="4" y="-36" width="20" height="20"/><rect x="34" y="-36" width="20" height="20"/></g>
    </g>
    <g stroke="#8e8270" stroke-width="6" opacity=".6"><path d="M0 560h1000"/></g>
    <g stroke="#b85c3e" stroke-width="3" fill="none" stroke-dasharray="8 6"><path d="M300 430h300M300 430v-40M600 430v-40"/><path d="M700 360h160M700 360v-30M860 360v-30"/></g>
    <g font-family="Georgia,serif" fill="#3a2a20" font-size="18">
      <text x="120" y="260">MER</text><text x="120" y="284">MÉDITERRANÉE</text>
      <text x="430" y="380">PORT DE PÊCHE</text>
      <text x="610" y="330">HÔTELS · LOGEMENTS</text>
      <text x="760" y="410">LITTORAL BÂTI</text>
    </g>
    <text x="500" y="600" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="#4a3a26">Les hommes et les activités se concentrent sur la côte : c'est la littoralisation.</text>
    <rect width="1000" height="620" fill="none" stroke="#b7a98f" stroke-width="2" opacity=".4"/>
  `);

  docs.badge = () => svg(800, 520, (u) => `
    <rect width="800" height="520" fill="#0b1318"/>
    <path d="M400 0v120" stroke="#b85c3e" stroke-width="8"/>
    <g transform="translate(400 300)">
      <rect x="-150" y="-120" width="300" height="240" rx="12" fill="#efe4cf"/>
      <rect x="-138" y="-108" width="276" height="216" rx="8" fill="none" stroke="#b7a98f" stroke-width="2"/>
      <g transform="translate(0 -40)">${owl(0, 0, 1.1, '#c9b58f', '#4a3a26')}</g>
      <text text-anchor="middle" y="50" font-family="Georgia,serif" font-size="26" fill="#2c2822" letter-spacing="2">ΘΕΟΔΩΡΟΣ</text>
      <text text-anchor="middle" y="76" font-family="Arial,sans-serif" font-size="14" fill="#8f4530" letter-spacing="4">GUIDE · ΕΛΛΑΔΑ</text>
    </g>
    <text x="400" y="480" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="#bcb09a">Le badge de Théodoros, accroché au trident.</text>
    <rect width="800" height="520" fill="none" stroke="#e2b264" stroke-width="2" opacity=".25"/>
  `);

  const ART = { scenes, docs, C };
  window.ART = ART;
})();
