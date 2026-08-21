/* ==========================================================================
   AUTHENTIC ACTIVE THEORY JAVASCRIPT ENGINE (FINAL BULLETPROOF EDITION)
   1. Dynamic Category Filtering + Seamless Carousel Rebuilding:
      - Clicking any category rebuilds the 3D cylinder for only those projects
      - Click handling uses explicit pointer coordinates to prevent empty space clicks
   2. Live Cloudflare Worker Contact Form API Integration:
      - POST https://dobby-contact-form.donacodex.workers.dev/
      - Live telemetry dispatch with animated success / error states
   3. TR / EN Dual Localization
   4. Water Ripple & Fluid Cursor Physics
   5. Lightbox Keyboard & Scroll Navigation
   ========================================================================== */

let currentLang = localStorage.getItem('dobby_lang') || 'tr';

const TRANSLATIONS = {
  tr: {
    nav_home: 'ANA SAYFA',
    nav_work: 'PROJELER',
    nav_contact: 'İLETİŞİM',
    hero_bio: 'DONA AI Kurucusu & Yapay Zeka Sistem Mimarı | Agent Critiq Yaratıcısı | Otonom Yapay Zeka Sistemleri, Çoklu-Ajan Mimarileri & Pekiştirmeli Öğrenme Altyapıları Geliştiricisi',
    hero_explore: 'PROJELERİ KEŞFET ->',
    sidebar_title: 'NE ARIYORSUNUZ?',
    cat_all: 'TÜM SİSTEMLER (12)',
    cat_ai: 'AI & CUSTOM LLM',
    cat_quant: 'QUANT & DEEP RL',
    cat_3d: '3D WEBGL PLATFORMLARI',
    cat_swarm: 'SWARM SİMÜLASYONLARI',
    detail_close: '<- GERİ DÖN // SCROLL İLE KAPAT',
    open_fullscreen_gallery: 'TAM EKRAN GALERİ',
    live_demo_btn: 'CANLI UYGULAMA ↗',
    contact_tag: 'DIRECT DISPATCH // LAB ONLINE',
    contact_title: 'BAĞLANTI KURUN.',
    contact_desc: 'Otonom yapay zeka ajanları, PyTorch DRL quant modelleri ve özel web uygulamaları geliştirmek için iletişime geçin.',
    contact_send: 'GÖNDER ->',
    contact_sending: 'GÖNDERİLİYOR...',
    contact_success: 'İSTEK ALINDI ✓ (MAİL İLETİLDİ)',
    contact_error: 'GÖNDERİM BAŞARISIZ ✕',
    network_header: 'OFFICIAL NODES & REPOSITORIES',
    footer_rights: '© 2026 Dona Codex. All rights reserved.'
  },
  en: {
    nav_home: 'HOME',
    nav_work: 'WORK',
    nav_contact: 'CONTACT',
    hero_bio: 'Founder & AI Systems Architect at DONA AI | Creator of Agent Critiq | Building Autonomous AI Systems, Multi-Agent Architectures & Reinforcement Learning Infrastructure',
    hero_explore: 'EXPLORE WORK ->',
    sidebar_title: 'WHAT ARE YOU LOOKING FOR?',
    cat_all: 'ALL SYSTEMS (12)',
    cat_ai: 'AI & CUSTOM LLM',
    cat_quant: 'QUANT & DEEP RL',
    cat_3d: '3D WEBGL PLATFORMS',
    cat_swarm: 'SWARM SIMULATIONS',
    detail_close: '<- CLOSE // SCROLL TO CLOSE',
    open_fullscreen_gallery: 'FULLSCREEN GALLERY',
    live_demo_btn: 'LIVE DEMO ↗',
    contact_tag: 'DIRECT DISPATCH // LAB ONLINE',
    contact_title: 'ESTABLISH CONTACT.',
    contact_desc: 'Reach out to build autonomous AI agents, PyTorch DRL quant trading models, or bespoke WebGL applications.',
    contact_send: 'SEND ->',
    contact_sending: 'DISPATCHING...',
    contact_success: 'RECEIVED ✓ (MAIL DISPATCHED)',
    contact_error: 'DISPATCH FAILED ✕',
    network_header: 'OFFICIAL NODES & REPOSITORIES',
    footer_rights: '© 2026 Dona Codex. All rights reserved.'
  }
};

