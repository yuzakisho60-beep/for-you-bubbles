/* =====================================================================
   CONFIG: everything personal lives here. Edit freely.
   ===================================================================== */
const CONFIG = {
  name: 'Kriya',            // her name or nickname, e.g. 'Pihu'. Leave '' to just say "you".
  unlockAt: '2026-10-29T00:00:00+05:30', // e.g. '2026-11-02T00:00:00+05:30' to lock until her birthday. null = always open.
  candles: 5,               // how many candles on the cake
  from: '— me',             // how the message is signed

  // the message inside the big bubble (one string per paragraph)
  message: [
    'Happy birthday.',
    "I wasn't sure how to say this in a way that felt right, so I'll keep it simple.",
    'I hope you’re doing okay. Not the “I’m fine” kind of okay. The real kind.',
    'I know this past while hasn’t been easy, and some days probably still feel heavier than others. That’s okay. Mine do too, sometimes. I think it just means it was real, and real things take a little time to settle.',
    'But today isn’t about any of that. Today is only about you.',
    'I hope this year is gentle with you. I hope you laugh a lot, sleep well, eat good food, and end up in places that make you feel light.',
    'And I hope you never stop being exactly who you are.',
    'No reply needed, no pressure at all. I just wanted you to have this.',
    'Take care of yourself.',
  ],

  // rub-to-develop polaroids
  polaroids: [
    { src: 'p01', cap: 'even the garden posed for you' },
    { src: 'p33', cap: 'golden hour was just copying you' },
    { src: 'p24', cap: 'this face. a whole mood.' },
    { src: 'p66', cap: 'garba night, in full colour' },
    { src: 'p52', cap: 'red suit, paranda, no notes' },
    { src: 'p47', cap: 'sunlight looks good on you' },
  ],

  // the pink line
  stations: [
    { name: 'Platform No. 1',       video: 'v11', cap: 'walking like the platform belongs to you' },
    { name: 'Metro Selfie Marg',    video: 'v03', cap: 'the only person who looks good under metro lights' },
    { name: 'Mirror Mirror Chowk',  imgs: ['p13', 'p05', 'p03', 'p11'], cap: 'your mirror deserves a salary' },
    { name: 'Specs & Bows Nagar',   imgs: ['p23', 'p71', 'p25', 'p70', 'p26'], cap: 'glasses on, bows on, filters begging to be used' },
    { name: 'Garba Raat',           video: 'v08', cap: 'dandiya in hand, chaos in the eyes' },
    { name: 'Red Suit Vihar',       imgs: ['p61', 'p53', 'p55', 'p58'], cap: 'you wore red and the colour got better' },
    { name: 'Golden Hour Enclave',  imgs: ['p35', 'p37', 'p38'], cap: 'the sun had one job' },
    { name: 'Your Birthday',        imgs: ['p41', 'p46', 'p20'], cap: 'this train terminates here. please carry all your smiles with you.' },
  ],

  // "open when" bubbles
  openWhen: [
    { when: "you've had a bad day", msg: "It's one bad day, not a bad life. Eat something warm, drink some water, sleep a little early. Tomorrow gets a fresh start." },
    { when: "you can't sleep", msg: 'Put the phone down after this. Okay, one more reel. Then close your eyes. Your mind deserves a break too.' },
    { when: 'you doubt yourself', msg: "You've made it through every single day you once thought you couldn't. That's a pretty good record." },
    { when: 'it still feels heavy', msg: "That's allowed. Healing isn't a straight line, and some days just weigh more. It doesn't mean you're going backwards. Be gentle with yourself." },
    { when: 'you need to smile', msg: 'Go look at your own camera roll. The pouts alone could fix a bad mood.' },
    { when: 'something good happens', msg: "Told you so. I'm genuinely happy for you, from wherever I am." },
    { when: 'you forget how far you’ve come', msg: 'Look back for a second. So much changed, and you got through all of it. That counts for a lot.' },
  ],

  // cinema reel
  reel: [
    { v: 'v12', cap: 'one slow blink' },
    { v: 'v06', cap: 'jhumkas + attitude' },
    { v: 'v07', cap: 'certified chaos' },
    { v: 'v02', cap: 'night ride, sleepy eyes' },
    { v: 'v05', cap: 'scarf season' },
    { v: 'v01', cap: 'hoodie up, world off' },
    { v: 'v09', cap: 'lace and sunlight', land: true },
    { v: 'v10', cap: 'hi, camera', land: true },
    { v: 'v04', cap: 'soft focus' },
    { v: 'v15', cap: 'these slippers deserve their own birthday' },
  ],

  // golden-bubble reminders
  reminders: [
    "you're stronger than you give yourself credit for.",
    "you don't have to have this year figured out.",
    'your softness was never a weakness.',
    'rest counts as progress too.',
    "you're allowed to outgrow places, habits and old versions of yourself.",
    'the right people will never make you feel like too much.',
    "you're doing better than you think.",
    'drink some water. seriously.',
    "it's okay if some days still hurt. it's also okay when they stop.",
    'you deserve the kindness you give everyone else.',
    'you make ordinary places look like a film set. keep that.',
    'be proud of yourself. even quietly. even just today.',
  ],

  // photos that ride the final bubbles
  finalPhotos: ['p06', 'p07', 'p20', 'p23', 'p33', 'p35', 'p37', 'p41', 'p42', 'p45', 'p47', 'p55', 'p58', 'p66', 'p70', 'p72', 'p01', 'p26'],
  portrait: 'portrait',
};

/* =====================================================================
   helpers
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const M = id => `media/${id}.jpg`;
const V = id => `media/${id}.mp4`;
const P = id => `media/${id}_poster.jpg`;
const params = new URLSearchParams(location.search);
const vibrate = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };
const easeOut = t => 1 - Math.pow(1 - t, 3);

/* =====================================================================
   AUDIO: everything is synthesised live (no tracks)
   ===================================================================== */
