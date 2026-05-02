/* ─────────────────────────────────────────
   HWYNE SITE — main.js
───────────────────────────────────────── */

// ── Cursor ──────────────────────────────
(function() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, .filter-btn, .writeup-row, .blog-card, .bb-card, .cert-card, .contact-link, .ctf-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      document.body.classList.add('cursor-link');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-link');
    });
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();

// ── Nav scroll effect ────────────────────
(function() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ── Mobile nav ───────────────────────────
(function() {
  const burger  = document.getElementById('nav-burger');
  const mobile  = document.getElementById('nav-mobile');
  if (!burger || !mobile) return;

  burger.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  // close on link click
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobile.classList.remove('open'));
  });
})();

// ── Scroll fade-up ────────────────────────
(function() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

// ── Writeup filter ────────────────────────
(function() {
  const btns = document.querySelectorAll('.filter-btn');
  const rows = document.querySelectorAll('.writeup-row');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;

      rows.forEach(row => {
        if (cat === 'all' || row.dataset.cat === cat) {
          row.removeAttribute('data-hidden');
          row.style.display = '';
        } else {
          row.setAttribute('data-hidden', '');
          row.style.display = 'none';
        }
      });

      // renumber visible rows
      let idx = 1;
      rows.forEach(row => {
        if (!row.hasAttribute('data-hidden')) {
          const numEl = row.querySelector('.writeup-row__num');
          if (numEl) numEl.textContent = String(idx).padStart(2, '0');
          idx++;
        }
      });
    });
  });
})();

// ── Active nav link ───────────────────────
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