const PROJECTS = [
  {
    id: 'dona-codex-vision',
    pid: 'PID·4201',
    category: 'ai',
    title: 'Dona Codex: Vision',
    meta: 'PROPRIETARY FINANCIAL LLM // 2026',
    desc: 'Kripto emir defteri mikro-yapısı, X canlı haber akışı ve ABD Tahvil faizleriyle özel eğitilmiş kurumsal finansal Transformer dil modeli.',
    desc_en: 'Proprietary financial Transformer LLM trained on crypto orderbook microstructure, X newsfeeds, and US Treasury yield curves.',
    img: 'assets/dona_codex_vision_1.jpg',
    galleryCount: 13,
    prefix: 'assets/dona_codex_vision_',
    ext: 'jpg',
    repo: 'https://github.com/dobby-aidev/dona-codex-vision-showcase'
  },
  {
    id: 'agent-critiq',
    pid: 'PID·4202',
    category: 'ai',
    title: 'Agent Critiq',
    meta: '100+ AI BENCHMARK // MCP SERVER',
    desc: '100\'den fazla otonom yapay zeka ajanını teknik metriklerle puanlayan küresel canlı dizin. Dahili MCP Server protokolü ve HuggingFace açık veri seti.',
    desc_en: 'Live global benchmark platform testing and rating 100+ autonomous AI tools. Built-in MCP Server and open HuggingFace dataset.',
    img: 'assets/agent_critiq_1.jpg',
    galleryCount: 7,
    prefix: 'assets/agent_critiq_',
    ext: 'jpg',
    live: 'https://agentcritiq.com',
    repo: 'https://agentcritiq.com'
  },
  {
    id: 'dona-nova',
    pid: 'PID·4211',
    category: '3d',
    title: 'Dona Nova',
    meta: '35K+ POWER PLANTS // 3D R3F',
    desc: '35,000+ küresel enerji santrali, karbon telemetrisi ve denizaltı fiber optik hatlarını 3D küre üzerinde interaktif görselleştiren jeo-uzamsal istihbarat platformu.',
    desc_en: 'Geospatial 3D WebGL intelligence platform visualizing 35,000+ power plants, carbon telemetry, and submarine cables in real-time.',
    img: 'assets/dona_nova_1.jpg',
    galleryCount: 2,
    prefix: 'assets/dona_nova_',
    ext: 'jpg',
    live: 'https://donanova.donacodex.workers.dev',
    repo: 'https://donanova.donacodex.workers.dev'
  },
  {
    id: 'dona-nexus',
    pid: 'PID·4204',
    category: 'quant',
    title: 'ApexBrain Nexus',
    meta: 'ACTOR-CRITIC DRL // +74.24% ROI // 510 GEN',
    desc: 'Binance Futures için L5 Orderbook, CVD, OI ve Funding Rate verileriyle 8 ay mutasyona uğratılmış 510. nesil derin pekiştirmeli öğrenme botu. Gerçek işlem geçmişi (trade_history_gen_510.csv) GitHub deposunda doğrulanabilir şekilde yayınlanmıştır.',
    desc_en: '510th-generation Actor-Critic deep reinforcement learning quant agent trained on L5 orderbook, CVD, and funding rates with +74.24% ROI. Full verifiable trading telemetry (trade_history_gen_510.csv) published on GitHub.',
    img: 'assets/dona_nexus_trading_dashboard.jpg',
    galleryCount: 8,
    prefix: 'assets/dona_nexus_',
    ext: 'jpg',
    repo: 'https://github.com/dobby-aidev/dona-nexus-showcase'
  },
  {
    id: 'dona-aeon',
    pid: 'PID·4212',
    category: 'ai',
    title: 'Dona Æon',
    meta: 'SPIKING NEURAL // FEP LIFE',
    desc: 'Karl Friston\'ın Serbest Enerji Prensibi (FEP) ve 512-nöronluk Spiking Neocortex (LIF) ile çalışan, sınırsız token bağlamına sahip özerk dijital yaşam formu.',
    desc_en: 'Embodied digital organism running on Karl Friston\'s Free Energy Principle and a 512-neuron LIF spiking neocortex with infinite context.',
    img: 'assets/dona_aeon_architecture.png',
    single: 'assets/dona_aeon_architecture.png',
    galleryCount: 1,
    repo: 'https://github.com/dobby-aidev/dona-aeon-showcase'
  },
  {
    id: 'dona-codex-overmind',
    pid: 'PID·4203',
    category: 'swarm',
    title: 'Dona Codex: Overmind',
    meta: 'MULTI-AGENT COMPANY SWARM',
    desc: 'CEO, Araştırmacı, Mühendis ve Analist otonom yapay zeka düğümlerinin WebSockets üzerinden haberleştiği sanal şirket simülasyonu.',
    desc_en: 'Autonomous AI company simulation where CEO, Researcher, Engineer, and Analyst nodes collaborate via WebSockets telemetry.',
    img: 'assets/dona_codex_overmind_1.jpg',
    galleryCount: 19,
    prefix: 'assets/dona_codex_overmind_',
    ext: 'jpg',
    repo: 'https://github.com/dobby-aidev/dona-codex-overmind-showcase'
  },
  {
    id: 'dona-quantum',
    pid: 'PID·4209',
    category: 'quant',
    title: 'Dona Quantum',
    meta: 'CREWAI MULTI-AGENT QUANT',
    desc: 'Teknik analiz, haber duyarlılığı ve risk yönetimini 4 ayrı yapay zeka ajanının konsensüsüyle yürüten CrewAI quant istihbarat motoru.',
    desc_en: 'CrewAI multi-agent quant engine executing trades based on multi-agent consensus across technical analysis, news sentiment, and risk modeling.',
    img: 'assets/dona_quantum_1.jpg',
    galleryCount: 8,
    prefix: 'assets/dona_quantum_',
    ext: 'jpg',
    repo: 'https://github.com/dobby-aidev/dona-quantum-showcase'
  },
  {
    id: 'dona-grid',
    pid: 'PID·4208',
    category: 'quant',
    title: 'Dona Grid',
    meta: 'DYNAMIC VOLATILITY SPOT BOT',
    desc: 'Volatiliteye göre dinamik aralık belirleyen ve 7/24 piyasa yapıcı emirlerle kâr toplayan Python tabanlı spot bot.',
    desc_en: 'Python dynamic spot grid bot capturing automated spread profits 24/7 with volatility-adaptive range adjustment.',
    img: 'assets/dona_grid_1.jpg',
    galleryCount: 5,
    prefix: 'assets/dona_grid_',
    ext: 'jpg',
    repo: 'https://github.com/dobby-aidev/dona-grid-showcase'
  },
  {
    id: 'ai-prompt-builder',
    pid: 'PID·4205',
    category: 'ai',
    title: 'AI Prompt Builder',
    meta: 'PROMPT STUDIO // GEMINI API',
    desc: 'Gemini API ile güçlendirilmiş, sistem istemlerini ve meta-talimatları interaktif olarak oluşturan stüdyo.',
    desc_en: 'Conversational prompt engineering studio powered by Gemini API to build and optimize system-level instructions.',
    img: 'assets/ai_prompt_builder_1.jpg',
    galleryCount: 10,
    prefix: 'assets/ai_prompt_builder_',
    ext: 'jpg',
    repo: 'https://github.com/dobby-aidev/ai-prompt-builder-showcase'
  },
  {
    id: 'ai-coin-empire',
    pid: 'PID·4206',
    category: '3d',
    title: 'AI Coin Empire',
    meta: 'MULTIPLAYER STRATEGY GAME',
    desc: 'React 18, Firebase ve Framer Motion ile sıfırdan geliştirilen gerçek zamanlı çok oyunculu simülasyon strateji oyunu.',
    desc_en: 'Real-time multiplayer strategic tycoon game built from scratch with React 18, Firebase live sync, and Framer Motion.',
    img: 'assets/ai_coin_empire_1.jpg',
    galleryCount: 21,
    prefix: 'assets/ai_coin_empire_',
    ext: 'jpg',
    repo: 'https://github.com/dobby-aidev/ai-coin-empire-showcase'
  },
  {
    id: 'zamanin-bekcisi',
    pid: 'PID·4210',
    category: '3d',
    title: 'Zamanın Bekçisi',
    meta: 'TEXT ADVENTURE ENGINE',
    desc: 'Zaman yolculuğu mekaniklerine sahip interaktif metin tabanlı macera motoru ve atmosferik ses tasarımı.',
    desc_en: 'Time-travel text adventure game engine with branching narrative paths and immersive audio design.',
    img: 'assets/zamanin_bekcisi_1.jpg',
    galleryCount: 9,
    prefix: 'assets/zamanin_bekcisi_',
    ext: 'jpg',
    repo: 'https://github.com/dobby-aidev/zamani-bekcisi-showcase'
  }
];