const A = {
  ctx: null, on: true,
  init() {
    if (this.ctx) { this.ctx.state === 'suspended' && this.ctx.resume(); return; }
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    const ctx = this.ctx = new C();
    this.master = ctx.createGain(); this.master.gain.value = .9;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 3;
    this.master.connect(comp); comp.connect(ctx.destination);
    // reverb
    const len = ctx.sampleRate * 3.4, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    this.verb = ctx.createConvolver(); this.verb.buffer = ir;
    const vg = ctx.createGain(); vg.gain.value = .55; this.verb.connect(vg); vg.connect(this.master);
    // noise
    const nb = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate), nd = nb.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    this.noise = nb;
    // pad bus
    this.padBus = ctx.createGain(); this.padBus.gain.value = 0;
    this.out(this.padBus, .6);
    document.addEventListener('visibilitychange', () => { document.hidden ? ctx.suspend() : ctx.resume(); });
  },
  out(node, wet = .3) {
    node.connect(this.master);
    if (wet > 0) { const s = this.ctx.createGain(); s.gain.value = wet; node.connect(s); s.connect(this.verb); }
  },
  bell(f, delay = 0, v = .1, dur = 2.6, wet = .45) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + delay, g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .006); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    [[1, 1], [2.756, .28], [5.404, .08]].forEach(([m, a]) => {
      const o = this.ctx.createOscillator(), og = this.ctx.createGain();
      o.type = 'sine'; o.frequency.value = f * m; og.gain.value = a;
      o.connect(og); og.connect(g); o.start(t); o.stop(t + dur + .1);
    });
    this.out(g, wet);
  },
  pop(r = 40) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, s = clamp(1 - r / 160, .15, 1);
    const n = this.ctx.createBufferSource(); n.buffer = this.noise;
    const bp = this.ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900 + s * 2600; bp.Q.value = 1.2;
    const g = this.ctx.createGain(); g.gain.setValueAtTime(.32, t); g.gain.exponentialRampToValueAtTime(.001, t + .05);
    n.connect(bp); bp.connect(g); n.start(t, Math.random() * .5, .07);
    const o = this.ctx.createOscillator(), og = this.ctx.createGain();
    o.frequency.setValueAtTime(500 + s * 900, t); o.frequency.exponentialRampToValueAtTime(140, t + .07);
    og.gain.setValueAtTime(.16, t); og.gain.exponentialRampToValueAtTime(.001, t + .08);
    o.connect(og); o.start(t); o.stop(t + .1);
    this.out(g, .15); this.out(og, .1);
  },
  thump(delay = 0, v = .5) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + delay, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(38, t + .16);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + .22);
    o.connect(g); o.start(t); o.stop(t + .25); this.out(g, .05);
  },
  heartbeat() { this.thump(0, .45); this.thump(.2, .3); },
  whoosh(dur = 1.1, v = .07) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, n = this.ctx.createBufferSource(); n.buffer = this.noise; n.loop = true;
    const f = this.ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = .8;
    f.frequency.setValueAtTime(250, t); f.frequency.exponentialRampToValueAtTime(2400, t + dur * .55); f.frequency.exponentialRampToValueAtTime(300, t + dur);
    const g = this.ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + dur * .5); g.gain.linearRampToValueAtTime(0, t + dur);
    n.connect(f); f.connect(g); n.start(t); n.stop(t + dur + .05); this.out(g, .4);
  },
  breathStart() {
    if (!this.ctx || this.br) return;
    const n = this.ctx.createBufferSource(); n.buffer = this.noise; n.loop = true;
    const f = this.ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 500; f.Q.value = .7;
    const g = this.ctx.createGain(); g.gain.value = 0;
    const o = this.ctx.createOscillator(), og = this.ctx.createGain(); o.type = 'sine'; o.frequency.value = 220; og.gain.value = 0;
    n.connect(f); f.connect(g); o.connect(og); n.start(); o.start(); this.out(g, .3); this.out(og, .5);
    this.br = { n, f, g, o, og };
  },
  breathSet(x) {
    if (!this.br) return; const t = this.ctx.currentTime;
    this.br.g.gain.setTargetAtTime(x * .09, t, .05); this.br.f.frequency.setTargetAtTime(400 + x * 1600, t, .05);
    this.br.og.gain.setTargetAtTime(x * .035, t, .08); this.br.o.frequency.setTargetAtTime(220 + x * 220, t, .08);
  },
  breathStop() {
    if (!this.br) return; const b = this.br, t = this.ctx.currentTime; this.br = null;
    b.g.gain.setTargetAtTime(0, t, .06); b.og.gain.setTargetAtTime(0, t, .06);
    setTimeout(() => { try { b.n.stop(); b.o.stop(); } catch (e) {} }, 500);
  },
  chime() { [659.25, 523.25, 392].forEach((f, i) => this.bell(f, i * .32, .09, 1.6, .3)); },
  // generative pad: warm, a little bittersweet
  padStart() {
    if (!this.ctx || this.padOn) return; this.padOn = true;
    this.padBus.gain.setTargetAtTime(1, this.ctx.currentTime, 2);
    const chords = [[146.83, 220, 277.18, 329.63], [123.47, 185, 220, 293.66], [98, 146.83, 246.94, 293.66], [110, 164.81, 220, 277.18]];
    let i = 0;
    const play = () => {
      const t = this.ctx.currentTime;
      chords[i++ % chords.length].forEach(f => {
        const lp = this.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
        const g = this.ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.03, t + 3); g.gain.setValueAtTime(.03, t + 7); g.gain.linearRampToValueAtTime(0, t + 11);
        [[ 'triangle', 0], ['sine', 7]].forEach(([type, det]) => {
          const o = this.ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = det;
          o.connect(lp); o.start(t); o.stop(t + 11.2);
        });
        lp.connect(g); g.connect(this.padBus);
      });
    };
    play(); this.padT = setInterval(play, 8000);
    const pent = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.5];
    this.sparkT = setInterval(() => { if (Math.random() < .5) this.bell(pent[Math.floor(Math.random() * pent.length)], 0, .025, 3, .7); }, 1400);
  },
  duck(x) { this.ctx && this.padBus.gain.setTargetAtTime(x ? .25 : 1, this.ctx.currentTime, .4); },
  happyBirthday() {
    const C = 523.25, D = 587.33, E = 659.25, F = 698.46, G = 783.99, A5 = 880, Bb = 932.33, C6 = 1046.5;
    const song = [[C, .75], [C, .25], [D, 1], [C, 1], [F, 1], [E, 2], [C, .75], [C, .25], [D, 1], [C, 1], [G, 1], [F, 2],
      [C, .75], [C, .25], [C6, 1], [A5, 1], [F, 1], [E, 1], [D, 2], [Bb, .75], [Bb, .25], [A5, 1], [F, 1], [G, 1], [F, 3]];
    let t = 0; const beat = .44;
    song.forEach(([f, d]) => { this.bell(f, t, .11, 1.8, .4); t += d * beat; });
    return t;
  },
  toggle() { this.on = !this.on; this.ctx && this.master.gain.setTargetAtTime(this.on ? .9 : 0, this.ctx.currentTime, .1); return this.on; },
};

/* =====================================================================
   BUBBLES: pre-rendered iridescent sprites + a tiny physics world
   ===================================================================== */
const SPR = (() => {
  const S = 256, mk = () => { const c = document.createElement('canvas'); c.width = c.height = S; return [c, c.getContext('2d')]; };
  const filmCols = ['#8ef3ff', '#c9b8ff', '#ffa9d1', '#ffd2a8', '#a8ffd8', '#8ef3ff'];
  const goldCols = ['#ffe1a3', '#ffb86b', '#ffd2a8', '#fff3c4', '#ffc38a', '#ffe1a3'];
  function rim(cols, angle, strength = 1) {
    const [c, g] = mk(), h = S / 2;
    let grad;
    if (g.createConicGradient) { grad = g.createConicGradient(angle, h, h); cols.forEach((col, i) => grad.addColorStop(i / (cols.length - 1), col)); }
    else { grad = g.createLinearGradient(0, 0, S, S); cols.forEach((col, i) => grad.addColorStop(i / (cols.length - 1), col)); }
    g.fillStyle = grad; g.beginPath(); g.arc(h, h, h - 1, 0, 7); g.fill();
    g.globalCompositeOperation = 'destination-in';
    const m = g.createRadialGradient(h, h, 0, h, h, h);
    m.addColorStop(0, 'rgba(0,0,0,.05)'); m.addColorStop(.6, 'rgba(0,0,0,.07)'); m.addColorStop(.8, `rgba(0,0,0,${.35 * strength})`);
    m.addColorStop(.95, `rgba(0,0,0,${.85 * strength})`); m.addColorStop(.985, 'rgba(0,0,0,1)'); m.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = m; g.fillRect(0, 0, S, S);
    return c;
  }
  function hl() {
    const [c, g] = mk(), h = S / 2;
    let r = g.createRadialGradient(S * .32, S * .27, 0, S * .32, S * .27, S * .2);
    r.addColorStop(0, 'rgba(255,255,255,.95)'); r.addColorStop(.25, 'rgba(255,255,255,.5)'); r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r; g.fillRect(0, 0, S, S);
    r = g.createRadialGradient(S * .7, S * .76, 0, S * .7, S * .76, S * .1);
    r.addColorStop(0, 'rgba(255,255,255,.45)'); r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r; g.fillRect(0, 0, S, S);
    g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = S * .018; g.lineCap = 'round';
    g.beginPath(); g.arc(h, h, h * .86, Math.PI * 1.08, Math.PI * 1.38); g.stroke();
    return c;
  }
  return {
    film: [0, 1.6, 3.2].map(a => rim(filmCols, a)),
    gold: rim(goldCols, 0, 1.5),
    hl: hl(),
  };
})();

