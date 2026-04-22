/**
 * NOVA-K — ORBITAL VACATIONS
 * Application Script  ·  nova-k.js
 */

/* ──────────────────────────────
   STARS CANVAS
────────────────────────────── */
(function initStars() {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [], W, H;

  function resize() {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }

  function init() {
    stars = [];
    const count = Math.floor(W * H / 1800);
    for (let i = 0; i < count; i++) {
      stars.push({
        x:   Math.random() * W,
        y:   Math.random() * H,
        r:   Math.random() * 1.3 + 0.1,
        a:   Math.random() * 0.8 + 0.1,
        sp:  Math.random() * 0.004 + 0.001,
        ph:  Math.random() * Math.PI * 2,
        col: Math.random() > 0.95 ? '#C8A96E'
           : Math.random() > 0.88 ? '#3EFFD8'
           : '#ffffff',
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const alpha = s.a * (0.45 + 0.55 * Math.sin(t * s.sp + s.ph));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.col;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  init();
  addEventListener('resize', () => { resize(); init(); });
  requestAnimationFrame(draw);
}());

/* ──────────────────────────────
   CUSTOM CURSOR
────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function tick() {
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  addEventListener('mouseleave', () => { dot.style.opacity  = '0'; ring.style.opacity = '0'; });
  addEventListener('mouseenter', () => { dot.style.opacity  = '1'; ring.style.opacity = '1'; });
}());

/* ──────────────────────────────
   NAV SCROLL STATE
────────────────────────────── */
addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 40);
}, { passive: true });

/* ──────────────────────────────
   HAMBURGER MENU
────────────────────────────── */
const ham     = document.getElementById('ham');
const mobMenu = document.getElementById('mob-menu');

ham.addEventListener('click', () => {
  const open = ham.classList.toggle('open');
  mobMenu.classList.toggle('open', open);
  ham.setAttribute('aria-expanded', open);
  mobMenu.setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.ml').forEach(link => {
  link.addEventListener('click', () => {
    ham.classList.remove('open');
    mobMenu.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
    mobMenu.setAttribute('aria-hidden', 'true');
  });
});

/* ──────────────────────────────
   SMOOTH SCROLL
────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ──────────────────────────────
   PARALLAX
────────────────────────────── */
addEventListener('scroll', () => {
  const sy = scrollY;
  const planet = document.getElementById('pp');
  const ship   = document.getElementById('ps');
  if (planet) planet.style.transform = `translateY(calc(-50% + ${sy * 0.28}px))`;
  if (ship)   ship.style.transform   = `translateY(calc(-50% + ${sy * -0.14}px)) rotate(${sy * 0.018 - 4}deg)`;
}, { passive: true });

/* ──────────────────────────────
   SCROLL REVEAL
────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ──────────────────────────────
   EXPERIENCE CARD — SPOTLIGHT
   Tracks mouse position per card for radial highlight
────────────────────────────── */
document.querySelectorAll('.exp-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
    card.style.setProperty('--mx', x);
    card.style.setProperty('--my', y);
  });
});

/* ──────────────────────────────
   DESTINATION TABS
────────────────────────────── */
function switchDest(index) {
  document.querySelectorAll('.d-tab').forEach((tab, j) => {
    tab.classList.toggle('active', j === index);
    tab.setAttribute('aria-selected', j === index);
  });
  document.querySelectorAll('.dest-panel').forEach((panel, j) => {
    panel.classList.toggle('active', j === index);
  });
}

/* ──────────────────────────────
   FLIGHT DATA & TABLE
────────────────────────────── */
const flights = [
  { id: 'NK-EO-2607', dest: 'Earth Orbit',  col: 'var(--teal)', cat: 'orbit', dep: 'Jul 26, 2026',  dur: '3 days',   cls: 'First Class',   price: '$240,000',    seats: 4, total: 12 },
  { id: 'NK-EO-2614', dest: 'Earth Orbit',  col: 'var(--teal)', cat: 'orbit', dep: 'Aug 14, 2026',  dur: '3 days',   cls: 'Economy Plus',  price: '$180,000',    seats: 8, total: 20 },
  { id: 'NK-EO-2621', dest: 'Earth Orbit',  col: 'var(--teal)', cat: 'orbit', dep: 'Sep 3, 2026',   dur: '7 days',   cls: 'Business',      price: '$320,000',    seats: 10, total: 16 },
  { id: 'NK-LN-2609', dest: 'The Moon',     col: 'var(--moon)', cat: 'moon',  dep: 'Sep 22, 2026',  dur: '10 days',  cls: 'First Class',   price: '$1,800,000',  seats: 2, total: 6  },
  { id: 'NK-LN-2612', dest: 'The Moon',     col: 'var(--moon)', cat: 'moon',  dep: 'Dec 8, 2026',   dur: '14 days',  cls: 'Business',      price: '$1,400,000',  seats: 3, total: 8  },
  { id: 'NK-MX-2801', dest: 'Mars',         col: 'var(--mars)', cat: 'mars',  dep: 'Mar 15, 2028',  dur: '7 months', cls: 'First Class',   price: '$12,000,000', seats: 1, total: 4  },
];