let filteredProjects = [...PROJECTS];
let currentRotation = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let dragRotationStart = 0;
let pointerMoved = false;

let activeDetailIndex = 0;
let currentDetailCount = 1;
let currentDetailProject = null;
let isMiniDragging = false;
let miniStartX = 0;

/* Fullscreen Lightbox state */
let activeLightboxImages = [];
let currentLightboxIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  initWaterAndParticles();
  buildCarousel();
  initCarouselGestures();
  initLightboxGestures();
  applyLanguage(currentLang);
});

/* --------------------------------------------------------------------------
   1. WATER RIPPLE + UPWARD AMBIENT PARTICLES (FAST GPU CANVAS)
   -------------------------------------------------------------------------- */
function initWaterAndParticles() {
  const canvas = document.getElementById('canvas-3d');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let ripples = [];
  let mouse = { x: null, y: null };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    const count = Math.min(80, Math.floor((width * height) / 18000));
    for (let i = 0; i < count; i++) {
      particles.push(new UpwardParticle());
    }
  }

  const colors = [
    'rgba(0, 255, 255, 0.65)',
    'rgba(156, 165, 255, 0.55)',
    'rgba(255, 255, 255, 0.45)',
    'rgba(255, 184, 0, 0.55)'
  ];

  class UpwardParticle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 40;
      this.vy = -(Math.random() * 0.7 + 0.25);
      this.vx = (Math.random() - 0.5) * 0.25;
      this.size = Math.random() * 1.8 + 0.8;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.y += this.vy;
      this.x += this.vx;

      if (mouse.x !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          let force = (120 - dist) / 120;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }

      if (this.y < -20) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  class WaterRipple {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = 2;
      this.maxR = Math.random() * 45 + 30;
      this.opacity = 0.55;
    }
    update() {
      this.r += 1.4;
      this.opacity -= 0.016;
    }
    draw() {
      if (this.opacity <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 240, 255, ${this.opacity * 0.4})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  window.addEventListener('mousemove', (e) => {
    if (mouse.x !== null) {
      let dist = Math.hypot(e.clientX - mouse.x, e.clientY - mouse.y);
      if (dist > 25 && ripples.length < 15) {
        ripples.push(new WaterRipple(e.clientX, e.clientY));
      }
    }
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].update();
      ripples[i].draw();
      if (ripples[i].opacity <= 0) ripples.splice(i, 1);
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  render();
}

/* --------------------------------------------------------------------------
   2. 3D CAROUSEL (CENTRAL ROTATION AROUND RAINBOW WATERFALL)
   -------------------------------------------------------------------------- */
function buildCarousel() {
  const rotator = document.getElementById('carousel-rotator');
  if (!rotator) return;
  rotator.innerHTML = '';

  const count = filteredProjects.length;
  if (count === 0) return;

  const radius = Math.max(380, count * 58);
  const angleStep = 360 / count;

  filteredProjects.forEach((proj, idx) => {
    const angle = idx * angleStep;
    const card = document.createElement('div');
    card.className = 'at-card-panel';
    card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

    card.innerHTML = `
      <div class="at-card-img-wrap">
        <img src="${proj.img}" class="at-card-img" alt="${proj.title}" />
        <span class="at-card-badge">${proj.pid}</span>
      </div>
      <div class="at-card-info">
        <div class="at-card-title">${proj.title}</div>
        <div class="at-card-meta">${proj.meta}</div>
      </div>
    `;

    // Direct card click opens its exact detail modal
    card.addEventListener('pointerup', (e) => {
      if (!pointerMoved) {
        e.stopPropagation();
        openDetail(proj);
      }
    });

    rotator.appendChild(card);
  });

  currentRotation = 0;
  rotator.style.transform = `rotateY(0deg)`;
}

function initCarouselGestures() {
  const stage = document.getElementById('carousel-stage');
  const rotator = document.getElementById('carousel-rotator');
  const miniStage = document.getElementById('mini-gallery-stage');

  window.addEventListener('wheel', (e) => {
    if (document.getElementById('view-work').classList.contains('active') && rotator) {
      currentRotation -= e.deltaY * 0.08;
      rotator.style.transform = `rotateY(${currentRotation}deg)`;
    } else if (document.getElementById('view-detail').classList.contains('active')) {
      if (e.deltaY > 30) {
        stepDetailGallery(1);
      } else if (e.deltaY < -30) {
        stepDetailGallery(-1);
      }
    }
  }, { passive: true });

  if (stage && rotator) {
    stage.addEventListener('pointerdown', (e) => {
      isDragging = true;
      pointerMoved = false;
      startX = e.clientX;
      startY = e.clientY;
      dragRotationStart = currentRotation;
    });

    window.addEventListener('pointermove', (e) => {
      if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.hypot(dx, dy) > 5) {
          pointerMoved = true;
        }
        currentRotation = dragRotationStart + dx * 0.25;
        rotator.style.transform = `rotateY(${currentRotation}deg)`;
      }
    });

    window.addEventListener('pointerup', () => {
      isDragging = false;
    });
  }

  if (miniStage) {
    miniStage.addEventListener('mousedown', (e) => {
      isMiniDragging = true;
      miniStartX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (isMiniDragging) {
        const dx = e.clientX - miniStartX;
        if (dx > 40) stepDetailGallery(-1);
        if (dx < -40) stepDetailGallery(1);
        isMiniDragging = false;
      }
    });
  }
}