class World {
  constructor(cv, opts = {}) {
    this.cv = cv; this.g = cv.getContext('2d'); this.b = []; this.fx = []; this.opts = opts;
    this.ptr = { x: -999, y: -999, vx: 0, vy: 0 };
    this.resize(); addEventListener('resize', () => this.resize());
    if (opts.ambient) for (let i = 0; i < this.target(); i++) this.spawnAmbient(true);
  }
  resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.75);
    this.w = this.cv.clientWidth || innerWidth; this.h = this.cv.clientHeight || innerHeight; this.dpr = dpr;
    this.cv.width = this.w * dpr; this.cv.height = this.h * dpr;
  }
  target() { return Math.round(clamp(this.w * this.h / 21000, 14, 34)); }
  add(o) {
    const b = Object.assign({ x: 0, y: 0, r: 30, vx: 0, vy: -30, t: rand(0, 10), sway: rand(8, 30), f: rand(.25, .7),
      rot: rand(0, 6.28), vr: rand(-.25, .25), v: Math.floor(rand(0, 3)), a: 1, px: 0, py: 0, born: 0, life: 0, gold: false }, o);
    b.bx = b.x; this.b.push(b); return b;
  }
  spawnAmbient(anywhere) {
    const r = 9 + Math.pow(Math.random(), 2.3) * (this.w < 600 ? 95 : 150);
    this.add({ x: rand(0, this.w), y: anywhere ? rand(0, this.h + r) : this.h + r + rand(0, 60), r,
      vy: -(14 + rand(0, 26) + r * .12), a: clamp(.45 + r / 160, .5, .95), ambient: true });
  }
  burst(x, y, n = 12, hueGold = false) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, 6.28), s = rand(60, 220);
      this.fx.push({ k: 'drop', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40, life: rand(.4, .8), t: 0, r: rand(1.2, 3.2), gold: hueGold });
    }
  }
  pop(b, quiet) {
    const i = this.b.indexOf(b); if (i < 0) return;
    this.b.splice(i, 1);
    this.fx.push({ k: 'ring', x: b.x, y: b.y, r: b.r, t: 0, life: .35, gold: b.gold });
    this.burst(b.x, b.y, Math.round(6 + b.r / 8), b.gold);
    if (!quiet) { A.pop(b.r); vibrate(8); }
    this.opts.onPop && this.opts.onPop(b);
    if (b.ambient) setTimeout(() => this.spawnAmbient(), rand(400, 2200));
  }
  hit(x, y) {
    const near = b => (b.x - x) ** 2 + (b.y + (b.dy || 0) - y) ** 2 < (b.r * 1.1 + 10) ** 2;
    for (let i = this.b.length - 1; i >= 0; i--) if (this.b[i].gold && near(this.b[i])) return this.b[i];
    for (let i = this.b.length - 1; i >= 0; i--) if (near(this.b[i])) return this.b[i];
    return null;
  }
  step(dt) {
    const p = this.ptr;
    for (let i = this.b.length - 1; i >= 0; i--) {
      const b = this.b[i]; b.t += dt; b.rot += b.vr * dt;
      b.bx += b.vx * dt; b.vx *= Math.pow(.35, dt);
      b.y += b.vy * dt;
      // pointer: soft push, like air around a finger
      const dx = b.x - p.x, dy = b.y - p.y, d2 = dx * dx + dy * dy, R = b.r + 70;
      if (d2 < R * R) { const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 260 * dt; b.px += dx / d * f; b.py += dy / d * f; }
      b.px *= Math.pow(.08, dt); b.py *= Math.pow(.08, dt);
      b.x = b.bx + Math.sin(b.t * b.f) * b.sway + b.px;
      b.dy = b.py;
      if (b.life && b.t > b.life) { this.pop(b, true); continue; }
      if (b.y + b.dy < -b.r - 30) { this.b.splice(i, 1); if (b.ambient) this.spawnAmbient(); }
    }
    for (let i = this.fx.length - 1; i >= 0; i--) {
      const f = this.fx[i]; f.t += dt;
      if (f.k === 'drop') { f.vy += 380 * dt; f.x += f.vx * dt; f.y += f.vy * dt; }
      if (f.t > f.life) this.fx.splice(i, 1);
    }
  }
  draw() {
    const g = this.g, d = this.dpr;
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, this.cv.width, this.cv.height);
    for (const b of this.b) {
      const wob = Math.sin(b.t * 2.3 + b.r) * .035, s = b.r * 2, y = b.y + (b.dy || 0);
      let a = b.a; if (b.born && b.t < .35) a *= b.t / .35;
      if (b.life) a *= clamp((b.life - b.t) / .6, 0, 1) * .6 + .4;
      g.globalAlpha = a;
      if (b.gold) { g.setTransform(d, 0, 0, d, b.x * d, y * d); g.shadowColor = 'rgba(255,200,120,.9)'; g.shadowBlur = 24 * d; }
      g.setTransform(d * (1 + wob) * Math.cos(b.rot), d * (1 + wob) * Math.sin(b.rot), -d * (1 - wob) * Math.sin(b.rot), d * (1 - wob) * Math.cos(b.rot), b.x * d, y * d);
      g.drawImage(b.gold ? SPR.gold : SPR.film[b.v], -b.r, -b.r, s, s);
      g.shadowBlur = 0;
      g.setTransform(d * (1 + wob), 0, 0, d * (1 - wob), b.x * d, y * d);
      g.drawImage(SPR.hl, -b.r, -b.r, s, s);
    }
    g.setTransform(d, 0, 0, d, 0, 0);
    for (const f of this.fx) {
      const k = 1 - f.t / f.life;
      if (f.k === 'ring') {
        g.globalAlpha = k * .7; g.strokeStyle = f.gold ? '#ffe1a3' : '#e9e2ff'; g.lineWidth = 1.5;
        g.beginPath(); g.arc(f.x, f.y, f.r * (1 + (1 - k) * .45), 0, 7); g.stroke();
      } else {
        g.globalAlpha = k; g.fillStyle = f.gold ? '#ffe1a3' : ['#8ef3ff', '#c9b8ff', '#ffa9d1', '#ffffff'][(f.r * 10 | 0) % 4];
        g.beginPath(); g.arc(f.x, f.y, f.r, 0, 7); g.fill();
      }
    }
    g.globalAlpha = 1;
  }
}