function renderFlights(filter) {
  const list = filter === 'all' ? flights : flights.filter(f => f.cat === filter);
  document.getElementById('ftbody').innerHTML = list.map(f => {
    const pct    = Math.round((1 - f.seats / f.total) * 100);
    const hot    = f.seats <= 2;
    const clsCls = f.cls === 'First Class' ? 'fc' : f.cls === 'Business' ? 'bc' : 'ec';
    return `<tr class="fl-row" data-cat="${f.cat}">
      <td><span class="fl-id">${f.id}</span></td>
      <td><div class="fl-dest"><span class="fl-dest-dot" style="background:${f.col};color:${f.col}"></span>${f.dest}</div></td>
      <td>${f.dep}</td>
      <td>${f.dur}</td>
      <td><span class="fl-cls ${clsCls}">${f.cls}</span></td>
      <td><span class="fl-price">${f.price}</span></td>
      <td><div class="seats-wrap"><div class="s-bar"><div class="s-fill${hot ? ' hot' : ''}" style="width:${pct}%"></div></div><span class="s-ct">${f.seats} left</span></div></td>
      <td><button class="fl-res" onclick="openModal('${f.dest}','${f.id}','${f.price}')">Reserve</button></td>
    </tr>`;
  }).join('');
}
renderFlights('all');

function filterFlights(cat, btn) {
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderFlights(cat);
}

/* ──────────────────────────────
   SEAT MAP
────────────────────────────── */
let selectedSeatPrice = 0;

function makeSeat(id, cls, booked, price, label) {
  const el = document.createElement('div');
  el.className = `seat ${cls} ${booked ? 'bkd' : 'avail'}`;
  el.textContent = id;
  el.setAttribute('role', 'listitem');
  el.setAttribute('aria-label', `Seat ${id} ${label} ${booked ? 'Booked' : 'Available'} $${price.toLocaleString()}`);
  el.dataset.id    = id;
  el.dataset.price = price;
  el.dataset.cls   = label;
  if (!booked) el.addEventListener('click', () => toggleSeat(el));
  return el;
}

function toggleSeat(el) {
  const wasSelected = el.classList.contains('sel');
  document.querySelectorAll('.seat.sel').forEach(s => {
    s.classList.remove('sel');
    s.classList.add('avail');
  });

  if (!wasSelected) {
    el.classList.remove('avail');
    el.classList.add('sel');
    const p = parseInt(el.dataset.price);

    document.getElementById('sel-seat').textContent = el.dataset.id;
    document.getElementById('sel-seat').classList.remove('empty');
    document.getElementById('sel-cls').textContent = el.dataset.cls;
    document.getElementById('sel-cls').classList.remove('empty');
    document.getElementById('bp-price').textContent = '$' + p.toLocaleString();

    selectedSeatPrice = p;
    const btn = document.getElementById('proc-btn');
    btn.disabled = false;
    btn.style.opacity = '1';
  } else {
    document.getElementById('sel-seat').textContent = 'No seat selected';
    document.getElementById('sel-seat').classList.add('empty');
    document.getElementById('sel-cls').textContent = '—';
    document.getElementById('sel-cls').classList.add('empty');
    document.getElementById('bp-price').textContent = '$0';

    selectedSeatPrice = 0;
    const btn = document.getElementById('proc-btn');
    btn.disabled = true;
    btn.style.opacity = '.38';
  }
}

function makeSeatGap() {
  const g = document.createElement('div');
  g.className = 'sg-gap';
  return g;
}