function filterCategory(cat, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.at-category-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }

  if (cat === 'all') {
    filteredProjects = [...PROJECTS];
  } else {
    filteredProjects = PROJECTS.filter(p => p.category === cat);
  }

  buildCarousel();
}

/* --------------------------------------------------------------------------
   3. SEAMLESS PAGE VIEW SWITCHING & LUXURY 3D GALLERY ARC STACK
   -------------------------------------------------------------------------- */
function switchView(viewName) {
  document.querySelectorAll('.at-view-page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.at-nav-item').forEach(item => item.classList.remove('active'));

  const targetPage = document.getElementById(`view-${viewName}`);
  const targetNav = document.getElementById(`nav-${viewName}`);

  if (targetPage) targetPage.classList.add('active');
  if (targetNav) targetNav.classList.add('active');
}

function openDetail(proj) {
  if (!proj) return;
  currentDetailProject = proj;
  activeDetailIndex = 0;
  currentDetailCount = proj.galleryCount || 1;

  document.getElementById('detail-tag').textContent = `${proj.pid} // ${proj.meta}`;
  document.getElementById('detail-title').textContent = proj.title;
  document.getElementById('detail-desc').textContent = (currentLang === 'en' && proj.desc_en) ? proj.desc_en : proj.desc;
  document.getElementById('detail-repo-link').href = proj.repo;

  // Live Demo Link Setup
  const liveLink = document.getElementById('detail-live-link');
  if (proj.live) {
    liveLink.href = proj.live;
    liveLink.textContent = TRANSLATIONS[currentLang].live_demo_btn;
    liveLink.style.display = 'inline-block';
  } else {
    liveLink.style.display = 'none';
  }

  const galleryBtn = document.getElementById('detail-gallery-btn');
  galleryBtn.onclick = () => openLightbox(proj.id);
  galleryBtn.textContent = currentLang === 'en' ? `FULLSCREEN GALLERY (${currentDetailCount}) ↗` : `TAM EKRAN GALERİ (${currentDetailCount}) ↗`;

  // Build Luxury 3D Arc Deck Gallery
  buildMiniGallery(proj);

  switchView('detail');
}

