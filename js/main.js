/* ============================================================
   HERO GLOBAL ROUTE CANVAS
============================================================ */
(function initHeroRoutes() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animId;
  let width = 0;
  let height = 0;
  let dpr = 1;

  const nodes = [
    { x: 0.12, y: 0.22, r: 4.2 },
    { x: 0.28, y: 0.36, r: 3.2 },
    { x: 0.46, y: 0.24, r: 4.8 },
    { x: 0.66, y: 0.33, r: 3.5 },
    { x: 0.84, y: 0.2, r: 4.4 },
    { x: 0.74, y: 0.62, r: 3.2 },
    { x: 0.5, y: 0.72, r: 4.2 },
    { x: 0.24, y: 0.64, r: 3.6 },
  ];

  const routes = [
    [0, 2, 0.12],
    [2, 4, -0.15],
    [1, 2, -0.18],
    [2, 5, 0.22],
    [7, 6, -0.14],
    [6, 5, 0.12],
    [3, 6, -0.2],
    [0, 7, 0.18],
  ];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function point(node) {
    return { x: node.x * width, y: node.y * height };
  }

  function routeControl(a, b, bend) {
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return {
      x: midX - dy * bend,
      y: midY + dx * bend,
    };
  }

  function quadPoint(a, c, b, t) {
    const mt = 1 - t;
    return {
      x: mt * mt * a.x + 2 * mt * t * c.x + t * t * b.x,
      y: mt * mt * a.y + 2 * mt * t * c.y + t * t * b.y,
    };
  }

  function draw() {
    const time = performance.now() * 0.00012;
    ctx.clearRect(0, 0, width, height);

    const gridGradient = ctx.createLinearGradient(0, 0, width, height);
    gridGradient.addColorStop(0, 'rgba(215,184,95,0.08)');
    gridGradient.addColorStop(0.5, 'rgba(38,183,200,0.06)');
    gridGradient.addColorStop(1, 'rgba(215,184,95,0.04)');

    ctx.lineWidth = 1;
    ctx.strokeStyle = gridGradient;
    for (let x = -80; x < width + 120; x += 120) {
      ctx.beginPath();
      ctx.moveTo(x + Math.sin(time * 8 + x) * 8, 0);
      ctx.lineTo(x - 160, height);
      ctx.stroke();
    }

    for (const [start, end, bend] of routes) {
      const a = point(nodes[start]);
      const b = point(nodes[end]);
      const c = routeControl(a, b, bend);

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(c.x, c.y, b.x, b.y);
      ctx.strokeStyle = 'rgba(255,255,255,0.13)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(c.x, c.y, b.x, b.y);
      ctx.strokeStyle = 'rgba(215,184,95,0.18)';
      ctx.lineWidth = 2;
      ctx.stroke();

      const t = (time * 0.9 + start * 0.13 + end * 0.07) % 1;
      const pulse = quadPoint(a, c, b, t);
      const glow = ctx.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, 26);
      glow.addColorStop(0, 'rgba(240,207,114,0.78)');
      glow.addColorStop(0.5, 'rgba(38,183,200,0.32)');
      glow.addColorStop(1, 'rgba(38,183,200,0)');
      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(pulse.x, pulse.y, 26, 0, Math.PI * 2);
      ctx.fill();
    }

    nodes.forEach((node, index) => {
      const p = point(node);
      const pulse = Math.sin(time * 16 + index) * 0.5 + 0.5;
      const outer = node.r + 12 + pulse * 8;

      ctx.beginPath();
      ctx.strokeStyle = `rgba(38,183,200,${0.12 + pulse * 0.12})`;
      ctx.lineWidth = 1;
      ctx.arc(p.x, p.y, outer, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.arc(p.x, p.y, node.r + 1, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = 'rgba(215,184,95,0.9)';
      ctx.arc(p.x, p.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    });

    const horizon = ctx.createLinearGradient(0, height * 0.42, width, height * 0.42);
    horizon.addColorStop(0, 'rgba(215,184,95,0)');
    horizon.addColorStop(0.5, 'rgba(255,255,255,0.16)');
    horizon.addColorStop(1, 'rgba(38,183,200,0)');
    ctx.strokeStyle = horizon;
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(width * 0.12, height * (0.34 + i * 0.065));
      ctx.bezierCurveTo(width * 0.34, height * (0.25 + i * 0.02), width * 0.66, height * (0.48 - i * 0.02), width * 0.88, height * (0.36 + i * 0.065));
      ctx.stroke();
    }

    animId = requestAnimationFrame(draw);
  }

  function start() {
    resize();
    cancelAnimationFrame(animId);
    draw();
  }

  start();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(start, 200);
  });

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });
})();

/* ============================================================
   NAVBAR SCROLL BEHAVIOR
============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function update() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ============================================================
   MOBILE MENU
============================================================ */
(function initMobileMenu() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ============================================================
   SCROLL REVEAL ANIMATIONS
============================================================ */
(function initReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('is-visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
============================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const links = document.querySelectorAll('.nav-link');
  if (!links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   SCROLL TO TOP
============================================================ */
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   CONTACT FORM
============================================================ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    const action = form.action;

    // If Formspree ID is not set, show a demo success message
    if (!action || action.includes('YOUR_FORM_ID')) {
      e.preventDefault();
      if (success) {
        success.hidden = false;
        form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
        setTimeout(() => { success.hidden = true; }, 5000);
      }
      return;
    }

    // Real Formspree submission
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        if (success) success.hidden = false;
        form.reset();
        setTimeout(() => { if (success) success.hidden = true; }, 5000);
      } else {
        btn.textContent = 'Error — try emailing directly';
      }
    } catch {
      btn.textContent = 'Error — try emailing directly';
    } finally {
      setTimeout(() => {
        btn.disabled = false;
        if (btn.textContent !== original) btn.textContent = original;
      }, 3000);
    }
  });
})();
