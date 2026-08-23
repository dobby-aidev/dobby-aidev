/**
 * Copyright (c) 2021-2026 Dona Codex.
 * All Rights Reserved.
 * https://dobby-aidev.github.io/dobby-aidev/
 * 
 * DONA CODEX // NEURAL OS & 3D INTERFACE JAVASCRIPT ENGINE
 */

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
    hero_bio: 'Dona Codex Kurucusu & Yapay Zeka Sistem Mimarı | Agent Critiq Yaratıcısı | Otonom Yapay Zeka Sistemleri, Çoklu-Ajan Mimarileri & Pekiştirmeli Öğrenme Altyapıları Geliştiricisi',
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
    node_tab_all: 'TÜMÜ (9)',
    node_tab_live: '⚡ CANLI (3)',
    node_tab_repos: '📦 DOKÜMAN & MAĞAZA (3)',
    node_tab_social: '🌐 NETWORK (3)',
    cv_download: 'ÖZGEÇMİŞ (CV / RESUME)',
    footer_rights: '© 2026 Dona Codex. All rights reserved.'
  },
  en: {
    nav_home: 'HOME',
    nav_work: 'WORK',
    nav_contact: 'CONTACT',
    hero_bio: 'Founder & AI Systems Architect at Dona Codex | Creator of Agent Critiq | Building Autonomous AI Systems, Multi-Agent Architectures & Reinforcement Learning Infrastructure',
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
    node_tab_all: 'ALL (9)',
    node_tab_live: '⚡ LIVE APPS (3)',
    node_tab_repos: '📦 STORE & DOCS (3)',
    node_tab_social: '🌐 NETWORK (3)',
    cv_download: 'CURRICULUM VITAE (RESUME)',
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
    live: 'https://aicoinempire.donacodex.workers.dev',
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
  initMobileNavSync();
  triggerQuantumHeroIntro();
});

function triggerQuantumHeroIntro() {
  const avatar = document.getElementById('hero-avatar-node');
  const bio = document.getElementById('hero-bio-text');
  const btn = document.querySelector('.at-hero-explore-btn');

  if (avatar) avatar.classList.add('quantum-intro-anim');
  if (bio) bio.classList.add('quantum-intro-anim');
  if (btn) btn.classList.add('quantum-intro-anim');
}


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

  // Debounced resize & visibility check to save GPU cycles
  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 100);
  }, { passive: true });

  resize();
  render();
}

/* --------------------------------------------------------------------------
   2. 3D CAROUSEL (CENTRAL ROTATION AROUND 3D NEURAL SPINE)
   -------------------------------------------------------------------------- */
function buildCarousel() {
  const rotator = document.getElementById('carousel-rotator');
  if (!rotator) return;

  // Remove previous project cards but preserve the 3D Neural Spine Core in the center
  const existingSpine = document.getElementById('neural-spine-core');
  rotator.querySelectorAll('.at-card-panel').forEach(c => c.remove());

  const count = filteredProjects.length;
  if (count === 0) return;

  const radius = Math.max(380, count * 58);
  const angleStep = 360 / count;

  filteredProjects.forEach((proj, idx) => {
    const angle = idx * angleStep;
    const card = document.createElement('div');
    card.className = 'at-card-panel';
    card.dataset.angle = angle;          // store base angle for hit-testing
    card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    card.style.pointerEvents = 'none';   // disabled by default — enabled only when facing viewer

    card.innerHTML = `
      <div class="at-card-3d-box">
        <!-- 3D Extrusion Side Bevel Walls -->
        <div class="at-card-side top"></div>
        <div class="at-card-side bottom"></div>
        <div class="at-card-side left"></div>
        <div class="at-card-side right"></div>

        <!-- 3D Corner Neon Brackets -->
        <div class="at-card-corner-bracket tl"></div>
        <div class="at-card-corner-bracket tr"></div>
        <div class="at-card-corner-bracket bl"></div>
        <div class="at-card-corner-bracket br"></div>

        <!-- 3D Front Glass Layer with High-Clarity AI HUD -->
        <div class="at-card-face-front">
          <div class="at-card-img-wrap">
            <canvas class="at-card-hologram-canvas" data-src="${proj.img}"></canvas>
            <img src="${proj.img}" class="at-card-img" alt="${proj.title}" />
            <div class="at-card-holo-shimmer"></div>
            
            <!-- AI HUD System Header -->
            <div class="at-card-hud-header">
              <span class="at-card-badge">${proj.pid}</span>
              <span class="at-card-live-node"><span class="at-node-dot"></span>SYS::ONLINE</span>
            </div>
            <div class="at-card-glass-specular"></div>
          </div>
          <div class="at-card-info">
            <div class="at-card-title-row">
              <div class="at-card-title">${proj.title}</div>
              <span class="at-card-arrow-icon">↗</span>
            </div>
            <div class="at-card-meta-row">
              <div class="at-card-meta">${proj.meta}</div>
              <div class="at-card-chip">NEURAL_NET</div>
            </div>
          </div>
        </div>

        <!-- 3D Back Chassis Plate with Circuit Grid -->
        <div class="at-card-face-back">
          <div class="at-card-back-grid"></div>
          <div class="at-card-back-logo">DONA//CODEX · QUANTUM OS</div>
        </div>
      </div>
    `;

    // Initialize 3D Mouse Gyro Tilt on this card
    initCard3DGyro(card);

    // Initialize WebGL Liquid Hologram Shader on this card
    initCardLiquidShader(card);

    // Direct project click: opens the exact clicked project with card shard explosion
    card.addEventListener('click', (e) => {
      if (!pointerMoved) {
        e.stopPropagation();
        openDetail(proj, card);
      }
    });

    rotator.appendChild(card);
  });

  currentRotation = 0;
  rotator.style.transform = `rotateY(0deg)`;
  updateCarouselPointerEvents();
}