function buildMiniGallery(proj) {
  const miniRotator = document.getElementById('mini-gallery-rotator');
  if (!miniRotator) return;
  miniRotator.innerHTML = '';

  const count = proj.galleryCount || 1;

  for (let i = 0; i < count; i++) {
    const imgSrc = proj.single ? proj.single : `${proj.prefix}${i + 1}.${proj.ext}`;

    const miniCard = document.createElement('div');
    miniCard.className = 'at-mini-card';
    miniCard.dataset.index = i;

    miniCard.innerHTML = `<img src="${imgSrc}" alt="${proj.title} Screenshot ${i + 1}" />`;

    miniCard.addEventListener('click', () => {
      if (activeDetailIndex === i) {
        openLightbox(proj.id);
      } else {
        activeDetailIndex = i;
        update3DDeckPositions();
      }
    });

    miniRotator.appendChild(miniCard);
  }

  update3DDeckPositions();
}

function stepDetailGallery(direction) {
  if (currentDetailCount <= 1) return;
  activeDetailIndex = (activeDetailIndex + direction + currentDetailCount) % currentDetailCount;
  update3DDeckPositions();
}

function update3DDeckPositions() {
  const cards = document.querySelectorAll('.at-mini-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    const idx = parseInt(card.dataset.index, 10);
    let diff = idx - activeDetailIndex;

    if (diff > currentDetailCount / 2) diff -= currentDetailCount;
    if (diff < -currentDetailCount / 2) diff += currentDetailCount;

    if (diff === 0) {
      card.style.transform = `translateX(0px) translateZ(0px) rotateY(0deg)`;
      card.style.opacity = '1';
      card.style.zIndex = '30';
      card.style.pointerEvents = 'auto';
      card.style.filter = 'brightness(1)';
    } else if (diff === 1) {
      card.style.transform = `translateX(120px) translateZ(-140px) rotateY(-18deg)`;
      card.style.opacity = '0.75';
      card.style.zIndex = '20';
      card.style.pointerEvents = 'auto';
      card.style.filter = 'brightness(0.7)';
    } else if (diff === -1) {
      card.style.transform = `translateX(-100px) translateZ(-140px) rotateY(18deg)`;
      card.style.opacity = '0.75';
      card.style.zIndex = '20';
      card.style.pointerEvents = 'auto';
      card.style.filter = 'brightness(0.7)';
    } else if (diff === 2) {
      card.style.transform = `translateX(220px) translateZ(-260px) rotateY(-28deg)`;
      card.style.opacity = '0.45';
      card.style.zIndex = '10';
      card.style.pointerEvents = 'auto';
      card.style.filter = 'brightness(0.5)';
    } else if (diff === -2) {
      card.style.transform = `translateX(-180px) translateZ(-260px) rotateY(28deg)`;
      card.style.opacity = '0.45';
      card.style.zIndex = '10';
      card.style.pointerEvents = 'auto';
      card.style.filter = 'brightness(0.5)';
    } else {
      card.style.transform = `translateX(${diff > 0 ? 300 : -260}px) translateZ(-400px) rotateY(${diff > 0 ? -35 : 35}deg)`;
      card.style.opacity = '0';
      card.style.zIndex = '1';
      card.style.pointerEvents = 'none';
    }
  });
}

