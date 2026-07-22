/* ====================================================
   Alkan (dobby-aidev) Portfolio — script.js
   Handles: Particles, Nav scroll, Intersection Observer
            reveals, Active nav links, Parallax, Interactions
   ==================================================== */

// ── 0. Floating Particles Canvas ──────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticles(count) {
    return Array.from({ length: count }, () => ({
      x:  randomBetween(0, W),
      y:  randomBetween(0, H),
      r:  randomBetween(0.5, 1.8),
      vx: randomBetween(-0.15, 0.15),
      vy: randomBetween(-0.2, -0.05),
      alpha: randomBetween(0.1, 0.55),
      color: Math.random() > 0.5 ? '99,102,241' : '168,85,247',
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -4) { p.y = H + 4; p.x = randomBetween(0, W); }
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
    });
    requestAnimationFrame(draw);
  }

  resize();
  particles = createParticles(80);
  draw();

  window.addEventListener('resize', () => { resize(); particles = createParticles(80); }, { passive: true });
})();

(function () {
  'use strict';

  // ── 1. Nav Scroll Effect ──────────────────────────────
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Run on load

  // ── 2. Active Nav Link (Intersection Observer) ───────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Add active nav link style dynamically
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--text-primary) !important;
      background: rgba(255, 255, 255, 0.07) !important;
    }
  `;
  document.head.appendChild(style);

  // ── 3. Scroll Reveal Animations ──────────────────────
  const revealElements = document.querySelectorAll(
    '.glass-card, .hero-badge, .section-header, .hero-stats'
  );

  // Add reveal class to eligible elements
  revealElements.forEach((el) => {
    // Skip hero elements (they already have CSS animations)
    if (!el.closest('.hero')) {
      el.classList.add('reveal');
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // Animate once
        }
      });
    },
    {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08,
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // ── 4. Stagger children on reveal ────────────────────
  const staggerContainers = document.querySelectorAll(
    '.about-grid, .projects-grid, .stack-grid, .hero-stats'
  );

  staggerContainers.forEach((container) => {
    const children = container.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  // ── 5. Nav Logo Typing Effect ─────────────────────────
  const logoEl = document.querySelector('.nav-logo');
  if (logoEl) {
    // Subtle shimmer on hover
    logoEl.addEventListener('mouseenter', () => {
      logoEl.style.filter = 'brightness(1.15)';
    });
    logoEl.addEventListener('mouseleave', () => {
      logoEl.style.filter = '';
    });
  }

  // ── 6. Smooth Anchor Scroll (fallback for older Safari) ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── 7. Hero Parallax Orbs ─────────────────────────────
  const orbs = document.querySelectorAll('.orb');

  function handleOrbParallax(e) {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xRatio = (clientX / innerWidth - 0.5) * 2;
    const yRatio = (clientY / innerHeight - 0.5) * 2;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 12;
      orb.style.transform = `translate(${xRatio * speed}px, ${yRatio * speed}px)`;
    });
  }

  window.addEventListener('mousemove', handleOrbParallax, { passive: true });

  // ── 8. Project Card Click Ripple ──────────────────────
  document.querySelectorAll('.project-card, .featured-card').forEach((card) => {
    card.addEventListener('click', function (e) {
      // Find first link in card and navigate
      const link = this.querySelector('a[href^="http"]');
      if (link && !e.target.closest('a')) {
        window.open(link.href, '_blank', 'noopener,noreferrer');
      }
    });

    // Add cursor pointer if card has external link
    if (card.querySelector('a[href^="http"]')) {
      card.style.cursor = 'pointer';
    }
  });

  // ── 9. Tag Hover Color Cycle ──────────────────────────
  const tagColors = [
    ['rgba(99, 102, 241, 0.15)', 'rgba(99, 102, 241, 0.3)'],
    ['rgba(168, 85, 247, 0.15)', 'rgba(168, 85, 247, 0.3)'],
    ['rgba(236, 72, 153, 0.12)', 'rgba(236, 72, 153, 0.28)'],
    ['rgba(34, 211, 238, 0.10)', 'rgba(34, 211, 238, 0.25)'],
  ];

  document.querySelectorAll('.tag').forEach((tag, i) => {
    const [bg, border] = tagColors[i % tagColors.length];
    tag.addEventListener('mouseenter', () => {
      tag.style.background = bg;
      tag.style.borderColor = border;
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.background = '';
      tag.style.borderColor = '';
    });
  });

  // ── 10. Console Easter Egg ────────────────────────────
  const styles = [
    'color: #6366f1; font-size: 18px; font-weight: 700;',
    'color: #a855f7; font-size: 13px;',
    'color: #94a3b8; font-size: 12px;',
  ];
  console.log('%c👋 Alkan / dobby-aidev', styles[0]);
  console.log('%cAI Developer & Autonomous Systems Builder', styles[1]);
  console.log('%cgithub.com/dobby-aidev | agentcritiq.com', styles[2]);

  console.log('%c🤖 Curious? The code is clean. Check the source.', 'color: #64748b; font-size: 11px;');

})();
