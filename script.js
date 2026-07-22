/* ====================================================
   Dobby B (dobby-aidev) Portfolio — script.js
   Handles: Particles, i18n TR/EN Toggle, Nav scroll,
            Intersection Observer reveals, Active nav links,
            Parallax, Dynamic Multi-Image Project Sliders
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

// ── 1. Bilingual TR / EN Translation Dictionary ───────
const translations = {
  en: {
    nav_about: "About",
    nav_projects: "Projects",
    nav_stack: "Stack",
    nav_contact: "Contact",
    hero_status: "Available for Systems Engineering & Architecture",
    hero_greeting: "Hey, I'm",
    role_1: "AI Systems Architect",
    role_2: "Autonomous Agent Engineer",
    role_3: "Deep RL Quant Developer",
    hero_desc: "Specialized in engineering production multi-agent systems, deep reinforcement learning trading engines, and scalable AI infrastructure.",
    btn_projects: "Explore Featured Systems",
    stat_1: "Production Systems",
    stat_2: "Curated AI Reviews",
    stat_3: "Lines of Code",
    stat_4: "Autonomous Execution",
    about_title: "Engineering Philosophy",
    about_card1_title: "Autonomous Agent Architect",
    about_card1_desc: "Architecting robust multi-agent orchestration frameworks where autonomous LLM nodes (CEO, Researcher, Engineer, Analyst) execute complex task pipelines with WebSocket telemetry and state persistence.",
    about_card2_title: "Deep RL Trading Systems",
    about_card2_desc: "Designing production deep reinforcement learning systems (ApexBrain) featuring dual-policy PyTorch networks, action masking, entropy confidence metrics, and 24/7 cloud execution on Binance Futures.",
    about_card3_title: "AI Product & MCP Ecosystems",
    about_card3_desc: "Founder of Agent Critiq — building AI discovery platforms with Model Context Protocol (MCP) servers, Hugging Face datasets, and GEO search architecture optimized for AI crawlers.",
    projects_title: "Featured Engineering Work",
    projects_subtitle: "10 production-ready AI systems spanning multi-agent platforms, quantitative trading engines, and applications",
    cat_agents: "AI Agents & Multi-Agent Platforms",
    cat_quant: "Deep RL & Quantitative Trading Engines",
    cat_automation: "Automation & Full-Stack Systems",
    p_agentcritiq_desc: "The premier curated platform for AI tools, autonomous agents, and LLMs. Features 100+ expert reviews, a built-in MCP server enabling Claude/Cursor to query the database, an open Hugging Face dataset, and complete GEO search optimization.",
    p_donacodex_desc: "Deploy autonomous AI agent nodes (CEO, Researcher, Engineer, Analyst) operating in a persistent game loop with real-time Socket.IO WebSocket telemetry, Firebase persistence, and pluggable LLM backends.",
    p_ailab_desc: "Experimental AI research environment for evaluating model architectures, prompt strategies, and agent behavior benchmarks. Integrated with Hugging Face Transformers and automated metrics.",
    p_promptbuilder_desc: "Chat-based prompt engineering studio using Gemini API for interactive requirement compilation, dual-language translation, PDF/JSON export, and coin economy state management.",
    p_donanexus_desc: "ApexBrain — a dual-policy PyTorch neural network with separate entry/exit heads, action masking, entropy confidence, session kill zones, and 24/7 autonomous Binance Futures execution on AWS.",
    p_donagrid_desc: "Production algorithmic grid trading bot for Binance spot markets. SpotVenomSniper strategy with ATR-based dynamic recentering, RSI anti-toxicity filters, 0.5s WebSocket latency, and GUI dashboard.",
    p_donaquantum_desc: "Quantitative strategy engine combining reinforcement learning with classical quantitative finance methods. Automated backtesting pipelines, adaptive position sizing, and real-time market signals.",
    p_donamusic_desc: "Stealth browser automation framework with human behavior simulation (mouse trajectory curves, timing distributions), RL behavior agent, multi-account persona engine, ADB mobile automation, and Flask analytics dashboard.",
    p_coinempire_desc: "Real-time multiplayer strategy application powered by Firebase Firestore. Features mining algorithms, password cracking puzzles, dynamic market pricing, and DONA collective AI state management across 3 evolution phases.",
    p_zamaninbekcisi_desc: "Branching interactive fiction game set across Ancient Egypt, Medieval era, and Cyberpunk 2087. Features energy resource management, item inventory system, and directed story graph architecture — zero backend required.",
    stack_title: "Technical Capabilities",
    contact_title: "Initiate Collaboration",
    contact_desc: "I am Dobby B (Alkan) — available for senior AI engineering roles, systems architecture consulting, and quantitative project collaborations."
  },
  tr: {
    nav_about: "Hakkımda",
    nav_projects: "Projeler",
    nav_stack: "Yetkinlikler",
    nav_contact: "İletişim",
    hero_status: "Sistem Mühendisliği ve Mimarlık Rollerine Açık",
    hero_greeting: "Merhaba, Ben",
    role_1: "Yapay Zeka Mimarı",
    role_2: "Otonom Ajan Mühendisi",
    role_3: "Derin RL Quant Geliştirici",
    hero_desc: "Üretim ortamına hazır çoklu-ajan sistemleri, derin pekiştirmeli öğrenme (DRL) alım-satım motorları ve ölçeklenebilir yapay zeka altyapıları geliştirmede uzmanım.",
    btn_projects: "Öne Çıkan Sistemleri İnceleyin",
    stat_1: "Üretim Seviyesi Sistem",
    stat_2: "Kürate Edilmiş AI İncelemesi",
    stat_3: "Satır Kod",
    stat_4: "Otonom Çalışma Süresi",
    about_title: "Mühendislik Yaklaşımı",
    about_card1_title: "Otonom Ajan Mimarı",
    about_card1_desc: "Otonom LLM düğümlerinin (CEO, Araştırmacı, Mühendis, Analist) WebSocket telemetrisi ve durum kalıcılığı ile karmaşık görev hatlarını çalıştırdığı dayanıklı çoklu-ajan sistemleri tasarlıyorum.",
    about_card2_title: "Derin RL Alım-Satım Sistemleri",
    about_card2_desc: "Çift politikalı PyTorch sinir ağları (ApexBrain), eylem maskeleme, entropi güven metrikleri ve Binance Futures üzerinde 7/24 bulut çalıştırma içeren canlı DRL sistemleri tasarlıyorum.",
    about_card3_title: "AI Ürün & MCP Ekosistemleri",
    about_card3_desc: "Agent Critiq'in kurucusuyum — Model Context Protocol (MCP) sunucuları, Hugging Face veri setleri ve AI botları için optimize edilmiş GEO arama mimarisine sahip platformlar kuruyorum.",
    projects_title: "Öne Çıkan Mühendislik Projeleri",
    projects_subtitle: "Çoklu-ajan platformları, kantitatif alım-satım motorları ve uygulamaları kapsayan 10 canlı AI sistemi",
    cat_agents: "Yapay Zeka Ajanları ve Çoklu-Ajan Platformları",
    cat_quant: "Derin Pekiştirmeli Öğrenme ve Kantitatif Alım-Satım Motorları",
    cat_automation: "Otomasyon ve Full-Stack Sistemler",
    p_agentcritiq_desc: "AI araçları, otonom ajanlar ve LLM'ler için kürate edilmiş 1 numaralı platform. 100+ uzman incelemesi, Claude/Cursor'ın doğrudan veritabanını sorgulamasını sağlayan dahili MCP sunucusu, açık Hugging Face veri seti ve tam GEO arama optimizasyonu.",
    p_donacodex_desc: "Gerçek zamanlı Socket.IO WebSocket telemetrisi, Firebase kalıcılığı ve takılabilir LLM arka uçları ile kalıcı bir döngüde çalışan otonom AI ajan düğümleri (CEO, Araştırmacı, Mühendis, Analist).",
    p_ailab_desc: "Model mimarilerini, istem stratejilerini ve ajan davranış kriterlerini değerlendirmek için deneysel AI araştırma ortamı. Hugging Face Transformers ve otomatik metriklerle entegre.",
    p_promptbuilder_desc: "İnteraktif gereksinim derleme, çift dilli çeviri, PDF/JSON dışa aktarma ve jeton ekonomisi durum yönetimi için Gemini API kullanan sohbet tabanlı istem mühendisliği stüdyosu.",
    p_donanexus_desc: "ApexBrain — Ayrı giriş/çıkış kafaları, eylem maskeleme, entropi güveni, oturum filtreleri ve AWS üzerinde 7/24 otonom Binance Futures çalıştırmasına sahip çift politikalı PyTorch sinir ağı.",
    p_donagrid_desc: "Binance spot piyasaları için üretim seviyesi algoritmik ızgara alım-satım botu. ATR tabanlı dinamik merkezleme, RSI anti-toksisite filtreleri, 0.5s WebSocket gecikmesi ve GUI paneli içeren SpotVenomSniper stratejisi.",
    p_donaquantum_desc: "Pekiştirmeli öğrenmeyi klasik kantitatif finans yöntemleriyle birleştiren strateji motoru. Otomatik geriye dönük test hatları, uyarlanabilir pozisyon boyutlandırma ve gerçek zamanlı piyasa sinyalleri.",
    p_donamusic_desc: "İnsan davranışı simülasyonu (fare yörünge eğrileri, zamanlama dağılımları), RL davranış ajanı, çoklu hesap persona motoru, ADB mobil otomasyonu ve Flask analitik paneli içeren gizli tarayıcı otomasyon çerçevesi.",
    p_coinempire_desc: "Firebase Firestore destekli gerçek zamanlı çok oyunculu strateji uygulaması. Madencilik algoritmaları, şifre kırma bulmacaları, dinamik piyasa fiyatlandırması ve 3 evrim aşamasında DONA kolektif AI durum yönetimi.",
    p_zamaninbekcisi_desc: "Antik Mısır, Orta Çağ ve Siberpunk 2087 dönemlerinde geçen dallanmalı etkileşimli macera oyunu. Enerji kaynak yönetimi, envanter sistemi ve yönlendirilmiş hikaye grafiği mimarisi — sıfır arka uç gereksinimi.",
    stack_title: "Teknik Yetkinlikler",
    contact_title: "İş Birliği Başlatın",
    contact_desc: "Ben Dobby B (Alkan) — Kıdemli AI mühendislik rolleri, sistem mimarisi danışmanlığı ve kantitatif proje iş birlikleri için hazırım."
  }
};

let currentLang = localStorage.getItem('dobby_lang') || 'en';

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('dobby_lang', lang);

  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });
  setLanguage(currentLang);
  initImageSliders();
});

// ── 2. Dynamic Multi-Image Slider Engine ─────────────────
function initImageSliders() {
  const wrappers = document.querySelectorAll('.project-img-wrapper');

  wrappers.forEach((wrapper) => {
    const baseSrc = wrapper.dataset.imagesBase;
    if (!baseSrc) return;

    // Check up to 5 potential images: baseName-1.jpg, baseName-2.jpg ... or fallback baseName.jpg
    const extensions = ['jpg', 'png', 'webp'];
    let validImages = [];
    let loadedCount = 0;
    const maxCheck = 4;

    function checkNext(index) {
      if (index > maxCheck) {
        buildSlider();
        return;
      }

      let img = new Image();
      let testSrc = `./assets/${baseSrc}-${index}.jpg`;
      img.src = testSrc;
      img.onload = () => {
        validImages.push(testSrc);
        checkNext(index + 1);
      };
      img.onerror = () => {
        // Try fallback to single image baseSrc.jpg if first check failed
        if (index === 1) {
          let singleImg = new Image();
          let singleSrc = `./assets/${baseSrc}.jpg`;
          singleImg.src = singleSrc;
          singleImg.onload = () => {
            validImages.push(singleSrc);
            buildSlider();
          };
          singleImg.onerror = () => {
            wrapper.style.display = 'none'; // hide if no image exists
          };
        } else {
          buildSlider();
        }
      };
    }

    function buildSlider() {
      if (validImages.length === 0) {
        wrapper.style.display = 'none';
        return;
      }

      wrapper.innerHTML = ''; // Clear default markup
      let currentIdx = 0;

      // Image Element
      const imgEl = document.createElement('img');
      imgEl.src = validImages[0];
      imgEl.className = 'project-preview-img';
      imgEl.alt = `${baseSrc} Screenshot`;
      wrapper.appendChild(imgEl);

      // If more than 1 image, add controls & dots
      if (validImages.length > 1) {
        wrapper.classList.add('has-multiple');

        // Nav Arrows
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-btn prev';
        prevBtn.innerHTML = '&#10094;';
        prevBtn.onclick = (e) => {
          e.stopPropagation();
          currentIdx = (currentIdx - 1 + validImages.length) % validImages.length;
          updateImg();
        };

        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-btn next';
        nextBtn.innerHTML = '&#10095;';
        nextBtn.onclick = (e) => {
          e.stopPropagation();
          currentIdx = (currentIdx + 1) % validImages.length;
          updateImg();
        };

        wrapper.appendChild(prevBtn);
        wrapper.appendChild(nextBtn);

        // Dots Container
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';

        validImages.forEach((_, i) => {
          const dot = document.createElement('span');
          dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
          dot.onclick = (e) => {
            e.stopPropagation();
            currentIdx = i;
            updateImg();
          };
          dotsContainer.appendChild(dot);
        });

        wrapper.appendChild(dotsContainer);

        function updateImg() {
          imgEl.style.opacity = '0.4';
          setTimeout(() => {
            imgEl.src = validImages[currentIdx];
            imgEl.style.opacity = '1';
          }, 120);

          const dots = dotsContainer.querySelectorAll('.slider-dot');
          dots.forEach((d, idx) => d.classList.toggle('active', idx === currentIdx));
        }
      }
    }

    checkNext(1);
  });
}

(function () {
  'use strict';

  // ── 3. Nav Scroll Effect ──────────────────────────────
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── 4. Active Nav Link (Intersection Observer) ───────
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

  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--text-primary) !important;
      background: rgba(255, 255, 255, 0.07) !important;
    }
  `;
  document.head.appendChild(style);

  // ── 5. Scroll Reveal Animations ──────────────────────
  const revealElements = document.querySelectorAll(
    '.glass-card, .hero-badge, .section-header, .hero-stats'
  );

  revealElements.forEach((el) => {
    if (!el.closest('.hero')) {
      el.classList.add('reveal');
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08,
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // ── 6. Stagger children on reveal ────────────────────
  const staggerContainers = document.querySelectorAll(
    '.about-grid, .projects-grid, .stack-grid, .hero-stats'
  );

  staggerContainers.forEach((container) => {
    const children = container.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
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
})();