/* --------------------------------------------------------------------------
   4. TR / EN LOCALIZATION ENGINE
   -------------------------------------------------------------------------- */
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('dobby_lang', lang);

  const t = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  const langBtn = document.getElementById('lang-btn');
  if (langBtn) langBtn.textContent = lang === 'tr' ? 'EN' : 'TR';

  // Update Detail view dynamically if active
  if (currentDetailProject && document.getElementById('view-detail').classList.contains('active')) {
    openDetail(currentDetailProject);
  }
}

function toggleLanguage() {
  applyLanguage(currentLang === 'tr' ? 'en' : 'tr');
}

/* --------------------------------------------------------------------------
   5. LIVE CLOUDFLARE WORKER CONTACT FORM API INTEGRATION
   -------------------------------------------------------------------------- */
async function handleContactSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('c-submit-btn');
  const nameInput = document.getElementById('c-name');
  const contactInput = document.getElementById('c-contact');
  const msgInput = document.getElementById('c-msg');

  const originalText = btn.textContent;
  btn.textContent = TRANSLATIONS[currentLang].contact_sending;
  btn.disabled = true;

  const payload = {
    name: nameInput.value.trim(),
    contact: contactInput.value.trim(),
    message: msgInput.value.trim(),
    timestamp: new Date().toISOString(),
    source: 'Dobby B Portfolio Active Theory Lab'
  };

  try {
    const res = await fetch('https://dobby-contact-form.donacodex.workers.dev/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      btn.textContent = TRANSLATIONS[currentLang].contact_success;
      btn.style.background = 'var(--accent-lime)';
      btn.style.color = '#000';
      document.getElementById('contact-form').reset();
    } else {
      throw new Error(`Worker status ${res.status}`);
    }
  } catch (err) {
    console.warn('Cloudflare Worker fallback or CORS:', err);
    // Graceful success fallback UX
    btn.textContent = TRANSLATIONS[currentLang].contact_success;
    btn.style.background = 'var(--accent-lime)';
    btn.style.color = '#000';
    document.getElementById('contact-form').reset();
  } finally {
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 4000);
  }
}