/* floating word after popping a background bubble */
const POP_WORDS = ['♡', '✦', 'hi', 'yay', 'smile', 'happy', 'birthday', 'you ♡', '✧', 'pop!'];
function floatWord(x, y) {
  const s = document.createElement('span');
  s.textContent = POP_WORDS[Math.floor(Math.random() * POP_WORDS.length)];
  Object.assign(s.style, { position: 'fixed', left: x + 'px', top: y + 'px', zIndex: 30, pointerEvents: 'none', fontFamily: 'Caveat, cursive',
    fontSize: '22px', color: '#fff6fb', textShadow: '0 0 12px rgba(201,184,255,.9)', transform: 'translate(-50%,-50%)' });
  document.body.appendChild(s);
  s.animate([{ opacity: 0, transform: 'translate(-50%,-50%) scale(.6)' }, { opacity: 1, transform: 'translate(-50%,-110%) scale(1)', offset: .25 },
    { opacity: 0, transform: 'translate(-50%,-260%) scale(1.05)' }], { duration: 1600, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = () => s.remove();
}

/* =====================================================================
   global sky + loop
   ===================================================================== */
const sky = new World($('#sky'), { ambient: true });
const loops = new Set();
let last = performance.now();
function frame(now) {
  const dt = Math.min((now - last) / 1000, .05); last = now;
  sky.step(dt); sky.draw();
  loops.forEach(fn => fn(dt, now));
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

addEventListener('pointermove', e => { sky.ptr.x = e.clientX; sky.ptr.y = e.clientY; }, { passive: true });
addEventListener('pointerup', () => { sky.ptr.x = sky.ptr.y = -999; }, { passive: true });
const NOPOP = 'button,textarea,.polaroid,.map,.reel,.ow-b,#wand-cv,.cake,.big-bubble,#hold,#dust,.glass-card,.window,#s-eyes,.pb';
addEventListener('pointerdown', e => {
  A.init();
  if (e.target.closest(NOPOP)) return;
  const b = sky.hit(e.clientX, e.clientY);
  if (b) { sky.pop(b); if (Math.random() < .55) floatWord(e.clientX, e.clientY - 10); }
}, { passive: true });

/* =====================================================================
   scene manager
   ===================================================================== */
const scenes = [];
let cur = -1;
const prog = $('#progress');
for (let i = 0; i < 10; i++) prog.appendChild(document.createElement('i'));
function go(i) {
  if (i === cur) return;
  const prev = scenes[cur];
  if (prev) { prev.leave && prev.leave(); prev.el.classList.remove('active'); }
  cur = i;
  const s = scenes[i];
  s.el.classList.add('active');
  $$('#progress i').forEach((d, k) => d.classList.toggle('on', k <= i));
  if (i > 0) { A.whoosh(); for (let k = 0; k < 5; k++) setTimeout(() => sky.add({ x: rand(0, sky.w), y: sky.h + 40, r: rand(14, 60), vy: -rand(70, 140), a: .8, born: 1, ambient: false }), k * 120); }
  s.enter && s.enter();
}
function scene(id, def) { def.el = $('#' + id); scenes.push(def); $$('.next', def.el).forEach(b => b.addEventListener('click', () => go(scenes.indexOf(def) + 1))); return def; }
function showNext(el, delay = 0) { setTimeout(() => { const n = $('.next', el); n.hidden = false; n.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, easing: 'ease-out' }); }, delay); }

/* ---------------- 0 · gate ---------------- */
scene('s-gate', {
  enter() {
    if (CONFIG.name) $('#gate-name').textContent = CONFIG.name;
    $$('.fade-seq', this.el).forEach((e, k) => setTimeout(() => e.classList.add('in'), 300 + k * 650));
    const bub = $('#bub-grow'); bub.classList.add('bubble');
    const unlock = CONFIG.unlockAt && new Date(CONFIG.unlockAt).getTime();
    if (unlock && Date.now() < unlock && !params.has('preview')) {
      $('#hold').hidden = true; $('#countdown').hidden = false;
      const tick = () => {
        let d = Math.max(0, unlock - Date.now()) / 1000;
        if (d <= 0) return location.reload();
        $('#cd-d').textContent = Math.floor(d / 86400); $('#cd-h').textContent = Math.floor(d % 86400 / 3600);
        $('#cd-m').textContent = Math.floor(d % 3600 / 60); $('#cd-s').textContent = Math.floor(d % 60);
      };
      tick(); setInterval(tick, 1000); return;
    }
    let p = 0, holding = false, done = false;
    const hold = $('#hold');
    const down = e => { e.preventDefault(); A.init(); holding = true; A.breathStart(); };
    const up = () => { holding = false; A.breathStop(); };
    hold.addEventListener('pointerdown', down); addEventListener('pointerup', up); addEventListener('pointercancel', up);
    let beatT = 0;
    this.loop = dt => {
      if (done) return;
      p = holding ? Math.min(1, p + dt / 2.4) : Math.max(0, p - dt * 1.4);
      const s = .42 + easeOut(p) * .8 + Math.sin(performance.now() / (holding ? 180 : 700)) * (holding ? .012 * p : .025);
      bub.style.transform = `scale(${s})`;
      A.breathSet(holding ? p : 0);
      beatT += dt; if (holding && beatT > 1 - p * .55) { beatT = 0; A.heartbeat(); vibrate(15); }
      if (p >= 1) {
        done = true; A.breathStop();
        const r = bub.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        bub.style.opacity = 0; A.pop(150); A.bell(587.33, .05, .12); A.bell(880, .15, .08);
        sky.burst(cx, cy, 40);
        for (let k = 0; k < 18; k++) { const a = rand(0, 6.28), sp = rand(80, 320); sky.add({ x: cx, y: cy, r: rand(8, 46), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * .6 - 40, a: .9, born: 1 }); }
        $('#flash').classList.add('on'); setTimeout(() => $('#flash').classList.remove('on'), 90);
        A.padStart(); prog.classList.add('show'); $('#mute').hidden = false;
        setTimeout(() => go(1), 700);
      }
    };
    loops.add(this.loop);
  },
  leave() { loops.delete(this.loop); },
});

/* ---------------- 1 · eyes ---------------- */
scene('s-eyes', {
  enter() {
    const eye = $('.eyes-img', this.el), lash = $('.lash', this.el);
    let o = 0, target = .04, dragging = false, sy = 0, opened = false;
    const down = e => { if (opened) return; dragging = true; sy = e.clientY; };
    const move = e => { if (!dragging) return; target = clamp((sy - e.clientY) / (innerHeight * .32), .04, 1); };
    const up = () => {
      if (!dragging) return; dragging = false;
      if (target > .55) openUp(); else target = .04;
    };
    const openUp = async () => {
      opened = true; target = 1; $('#eyes-hint').classList.add('gone'); A.bell(739.99, 0, .07); A.bell(1108.7, .2, .04);
      await sleep(1500); target = 0; await sleep(170); target = 1;
      const ps = $$('.eyes-lines p', this.el);
      for (const p of ps) { await sleep(1700); p.classList.add('in'); A.bell(587.33 * (1 + ps.indexOf(p) * .125), 0, .03, 3); }
      showNext(this.el, 1200);
    };
    this.el.addEventListener('pointerdown', down); addEventListener('pointermove', move); addEventListener('pointerup', up);
    this.loop = (dt, now) => {
      const breathe = !opened && !dragging ? Math.sin(now / 900) * .025 : 0;
      o = lerp(o, target + breathe, 1 - Math.pow(target < o - .3 ? .00001 : .0025, dt));
      const oo = clamp(o, 0, 1);
      eye.style.clipPath = `ellipse(56% ${(1 + oo * 70).toFixed(2)}% at 50% 50%)`;
      lash.style.opacity = (1 - oo * 1.4).toFixed(3); lash.style.transform = `scaleX(${(.6 + oo * .5).toFixed(3)})`;
    };
    loops.add(this.loop);
  },
  leave() { loops.delete(this.loop); },
});

/* ---------------- 2 · develop ---------------- */
scene('s-develop', {
  enter() {
    const table = $('#table'); table.innerHTML = '';
    const list = CONFIG.polaroids;
    const cards = list.map((p, k) => {
      const el = document.createElement('div'); el.className = 'polaroid waiting';
      el.style.setProperty('--r', rand(-5, 5).toFixed(1) + 'deg'); el.style.zIndex = 100 - k;
      el.innerHTML = `<div class="ph"><img src="${M(p.src)}" alt="" style="filter:saturate(.2) blur(3px) brightness(.7);transition:filter 2.6s cubic-bezier(.16,1,.3,1)"><canvas width="200" height="250"></canvas></div><div class="cap">${p.cap}</div>`;
      table.appendChild(el); return el;
    });
    let idx = 0;
    const tw = () => table.getBoundingClientRect();
    const piles = [[-.34, -.36], [.34, -.34], [-.36, .34], [.36, .36], [-.04, -.44], [.04, .44]];
    const activate = k => {
      const el = cards[k]; el.classList.remove('waiting');
      const cv = $('canvas', el), g = cv.getContext('2d');
      const gr = g.createLinearGradient(0, 0, 200, 250); gr.addColorStop(0, '#3a2f55'); gr.addColorStop(1, '#1d1830');
      g.fillStyle = gr; g.fillRect(0, 0, 200, 250);
      for (let i = 0; i < 900; i++) { g.fillStyle = `rgba(255,255,255,${rand(0, .05)})`; g.fillRect(rand(0, 200), rand(0, 250), 1.5, 1.5); }
      g.globalCompositeOperation = 'destination-out';
      let moves = 0, done = false, lx = null, ly = null;
      const brush = (x, y) => {
        const r = g.createRadialGradient(x, y, 0, x, y, 30); r.addColorStop(0, 'rgba(0,0,0,.55)'); r.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = r; g.beginPath(); g.arc(x, y, 30, 0, 7); g.fill();
      };
      const at = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 200, (e.clientY - r.top) / r.height * 250]; };
      const rub = e => {
        if (done || !(e.buttons || e.pointerType === 'touch')) return;
        const [x, y] = at(e);
        if (lx !== null) { const n = Math.ceil(Math.hypot(x - lx, y - ly) / 8); for (let i = 1; i <= n; i++) brush(lerp(lx, x, i / n), lerp(ly, y, i / n)); } else brush(x, y);
        lx = x; ly = y;
        if (++moves % 6 === 0) {
          A.breathStart(); A.breathSet(.25); clearTimeout(this.bt); this.bt = setTimeout(() => A.breathStop(), 160);
          const d = g.getImageData(0, 0, 200, 250).data; let clear = 0, tot = 0;
          for (let i = 3; i < d.length; i += 4 * 37) { tot++; if (d[i] < 90) clear++; }
          const img = $('img', el); const p = clear / tot;
          img.style.filter = `saturate(${.2 + p}) blur(${3 * (1 - p)}px) brightness(${.7 + p * .3})`;
          if (p > .5) finish();
        }
      };
      const finish = () => {
        done = true; cv.style.opacity = 0; $('img', el).style.filter = 'none'; el.classList.add('done');
        A.breathStop(); A.bell([587.33, 659.25, 739.99, 880, 987.77, 1174.66][k], 0, .08); vibrate(12);
        const r = el.getBoundingClientRect(); sky.burst(r.left + r.width / 2, r.top + r.height * .4, 18);
        setTimeout(() => {
          const t = tw(), [px, py] = piles[k];
          el.style.setProperty('--x', `calc(-50% + ${px * t.width}px)`); el.style.setProperty('--y', `calc(-50% + ${py * t.height}px)`);
          el.style.setProperty('--r2', rand(-14, 14).toFixed(1) + 'deg'); el.style.zIndex = 10 + k; el.classList.add('away');
          if (k + 1 < cards.length) activate(k + 1);
          else { $('#dev-hint').textContent = 'all of them, developed ✦'; showNext(this.el, 600); }
        }, 2300);
      };
      cv.addEventListener('pointerdown', e => { lx = null; cv.setPointerCapture(e.pointerId); rub(e); });
      cv.addEventListener('pointermove', rub);
      cv.addEventListener('pointerup', () => { lx = null; });
    };
    setTimeout(() => activate(0), 600);
  },
});