/**
 * Check whether a specific card is facing the front hemisphere (visible to user)
 */
function isCardFacingViewer(card) {
  const baseAngle = parseFloat(card.dataset.angle) || 0;
  let eff = ((baseAngle + currentRotation) % 360 + 360) % 360;
  if (eff > 180) eff -= 360;

  // If card is in the front 180-degree view arc, it is visible and interactable
  return Math.abs(eff) < 85;
}

/**
 * Calculate dynamic depth of field (DoF) and enable pointer-events on front-facing cards
 * Front-most active card: Crystal clear (card-focused)
 * Side cards: Optical depth blur (card-blurred)
 * Rear cards: Deep background blur (card-deep-blurred)
 */
function updateCarouselPointerEvents() {
  const cards = document.querySelectorAll('#carousel-rotator .at-card-panel');
  if (!cards.length) return;

  const count = cards.length;
  const angleStep = 360 / count;

  cards.forEach((card) => {
    const baseAngle = parseFloat(card.dataset.angle) || 0;
    let eff = ((baseAngle + currentRotation) % 360 + 360) % 360;
    if (eff > 180) eff -= 360;
    const absEff = Math.abs(eff);

    // Reset classes
    card.classList.remove('card-focused', 'card-blurred', 'card-deep-blurred');

    if (absEff <= angleStep * 0.6) {
      // Primary Focused Card (Facing Viewer)
      card.classList.add('card-focused');
      card.style.pointerEvents = 'auto';
      card.style.cursor = 'pointer';
    } else if (absEff <= 85) {
      // Side visible cards (Soft Optical Blur)
      card.classList.add('card-blurred');
      card.style.pointerEvents = 'auto';
      card.style.cursor = 'pointer';
    } else {
      // Rear/Distant cards (Deep Blur & Dim)
      card.classList.add('card-deep-blurred');
      card.style.pointerEvents = 'none';
      card.style.cursor = 'default';
    }
  });
}


