/* Burung hantu penyihir Jangan Nak Ibo Nian — digambar SVG, sayap mengepak, terbang dan hinggap di halaman. */
(function () {
  'use strict';
  if (window.__jniOwl) return; window.__jniOwl = true;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PERCH = ['.product-card', '.category-card', '.section-head h2', '.benefits > div', '.cta-band', '.owl-quote', '.about-section img', '.hero-copy h1', '.hero-actions', '.policy-grid article', '.search-box', '.filter-pills', '.library-case'];
  const SAY = ['Hoaam… selamat datang.', 'Hu-hu! Selamat datang.', 'Zzz… eh, saya tidak tidur kok.', 'Ide cerdas, kerja tuntas.', 'Cari tools teknik? Ada di sini.', 'Jangan nak ibo nian!', 'Sedikit ngantuk tidak apa-apa…', 'Coba lihat kategori Teknik & Konstruksi.', 'Butuh bantuan? Hubungi admin.', 'Hu-huu… rumusnya sudah dicek.'];

  // ---------- gambar ----------
  const WING = `
    <path class="wf" d="M130,136 C110,120 72,114 40,124 C24,129 12,140 6,152 Q4,163 15,162 Q17,173 29,170 Q33,181 47,176 Q53,185 67,178 Q75,185 89,176 Q99,179 111,168 Q123,162 132,154 Z"/>
    <path class="wc" d="M130,136 C110,121 74,116 44,125 C64,124 92,128 112,140 C120,145 126,150 131,152 Z"/>
    <g class="ws"><path d="M15,162 C30,150 52,142 74,140"/><path d="M29,170 C44,158 62,150 82,146"/><path d="M47,176 C60,165 76,157 92,152"/><path d="M67,178 C78,168 92,161 104,157"/><path d="M89,176 C98,169 108,164 116,160"/></g>
    <g class="wd"><path d="M14,152 l9,-3"/><path d="M27,160 l10,-4"/><path d="M42,166 l10,-4"/><path d="M60,168 l10,-4"/><path d="M80,168 l9,-4"/></g>`;
  const FOLD = `
    <path class="wf" d="M132,130 C112,140 104,174 112,202 C116,216 126,226 138,231 Q136,222 142,218 Q138,210 145,205 Q142,196 149,190 C152,170 150,146 132,130 Z"/>
    <path class="wc" d="M132,130 C116,140 110,160 112,178 C120,164 132,152 146,148 C144,140 140,134 132,130 Z"/>
    <g class="ws"><path d="M138,231 C134,214 136,196 142,180"/><path d="M142,218 C140,204 142,190 147,178"/><path d="M123,214 C122,196 126,180 134,168"/></g>
    <g class="wd"><path d="M118,200 l6,-7"/><path d="M127,212 l6,-7"/><path d="M116,186 l6,-6"/></g>`;
  const SVG = `
  <svg viewBox="0 -24 340 276" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="jniBody" cx="50%" cy="38%" r="65%"><stop offset="0" stop-color="#9bb0cc"/><stop offset=".7" stop-color="#6b81a3"/><stop offset="1" stop-color="#4b5d7d"/></radialGradient>
      <radialGradient id="jniChest" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="#f4f7fb"/><stop offset="1" stop-color="#c9d4e3"/></radialGradient>
      <radialGradient id="jniDisc" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#ffd27a"/><stop offset=".65" stop-color="#f0a83c"/><stop offset="1" stop-color="#c8741f"/></radialGradient>
      <radialGradient id="jniIris" cx="45%" cy="40%" r="60%"><stop offset="0" stop-color="#ffe08a"/><stop offset=".45" stop-color="#ff9a2e"/><stop offset="1" stop-color="#d2520c"/></radialGradient>
      <linearGradient id="jniBeak" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe06a"/><stop offset="1" stop-color="#d9981d"/></linearGradient>
      <linearGradient id="jniHat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a5f9a"/><stop offset="1" stop-color="#243258"/></linearGradient>
      <linearGradient id="jniWing" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4566"/><stop offset="1" stop-color="#2c2840"/></linearGradient>
      <clipPath id="jniEyeL"><circle cx="146" cy="117" r="15.6"/></clipPath><clipPath id="jniEyeR"><circle cx="194" cy="117" r="15.6"/></clipPath>
      <linearGradient id="jniLid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2b65a"/><stop offset=".7" stop-color="#dd923a"/><stop offset="1" stop-color="#b8691f"/></linearGradient>
      <pattern id="jniScale" width="12" height="9" patternUnits="userSpaceOnUse"><path d="M0,9 Q6,1 12,9" fill="none" stroke="#b7c3d6" stroke-width="1.3"/></pattern>
    </defs>
    <style>
      .wf{fill:url(#jniWing);stroke:#1e1b2c;stroke-width:1.2}.wc{fill:#7d7aa3;opacity:.75}.ws path{fill:none;stroke:#17152a;stroke-width:1.3;opacity:.55}.wd path{fill:none;stroke:#eeeaf6;stroke-width:3;stroke-linecap:round;opacity:.85}
      .ol{stroke:#1d2638;stroke-width:1.4}
    </style>
    <g class="jni-shadowg"><ellipse cx="170" cy="244" rx="42" ry="5" fill="#000" opacity=".35"/></g>
    <!-- sayap kiri & kanan (di belakang badan saat terbang) -->
    <g class="jni-wing-back">
      <g class="jni-wl">${WING}</g>
      <g transform="translate(340,0) scale(-1,1)"><g class="jni-wr">${WING}</g></g>
    </g>
    <g class="jni-hit">
      <path d="M156,226 L170,246 L184,226 Z" fill="#2f2b44" class="ol"/>
      <ellipse cx="170" cy="172" rx="54" ry="62" fill="url(#jniBody)" class="ol"/>
      <ellipse cx="170" cy="184" rx="35" ry="45" fill="url(#jniChest)"/>
      <ellipse cx="170" cy="186" rx="33" ry="42" fill="url(#jniScale)" opacity=".9"/>
      <g class="jni-feet" fill="#e9a93b" stroke="#9a6514" stroke-width="1">
        <path d="M146,226 q-6,10 -10,14 q6,0 9,-4 q1,6 3,8 q3,-3 3,-9 q3,4 8,5 q-3,-6 -5,-14 Z"/>
        <path d="M194,226 q6,10 10,14 q-6,0 -9,-4 q-1,6 -3,8 q-3,-3 -3,-9 q-3,4 -8,5 q3,-6 5,-14 Z"/>
      </g>
      <g class="jni-head">
        <ellipse cx="170" cy="112" rx="58" ry="50" fill="url(#jniBody)" class="ol"/>
        <path d="M118,98 q-14,-14 -12,-30 q12,8 24,14 Z" fill="#5a6f92"/>
        <path d="M222,98 q14,-14 12,-30 q-12,8 -24,14 Z" fill="#5a6f92"/>
        <ellipse cx="146" cy="116" rx="28" ry="27" fill="#e3e9f2"/>
        <ellipse cx="194" cy="116" rx="28" ry="27" fill="#e3e9f2"/>
        <circle cx="146" cy="116" r="23" fill="url(#jniDisc)"/>
        <circle cx="194" cy="116" r="23" fill="url(#jniDisc)"/>
        <path d="M122,96 Q146,86 166,104 L170,110 L174,104 Q194,86 218,96 Q196,94 178,112 L170,122 L162,112 Q144,94 122,96 Z" fill="#2a2f45"/>
        <g class="jni-eye"><circle cx="146" cy="117" r="15" fill="url(#jniIris)" stroke="#3a1606" stroke-width="2.4"/><circle class="jni-pupil" cx="146" cy="117" r="9.5" fill="#110b09"/><circle cx="142" cy="112.5" r="3.2" fill="#fff"/><circle cx="150" cy="121" r="1.4" fill="#fff" opacity=".8"/>
          <g clip-path="url(#jniEyeL)"><rect class="jni-lid" x="126" y="98" width="40" height="38" rx="19" fill="url(#jniLid)" stroke="#3b1d0a" stroke-width="2.4"/></g></g>
        <g class="jni-eye"><circle cx="194" cy="117" r="15" fill="url(#jniIris)" stroke="#3a1606" stroke-width="2.4"/><circle class="jni-pupil" cx="194" cy="117" r="9.5" fill="#110b09"/><circle cx="190" cy="112.5" r="3.2" fill="#fff"/><circle cx="198" cy="121" r="1.4" fill="#fff" opacity=".8"/>
          <g clip-path="url(#jniEyeR)"><rect class="jni-lid" x="174" y="98" width="40" height="38" rx="19" fill="url(#jniLid)" stroke="#3b1d0a" stroke-width="2.4"/></g></g>
        <path d="M162,120 Q170,115 178,120 L171,146 Q170,149 169,146 Z" fill="url(#jniBeak)" stroke="#9a6514" stroke-width="1"/>
        <!-- topi penyihir -->
        <g class="jni-hat">
          <ellipse cx="170" cy="79" rx="78" ry="15" fill="#a45f66" class="ol"/>
          <ellipse cx="170" cy="73" rx="78" ry="15" fill="#33467c" class="ol"/>
          <path d="M120,72 C126,46 140,10 170,-4 C196,-14 220,-6 238,6 C248,12 258,12 266,6 C262,22 244,28 228,22 C220,19 212,24 212,34 L220,72 Q170,60 120,72 Z" fill="url(#jniHat)" class="ol"/>
          <path d="M224,12 C236,18 252,18 262,10" fill="none" stroke="#e2b84f" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M122,62 Q170,48 218,62 L220,74 Q170,60 120,74 Z" fill="#8a2f92"/>
          <ellipse cx="208" cy="62" rx="9" ry="13" transform="rotate(-25 208 62)" fill="#e9c45d" stroke="#a67c1e" stroke-width="1"/>
          <ellipse cx="220" cy="66" rx="7" ry="10" transform="rotate(20 220 66)" fill="#dcb24c" stroke="#a67c1e" stroke-width="1"/>
          <circle cx="182" cy="24" r="1.6" fill="#f5dd8a"/><circle cx="156" cy="44" r="1.3" fill="#f5dd8a"/><circle cx="198" cy="40" r="1.1" fill="#f5dd8a"/>
        </g>
      </g>
    </g>
    <!-- sayap terlipat (di depan badan saat hinggap) -->
    <g class="jni-wing-front">
      <g class="jni-fl" transform="translate(-5 0)">${FOLD}</g>
      <g transform="translate(340,0) scale(-1,1)"><g class="jni-fr" transform="translate(-5 0)">${FOLD}</g></g>
    </g>
  </svg>`;

  const css = document.createElement('style');
  css.textContent = `
  .jni-owl{position:absolute;left:0;top:0;z-index:15;width:var(--ow,150px);pointer-events:none;will-change:transform;user-select:none;-webkit-user-select:none}
  .jni-owl svg{display:block;width:100%;height:auto;overflow:visible;filter:drop-shadow(0 6px 7px #0007)}
  .jni-owl .jni-hit{pointer-events:visiblePainted;cursor:pointer}
  .jni-flip{transform-origin:50% 100%}
  .jni-bubble{position:absolute;bottom:92%;left:50%;transform:translate(-50%,-6px) scale(.85);background:#f6efe0;color:#1b2a40;font:700 11px/1.35 'DM Sans',system-ui,sans-serif;padding:7px 10px;border-radius:12px;white-space:nowrap;box-shadow:0 6px 18px #0006;opacity:0;transition:.25s;pointer-events:none}
  .jni-bubble:after{content:'';position:absolute;top:100%;left:50%;margin-left:-6px;border:6px solid transparent;border-top-color:#f6efe0}
  .jni-bubble.on{opacity:1;transform:translate(-50%,-10px) scale(1)}
  .jni-dust{position:absolute;z-index:14;width:6px;height:6px;border-radius:50%;pointer-events:none;background:radial-gradient(#fff6c8,#f2c66d 45%,transparent 70%);animation:jniDust 1.1s ease-out forwards}
  @keyframes jniDust{from{opacity:1;transform:scale(1)}to{opacity:0;transform:translateY(14px) scale(.2)}}
  body.drawer-open .jni-owl,body.drawer-open .jni-dust{opacity:0}
  @media(max-width:760px){.jni-owl{--ow:112px}.jni-bubble{font-size:10px;white-space:normal;width:150px;text-align:center}}
  @media print{.jni-owl,.jni-dust{display:none!important}}`;
  document.head.appendChild(css);

  const el = document.createElement('div'); el.className = 'jni-owl'; el.setAttribute('role', 'img'); el.setAttribute('aria-label', 'Burung hantu maskot Jangan Nak Ibo Nian');
  const flip = document.createElement('div'); flip.className = 'jni-flip'; flip.innerHTML = SVG;
  const bubble = document.createElement('div'); bubble.className = 'jni-bubble';
  el.append(bubble, flip);
  const q = s => flip.querySelector(s), qa = s => flip.querySelectorAll(s);
  const wingBack = q('.jni-wing-back'), wingFront = q('.jni-wing-front');
  const WL = q('.jni-wl'), WR = q('.jni-wr'), FL = q('.jni-fl'), FR = q('.jni-fr');
  const head = q('.jni-head'), lids = qa('.jni-lid'), pupils = qa('.jni-pupil'), shadowG = q('.jni-shadowg');
  const SH = [128, 146];   // sendi bahu
  const rot = (g, a) => g.setAttribute('transform', `rotate(${a.toFixed(2)} ${SH[0]} ${SH[1]})`);

  // ---------- keadaan animasi ----------
  let x = 0, y = 0, face = 1, flying = false, perch = null, timer = 0, raf = 0, lastSay = 0;
  let zzz = false, lidNow = 0.52, dozeAt = performance.now() + 7000, dozing = 0, startledUntil = 0;
  let wingA = -72, wingTarget = -72, stretch = 0, blinkAt = 0, blinkT = -1, headA = 0, headTarget = 0, headUntil = 0;
  const W = () => el.offsetWidth || 150, H = () => el.offsetHeight || 122;
  function place(px, py, r, sx, sy) { el.style.transform = `translate(${px}px,${py}px) rotate(${r || 0}deg)`; flip.style.transform = `scale(${(sx || 1) * face},${sy || 1})`; }
  const modalOpen = () => document.querySelector('.product-modal.open,.checkout-modal.open') || document.body.classList.contains('drawer-open');

  function frame(now) {
    // sayap: saat terbang mengepak cepat; saat hinggap terlipat, sesekali meregang
    let a;
    if (flying) { a = -18 + Math.sin(now / 62) * 46; }
    else {
      wingA += (wingTarget - wingA) * 0.18; a = wingA;
      if (stretch > 0) { const t = (now - stretch) / 1400; if (t >= 1) stretch = 0; else a = wingTarget + Math.sin(t * Math.PI) * 48; }
    }
    const folded = !flying && a < -60;
    wingFront.style.display = folded ? '' : 'none'; wingBack.style.display = folded ? 'none' : '';
    if (!folded) { rot(WL, a); rot(WR, a); }
    shadowG.style.opacity = flying ? 0 : 1;
    // mata ngantuk: kelopak setengah turun, sesekali terkantuk-kantuk (hampir tertidur) lalu terbangun
    let rest = flying ? 0.32 : 0.52;
    if (now < startledUntil) rest = 0.05;
    if (!flying && now > startledUntil && dozeAt && now > dozeAt) {
      const t = (now - dozeAt) / 3600;
      if (t >= 1) { dozeAt = now + 12000 + Math.random() * 14000; zzz = false; }
      else if (t > .42 && !zzz) { zzz = true; if (!bubble.classList.contains('on')) say('Zzz…', 1500); }
      else { const d = t < .4 ? t / .4 : t < .75 ? 1 : 1 - (t - .75) / .25; rest = rest + (0.97 - rest) * d; dozing = d; }
    } else dozing = 0;
    if (now > blinkAt && blinkT < 0) { blinkT = now; }
    let lid = rest;
    if (blinkT >= 0) { const t = (now - blinkT) / 260; if (t >= 1) { blinkT = -1; blinkAt = now + 3000 + Math.random() * 5000; } else lid = rest + (1 - rest) * Math.sin(t * Math.PI); }
    lidNow += (lid - lidNow) * (blinkT >= 0 ? 0.6 : 0.15);
    lids.forEach(l => l.setAttribute('transform', `translate(0 ${(-36 * (1 - lidNow)).toFixed(1)})`));
    // kepala menoleh pelan
    if (!flying && now > headUntil) { headTarget = Math.random() < .5 ? 0 : (Math.random() - .5) * 22; headUntil = now + 1800 + Math.random() * 3000; }
    if (flying) headTarget = 0;
    headA += (headTarget - headA) * 0.08;
    const nod = dozing * 7;   // kepala tertunduk saat terkantuk
    head.setAttribute('transform', `translate(0 ${nod.toFixed(1)}) rotate(${(headA + dozing * 4).toFixed(2)} 170 150)`);
    const look = Math.max(-3, Math.min(3, headA / 4));
    pupils.forEach(p => p.setAttribute('transform', `translate(${look.toFixed(2)} 2.5)`));
    raf = requestAnimationFrame(frame);
  }

  // ---------- pemilihan tempat hinggap ----------
  const PSEL = PERCH.join(',');
  function visibleTargets() {
    const vw = innerWidth, vh = innerHeight, out = [];
    for (const sel of PERCH) for (const t of document.querySelectorAll(sel)) {
      if (t === perch) continue;
      const r = t.getBoundingClientRect();
      if (r.width < 90 || r.height < 18) continue;
      if (r.top - H() < 96 || r.top > vh - 30 || r.left < -10 || r.right > vw + 10) continue;
      out.push(t);
    }
    return out;
  }
  function freeAbove(vx, vy, t, lvl) {
    for (const [fx, fy] of [[.5, .25], [.38, .55], [.62, .55], [.5, .8]]) {
      const px = vx + W() * fx, py = vy + H() * fy;
      if (px < 0 || py < 0 || px > innerWidth || py > innerHeight) return false;
      el.style.visibility = 'hidden'; const hit = document.elementFromPoint(px, py); el.style.visibility = '';
      const p = hit && hit.closest && hit.closest(PSEL);
      if (p && p !== t && !t.contains(p) && !p.contains(t)) return false;
      if (hit && hit.closest && hit.closest(lvl > 1 ? '.site-header,button,a,input,p,h1,h2,h3,.eyebrow,.hero-note' : '.site-header,button,a,input')) return false;
    }
    return true;
  }
  function spotOn(t, strict) {
    const r = t.getBoundingClientRect(), w = W();
    const minX = r.left - w * .3, maxX = Math.max(minX, r.right - w * .7), vy = r.top - H() + 4;
    for (let k = 0; k < (strict ? 6 : 1); k++) {
      const vx = minX + Math.random() * (maxX - minX);
      if (!strict || freeAbove(vx, vy, t, strict)) return { x: scrollX + vx, y: scrollY + vy };
    }
    return null;
  }

  // ---------- gerak ----------
  function say(text, ms) { bubble.textContent = text || SAY[Math.floor(Math.random() * SAY.length)]; bubble.classList.add('on'); clearTimeout(say._t); say._t = setTimeout(() => bubble.classList.remove('on'), ms || 2600); }
  function dust(px, py) { const d = document.createElement('i'); d.className = 'jni-dust'; d.style.left = (px + W() * (.35 + Math.random() * .3)) + 'px'; d.style.top = (py + H() * .75) + 'px'; document.body.appendChild(d); setTimeout(() => d.remove(), 1200); }
  let moveRaf = 0;
  function flyTo(tx, ty, done) {
    cancelAnimationFrame(moveRaf);
    flying = true; bubble.classList.remove('on');
    const sx = x, sy = y, dx = tx - sx, dy = ty - sy, dist = Math.hypot(dx, dy);
    face = dx < 0 ? -1 : 1;
    const dur = Math.min(3400, Math.max(1200, dist * 2.2)), lift = Math.min(240, 70 + dist * 0.3);
    const cx = sx + dx / 2 + (Math.random() - .5) * 120, cy = Math.min(sy, ty) - lift;
    const t0 = performance.now(); let lastDust = 0;
    (function step(now) {
      const t = Math.min(1, (now - t0) / dur), e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const px = (1 - e) * (1 - e) * sx + 2 * (1 - e) * e * cx + e * e * tx, py = (1 - e) * (1 - e) * sy + 2 * (1 - e) * e * cy + e * e * ty;
      const bob = Math.sin(now / 62 + 1.2) * 4;   // badan naik-turun mengikuti kepakan
      const tilt = Math.max(-14, Math.min(14, (px - x) * 1.3)) * face;
      x = px; y = py; place(px, py + bob, tilt);
      if (now - lastDust > 80) { dust(px, py); lastDust = now; }
      if (t < 1) moveRaf = requestAnimationFrame(step);
      else { flying = false; wingA = -10; wingTarget = -72; landBounce(); if (done) done(); }
    })(t0);
  }
  function landBounce() { const t0 = performance.now(); (function b(now) { const t = (now - t0) / 380; if (t >= 1) { place(x, y); return; } const s = Math.sin(t * Math.PI); place(x, y, 0, 1 + s * .05, 1 - s * .08); requestAnimationFrame(b); })(t0); }
  function hop() {
    if (flying || document.hidden || modalOpen()) return schedule();
    const list = visibleTargets();
    let t = null, s = null;
    for (let k = 0; k < 16 && list.length && !s; k++) { t = list[Math.floor(Math.random() * list.length)]; s = spotOn(t, k < 10 ? 2 : 1); }
    if (!s) { flyOut(); return schedule(); }
    perch = t;
    flyTo(s.x, s.y, () => { if (Math.random() < .45 && performance.now() - lastSay > 9000) { lastSay = performance.now(); say(); } schedule(); });
  }
  function flyOut() { perch = null; const tx = scrollX + innerWidth - W() - 10, ty = scrollY + innerHeight - H() - 30; if (Math.hypot(tx - x, ty - y) > 40) flyTo(tx, ty); }
  function schedule(ms) { clearTimeout(timer); timer = setTimeout(hop, ms || 6000 + Math.random() * 7000); }
  setInterval(() => { if (!flying && !document.hidden && !stretch && Math.random() < .35) stretch = performance.now(); }, 4500);
  function stillVisible() { if (!perch) { const vy = y - scrollY; return vy > 60 && vy < innerHeight - 20; } const r = perch.getBoundingClientRect(); return r.top > 96 && r.top < innerHeight - 30; }
  let scrollT = 0;
  addEventListener('scroll', () => { clearTimeout(scrollT); scrollT = setTimeout(() => { if (!flying && !stillVisible()) hop(); }, 450); }, { passive: true });
  addEventListener('resize', () => { if (!flying && perch) { const s = spotOn(perch, 0); if (s) { x = s.x; y = s.y; place(x, y); } } });
  q('.jni-hit').addEventListener('click', () => { startledUntil = performance.now() + 1600; dozeAt = performance.now() + 12000; say(['Hu-hu!', 'Eh, kaget aku!', 'Mau terbang dulu ya…', 'Jangan nak ibo nian!'][Math.floor(Math.random() * 4)], 1500); stretch = performance.now(); setTimeout(() => { if (!flying) hop(); }, 900); });

  function start() {
    document.body.appendChild(el);
    x = scrollX - W() - 20; y = scrollY + 140; place(x, y);
    raf = requestAnimationFrame(frame);
    if (reduce) { const l = visibleTargets(); const s = (l.length && spotOn(l[0], 1)) || { x: scrollX + innerWidth - W() - 10, y: scrollY + innerHeight - H() - 30 }; x = s.x; y = s.y; place(x, y); return; }
    setTimeout(() => { hop(); setTimeout(() => say('Hu-hu! Selamat datang di Jangan Nak Ibo Nian.', 3200), 2800); }, 800);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