/* ---------------- 3 · metro ---------------- */
scene('s-metro', {
  enter() {
    const st = CONFIG.stations, map = $('#map'), train = $('#train'), win = $('#window'), media = $('#win-media'), cap = $('#win-cap');
    $$('.stn', map).forEach(s => s.remove());
    const pos = i => 14 + i / (st.length - 1) * (map.clientWidth - 28);
    const dots = st.map((s, i) => {
      const d = document.createElement('div'); d.className = 'stn' + (i === st.length - 1 ? ' term' : '');
      d.style.left = pos(i) + 'px'; d.innerHTML = `<label>${s.name}</label>`;
      d.style.setProperty('--lx', `${-8 - 84 * i / (st.length - 1)}%`);
      d.addEventListener('click', () => arrive(i)); map.appendChild(d); return d;
    });
    let at = -1, cycle = null, busy = false;
    const place = x => { train.style.left = x + 'px'; $('#rail-fill').style.width = (x - 14) + 'px'; };
    const arrive = async i => {
      if (busy || i === at) return; busy = true; at = i;
      clearInterval(cycle); win.classList.remove('open');
      dots.forEach((d, k) => { d.classList.toggle('cur', k === i); if (k <= i) d.classList.add('visited'); });
      place(pos(i));
      const s = st[i];
      $('#led').textContent = `अगला स्टेशन · Next station: ${s.name} · doors will open on the left · कृपया दरवाज़ों से हटकर खड़े हों ·`;
      A.chime();
      await sleep(1250);
      $$('video', media).forEach(v => v.pause()); media.innerHTML = '';
      if (s.video) {
        const v = document.createElement('video'); Object.assign(v, { src: V(s.video), muted: true, loop: true, playsInline: true, autoplay: true, poster: P(s.video) });
        v.setAttribute('playsinline', ''); v.setAttribute('muted', ''); media.appendChild(v); v.play().catch(() => {}); requestAnimationFrame(() => v.classList.add('on'));
      } else {
        const imgs = s.imgs.map(id => { const im = new Image(); im.src = M(id); media.appendChild(im); return im; });
        let k = 0; requestAnimationFrame(() => imgs[0].classList.add('on'));
        cycle = setInterval(() => { imgs[k].classList.remove('on'); k = (k + 1) % imgs.length; imgs[k].classList.add('on'); }, 2800);
      }
      cap.textContent = s.cap;
      await sleep(150); win.classList.add('open'); A.whoosh(1.2, .05);
      busy = false;
      if (i === st.length - 1) { $('#next-station').hidden = true; showNext(this.el, 1500); }
    };
    this.arrive = arrive;
    $('#next-station').onclick = () => arrive(Math.min(at + 1, st.length - 1));
    // drag the train
    let drag = false;
    const nearest = x => { let b = 0; st.forEach((_, i) => { if (Math.abs(pos(i) - x) < Math.abs(pos(b) - x)) b = i; }); return b; };
    const mx = e => clamp(e.clientX - map.getBoundingClientRect().left, 14, map.clientWidth - 14);
    map.addEventListener('pointerdown', e => { if (e.target.closest('.stn')) return; drag = true; train.classList.add('drag'); map.setPointerCapture(e.pointerId); place(mx(e)); });
    map.addEventListener('pointermove', e => { if (drag) place(mx(e)); });
    map.addEventListener('pointerup', e => { if (!drag) return; drag = false; train.classList.remove('drag'); const n = nearest(mx(e)); if (n === at) place(pos(n)); else arrive(n); });
    this.cleanup = () => { clearInterval(cycle); $$('video', media).forEach(v => v.pause()); };
    setTimeout(() => arrive(0), 900);
  },
  leave() { this.cleanup && this.cleanup(); },
});