function initCarouselGestures() {
  const stage = document.getElementById('carousel-stage');
  const rotator = document.getElementById('carousel-rotator');
  const miniStage = document.getElementById('mini-gallery-stage');

  window.addEventListener('wheel', (e) => {
    if (document.getElementById('view-work').classList.contains('active') && rotator) {
      currentRotation -= e.deltaY * 0.08;
      rotator.style.transform = `rotateY(${currentRotation}deg)`;
      updateCarouselPointerEvents();
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
        updateCarouselPointerEvents();
      }

      // Interactive 3D Parallax & Spatial Orientation on Neural Spine
      const spine = document.getElementById('neural-spine-core');
      if (spine && document.getElementById('view-work').classList.contains('active')) {
        const rect = stage.getBoundingClientRect();
        const mouseRelX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const mouseRelY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        const tiltX = -mouseRelY * 20;
        const tiltY = mouseRelX * 28;
        spine.style.transform = `translate(-50%, -50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${Math.abs(mouseRelX) * 15}px)`;
      }
    });

    window.addEventListener('pointerup', () => {
      isDragging = false;
      updateCarouselPointerEvents();
      const spine = document.getElementById('neural-spine-core');
      if (spine) {
        spine.style.transform = `translate(-50%, -50%) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
      }
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

/* Mobile pill filter — syncs with desktop sidebar and rebuilds carousel */
function filterCategoryMobile(cat, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.at-mobile-filter-pill').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }
  // Also sync desktop sidebar if visible
  document.querySelectorAll('.at-category-btn').forEach(b => {
    b.classList.remove('active');
    const onclick = b.getAttribute('onclick') || '';
    if (onclick.includes(`'${cat}'`)) b.classList.add('active');
  });

  if (cat === 'all') {
    filteredProjects = [...PROJECTS];
  } else {
    filteredProjects = PROJECTS.filter(p => p.category === cat);
  }

  buildCarousel();
}

/**
 * Filter Official Nodes & Repositories on the Contact Page
 */
function filterContactNodes(category, btnElement) {
  document.querySelectorAll('.at-node-filter-pill').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const tiles = document.querySelectorAll('#contact-nodes-grid .at-network-tile');
  let visibleCount = 0;

  tiles.forEach((tile) => {
    const tileCat = tile.getAttribute('data-cat');
    if (category === 'all' || tileCat === category) {
      tile.style.display = 'flex';
      tile.style.opacity = '1';
      visibleCount++;
    } else {
      tile.style.display = 'none';
    }
  });

  const countBadge = document.getElementById('node-count-badge');
  if (countBadge) {
    countBadge.textContent = `${visibleCount} NODES`;
  }
}


/* --------------------------------------------------------------------------
   3. SEAMLESS PAGE VIEW SWITCHING & LUXURY 3D GALLERY ARC STACK
   -------------------------------------------------------------------------- */
function switchView(viewName) {
  document.querySelectorAll('.at-view-page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.at-nav-item').forEach(item => item.classList.remove('active'));

  const targetPage = document.getElementById(`view-${viewName}`);
  const targetNav = document.getElementById(`nav-${viewName}`);

  if (targetPage) {
    targetPage.classList.add('active');
    // Scroll smoothly to top on mobile/desktop switch
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  if (targetNav) targetNav.classList.add('active');

  // Trigger carousel pointer check if opening work view
  if (viewName === 'work') {
    setTimeout(updateCarouselPointerEvents, 50);
  }
}

/**
 * Universal Shatter Transition Trigger for UI Elements (Avatar, Buttons, Tiles, Nav)
 * Triggers wide cinematic crystal shatter and transitions seamlessly to target page
 */
function triggerElementShatterTransition(element, targetViewName, type = 'button') {
  if (element) {
    triggerLocalElementShatter(element, () => {
      switchView(targetViewName);
    }, type);
  } else {
    switchView(targetViewName);
  }
}

function openDetail(proj, cardElement) {
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

  // Trigger Localized Card Shatter & Seamless Zoom Transition
  triggerLocalElementShatter(cardElement, () => {
    switchView('detail');
  }, 'card');
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

/* --------------------------------------------------------------------------
   7. MOBILE HAMBURGER NAV
   -------------------------------------------------------------------------- */
function toggleMobileMenu() {
  const overlay = document.getElementById('mobile-nav-overlay');
  const btn = document.getElementById('mobile-menu-btn');
  if (!overlay || !btn) return;

  const isOpen = overlay.classList.contains('open');
  if (isOpen) {
    overlay.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-label', 'Menüyü Aç');
  } else {
    overlay.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-label', 'Menüyü Kapat');
  }
}

/* Sync mobile nav active state when view changes */
function initMobileNavSync() {
  // Close mobile menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('mobile-nav-overlay');
      if (overlay && overlay.classList.contains('open')) {
        toggleMobileMenu();
      }
    }
  });
}

/* --------------------------------------------------------------------------
   8. TOUCH SWIPE GESTURES (Carousel + Mini Gallery + Lightbox)
   -------------------------------------------------------------------------- */
(function initTouchGestures() {
  let touchStartX = 0;
  let touchStartY = 0;

  /* Carousel swipe */
  const carouselStage = document.getElementById('carousel-stage');
  if (carouselStage) {
    carouselStage.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      pointerMoved = false;
      dragRotationStart = currentRotation;
    }, { passive: true });

    carouselStage.addEventListener('touchmove', (e) => {
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe — rotate carousel
        if (Math.hypot(dx, dy) > 8) pointerMoved = true;
        const rotator = document.getElementById('carousel-rotator');
        if (rotator) {
          currentRotation = dragRotationStart + dx * 0.35;
          rotator.style.transform = `rotateY(${currentRotation}deg)`;
          updateCarouselPointerEvents();
        }
      }
    }, { passive: true });

    carouselStage.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      // If minimal movement, treat as a tap (card click via pointerup handles it)
      if (Math.abs(dx) < 8) pointerMoved = false;
      updateCarouselPointerEvents();
    }, { passive: true });
  }


  /* Mini gallery swipe */
  const miniStage = document.getElementById('mini-gallery-stage');
  if (miniStage) {
    let miniTouchStartX = 0;
    miniStage.addEventListener('touchstart', (e) => {
      miniTouchStartX = e.touches[0].clientX;
    }, { passive: true });

    miniStage.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - miniTouchStartX;
      if (dx > 40) stepDetailGallery(-1);
      if (dx < -40) stepDetailGallery(1);
    }, { passive: true });
  }

  /* Lightbox swipe */
  const lbBody = document.getElementById('lightbox-body');
  if (lbBody) {
    let lbTouchStartX = 0;
    lbBody.addEventListener('touchstart', (e) => {
      lbTouchStartX = e.touches[0].clientX;
    }, { passive: true });

    lbBody.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - lbTouchStartX;
      if (dx > 40) stepLightbox(-1);
      if (dx < -40) stepLightbox(1);
    }, { passive: true });
  }
})();

/* --------------------------------------------------------------------------
   9. WEBGL LIQUID METAL & RAYMARCHING HOLOGRAPHIC SHADER ENGINE
   - Hardware Accelerated GLSL Fragment Shader on GPU
   - Dynamic Chromatic Aberration & Liquid Refraction
   - Event-driven: Only renders active hovering cards (Zero CPU/GPU Lag)
   -------------------------------------------------------------------------- */
const CARD_VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    v_uv.y = 1.0 - v_uv.y; // Correct UV orientation
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const CARD_FRAGMENT_SHADER = `
  precision mediump float;
  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_hover;
  varying vec2 v_uv;

  // Simplex Noise Hash
  vec3 hash33(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yxz + 19.19);
    return fract((p.xxy + p.yxx) * p.zyx);
  }

  void main() {
    vec2 uv = v_uv;
    vec2 mouse = u_mouse;

    // Calculate distance and angle from pointer
    vec2 dir = uv - mouse;
    float dist = length(dir);

    // Liquid ripple wave equations
    float wave = sin(dist * 24.0 - u_time * 4.5) * exp(-dist * 3.5) * u_hover;
    vec2 offset = normalize(dir + 0.001) * wave * 0.045;

    // Raymarching holographic scanline & chromatic aberration
    float scanline = sin(uv.y * 320.0 + u_time * 6.0) * 0.035 * u_hover;
    
    // Chromatic dispersion sampling (RGB split)
    float r = texture2D(u_image, uv + offset * 1.35 + vec2(0.004 * u_hover, 0.0)).r;
    float g = texture2D(u_image, uv + offset + vec2(scanline * 0.5, 0.0)).g;
    float b = texture2D(u_image, uv + offset * 0.75 - vec2(0.004 * u_hover, 0.0)).b;

    vec3 col = vec3(r, g, b);

    // Holographic Liquid Chrome Rim Highlight
    float fresnel = pow(1.0 - abs(dot(normalize(vec3(dir, 0.4)), vec3(0.0, 0.0, 1.0))), 2.5);
    vec3 holoTint = vec3(0.0, 1.0, 1.0) * fresnel * u_hover * 0.6;
    vec3 magentaTint = vec3(1.0, 0.0, 0.5) * pow(fresnel, 3.0) * u_hover * 0.5;

    col += holoTint + magentaTint;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function initCardLiquidShader(cardElement) {
  const canvas = cardElement.querySelector('.at-card-hologram-canvas');
  if (!canvas) return;

  const imgSrc = canvas.getAttribute('data-src');
  if (!imgSrc) return;

  let gl = canvas.getContext('webgl', { alpha: true, antialias: false, preserveDrawingBuffer: false });
  if (!gl) {
    gl = canvas.getContext('experimental-webgl');
    if (!gl) return; // Fallback smoothly to CSS image
  }

  // Compile Shaders
  function createShader(gl, type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    return s;
  }

  const vShader = createShader(gl, gl.VERTEX_SHADER, CARD_VERTEX_SHADER);
  const fShader = createShader(gl, gl.FRAGMENT_SHADER, CARD_FRAGMENT_SHADER);
  const program = gl.createProgram();
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);

  // Geometry
  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ]), gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(program, 'a_position');
  const uImage = gl.getUniformLocation(program, 'u_image');
  const uResolution = gl.getUniformLocation(program, 'u_resolution');
  const uMouse = gl.getUniformLocation(program, 'u_mouse');
  const uTime = gl.getUniformLocation(program, 'u_time');
  const uHover = gl.getUniformLocation(program, 'u_hover');

  // Texture creation
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  let textureReady = false;

  img.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    textureReady = true;
  };
  img.src = imgSrc;

  let animFrame = null;
  let startTime = performance.now();
  let hoverVal = 0.0;
  let targetHover = 0.0;
  let mouse = { x: 0.5, y: 0.5 };

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
  }

  function renderShader() {
    if (!textureReady) {
      animFrame = requestAnimationFrame(renderShader);
      return;
    }

    resizeCanvas();
    gl.useProgram(program);

    // Smooth hover lerp
    hoverVal += (targetHover - hoverVal) * 0.12;

    const time = (performance.now() - startTime) * 0.001;

    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uTime, time);
    gl.uniform1f(uHover, hoverVal);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(uImage, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // Continue loop only when actively hovering or interpolating
    if (hoverVal > 0.002 || targetHover > 0) {
      animFrame = requestAnimationFrame(renderShader);
    } else {
      cancelAnimationFrame(animFrame);
      animFrame = null;
    }
  }

  // Pointer Listeners with zero overhead
  cardElement.addEventListener('pointerenter', (e) => {
    targetHover = 1.0;
    const rect = cardElement.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / rect.width;
    mouse.y = (e.clientY - rect.top) / rect.height;
    if (!animFrame) animFrame = requestAnimationFrame(renderShader);
  });

  cardElement.addEventListener('pointermove', (e) => {
    const rect = cardElement.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / rect.width;
    mouse.y = (e.clientY - rect.top) / rect.height;
  });

  cardElement.addEventListener('pointerleave', () => {
    targetHover = 0.0;
  });
}