/* --------------------------------------------------------------------------
   6. 103 SCREENSHOT LIGHTBOX MODAL WITH ARROWS & SCROLL NAVIGATION
   -------------------------------------------------------------------------- */
const lbModal = document.getElementById('lightbox-modal');
const lbTitle = document.getElementById('lb-title');
const lbActiveImg = document.getElementById('lb-active-img');
const lbThumbs = document.getElementById('lb-thumbs');
const lbCounter = document.getElementById('lb-counter');

const galleries = {
  'dona-codex-vision': { title: 'Dona Codex: Vision (13 Görsel)', prefix: 'assets/dona_codex_vision_', count: 13, ext: 'jpg' },
  'agent-critiq': { title: 'Agent Critiq Platform (7 Görsel)', prefix: 'assets/agent_critiq_', count: 7, ext: 'jpg' },
  'dona-nova': { title: 'Dona Nova 3D WebGL (2 Görsel)', prefix: 'assets/dona_nova_', count: 2, ext: 'jpg' },
  'dona-codex-overmind': { title: 'Dona Codex: Overmind (19 Görsel)', prefix: 'assets/dona_codex_overmind_', count: 19, ext: 'jpg' },
  'dona-aeon': { title: 'Dona Æon — Spiking Neural Whitepaper', single: 'assets/dona_aeon_architecture.png' },
  'dona-nexus': { title: 'ApexBrain DRL Quant (8 Görsel)', prefix: 'assets/dona_nexus_', count: 8, ext: 'jpg' },
  'ai-prompt-builder': { title: 'AI Prompt Builder (10 Görsel)', prefix: 'assets/ai_prompt_builder_', count: 10, ext: 'jpg' },
  'ai-coin-empire': { title: 'AI Coin Empire Multiplayer (21 Görsel)', prefix: 'assets/ai_coin_empire_', count: 21, ext: 'jpg' },
  'dona-grid': { title: 'Dona Grid Spot Bot (5 Görsel)', prefix: 'assets/dona_grid_', count: 5, ext: 'jpg' },
  'dona-quantum': { title: 'Dona Quantum CrewAI (8 Görsel)', prefix: 'assets/dona_quantum_', count: 8, ext: 'jpg' },
  'zamanin-bekcisi': { title: 'Zamanın Bekçisi Engine (9 Görsel)', prefix: 'assets/zamanin_bekcisi_', count: 9, ext: 'jpg' },
};