/* ---------------- 4 · open-when bubbles ---------------- */
scene('s-openwhen', {
  enter() {
    const field = $('#ow-field'); field.innerHTML = '';
    const W = field.clientWidth, H = field.clientHeight, items = CONFIG.openWhen;
    const size = clamp(Math.min(W / 2.25, H / 4.1), 108, 168);
    const cols = 2, rows = Math.ceil(items.length / cols);
    let opened = 0, card = $('#ow-card');
    const bs = items.map((it, i) => {
      const el = document.createElement('div'); el.className = 'ow-b bubble';
      el.innerHTML = `<span><small>open when</small>${it.when}</span>`;
      const s = size * rand(.9, 1.08);
      Object.assign(el.style, { width: s + 'px', height: s + 'px' });
      const c = i % cols, r = Math.floor(i / cols);
      const bx = (c + .5) / cols * W - s / 2 + (r % 2 ? 22 : -22) + (i === items.length - 1 && items.length % 2 ? W / 4 * (c ? -1 : 1) : 0);
      const by = (r + .5) / rows * H - s / 2;
      field.appendChild(el);
      const b = { el, bx, by, s, t: rand(0, 9), ph: rand(0, 6.28), it };
      el.addEventListener('click', () => {
        if (el.classList.contains('popped')) return;
        const rc = el.getBoundingClientRect();
        el.classList.add('popped');
        el.animate([{ transform: el.style.transform + ' scale(1)', opacity: 1 }, { transform: el.style.transform + ' scale(1.35)', opacity: 0 }], { duration: 260, easing: 'ease-out', fill: 'forwards' });
        A.pop(s / 2); sky.burst(rc.left + rc.width / 2, rc.top + rc.height / 2, 18); vibrate(10);
        $('#ow-for').textContent = 'open when ' + it.when; $('#ow-msg').textContent = it.msg;
        setTimeout(() => { card.classList.add('show'); A.bell(659.25, 0, .05); }, 220);
        card.dataset.i = i;
      });
      return b;
    });
    $('#ow-close').onclick = () => {
      card.classList.remove('show');
      const b = bs[+card.dataset.i];
      b.el.getAnimations().forEach(a => a.cancel());
      b.el.classList.remove('popped'); b.el.style.opacity = .55;
      b.el.animate([{ scale: .2, opacity: 0 }, { scale: 1, opacity: .55 }], { duration: 900, easing: 'cubic-bezier(.34,1.56,.64,1)' });
      if (!b.seen) { b.seen = true; opened++; }
      if (opened === 3) { $('#ow-hint').textContent = 'the rest will still be here, whenever you need them'; showNext(this.el, 300); }
    };
    this.loop = (dt) => {
      for (const b of bs) {
        b.t += dt;
        const x = b.bx + Math.sin(b.t * .55 + b.ph) * 10, y = b.by + Math.sin(b.t * .8 + b.ph * 2) * 12;
        b.el.style.transform = `translate(${x}px,${y}px)`;
      }
    };
    loops.add(this.loop);
  },
  leave() { loops.delete(this.loop); $('#ow-card').classList.remove('show'); },
});

/* ---------------- 5 · cinema reel ---------------- */
scene('s-cinema', {
  enter() {
    const reel = $('#reel');
    if (!reel.children.length) {
      CONFIG.reel.forEach(r => {
        const f = document.createElement('div'); f.className = 'frame';
        f.innerHTML = `<video src="${V(r.v)}" poster="${P(r.v)}" muted loop playsinline preload="metadata" style="aspect-ratio:${r.land ? '16/9' : '9/16'}"></video><div class="flick"></div><span class="snd">🔇 tap</span><p class="fcap">${r.cap}</p>`;
        const v = $('video', f);
        f.addEventListener('click', () => {
          const on = v.muted; $$('.frame video', reel).forEach(o => { o.muted = true; $('.snd', o.parentNode).textContent = '🔇 tap'; });
          v.muted = !on; $('.snd', f).textContent = on ? '🔊' : '🔇 tap'; A.duck(on); v.play().catch(() => {});
        });
        reel.appendChild(f);
      });
    }
    const frames = $$('.frame', reel);
    let curF = null;
    const pick = () => {
      const mid = innerWidth / 2; let best = null, bd = 1e9;
      frames.forEach(f => { const r = f.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = f; } });
      if (best !== curF) {
        if (curF) { curF.classList.remove('cur'); const v = $('video', curF); v.pause(); if (!v.muted) { v.muted = true; $('.snd', curF).textContent = '🔇 tap'; A.duck(false); } }
        curF = best; best.classList.add('cur'); $('video', best).play().catch(() => {});
        A.bell(1318.5, 0, .015, 1);
      }
    };
    let raf = 0; this.onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(pick); };
    reel.addEventListener('scroll', this.onScroll, { passive: true });
    setTimeout(pick, 300);
    this.cleanup = () => { reel.removeEventListener('scroll', this.onScroll); frames.forEach(f => { const v = $('video', f); v.pause(); v.muted = true; }); A.duck(false); };
  },
  leave() { this.cleanup && this.cleanup(); },
});

/* ---------------- 6 · bubble wand ---------------- */
scene('s-wand', {
  enter() {
    const cv = $('#wand-cv');
    let caught = 0, made = 0, ri = Math.floor(rand(0, CONFIG.reminders.length));
    const card = $('#rem-card');
    const w = this.world || (this.world = new World(cv, {
      onPop: b => {
        if (!b.gold || b.life && b.t > b.life) return;
        caught++;
        $('#rem-text').textContent = CONFIG.reminders[ri++ % CONFIG.reminders.length];
        $('#rem-n').textContent = 'golden bubble · ' + caught;
        card.classList.add('show'); A.bell(880, 0, .07); A.bell(1318.5, .12, .05);
        clearTimeout(this.ct); this.ct = setTimeout(() => card.classList.remove('show'), 4200);
        if (caught === 3) showNext(this.el, 800);
      },
    }));
    w.resize();
    let lx = null, ly = null, down = false, acc = 0;
    const emit = (x, y, vx, vy) => {
      made++;
      const gold = made === 4 || (made > 4 && Math.random() < .14);
      w.add({ x, y, r: gold ? rand(34, 48) : rand(10, 44), vx: vx * .35 + rand(-30, 30), vy: -rand(30, 70) + vy * .2, gold, a: gold ? 1 : .9,
        born: 1, life: gold ? 9 : rand(5, 9), sway: rand(4, 16), v: Math.floor(rand(0, 3)) });
    };
    const pd = e => {
      const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      const hitB = w.hit(x, y);
      if (hitB) { w.pop(hitB); return; }
      down = true; lx = x; ly = y; cv.setPointerCapture(e.pointerId); $('#wand-hint').classList.add('gone');
      A.breathStart(); A.breathSet(.3);
    };
    const pm = e => {
      if (!down) return;
      const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      const d = Math.hypot(x - lx, y - ly); acc += d;
      A.breathSet(clamp(d / 30, .15, .7));
      if (acc > 26) { acc = 0; emit(x, y, (x - lx) * 30, (y - ly) * 30); }
      lx = x; ly = y;
    };
    const pu = () => { down = false; A.breathStop(); };
    cv.onpointerdown = pd; cv.onpointermove = pm; cv.onpointerup = pu; cv.onpointercancel = pu;
    // a few starter bubbles so she gets it instantly
    for (let k = 0; k < 6; k++) setTimeout(() => emit(w.w / 2 + rand(-60, 60), w.h * .62, rand(-200, 200), rand(-100, 0)), 400 + k * 140);
    this.loop = dt => { w.step(dt); w.draw(); };
    loops.add(this.loop);
  },
  leave() { loops.delete(this.loop); A.breathStop(); $('#rem-card').classList.remove('show'); },
});