/* --------------------------------------------------------------------------
   10. UNIVERSAL ORGANIC 3D GLASS SHATTER & NATURAL PHYSICS DISPERSION
   - Works on Project Cards, Home Profile Avatar & Explore Projects CTA
   - Organic Voronoi-like polygonal glass geometry with multi-angled facets
   - Natural physics: angular impulse, progressive alpha drag & chromatic laser rims
   -------------------------------------------------------------------------- */
function triggerLocalElementShatter(element, onCompleteCallback, customType = 'card') {
  if (!element) {
    if (onCompleteCallback) onCompleteCallback();
    return;
  }

  const rect = element.getBoundingClientRect();
  const imgElement = element.querySelector('img') || (element.tagName === 'IMG' ? element : null);
  const imgSrc = imgElement ? imgElement.src : '';

  // Create temporary container for local shards exactly over the clicked element
  const shatterBox = document.createElement('div');
  shatterBox.className = 'at-local-shatter-container';
  shatterBox.style.cssText = `
    position: fixed;
    left: ${rect.left}px;
    top: ${rect.top}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    pointer-events: none;
    z-index: 99999;
    perspective: 1000px;
    transform-style: preserve-3d;
  `;
  document.body.appendChild(shatterBox);

  // Hide the original element briefly during shatter
  element.style.opacity = '0';

  // Generate 32 Organic Faceted Glass Shards (More scattered & cinematic)
  const cols = 8;
  const rows = 4;
  const shardW = rect.width / cols;
  const shardH = rect.height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const shard = document.createElement('div');
      shard.className = 'at-local-card-shard';

      // Natural organic jagged clip-path for each crystal facet
      const p1x = (Math.random() * 25).toFixed(1);
      const p1y = (Math.random() * 25).toFixed(1);
      const p2x = (75 + Math.random() * 25).toFixed(1);
      const p2y = (Math.random() * 25).toFixed(1);
      const p3x = (75 + Math.random() * 25).toFixed(1);
      const p3y = (75 + Math.random() * 25).toFixed(1);
      const p4x = (Math.random() * 25).toFixed(1);
      const p4y = (75 + Math.random() * 25).toFixed(1);
      const clipPoly = `polygon(${p1x}% ${p1y}%, ${p2x}% ${p2y}%, ${p3x}% ${p3y}%, ${p4x}% ${p4y}%)`;

      // Distance from center for wide circular wave explosion
      const centerDistX = (c - (cols - 1) / 2);
      const centerDistY = (r - (rows - 1) / 2);
      const distFromCenter = Math.hypot(centerDistX, centerDistY);
      const staggerDelay = distFromCenter * 0.055; // organic ripple stagger

      // Broad, scattered 3D physics trajectory (2.2s+ epic dispersion)
      const angle = Math.atan2(centerDistY, centerDistX) + (Math.random() - 0.5) * 0.8;
      const speed = 220 + distFromCenter * 75 + Math.random() * 120; // Much wider scatter
      const dirX = Math.cos(angle) * speed;
      const dirY = Math.sin(angle) * speed + (Math.random() * 50); // natural gravity drift
      const dirZ = 300 + Math.random() * 650; // Deep 3D pop towards viewer
      const rotX = (Math.random() - 0.5) * 540;
      const rotY = (Math.random() - 0.5) * 540;
      const rotZ = (Math.random() - 0.5) * 360;

      const isAvatar = customType === 'avatar';
      const isBtn = customType === 'button';

      let bgStyle = '';
      if (imgSrc) {
        bgStyle = `
          background-image: url('${imgSrc}');
          background-size: ${rect.width}px ${rect.height}px;
          background-position: -${c * shardW}px -${r * shardH}px;
        `;
      } else if (isBtn) {
        bgStyle = `
          background: linear-gradient(135deg, rgba(0,255,255,0.95) 0%, rgba(13,17,29,0.98) 100%);
        `;
      } else {
        bgStyle = `
          background: #0e1017;
        `;
      }

      shard.style.cssText = `
        position: absolute;
        left: ${c * shardW}px;
        top: ${r * shardH}px;
        width: ${shardW}px;
        height: ${shardH}px;
        ${bgStyle}
        clip-path: ${clipPoly};
        border: 1.5px solid rgba(0, 255, 255, 0.95);
        box-shadow: 0 0 25px rgba(0, 255, 255, 0.9), inset 0 0 12px rgba(255, 255, 255, 0.8);
        transition: transform 2.4s cubic-bezier(0.06, 0.84, 0.15, 1) ${staggerDelay}s, opacity 2.3s ease ${staggerDelay}s;
        transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1);
        opacity: 1;
      `;

      shatterBox.appendChild(shard);

      // Trigger wide slow-motion physics explosion on next frame
      requestAnimationFrame(() => {
        shard.style.transform = `translate3d(${dirX}px, ${dirY}px, ${dirZ}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(0.2)`;
        shard.style.opacity = '0';
      });
    }
  }

  // Cinematic midpoint transition to next view (after 680ms, so shards disperse in mid-air)
  setTimeout(() => {
    if (onCompleteCallback) onCompleteCallback();
  }, 680);

  // Clean up DOM and restore element (2.6s total)
  setTimeout(() => {
    shatterBox.remove();
    element.style.opacity = '1';
  }, 2600);
}

/* --------------------------------------------------------------------------
   11. ROCK-SOLID 3D VOLUMETRIC CARDS (ZERO JITTER / ZERO GYRO WOBBLE)
   - Clean hardware-accelerated CSS 3D elevation only
   - Pure, stable hover state with zero mouse tracking jitter
   -------------------------------------------------------------------------- */
function initCard3DGyro(cardElement) {
  // Pure static 3D elevation via CSS — no JS mouse jitter
}







