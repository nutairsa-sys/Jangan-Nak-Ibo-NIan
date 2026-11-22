/* Burung hantu penyihir Jangan Nak Ibo Nian: terbang dan hinggap di berbagai bagian halaman. */
(function () {
  'use strict';
  if (window.__jniOwl) return; window.__jniOwl = true;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SRC = 'assets/owl-terbang.webp';
  const PERCH = ['.product-card', '.category-card', '.section-head h2', '.benefits > div', '.cta-band', '.owl-quote', '.about-section img', '.hero-copy h1', '.hero-actions', '.policy-grid article', '.search-box', '.filter-pills', '.library-case'];
  const SAY = ['Hu-hu! Selamat datang.', 'Ide cerdas, kerja tuntas.', 'Cari tools teknik? Ada di sini.', 'Jangan nak ibo nian!', 'Sedikit ngantuk tidak apa-apa…', 'Coba lihat kategori Teknik & Konstruksi.', 'Butuh bantuan? Hubungi admin.', 'Hu-huu… rumusnya sudah dicek.'];

  const css = document.createElement('style');
  css.textContent = `
  .jni-owl{position:absolute;left:0;top:0;z-index:15;width:var(--ow,86px);height:auto;cursor:pointer;will-change:transform;user-select:none;-webkit-user-select:none;touch-action:manipulation}
  .jni-flip{transform-origin:50% 100%}
  .jni-owl img{display:block;width:100%;height:auto;pointer-events:auto;filter:drop-shadow(0 6px 8px #0008);transform-origin:50% 100%}
  .jni-owl.idle img{animation:jniBreath 3.4s ease-in-out infinite}
  .jni-owl.tilt img{animation:jniTilt 1.6s ease-in-out}
  .jni-owl .jni-shadow{position:absolute;left:18%;right:18%;bottom:-3px;height:7px;border-radius:50%;background:radial-gradient(#0009,transparent 70%);opacity:.8;transition:opacity .3s}
  .jni-owl.flying .jni-shadow{opacity:0}
  .jni-bubble{position:absolute;bottom:100%;left:50%;transform:translate(-50%,-6px) scale(.85);background:#f6efe0;color:#1b2a40;font:700 11px/1.35 'DM Sans',system-ui,sans-serif;padding:7px 10px;border-radius:12px;white-space:nowrap;box-shadow:0 6px 18px #0006;opacity:0;transition:.25s;pointer-events:none}
  .jni-bubble:after{content:'';position:absolute;top:100%;left:50%;margin-left:-6px;border:6px solid transparent;border-top-color:#f6efe0}
  .jni-bubble.on{opacity:1;transform:translate(-50%,-10px) scale(1)}
  .jni-dust{position:absolute;z-index:14;width:6px;height:6px;border-radius:50%;pointer-events:none;background:radial-gradient(#fff6c8,#f2c66d 45%,transparent 70%);animation:jniDust 1.1s ease-out forwards}
  @keyframes jniBreath{0%,100%{transform:scale(1,1)}50%{transform:scale(1.02,.985)}}
  @keyframes jniTilt{0%,100%{transform:rotate(0)}30%{transform:rotate(-9deg)}65%{transform:rotate(7deg)}}
  @keyframes jniDust{from{opacity:1;transform:scale(1)}to{opacity:0;transform:translateY(14px) scale(.2)}}
  body.drawer-open .jni-owl,body.drawer-open .jni-dust{opacity:0;pointer-events:none}
  @media(max-width:760px){.jni-owl{--ow:62px}.jni-bubble{font-size:10px;white-space:normal;width:150px;text-align:center}}
  @media print{.jni-owl,.jni-dust{display:none!important}}`;
  document.head.appendChild(css);

  const el = document.createElement('div'); el.className = 'jni-owl idle'; el.setAttribute('role', 'img'); el.setAttribute('aria-label', 'Burung hantu maskot Jangan Nak Ibo Nian');
  const img = new Image(); img.src = SRC; img.alt = ''; img.draggable = false;
  const shadow = document.createElement('div'); shadow.className = 'jni-shadow';
  const bubble = document.createElement('div'); bubble.className = 'jni-bubble';
  const flip = document.createElement('div'); flip.className = 'jni-flip'; flip.append(img);
  el.append(bubble, flip, shadow);

  let x = 0, y = 0, face = 1, flying = false, perch = null, timer = 0, raf = 0, lastSay = 0;
  const W = () => el.offsetWidth || 86, H = () => el.offsetHeight || 98;
  function place(px, py, rot, sx, sy) { el.style.transform = `translate(${px}px,${py}px) rotate(${rot || 0}deg)`; flip.style.transform = `scale(${(sx || 1) * face},${sy || 1})`; }
  const modalOpen = () => document.querySelector('.product-modal.open,.checkout-modal.open') || document.body.classList.contains('drawer-open');

  function visibleTargets() {
    const vw = innerWidth, vh = innerHeight, out = [];
    for (const sel of PERCH) for (const t of document.querySelectorAll(sel)) {
      if (t === perch) continue;
      const r = t.getBoundingClientRect();
      if (r.width < 90 || r.height < 18) continue;
      const top = r.top - H();
      if (top < 96 || r.top > vh - 30 || r.left < -10 || r.right > vw + 10) continue;   // jangan tertutup header/menu
      if (getComputedStyle(t).visibility === 'hidden') continue;
      out.push(t);
    }
    return out;
  }
  const PSEL = PERCH.join(',');
  function freeAbove(vx, vy, t, lvl) {
    // titik-titik di area badan burung tidak boleh menimpa kartu/elemen hinggap lain
    for (const [fx, fy] of [[.5, .25], [.25, .55], [.75, .55], [.5, .8]]) {
      const px = vx + W() * fx, py = vy + H() * fy;
      if (px < 0 || py < 0 || px > innerWidth || py > innerHeight) return false;
      el.style.visibility = 'hidden';
      const hit = document.elementFromPoint(px, py);
      el.style.visibility = '';
      const p = hit && hit.closest && hit.closest(PSEL);
      if (p && p !== t && !t.contains(p) && !p.contains(t)) return false;
      if (hit && hit.closest && hit.closest(lvl > 1 ? '.site-header,button,a,input,p,h1,h2,h3,.eyebrow,.hero-note' : '.site-header,button,a,input')) return false;
    }
    return true;
  }
  function spotOn(t, strict) {
    const r = t.getBoundingClientRect(), w = W();
    const minX = r.left + 6, maxX = Math.max(minX, r.right - w - 6), vy = r.top - H() + 6;
    for (let k = 0; k < (strict ? 6 : 1); k++) {
      const vx = minX + Math.random() * (maxX - minX);
      if (!strict || freeAbove(vx, vy, t, strict)) return { x: scrollX + vx, y: scrollY + vy };
    }
    return null;
  }
  function say(text, ms) {
    bubble.textContent = text || SAY[Math.floor(Math.random() * SAY.length)];
    bubble.classList.add('on'); clearTimeout(say._t); say._t = setTimeout(() => bubble.classList.remove('on'), ms || 2600);
  }
  function dust(px, py) {
    const d = document.createElement('i'); d.className = 'jni-dust';
    d.style.left = (px + W() * (.3 + Math.random() * .4)) + 'px'; d.style.top = (py + H() * .8) + 'px';
    document.body.appendChild(d); setTimeout(() => d.remove(), 1200);
  }
  function flyTo(tx, ty, done) {
    cancelAnimationFrame(raf);
    flying = true; el.classList.remove('idle'); el.classList.add('flying'); bubble.classList.remove('on');
    const sx = x, sy = y, dx = tx - sx, dy = ty - sy, dist = Math.hypot(dx, dy);
    face = dx < 0 ? -1 : 1;
    const dur = Math.min(3200, Math.max(1100, dist * 2.1));
    const lift = Math.min(260, 70 + dist * 0.35);
    const cx = sx + dx / 2 + (Math.random() - .5) * 120, cy = Math.min(sy, ty) - lift;
    const t0 = performance.now(); let lastDust = 0;
    (function step(now) {
      let t = Math.min(1, (now - t0) / dur);
      const e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const px = (1 - e) * (1 - e) * sx + 2 * (1 - e) * e * cx + e * e * tx;
      const py = (1 - e) * (1 - e) * sy + 2 * (1 - e) * e * cy + e * e * ty;
      const flap = Math.sin(now / 55);
      const tiltDeg = Math.max(-18, Math.min(18, (px - x) * 1.6)) * face;
      x = px; y = py;
      place(px, py + flap * 3, tiltDeg, 1 + flap * .035, 1 - flap * .07);
      if (now - lastDust > 70) { dust(px, py); lastDust = now; }
      if (t < 1) raf = requestAnimationFrame(step);
      else {
        flying = false; el.classList.remove('flying'); el.classList.add('idle');
        landBounce(); if (done) done();
      }
    })(t0);
  }
  function landBounce() {
    const t0 = performance.now();
    (function b(now) { const t = (now - t0) / 380; if (t >= 1) { place(x, y); return; } const s = Math.sin(t * Math.PI); place(x, y, 0, 1 + s * .06, 1 - s * .1); requestAnimationFrame(b); })(t0);
  }
  function hop() {
    if (flying || document.hidden || modalOpen()) return schedule();
    const list = visibleTargets();
    if (!list.length) { flyOut(); return schedule(); }
    let t = null, s = null;
    for (let k = 0; k < 16 && !s; k++) { t = list[Math.floor(Math.random() * list.length)]; s = spotOn(t, k < 10 ? 2 : 1); }
    if (!s) { flyOut(); return schedule(); }
    perch = t;
    flyTo(s.x, s.y, () => { if (Math.random() < .45 && performance.now() - lastSay > 9000) { lastSay = performance.now(); say(); } schedule(); });
  }
  function flyOut() {
    // bila tidak ada tempat hinggap terlihat, singgah di tepi layar bawah
    perch = null;
    const tx = scrollX + innerWidth - W() - 16, ty = scrollY + innerHeight - H() - 40;
    if (Math.hypot(tx - x, ty - y) > 40) flyTo(tx, ty);
  }
  function schedule(ms) { clearTimeout(timer); timer = setTimeout(hop, ms || 6000 + Math.random() * 7000); }
  function idleTicks() {
    setInterval(() => { if (!flying && !document.hidden && Math.random() < .5) { el.classList.remove('tilt'); void el.offsetWidth; el.classList.add('tilt'); setTimeout(() => el.classList.remove('tilt'), 1700); } }, 5200);
  }
  function stillVisible() {
    if (!perch) { const vy = y - scrollY; return vy > 60 && vy < innerHeight - 20; }
    const r = perch.getBoundingClientRect(); return r.top > 96 && r.top < innerHeight - 30;
  }
  let scrollT = 0;
  addEventListener('scroll', () => { clearTimeout(scrollT); scrollT = setTimeout(() => { if (!flying && !stillVisible()) hop(); }, 450); }, { passive: true });
  addEventListener('resize', () => { if (!flying && perch) { const s = spotOn(perch); x = s.x; y = s.y; place(x, y); } });
  el.addEventListener('click', () => { say(['Hu-hu!', 'Eh, kaget aku!', 'Mau terbang dulu ya…', 'Jangan nak ibo nian!'][Math.floor(Math.random() * 4)], 1500); setTimeout(() => { if (!flying) hop(); }, 900); });

  function start() {
    document.body.appendChild(el);
    const go = () => {
      x = scrollX - W() - 20; y = scrollY + 120; place(x, y);
      if (reduce) { const l = visibleTargets(); const s = (l.length && spotOn(l[0], 1)) || { x: scrollX + innerWidth - W() - 16, y: scrollY + innerHeight - H() - 14 }; x = s.x; y = s.y; place(x, y); el.classList.remove('idle'); return; }
      setTimeout(() => { hop(); setTimeout(() => say('Hu-hu! Selamat datang di Jangan Nak Ibo Nian.', 3200), 2600); }, 900);
      idleTicks();
    };
    if (img.complete) go(); else { img.onload = go; img.onerror = () => el.remove(); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