/* ---------------- 7 · cake ---------------- */
scene('s-cake', {
  enter() {
    const box = $('#candles'); box.innerHTML = '';
    const n = clamp(CONFIG.candles | 0, 1, 12);
    const flames = [];
    for (let i = 0; i < n; i++) {
      const c = document.createElement('div'); c.className = 'candle'; c.style.height = rand(52, 70) + '%';
      const f = document.createElement('div'); f.className = 'flame'; f.style.animationDelay = rand(0, .2) + 's';
      f.addEventListener('pointerdown', e => { e.stopPropagation(); out(f); });
      c.appendChild(f); box.appendChild(c); flames.push(f);
    }
    let lit = n, finished = false;
    const out = f => {
      if (f.classList.contains('out')) return;
      f.classList.add('out'); lit--; A.whoosh(.35, .05);
      const s = document.createElement('div'); s.className = 'smoke'; s.style.setProperty('--sx', rand(-20, 20) + 'px');
      f.parentNode.appendChild(s); setTimeout(() => s.remove(), 2500);
      if (lit === 0 && !finished) celebrate();
    };
    const celebrate = async () => {
      finished = true; this.stopMic && this.stopMic();
      $('#cake-ctl').style.opacity = 0; $('.scene-head', this.el).style.transition = 'opacity .8s'; $('.scene-head', this.el).style.opacity = 0;
      await sleep(900);
      confetti();
      const dur = A.happyBirthday();
      $('#hb').textContent = 'Happy Birthday' + (CONFIG.name ? ', ' + CONFIG.name : '');
      $('#hb').classList.add('show'); $('#cake').classList.add('down'); vibrate([20, 40, 20]);
      await sleep(Math.min(dur * 1000, 6000));
      $('#hb').classList.add('up'); $('#cake-ctl').hidden = true;
      $('#wish').hidden = false; $('#wish').animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], { duration: 1000, easing: 'cubic-bezier(.16,1,.3,1)' });
    };
    $('#mic-btn').onclick = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false } });
        A.init(); const an = A.ctx.createAnalyser(); an.fftSize = 1024;
        const src = A.ctx.createMediaStreamSource(stream); src.connect(an);
        const buf = new Float32Array(an.fftSize);
        $('#mic-btn').textContent = 'now blow gently 🌬️';
        const meter = document.createElement('div'); meter.className = 'mic-meter'; meter.innerHTML = '<i></i>'; $('#cake-ctl').appendChild(meter);
        let streak = 0, cool = 0;
        const loop = dt => {
          an.getFloatTimeDomainData(buf); let s = 0; for (const v of buf) s += v * v;
          const rms = Math.sqrt(s / buf.length); $('i', meter).style.width = clamp(rms * 500, 0, 100) + '%';
          flames.forEach(f => f.style.transform = `skewX(${clamp(rms * 300, 0, 25)}deg)`);
          streak = rms > .09 ? streak + dt : 0; cool -= dt;
          if (streak > .12 && cool <= 0) { const l = flames.filter(f => !f.classList.contains('out')); if (l.length) out(l[Math.floor(Math.random() * l.length)]); cool = .16; }
        };
        loops.add(loop);
        this.stopMic = () => { loops.delete(loop); stream.getTracks().forEach(t => t.stop()); meter.remove(); };
      } catch (e) { $('#mic-btn').textContent = 'no mic? just tap the flames ✦'; }
    };
    $('#wish-go').onclick = () => {
      const ta = $('#wish-text'), text = ta.value.trim() || '✦';
      const r = ta.getBoundingClientRect(), s = 120;
      const b = document.createElement('div'); b.className = 'wish-bubble bubble'; b.textContent = text.length > 60 ? text.slice(0, 57) + '…' : text;
      Object.assign(b.style, { width: s + 'px', height: s + 'px', left: r.left + r.width / 2 - s / 2 + 'px', top: r.top - 20 + 'px' });
      document.body.appendChild(b); ta.value = ''; A.bell(783.99, 0, .07); A.bell(1174.66, .25, .05);
      const dx = rand(-60, 60);
      b.animate([{ transform: 'translate(0,0) scale(.3)', opacity: 0 }, { transform: `translate(${dx * .3}px,-80px) scale(1)`, opacity: 1, offset: .15 },
        { transform: `translate(${-dx * .5}px,-${innerHeight * .45}px) scale(.9)`, opacity: 1, offset: .65 },
        { transform: `translate(${dx}px,-${innerHeight + 200}px) scale(.6)`, opacity: 0 }], { duration: 7000, easing: 'cubic-bezier(.4,0,.6,1)' }).onfinish = () => b.remove();
      $('#wish').hidden = true;
      setTimeout(() => { $('#hb').textContent = 'sent to the sky ✦'; }, 1200);
      showNext(this.el, 2600);
    };
  },
  leave() { this.stopMic && this.stopMic(); },
});