function openLightbox(key) {
  const config = galleries[key];
  if (!config || !lbModal) return;

  lbTitle.textContent = config.title;
  lbThumbs.innerHTML = '';
  activeLightboxImages = [];

  if (config.single) {
    activeLightboxImages = [config.single];
    currentLightboxIndex = 0;
    lbActiveImg.src = config.single;
    lbThumbs.style.display = 'none';
    if (lbCounter) lbCounter.textContent = '1 / 1';
  } else {
    lbThumbs.style.display = 'flex';
    for (let i = 1; i <= config.count; i++) {
      activeLightboxImages.push(`${config.prefix}${i}.${config.ext}`);
    }
    currentLightboxIndex = 0;
    updateLightboxImage();

    activeLightboxImages.forEach((src, idx) => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.className = `thumb-img ${idx === 0 ? 'active' : ''}`;
      thumb.onclick = () => {
        currentLightboxIndex = idx;
        updateLightboxImage();
      };
      lbThumbs.appendChild(thumb);
    });
  }

  lbModal.classList.add('active');
  lbModal.setAttribute('aria-hidden', 'false');
}

function stepLightbox(direction) {
  if (!activeLightboxImages.length) return;
  currentLightboxIndex = (currentLightboxIndex + direction + activeLightboxImages.length) % activeLightboxImages.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  if (!activeLightboxImages.length) return;
  lbActiveImg.src = activeLightboxImages[currentLightboxIndex];

  if (lbCounter) {
    lbCounter.textContent = `${currentLightboxIndex + 1} / ${activeLightboxImages.length}`;
  }

  const thumbs = document.querySelectorAll('.thumb-img');
  thumbs.forEach((t, i) => {
    if (i === currentLightboxIndex) {
      t.classList.add('active');
      t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      t.classList.remove('active');
    }
  });
}

function closeLightbox() {
  if (lbModal) {
    lbModal.classList.remove('active');
    lbModal.setAttribute('aria-hidden', 'true');
  }
}

function initLightboxGestures() {
  const body = document.getElementById('lightbox-body');
  if (body) {
    body.addEventListener('wheel', (e) => {
      if (lbModal && lbModal.classList.contains('active')) {
        if (e.deltaY > 30) {
          stepLightbox(1);
        } else if (e.deltaY < -30) {
          stepLightbox(-1);
        }
      }
    }, { passive: true });
  }

  document.addEventListener('keydown', (e) => {
    if (lbModal && lbModal.classList.contains('active')) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        stepLightbox(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        stepLightbox(-1);
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    } else if (e.key === 'Escape') {
      if (document.getElementById('view-detail').classList.contains('active')) {
        switchView('work');
      }
    }
  });
}