// First Class — 2×5 with centre aisle gap
(function buildFirstClass() {
  const grid  = document.getElementById('g-fc');
  const booked = ['1A', '2C'];
  ['1', '2'].forEach(row => {
    ['A', 'B', '_', 'C', 'D'].forEach(col => {
      if (col === '_') { grid.appendChild(makeSeatGap()); return; }
      grid.appendChild(makeSeat(row + col, 'fc', booked.includes(row + col), 240000, 'First Class'));
    });
  });
}());

// Business — 4 rows 3+a+3
(function buildBusiness() {
  const grid  = document.getElementById('g-bc');
  const booked = ['3A', '3B', '4C', '5D', '6A', '6E'];
  ['3', '4', '5', '6'].forEach(row => {
    ['A', 'B', 'C', '_', 'D', 'E', 'F'].forEach(col => {
      if (col === '_') { grid.appendChild(makeSeatGap()); return; }
      grid.appendChild(makeSeat(row + col, '', booked.includes(row + col), 180000, 'Business Class'));
    });
  });
}());

// Economy Plus — 5 rows 3+a+3+a+3
(function buildEconomy() {
  const grid  = document.getElementById('g-ec');
  const booked = ['7A', '7D', '8B', '8E', '8G', '9A', '9C', '9F', '10B', '10G', '11A', '11D', '11F'];
  ['7', '8', '9', '10', '11'].forEach(row => {
    ['A', 'B', 'C', '_', 'D', 'E', 'F', '_', 'G', 'H', 'J'].forEach(col => {
      if (col === '_') { grid.appendChild(makeSeatGap()); return; }
      grid.appendChild(makeSeat(row + col, '', booked.includes(row + col), 120000, 'Economy Plus'));
    });
  });
}());

/* ──────────────────────────────
   BOOKING MODAL
────────────────────────────── */
function openModal(dest, flight, price) {
  const bg = document.getElementById('modal-bg');
  document.getElementById('modal-sub').textContent = flight
    ? `Flight ${flight} · ${dest} · ${price}`
    : 'Speak with a Nova-K mission advisor';

  if (dest !== 'Consultation') {
    const sel = document.getElementById('md');
    if      (dest.includes('Orbit')) sel.value = 'orbit';
    else if (dest.includes('Moon'))  sel.value = 'moon';
    else if (dest.includes('Mars'))  sel.value = 'mars';
    else if (dest.includes('Titan')) sel.value = 'titan';
  }

  bg.classList.add('open');
  bg.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const bg = document.getElementById('modal-bg');
  bg.classList.remove('open');
  bg.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('modal-bg').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function proceedBook() {
  openModal('Earth Orbit', 'NK-EO-2607', '$' + selectedSeatPrice.toLocaleString());
}

function confirmBook() {
  const name  = document.getElementById('mn').value.trim();
  const email = document.getElementById('me').value.trim();
  if (!name || !email) { alert('Please fill in your name and email.'); return; }

  document.querySelector('.modal').innerHTML = `
    <div style="text-align:center;padding:20px 0">
      <div style="font-size:60px;margin-bottom:24px">🚀</div>
      <h3 style="font-family:var(--font-d);font-size:38px;font-weight:300;letter-spacing:-1px;margin-bottom:12px">Voyage Reserved</h3>
      <p style="color:var(--muted);font-size:14px;line-height:1.8;max-width:300px;margin:0 auto 32px">
        Welcome to Nova-K, ${name}. A mission advisor will contact you at
        <span style="color:var(--teal)">${email}</span> within 24 hours.
      </p>
      <button class="btn-primary" onclick="closeModal()" style="margin:0 auto">Close ✓</button>
    </div>`;
}

/* ──────────────────────────────
   LAUNCH COUNTDOWN
────────────────────────────── */
(function initCountdown() {
  const launchDate = new Date('2026-07-26T06:00:00Z');

  function update() {
    let diff = Math.max(0, launchDate - new Date()) / 1000;
    const d  = Math.floor(diff / 86400); diff -= d * 86400;
    const h  = Math.floor(diff / 3600);  diff -= h * 3600;
    const m  = Math.floor(diff / 60);
    const s  = Math.floor(diff % 60);

    document.getElementById('cd-d').textContent = String(d).padStart(3, '0');
    document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}());