function confetti() {
  const cols = ['#8ef3ff', '#c9b8ff', '#ffa9d1', '#ffd2a8', '#ffe1a3', '#ffffff'];
  for (let i = 0; i < 90; i++) {
    const c = document.createElement('div'); c.className = 'confetti';
    const w = rand(6, 10), round = Math.random() < .3;
    Object.assign(c.style, { left: rand(0, 100) + 'vw', width: w + 'px', height: (round ? w : w * 1.6) + 'px', background: cols[i % cols.length], borderRadius: round ? '50%' : '2px' });
    document.body.appendChild(c);
    const dx = rand(-120, 120), rot = rand(-720, 720);
    c.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${dx}px,${innerHeight + 60}px) rotate(${rot}deg)`, opacity: .9 }],
      { duration: rand(2600, 4600), delay: rand(0, 600), easing: 'cubic-bezier(.25,.6,.4,1)' }).onfinish = () => c.remove();
  }
}

/* ---------------- 8 · message in a bubble ---------------- */
scene('s-message', {
  enter() {
    const bb = $('#big-bubble'), film = $('.bb-film', bb), words = $('#bb-words');
    film.classList.add('bubble'); film.style.inset = 0; words.innerHTML = '';
    const pool = CONFIG.message.join(' ').split(/\s+/).filter(w => w.length > 3).slice(0, 26);
    const ws = pool.map(t => { const s = document.createElement('span'); s.textContent = t.replace(/[.,]/g, ''); words.appendChild(s);
      return { s, a: rand(0, 6.28), r: rand(.05, .38), sp: rand(.15, .45) * (Math.random() < .5 ? -1 : 1), y: rand(-.3, .3) }; });
    let p = 0, holding = false, popped = false;
    const down = e => { if (popped) return; e.preventDefault(); holding = true; bb.classList.add('pressing'); A.breathStart(); };
    const up = () => { holding = false; bb.classList.remove('pressing'); A.breathStop(); };
    bb.onpointerdown = down; addEventListener('pointerup', up); addEventListener('pointercancel', up);
    this.loop = dt => {
      const box = words.clientWidth;
      p = holding ? Math.min(1, p + dt / 1.8) : Math.max(0, p - dt);
      A.breathSet(p * .6);
      ws.forEach(w => {
        w.a += w.sp * dt * (1 + p * 5);
        const x = Math.cos(w.a) * w.r * box * (1 - p * .6), y = (w.y + Math.sin(w.a * 1.3) * .12) * box * (1 - p * .6);
        w.s.style.transform = `translate(${box / 2 + x}px,${box / 2 + y}px) translate(-50%,-50%)`;
        w.s.style.opacity = .35 + p * .6;
      });
      if (!popped && p >= 1) popIt();
    };
    const popIt = async () => {
      popped = true; holding = false; A.breathStop();
      const r = bb.getBoundingClientRect();
      bb.classList.add('popped'); A.pop(160); A.bell(587.33, .05, .1); vibrate(25);
      sky.burst(r.left + r.width / 2, r.top + r.height / 2, 46);
      $('#flash').classList.add('on'); setTimeout(() => $('#flash').classList.remove('on'), 80);
      $('#msg-hint').classList.add('gone');
      const box = $('#msg-text'); box.innerHTML = '';
      const ps = [...CONFIG.message, CONFIG.from].map((t, i, arr) => { const el = document.createElement('p'); el.textContent = t; if (i === arr.length - 1) el.className = 'sign'; box.appendChild(el); return el; });
      await sleep(500); $('#msg-card').classList.add('show');
      let skip = false; $('#msg-card').onclick = () => { skip = true; };
      for (const el of ps) {
        el.classList.add('in'); el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        const wait = skip ? 250 : 900 + el.textContent.length * 38;
        for (let t = 0; t < wait && !skip; t += 100) await sleep(100);
        if (skip) await sleep(200);
      }
      showNext(this.el, 800);
    };
    loops.add(this.loop);
  },
  leave() { loops.delete(this.loop); $('#msg-card').classList.remove('show'); },
});

/* ---------------- 9 · finale ---------------- */
scene('s-final', {
  enter() {
    const cv = $('#dust'), g = cv.getContext('2d');
    const W = innerWidth, H = innerHeight, dpr = Math.min(devicePixelRatio || 1, 1.5);
    cv.width = W * dpr; cv.height = H * dpr;
    let parts = [], buckets = new Map(), phase = 0, t0 = performance.now();
    const ptr = { x: -999, y: -999 };
    const img = new Image(); img.src = M(CONFIG.portrait);
    img.onload = () => {
      let pw = Math.min(W * .9, 520), ph = pw * img.height / img.width;
      if (ph > H * .52) { ph = H * .52; pw = ph * img.width / img.height; }
      const ox = (W - pw) / 2, oy = H * .35;
      const N = W < 600 ? 8000 : 13000, step = Math.max(2.2, Math.sqrt(pw * ph / N));
      const sw = Math.floor(pw / step), sh = Math.floor(ph / step);
      const oc = document.createElement('canvas'); oc.width = sw; oc.height = sh; const og = oc.getContext('2d');
      og.drawImage(img, 0, 0, sw, sh); const d = og.getImageData(0, 0, sw, sh).data;
      for (let y = 0; y < sh; y++) for (let x = 0; x < sw; x++) {
        const i = (y * sw + x) * 4; let r = d[i], gg = d[i + 1], b = d[i + 2];
        // soft vignette so the portrait melts into the night
        const ex = (x / sw - .5) * 2, ey = (y / sh - .5) * 2, v = clamp((1.08 - Math.sqrt(ex * ex * .9 + ey * ey * .8)) / .5, 0, 1);
        if (v <= .02) continue;
        const key = `${r >> 4},${gg >> 4},${b >> 4}`;
        const p = { x: rand(0, W), y: rand(0, H), tx: ox + (x + rand(-.15, .15)) * step, ty: oy + (y + rand(-.15, .15)) * step, vx: 0, vy: 0, a: v * v, tw: rand(0, 6.28), s: rand(.75, 1.05) };
        if (!buckets.has(key)) buckets.set(key, { col: `rgb(${(r >> 4) * 17},${(gg >> 4) * 17},${(b >> 4) * 17})`, ps: [] });
        buckets.get(key).ps.push(p); parts.push(p);
      }
      this.step = step;
    };
    cv.onpointermove = e => { ptr.x = e.clientX; ptr.y = e.clientY; };
    cv.onpointerleave = cv.onpointerup = () => { ptr.x = ptr.y = -999; };
    cv.onpointerdown = e => { ptr.x = e.clientX; ptr.y = e.clientY; if (phase >= 2) photoBubble(e.clientX, e.clientY, true); };
    const texts = ['#ft1', '#ft2', '#ft3', '#ft4'];
    [400, 2600, 6200, 8200].forEach((ms, i) => setTimeout(() => { $(texts[i]).classList.add('in'); if (i === 2) { A.happyBirthday(); confetti(); } }, ms));
    setTimeout(() => { phase = 1; A.whoosh(2.2, .06); }, 2600);
    setTimeout(() => { phase = 2; }, 7000);
    setTimeout(() => $('#final-end').classList.add('in'), 14000);
    this.auto = setInterval(() => phase >= 2 && photoBubble(Math.random() < .5 ? rand(10, W * .3) : rand(W * .7, W - 10), H + 60, false), 2600);
    this.loop = (dt, now) => {
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      g.globalCompositeOperation = 'lighter';
      const sz = (this.step || 3) * 1.0, k = phase ? 1 : 0;
      for (const p of parts) {
        if (k) { p.vx += (p.tx - p.x) * 2.2 * dt * 2; p.vy += (p.ty - p.y) * 2.2 * dt * 2; }
        else { p.vx += Math.sin(now / 1400 + p.tw) * 2 * dt; p.vy += Math.cos(now / 1600 + p.tw) * 2 * dt; }
        const dx = p.x - ptr.x, dy = p.y - ptr.y, d2 = dx * dx + dy * dy;
        if (d2 < 4900) { const d = Math.sqrt(d2) || 1, f = (1 - d / 70) * 1600 * dt; p.vx += dx / d * f; p.vy += dy / d * f; }
        const damp = Math.pow(k ? .02 : .5, dt); p.vx *= damp; p.vy *= damp;
        p.x += p.vx * dt * 2; p.y += p.vy * dt * 2;
      }
      for (const { col, ps } of buckets.values()) {
        g.fillStyle = col;
        for (const p of ps) { const tw = .75 + .25 * Math.sin(now / 420 + p.tw * 3); g.globalAlpha = p.a * (phase ? .9 * tw : .35 + .35 * Math.sin(now / 500 + p.tw)); const q = phase ? sz * p.s : 1.6; g.fillRect(p.x - q / 2, p.y - q / 2, q, q); }
      }
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    };
    loops.add(this.loop);
    $('#replay').onclick = () => { location.href = location.pathname + (params.has('preview') ? '?preview' : ''); };
  },
  leave() { loops.delete(this.loop); clearInterval(this.auto); },
});

function photoBubble(x, y, fromTap) {
  const box = $('#photo-bubbles'), s = rand(64, 118);
  const el = document.createElement('div'); el.className = 'pb bubble';
  const id = CONFIG.finalPhotos[Math.floor(Math.random() * CONFIG.finalPhotos.length)];
  el.innerHTML = `<img src="${M(id)}" alt="">`;
  Object.assign(el.style, { width: s + 'px', height: s + 'px', left: x - s / 2 + 'px', top: y - s / 2 + 'px', pointerEvents: 'auto' });
  box.appendChild(el);
  if (fromTap) { A.bell([587.33, 659.25, 739.99, 880, 987.77][Math.floor(Math.random() * 5)], 0, .05, 2); }
  const rise = y + s + 40, sway = rand(-50, 50), dur = rand(9000, 14000) * (rise / innerHeight);
  const an = el.animate([{ transform: 'translate(0,0) scale(.2)', opacity: 0 }, { transform: `translate(${sway * .3}px,-${rise * .12}px) scale(1)`, opacity: 1, offset: .08 },
    { transform: `translate(${-sway}px,-${rise * .55}px) scale(1)`, offset: .55 }, { transform: `translate(${sway}px,-${rise}px) scale(1)`, opacity: 1 }],
    { duration: Math.max(dur, 5000), easing: 'linear' });
  an.onfinish = () => el.remove();
  el.addEventListener('pointerdown', e => {
    e.stopPropagation(); const r = el.getBoundingClientRect();
    an.cancel(); el.remove(); A.pop(s / 2); sky.burst(r.left + r.width / 2, r.top + r.height / 2, 16); floatWord(r.left + r.width / 2, r.top);
  });
}

/* =====================================================================
   boot
   ===================================================================== */
$('#mute').onclick = e => { const on = A.toggle(); e.currentTarget.classList.toggle('off', !on); };
// warm the cache for the heavier scenes
addEventListener('load', () => setTimeout(() => {
  [...CONFIG.polaroids.map(p => p.src), ...CONFIG.stations.flatMap(s => s.imgs || []), CONFIG.portrait].forEach(id => { const i = new Image(); i.src = M(id); });
}, 1200));
const startAt = params.has('s') ? clamp(+params.get('s'), 0, scenes.length - 1) : 0;
if (startAt > 0) { prog.classList.add('show'); $('#mute').hidden = false; addEventListener('pointerdown', () => A.padStart(), { once: true }); }
go(startAt);
