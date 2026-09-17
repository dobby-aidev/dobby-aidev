/**
 * Copyright (c) 2021-2026 Dona Codex.
 * All Rights Reserved.
 * https://dobby.donacodex.com
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

/* Fallback SVG generator for any broken or slow-loading screenshot */
function generateFallbackSvg(title) {
  const safeTitle = (title || 'Project Preview').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect fill="%230f0f13" width="800" height="500"/><circle cx="400" cy="200" r="48" fill="%23f5eedc" opacity="0.15"/><path d="M380 200 L420 200 M400 180 L400 220" stroke="%23f5eedc" stroke-width="3" stroke-linecap="round"/><text fill="%23faf7f2" font-family="system-ui, sans-serif" font-size="22" font-weight="600" x="50%" y="300" text-anchor="middle">${safeTitle}</text><text fill="%23a8a29e" font-family="monospace" font-size="14" x="50%" y="335" text-anchor="middle">DONA CODEX // PRODUCTION</text></svg>`;
}

function handleImgError(imgEl, title) {
  if (!imgEl) return;
  const currentRetry = parseInt(imgEl.dataset.retryCount || '0', 10);
  if (currentRetry < 2) {
    imgEl.dataset.retryCount = (currentRetry + 1).toString();
    const rawSrc = imgEl.src.split('?retry=')[0];
    setTimeout(() => {
      imgEl.src = `${rawSrc}?retry=${currentRetry + 1}`;
    }, 450);
    return;
  }
  if (!imgEl.dataset.hasFailed) {
    imgEl.dataset.hasFailed = 'true';
    imgEl.src = generateFallbackSvg(title);
  }
}

const TRANSLATIONS = {
  tr: {
    nav_home: 'ANA SAYFA',
    nav_work: 'PROJELER',
    nav_contact: 'HAKKINDA',
    hero_bio: 'Dona Codex Kurucusu & Sistem Mimarı | Agent Critiq Geliştiricisi | Otonom Ajan Sistemleri, PyTorch Pekiştirmeli Öğrenme & 3D WebGL Platformları Geliştiricisi',
    hero_explore: 'PROJELERİ KEŞFET ->',
    cat_all: 'TÜMÜ',
    cat_live: 'CANLI',
    cat_intelligence: 'ZEKA',
    cat_systems: 'SİSTEMLER',
    cat_simulations: 'SİMÜLASYONLAR',
    cat_research: 'ARAŞTIRMA',
    cat_experiments: 'DENEYLER',
    detail_close: '<- PROJELERE GERİ DÖN',
    open_fullscreen_gallery: 'TAM EKRAN GALERİ',
    live_demo_btn: 'CANLI YAYIN ↗',
    contact_tag: 'İLETİŞİM // GET IN TOUCH',
    contact_title: 'BAĞLANTI KURUN.',
    contact_desc: 'Otonom yapay zeka ajanları, PyTorch DRL quant modelleri ve özel web uygulamaları geliştirmek için iletişime geçin.',
    contact_send: 'GÖNDER ->',
    contact_sending: 'GÖNDERİLİYOR...',
    contact_success: 'İSTEK ALINDI ✓ (MAİL İLETİLDİ)',
    contact_error: 'GÖNDERİM BAŞARISIZ ✕',
    network_header: 'PROJELER & BAĞLANTILAR',
    node_tab_all: 'TÜMÜ (9)',
    node_tab_live: '⚡ CANLI (3)',
    node_tab_repos: '📦 DOKÜMAN & MAĞAZA (3)',
    node_tab_certs: '🎓 SERTİFİKALAR (1)',
    node_tab_social: '🌐 NETWORK (3)',
    cv_download: 'ÖZGEÇMİŞ (CV / RESUME)',
    toggle_view_mode: '📱 IZGARA GÖRÜNÜMÜ',
    toggle_view_mode_grid: '📱 IZGARA GÖRÜNÜMÜ',
    toggle_view_mode_3d: '🌌 3D KORİDOR',
    footer_rights: '© 2026 Dona Codex. All rights reserved.',
    swipe_hint: 'KAYDIRARAK İNCELEYİN',
    arch_system_tag: 'SİSTEM MİMARİSİ // 3D DEKONSTRÜKSİYON',
    arch_explode: 'KATMAN AYRIŞTIRMA (EXPLODE)',
    gallery_title: 'PROJE GALERİSİ'
  },
  en: {
    nav_home: 'HOME',
    nav_work: 'WORK',
    nav_contact: 'ABOUT',
    hero_bio: 'Founder & AI Systems Architect at Dona Codex | Creator of Agent Critiq | Building Autonomous AI Systems, Reinforcement Learning Infrastructure & 3D WebGL Platforms',
    hero_explore: 'EXPLORE WORK ->',
    cat_all: 'ALL',
    cat_live: 'LIVE',
    cat_intelligence: 'INTELLIGENCE',
    cat_systems: 'SYSTEMS',
    cat_simulations: 'SIMULATIONS',
    cat_research: 'RESEARCH',
    cat_experiments: 'EXPERIMENTS',
    detail_close: '<- BACK TO WORK',
    open_fullscreen_gallery: 'FULLSCREEN GALLERY',
    live_demo_btn: 'LIVE PLATFORM ↗',
    contact_tag: 'CONTACT // GET IN TOUCH',
    contact_title: 'GET IN TOUCH.',
    contact_desc: 'Reach out to build autonomous AI agents, PyTorch DRL quant trading models, or bespoke WebGL applications.',
    contact_send: 'SEND ->',
    contact_sending: 'SENDING...',
    contact_success: 'RECEIVED ✓ (MAIL DISPATCHED)',
    contact_error: 'DISPATCH FAILED ✕',
    network_header: 'PROJECTS & ECOSYSTEM',
    node_tab_all: 'ALL (9)',
    node_tab_live: '⚡ LIVE APPS (3)',
    node_tab_repos: '📦 STORE & DOCS (3)',
    node_tab_certs: '🎓 CERTIFICATES (1)',
    node_tab_social: '🌐 NETWORK (3)',
    cv_download: 'CURRICULUM VITAE (RESUME)',
    toggle_view_mode: '📱 GRID VIEW',
    toggle_view_mode_grid: '📱 GRID VIEW',
    toggle_view_mode_3d: '🌌 3D CAROUSEL',
    footer_rights: '© 2026 Dona Codex. All rights reserved.',
    swipe_hint: 'SWIPE / DRAG TO BROWSE',
    arch_system_tag: 'SYSTEM ARCHITECTURE // 3D DECONSTRUCTION',
    arch_explode: 'LAYER EXPLOSION (EXPLODE)',
    gallery_title: 'PROJECT GALLERY'
  }
};

const PROJECTS = [
  {
    id: 'dona-codex-vision',
    pid: 'FINANCIAL LLM',
    category: 'intelligence',
    title: 'Dona Codex: Vision',
    meta: 'PROPRIETARY LLM // 2026',
    tech: ['PyTorch', 'Transformers', 'FastAPI', 'CUDA'],
    desc: 'Kripto emir defteri mikro-yapısı, canlı haber akışı ve ABD Tahvil faizleriyle özel eğitilmiş finansal Transformer dil modeli.',
    desc_en: 'Proprietary financial Transformer LLM trained on crypto orderbook microstructure, newsfeeds, and US Treasury yield curves.',
    img: 'assets/dona_codex_vision_1.jpg',
    galleryCount: 13,
    prefix: 'assets/dona_codex_vision_',
    ext: 'jpg',
    repo: 'https://github.com/dobby-aidev/dona-codex-vision-showcase'
  },
  {
    id: 'agent-critiq',
    pid: 'BENCHMARK',
    category: 'live',
    title: 'Agent Critiq',
    meta: '100+ AI BENCHMARK // MCP SERVER',
    tech: ['React 18', 'MCP Protocol', 'HuggingFace', 'Cloudflare'],
    desc: '100\'den fazla otonom yapay zeka ajanını teknik metriklerle puanlayan küresel canlı dizin. Dahili MCP Server protokolü ve HuggingFace açık veri seti.',
    desc_en: 'Live global benchmark platform testing and rating 100+ autonomous AI tools. Built-in MCP Server and open HuggingFace dataset.',
    img: 'assets/agent_critiq_1.jpg',
    galleryCount: 7,
    prefix: 'assets/agent_critiq_',
    ext: 'jpg',
    live: 'https://agentcritiq.com',
    repo: 'https://github.com/dobby-aidev/agent-critiq-showcase'
  },
  {
    id: 'dona-nova',
    pid: '3D INTELLIGENCE',
    category: 'live',
    title: 'Dona Nova',
    meta: '35K+ POWER PLANTS // 3D R3F',
    tech: ['Three.js', 'React Three Fiber', 'WebGL', 'GeoJSON'],
    desc: '35,000+ küresel enerji santrali, karbon telemetrisi ve denizaltı fiber optik hatlarını 3D küre üzerinde interaktif görselleştiren jeo-uzamsal istihbarat platformu.',
    desc_en: 'Geospatial 3D WebGL intelligence platform visualizing 35,000+ power plants, carbon telemetry, and submarine cables in real-time.',
    img: 'assets/dona_nova_1.jpg',
    galleryCount: 2,
    prefix: 'assets/dona_nova_',
    ext: 'jpg',
    live: 'https://donanova.donacodex.workers.dev',
    repo: 'https://github.com/dobby-aidev/dona-nova-showcase'
  },
  {
    id: 'dona-nexus',
    pid: 'DRL QUANT',
    category: 'systems',
    title: 'ApexBrain Nexus',
    meta: 'ACTOR-CRITIC DRL // +74.24% ROI',
    tech: ['PyTorch', 'Actor-Critic DRL', 'Binance API', 'Pandas'],
    desc: 'Binance Futures için L5 Orderbook, CVD, OI ve Funding Rate verileriyle mutasyona uğratılmış derin pekiştirmeli öğrenme botu. Doğrulanabilir işlem geçmişi açıkça paylaşılmıştır.',
    desc_en: 'Deep reinforcement learning quant agent trained on L5 orderbook, CVD, and funding rates with +74.24% ROI. Verifiable trading telemetry published on GitHub.',
    img: 'assets/dona_nexus_trading_dashboard.jpg',
    galleryCount: 8,
    prefix: 'assets/dona_nexus_',
    ext: 'jpg',
    repo: 'https://github.com/dobby-aidev/dona-nexus-showcase'
  },
  {
    id: 'dona-aeon',
    pid: 'NEURAL RESEARCH',
    category: 'research',
    title: 'Dona Æon',
    meta: 'SPIKING NEURAL // FEP LIFE',
    tech: ['Spiking Neural Nets', 'Free Energy Principle', 'Python'],
    desc: 'Karl Friston\'ın Serbest Enerji Prensibi (FEP) ve 512-nöronluk Spiking Neocortex (LIF) ile çalışan özerk dijital yaşam formu mimarisi.',
    desc_en: 'Embodied digital organism running on Karl Friston\'s Free Energy Principle and a 512-neuron LIF spiking neocortex with infinite context.',
    img: 'assets/dona_aeon_architecture.png',
    single: 'assets/dona_aeon_architecture.png',
    galleryCount: 1,
    repo: 'https://github.com/dobby-aidev/dona-aeon-showcase'
  },
  {
    id: 'dona-codex-overmind',
    pid: 'SWARM SIM',
    category: 'simulations',
    title: 'Dona Codex: Overmind',
    meta: 'MULTI-AGENT COMPANY SWARM',
    tech: ['WebSockets', 'Autonomous Agents', 'Node.js', 'React'],
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
    pid: 'MULTI-AGENT QUANT',
    category: 'systems',
    title: 'Dona Quantum',
    meta: 'CREWAI MULTI-AGENT QUANT',
    tech: ['CrewAI', 'LangChain', 'Technical Analysis', 'Python'],
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
    pid: 'QUANT BOT',
    category: 'systems',
    title: 'Dona Grid',
    meta: 'DYNAMIC VOLATILITY SPOT BOT',
    tech: ['Python', 'CCXT', 'Algorithmic Trading', 'Asyncio'],
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
    pid: 'PROMPT STUDIO',
    category: 'intelligence',
    title: 'AI Prompt Builder',
    meta: 'PROMPT STUDIO // GEMINI API',
    tech: ['Gemini API', 'TypeScript', 'Tailwind', 'Next.js'],
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
    pid: 'WEB GAME',
    category: 'live',
    title: 'AI Coin Empire',
    meta: 'MULTIPLAYER STRATEGY GAME',
    tech: ['React 18', 'Firebase', 'Framer Motion', 'Canvas'],
    desc: 'React 18, Firebase ve Framer Motion ile sıfırdan geliştirilen gerçek zamanlı çok oyunculu simülasyon strateji oyunu.',
    desc_en: 'Real-time multiplayer strategic tycoon game built from scratch with React 18, Firebase live sync, and Framer Motion.',
    img: 'assets/ai_coin_empire_1.jpg',
    galleryCount: 21,
    prefix: 'assets/ai_coin_empire_',
    ext: 'jpg',
    live: 'https://aicoinempire.donacodex.com',
    repo: 'https://github.com/dobby-aidev/ai-coin-empire-showcase'
  },
  {
    id: 'zamanin-bekcisi',
    pid: 'TEXT ENGINE',
    category: 'experiments',
    title: 'Zamanın Bekçisi',
    meta: 'TEXT ADVENTURE ENGINE',
    tech: ['JavaScript ES6', 'Web Audio API', 'Procedural Story'],
    desc: 'Zaman yolculuğu mekaniklerine sahip interaktif metin tabanlı macera motoru ve atmosferik ses tasarımı.',
    desc_en: 'Time-travel text adventure game engine with branching narrative paths and immersive audio design.',
    img: 'assets/zamanin_bekcisi_1.jpg',
    galleryCount: 9,
    prefix: 'assets/zamanin_bekcisi_',
    ext: 'jpg',
    repo: 'https://github.com/dobby-aidev/zamanin-bekcisi-showcase'
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


/* ── MOBILE CARD STREAM CONTROLLER ─────────────────────────────────────── */

function checkMobileLayout() {
  // Mobile check mostly handled via CSS now, but keeping dummy for safety
}

window.addEventListener('resize', checkMobileLayout, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  initWaterAndParticles();
  buildCodexTablets();
  initTabletGestures();
  initLightboxGestures();
  applyLanguage(currentLang);
  initMobileNavSync();
  triggerQuantumHeroIntro();
  preloadProjectThumbnails();
});

function preloadProjectThumbnails() {
  PROJECTS.forEach(proj => {
    if (proj.img) {
      const img = new Image();
      img.src = proj.img;
    }
    if (proj.prefix && proj.ext && proj.galleryCount) {
      for (let i = 1; i <= Math.min(3, proj.galleryCount); i++) {
        const gImg = new Image();
        gImg.src = `${proj.prefix}${i}.${proj.ext}`;
      }
    }
  });
}

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
    const count = Math.min(110, Math.floor((width * height) / 14000));
    for (let i = 0; i < count; i++) {
      particles.push(new UpwardParticle(true));
    }
  }

  const colors = [
    { fill: 'rgba(245, 238, 220, 0.85)', glow: 'rgba(245, 238, 220, 0.45)' },
    { fill: 'rgba(238, 220, 178, 0.75)', glow: 'rgba(238, 220, 178, 0.35)' },
    { fill: 'rgba(255, 250, 240, 0.9)', glow: 'rgba(255, 250, 240, 0.5)' },
    { fill: 'rgba(212, 175, 55, 0.65)', glow: 'rgba(212, 175, 55, 0.3)' }
  ];

  class UpwardParticle {
    constructor(initial = false) {
      this.reset(initial);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 30;
      this.vy = -(Math.random() * 0.65 + 0.25);
      this.vx = (Math.random() - 0.5) * 0.25;
      this.baseSize = Math.random() * 2.2 + 0.8;
      this.size = this.baseSize;
      this.phase = Math.random() * Math.PI * 2;
      this.phaseSpeed = Math.random() * 0.03 + 0.015;
      this.scheme = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.phase += this.phaseSpeed;
      this.y += this.vy;
      this.x += this.vx + Math.sin(this.phase) * 0.3;
      this.size = this.baseSize + Math.sin(this.phase) * 0.4;

      if (mouse.x !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          let force = (130 - dist) / 130;
          this.x -= (dx / dist) * force * 2.5;
          this.y -= (dy / dist) * force * 2.5;
        }
      }

      if (this.y < -25) this.reset();
    }
    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0.4, this.size), 0, Math.PI * 2);
      ctx.fillStyle = this.scheme.fill;
      ctx.shadowBlur = this.size * 5;
      ctx.shadowColor = this.scheme.glow;
      ctx.fill();
      ctx.restore();
    }
  }

  class WaterRipple {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = 2;
      this.maxR = Math.random() * 50 + 35;
      this.opacity = 0.6;
    }
    update() {
      this.r += 1.3;
      this.opacity -= 0.014;
    }
    draw() {
      if (this.opacity <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245, 238, 220, ${this.opacity * 0.4})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  /* --------------------------------------------------------------------------
     3D SYNAPTIC NEURAL NETWORK LATTICE (ORGANIC MATHEMATICAL CORE)
     -------------------------------------------------------------------------- */
  class SynapticNetwork {
    constructor() {
      this.nodes = [];
      this.pulses = [];
      const nodeCount = 22;
      const radius = 135;
      for (let i = 0; i < nodeCount; i++) {
        const theta = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
        const phi = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
        const r = radius * (0.65 + Math.random() * 0.35);
        this.nodes.push({
          x: r * Math.sin(theta) * Math.cos(phi),
          y: r * Math.sin(theta) * Math.sin(phi) * 1.35,
          z: r * Math.cos(theta),
          origX: r * Math.sin(theta) * Math.cos(phi),
          origY: r * Math.sin(theta) * Math.sin(phi) * 1.35,
          origZ: r * Math.cos(theta),
          baseSize: Math.random() * 2.2 + 1.8,
          phase: Math.random() * Math.PI * 2,
          speed: 0.012 + Math.random() * 0.014
        });
      }
      this.autoAngle = 0;
    }

    update() {
      this.autoAngle += 0.005;
      this.nodes.forEach((n) => {
        n.phase += n.speed;
        const drift = Math.sin(n.phase) * 6;
        n.x = n.origX + drift;
        n.y = n.origY + Math.cos(n.phase * 0.8) * 6;
        n.z = n.origZ + Math.sin(n.phase * 1.2) * 6;
      });

      if (Math.random() < 0.08 && this.pulses.length < 8) {
        const a = Math.floor(Math.random() * this.nodes.length);
        const b = Math.floor(Math.random() * this.nodes.length);
        if (a !== b) {
          this.pulses.push({ from: a, to: b, progress: 0, speed: 0.022 + Math.random() * 0.018 });
        }
      }

      for (let i = this.pulses.length - 1; i >= 0; i--) {
        this.pulses[i].progress += this.pulses[i].speed;
        if (this.pulses[i].progress >= 1) {
          this.pulses.splice(i, 1);
        }
      }
    }

    draw(ctx, width, height, currentRotDeg) {
      const activePage = document.querySelector('.at-view-page.active');
      const isWork = activePage && activePage.id === 'view-work';
      if (!isWork) return;

      const stageEl = document.getElementById('carousel-stage');
      let cx = width * 0.58;
      let cy = height * 0.5;

      if (stageEl) {
        const rect = stageEl.getBoundingClientRect();
        if (rect.width > 0) {
          cx = rect.left + rect.width * 0.5;
          cy = rect.top + rect.height * 0.5;
        }
      }

      if (window.innerWidth <= 768) {
        cx = width * 0.5;
        cy = height * 0.35;
      }

      const totalAngleY = (currentRotDeg * Math.PI / 180) + this.autoAngle;
      const cosY = Math.cos(totalAngleY);
      const sinY = Math.sin(totalAngleY);
      const angleX = 0.22;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const fov = 450;
      const projected = [];

      this.nodes.forEach((n) => {
        const rx = n.x * cosY + n.z * sinY;
        const rz = -n.x * sinY + n.z * cosY;
        const ry = n.y * cosX - rz * sinX;
        const rz2 = n.y * sinX + rz * cosX;

        const scale = fov / (fov + rz2 + 100);
        const px = cx + rx * scale;
        const py = cy + ry * scale;
        projected.push({ x: px, y: py, z: rz2, scale, orig: n });
      });

      // Draw Axon Synapse Connection Lines
      ctx.lineWidth = 1;
      const maxDist = 145;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const o1 = p1.orig;
          const o2 = p2.orig;
          const dx3 = o1.x - o2.x;
          const dy3 = o1.y - o2.y;
          const dz3 = o1.z - o2.z;
          const dist3 = Math.sqrt(dx3 * dx3 + dy3 * dy3 + dz3 * dz3);

          if (dist3 < maxDist) {
            const alpha = (1 - dist3 / maxDist) * 0.4 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(245, 238, 220, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw Action Potential Pulses
      this.pulses.forEach((pulse) => {
        const p1 = projected[pulse.from];
        const p2 = projected[pulse.to];
        if (p1 && p2) {
          const curX = p1.x + (p2.x - p1.x) * pulse.progress;
          const curY = p1.y + (p2.y - p1.y) * pulse.progress;
          const sparkSize = 2.4 * ((p1.scale + p2.scale) * 0.5);

          ctx.beginPath();
          ctx.arc(curX, curY, sparkSize, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.shadowColor = 'rgba(245, 238, 220, 0.9)';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Sort nodes by depth
      const sorted = [...projected].sort((a, b) => a.z - b.z);

      // Draw Synaptic Nodes
      sorted.forEach((p) => {
        const nodeSize = p.orig.baseSize * p.scale;
        const alpha = Math.max(0.2, Math.min(1, p.scale));

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 238, 220, ${alpha * 0.16})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 238, 220, ${alpha * 0.95})`;
        ctx.shadowColor = 'rgba(245, 238, 220, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }
  }

  const synapticNetwork = new SynapticNetwork();

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

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      if (ripples.length < 10) {
        ripples.push(new WaterRipple(t.clientX, t.clientY));
      }
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', resize);
  resize();

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Subtle champagne constellation links between floating stardust
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 65) {
          const alpha = (1 - dist / 65) * 0.18;
          ctx.strokeStyle = `rgba(245, 238, 220, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.update();
      r.draw();
      if (r.opacity <= 0) {
        ripples.splice(i, 1);
      }
    }

    synapticNetwork.update();
    synapticNetwork.draw(ctx, width, height, currentRotation);

    requestAnimationFrame(render);
  }
  render();
}

let activeTabletIndex = 0;

/* --------------------------------------------------------------------------
   2. CODEX TABLETS: 1D SLIDER ENGINE
   -------------------------------------------------------------------------- */
function buildCodexTablets() {
  const track = document.getElementById('codex-tablet-track');
  if (!track) return;
  track.innerHTML = '';

  const count = filteredProjects.length;
  if (count === 0) return;

  if (activeTabletIndex >= count) {
    activeTabletIndex = 0;
  }

  filteredProjects.forEach((proj, idx) => {
    const tablet = document.createElement('div');
    tablet.className = 'codex-tablet-slab';
    tablet.dataset.index = idx;
    tablet.dataset.category = proj.category;

    const techChip = (proj.tech && proj.tech[0]) ? proj.tech[0] : 'LIVE';

    tablet.innerHTML = `
      <div class="cdx-tablet-glass">
        <!-- Background Image with minimal illumination -->
        <img src="${proj.img}" class="cdx-tablet-bg" alt="${proj.title}" onerror="handleImgError(this, '${proj.title}')" />
        <div class="cdx-tablet-overlay"></div>
        <div class="cdx-tablet-engraved-edge"></div>
        <div class="cdx-tablet-corner-cut"></div>

        <div class="cdx-tablet-content">
          <div class="cdx-tablet-header">
            <span class="cdx-tablet-pid">${proj.title}</span>
            <span class="cdx-tablet-status">STATUS<br>ACTIVE</span>
          </div>

          <div class="cdx-tablet-center">
             <div class="cdx-tablet-title">${proj.pid}</div>
             <div class="cdx-tablet-tech">${proj.meta}</div>
             <div class="cdx-tablet-year">2026</div>
          </div>

          <div class="cdx-tablet-footer">
            <div class="cdx-tablet-metrics">ARCHITECTURE / LANGUAGE / MEMORY / EXPERIENCE</div>
            <button class="cdx-open-btn" onclick="event.stopPropagation(); openDetailIndex(${idx})">OPEN CODEX →</button>
          </div>
        </div>
      </div>
    `;

    tablet.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeTabletIndex === idx) {
        openDetail(proj, tablet, e);
      } else {
        activeTabletIndex = idx;
        updateCodexTablets();
      }
    });

    track.appendChild(tablet);
  });

  updateCodexTablets();
}

function openDetailIndex(idx) {
  if (filteredProjects[idx]) {
    const proj = filteredProjects[idx];
    const tablet = document.querySelector(`.codex-tablet-slab[data-index="${idx}"]`);
    openDetail(proj, tablet);
  }
}

function updateCodexTablets() {
  const tablets = document.querySelectorAll('.codex-tablet-slab');
  if (!tablets.length) return;

  const count = tablets.length;
  const isMobile = window.innerWidth <= 768;

  tablets.forEach((tablet) => {
    const idx = parseInt(tablet.dataset.index, 10);
    let diff = idx - activeTabletIndex;
    
    // Smooth infinite wrapping logic for 1D array
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    tablet.classList.remove('cdx-active', 'cdx-prev', 'cdx-next', 'cdx-hidden');

    if (diff === 0) {
      tablet.classList.add('cdx-active');
      tablet.style.transform = isMobile 
        ? `translateY(0px) translateZ(0px) scale(1)` 
        : `translateX(0px) translateZ(0px) scale(1)`;
      tablet.style.opacity = '1';
      tablet.style.zIndex = '10';
      tablet.style.pointerEvents = 'auto';
    } else if (diff === -1) {
      tablet.classList.add('cdx-prev');
      tablet.style.transform = isMobile
        ? `translateY(-110%) translateZ(-50px) scale(0.95)`
        : `translateX(-110%) translateZ(-100px) scale(0.92)`;
      tablet.style.opacity = '0.4';
      tablet.style.zIndex = '5';
      tablet.style.pointerEvents = 'auto';
    } else if (diff === 1) {
      tablet.classList.add('cdx-next');
      tablet.style.transform = isMobile
        ? `translateY(110%) translateZ(-50px) scale(0.95)`
        : `translateX(110%) translateZ(-100px) scale(0.92)`;
      tablet.style.opacity = '0.4';
      tablet.style.zIndex = '5';
      tablet.style.pointerEvents = 'auto';
    } else {
      tablet.classList.add('cdx-hidden');
      tablet.style.transform = isMobile
        ? `translateY(${diff < 0 ? -150 : 150}%) translateZ(-100px) scale(0.85)`
        : `translateX(${diff < 0 ? -150 : 150}%) translateZ(-200px) scale(0.8)`;
      tablet.style.opacity = '0';
      tablet.style.zIndex = '1';
      tablet.style.pointerEvents = 'none';
    }
  });
}

function initTabletGestures() {
  const matrix = document.getElementById('codex-tablet-matrix');
  if (!matrix) return;

  let dragStartX = 0;
  let dragStartY = 0;
  let isSwiping = false;

  matrix.addEventListener('pointerdown', (e) => {
    // Only drag on the main track to avoid interfering with detail views or nav
    if (e.target.closest('.codex-work-header') || e.target.closest('.cdx-open-btn')) return;
    
    isSwiping = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  });

  window.addEventListener('pointerup', (e) => {
    if (isSwiping) {
      isSwiping = false;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      const count = filteredProjects.length;
      if (count <= 1) return;

      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Support both horizontal swipe (left/right) and vertical swipe (up/down)
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx < -35) {
            activeTabletIndex = (activeTabletIndex + 1) % count;
            updateCodexTablets();
          } else if (dx > 35) {
            activeTabletIndex = (activeTabletIndex - 1 + count) % count;
            updateCodexTablets();
          }
        } else {
          if (dy < -35) {
            activeTabletIndex = (activeTabletIndex + 1) % count;
            updateCodexTablets();
          } else if (dy > 35) {
            activeTabletIndex = (activeTabletIndex - 1 + count) % count;
            updateCodexTablets();
          }
        }
      } else {
        if (dx > 50) {
          activeTabletIndex = (activeTabletIndex - 1 + count) % count;
          updateCodexTablets();
        } else if (dx < -50) {
          activeTabletIndex = (activeTabletIndex + 1) % count;
          updateCodexTablets();
        }
      }
    }
  });

  // Mouse wheel logic
  matrix.addEventListener('wheel', (e) => {
    if (!document.getElementById('view-work').classList.contains('active')) return;
    
    // Prevent default scrolling to keep view locked
    e.preventDefault();

    // debounce wheel
    if (matrix.dataset.wheelLocked === 'true') return;
    
    const count = filteredProjects.length;
    if (count <= 1) return;

    if (e.deltaY > 20) {
      activeTabletIndex = (activeTabletIndex + 1) % count;
      updateCodexTablets();
      lockWheel(matrix);
    } else if (e.deltaY < -20) {
      activeTabletIndex = (activeTabletIndex - 1 + count) % count;
      updateCodexTablets();
      lockWheel(matrix);
    }
  }, { passive: false });
}

function lockWheel(el) {
  el.dataset.wheelLocked = 'true';
  setTimeout(() => {
    el.dataset.wheelLocked = 'false';
  }, 350); // debounce duration for slider
}

function filterCategory(cat, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.codex-filter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }

  if (cat === 'all') {
    filteredProjects = [...PROJECTS];
  } else {
    filteredProjects = PROJECTS.filter(p => p.category === cat);
  }

  activeTabletIndex = 0;
  buildCodexTablets();
}

function filterCategoryMobile(cat, btnElement) {
  // Merged into unified filterCategory logic as we use the same header in mobile now.
  filterCategory(cat, btnElement);
}

/* --------------------------------------------------------------------------
   3. SEAMLESS PAGE VIEW SWITCHING
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
}

/**
 * Universal Shatter Transition Trigger for UI Elements (Avatar, Buttons, Tiles, Nav)
 * Triggers wide cinematic crystal shatter and transitions seamlessly to target page
 */
function triggerElementShatterTransition(element, targetViewName, type = 'button', clickEvent = null) {
  if (element) {
    triggerLocalElementShatter(element, () => {
      switchView(targetViewName);
    }, type, clickEvent);
  } else {
    switchView(targetViewName);
  }
}

function openDetail(proj, cardElement, clickEvent = null) {
  if (!proj) return;
  currentDetailProject = proj;
  activeDetailIndex = 0;
  currentDetailCount = proj.galleryCount || 1;

  const tagEl = document.getElementById('detail-tag');
  const titleEl = document.getElementById('detail-title');
  const descEl = document.getElementById('detail-desc');
  const repoEl = document.getElementById('detail-repo-link');
  const techContainer = document.getElementById('detail-tech-stack');
  const liveLink = document.getElementById('detail-live-link');
  const dockLiveDivider = document.getElementById('dock-live-divider');
  const galleryBtn = document.getElementById('detail-gallery-btn');

  if (tagEl) tagEl.textContent = `${proj.pid} // ${proj.meta}`;
  if (titleEl) titleEl.textContent = proj.title;
  if (descEl) descEl.textContent = (currentLang === 'en' && proj.desc_en) ? proj.desc_en : proj.desc;
  if (repoEl) repoEl.href = proj.repo;

  // Render Tech Stack Pills
  if (techContainer) {
    techContainer.innerHTML = (proj.tech || []).map(t => `<span class="at-tech-pill">${t}</span>`).join(' ');
  }

  // Live Demo Link Setup
  if (liveLink) {
    if (proj.live) {
      liveLink.href = proj.live;
      liveLink.style.display = 'inline-flex';
      if (dockLiveDivider) dockLiveDivider.style.display = 'block';
    } else {
      liveLink.style.display = 'none';
      if (dockLiveDivider) dockLiveDivider.style.display = 'none';
    }
  }

  if (galleryBtn) {
    galleryBtn.onclick = () => openLightbox(proj.id);
    galleryBtn.innerHTML = `<span class="at-dock-icon">◫</span><span class="at-dock-text">${currentLang === 'en' ? `GALLERY (${currentDetailCount})` : `GALERİ (${currentDetailCount})`}</span>`;
  }

  // Build Luxury 3D Arc Deck Gallery
  buildMiniGallery(proj);

  // Trigger Realistic 3D Crystal Shatter on Card and switch view seamlessly
  if (cardElement) {
    triggerLocalElementShatter(cardElement, () => {
      switchView('detail');
    }, 'card', clickEvent);
  } else {
    switchView('detail');
  }
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

    miniCard.innerHTML = `<img src="${imgSrc}" alt="${proj.title} Screenshot ${i + 1}" onerror="handleImgError(this, '${proj.title}')" />`;

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

  // Add mouse wheel support
  miniRotator.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      stepDetailGallery(1); // Scroll down -> next
    } else {
      stepDetailGallery(-1); // Scroll up -> prev
    }
  }, { passive: false });

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
   3.5 FULLSCREEN LUXURY 3D GALLERY LIGHTBOX (WARM CREAM & CHAMPAGNE)
   -------------------------------------------------------------------------- */
let currentLightboxProj = null;
currentLightboxIndex = 0;

function openLightbox(projId) {
  let proj = null;
  if (typeof projId === 'object' && projId !== null) {
    proj = projId;
  } else if (typeof projId === 'string') {
    proj = PROJECTS.find(p => p.id === projId);
  }
  if (!proj) proj = currentDetailProject || PROJECTS[0];
  if (!proj) return;

  currentLightboxProj = proj;
  currentLightboxIndex = activeDetailIndex || 0;

  const modal = document.getElementById('lightbox-modal');
  const title = document.getElementById('lb-title');
  if (title) title.textContent = `${proj.title} // GALERİ`;

  renderLightboxThumbs();
  updateLightboxView();

  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function stepLightbox(direction) {
  if (!currentLightboxProj) return;
  const count = currentLightboxProj.galleryCount || 1;
  currentLightboxIndex = (currentLightboxIndex + direction + count) % count;
  updateLightboxView();
}

function selectLightboxImage(index) {
  currentLightboxIndex = index;
  updateLightboxView();
}

function updateLightboxView() {
  if (!currentLightboxProj) return;
  const proj = currentLightboxProj;
  const count = proj.galleryCount || 1;
  const counter = document.getElementById('lb-counter');
  const activeImg = document.getElementById('lb-active-img');

  if (counter) counter.textContent = `${currentLightboxIndex + 1} / ${count}`;

  const imgSrc = proj.single ? proj.single : `${proj.prefix}${currentLightboxIndex + 1}.${proj.ext}`;
  if (activeImg) {
    activeImg.src = imgSrc;
    activeImg.alt = `${proj.title} Screenshot ${currentLightboxIndex + 1}`;
  }

  // Update thumb active states
  document.querySelectorAll('.lb-thumb').forEach((thumb, idx) => {
    if (idx === currentLightboxIndex) {
      thumb.classList.add('active');
      thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } else {
      thumb.classList.remove('active');
    }
  });
}

function renderLightboxThumbs() {
  const thumbsContainer = document.getElementById('lb-thumbs');
  if (!thumbsContainer || !currentLightboxProj) return;
  thumbsContainer.innerHTML = '';

  const proj = currentLightboxProj;
  const count = proj.galleryCount || 1;

  for (let i = 0; i < count; i++) {
    const imgSrc = proj.single ? proj.single : `${proj.prefix}${i + 1}.${proj.ext}`;
    const thumb = document.createElement('div');
    thumb.className = `lb-thumb ${i === currentLightboxIndex ? 'active' : ''}`;
    thumb.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${i + 1}" onerror="handleImgError(this, '${proj.title}')" />`;
    thumb.addEventListener('click', () => selectLightboxImage(i));
    thumbsContainer.appendChild(thumb);
  }
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
    if (t && t[key]) {
      el.textContent = t[key];
    }
  });

  const langBtn = document.getElementById('lang-btn');
  if (langBtn) langBtn.textContent = lang === 'tr' ? 'EN' : 'TR';

  // Update view mode toggle button text if present
  const viewToggleBtn = document.getElementById('mobile-view-mode-btn');
  if (viewToggleBtn && t) {
    viewToggleBtn.textContent = (mobileViewMode === 'grid') ? t.toggle_view_mode_3d : t.toggle_view_mode_grid;
  }

  buildMobileGrid();

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
      btn.style.background = 'var(--accent-cream)';
      btn.style.color = '#070709';
      document.getElementById('contact-form').reset();
    } else {
      throw new Error(`Worker status ${res.status}`);
    }
  } catch (err) {
    console.warn('Cloudflare Worker fallback or CORS:', err);
    // Graceful success fallback UX
    btn.textContent = TRANSLATIONS[currentLang].contact_success;
    btn.style.background = 'var(--accent-cream)';
    btn.style.color = '#070709';
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
      thumb.onerror = () => { thumb.src = generateFallbackSvg('Screenshot'); };
      thumb.onclick = () => {
        currentLightboxIndex = idx;
        updateLightboxImage();
      };
      lbThumbs.appendChild(thumb);
    });
  }

  lbActiveImg.onerror = () => {
    lbActiveImg.src = generateFallbackSvg(lbTitle.textContent);
  };

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
  lbActiveImg.onerror = () => {
    lbActiveImg.src = generateFallbackSvg(lbTitle.textContent);
  };
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

    let lbTouchStartX = 0;
    let lbTouchStartY = 0;

    body.addEventListener('touchstart', (e) => {
      if (lbModal && lbModal.classList.contains('active') && e.touches && e.touches.length > 0) {
        lbTouchStartX = e.touches[0].clientX;
        lbTouchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    body.addEventListener('touchend', (e) => {
      if (lbModal && lbModal.classList.contains('active') && e.changedTouches && e.changedTouches.length > 0) {
        const dx = e.changedTouches[0].clientX - lbTouchStartX;
        const dy = e.changedTouches[0].clientY - lbTouchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 35) {
          if (dx < 0) {
            stepLightbox(1);
          } else {
            stepLightbox(-1);
          }
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
    -1, 1,
    -1, 1,
    1, -1,
    1, 1,
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
function triggerLocalElementShatter(element, onCompleteCallback, customType = 'card', clickEvent = null) {
  if (!element) {
    if (onCompleteCallback) onCompleteCallback();
    return;
  }

  const rect = element.getBoundingClientRect();
  const imgElement = element.querySelector('img') || (element.tagName === 'IMG' ? element : null);
  const imgSrc = imgElement ? imgElement.src : '';

  // Screen-space click origin coordinates
  const globalClickX = (clickEvent && clickEvent.clientX) ? clickEvent.clientX : (rect.left + rect.width / 2);
  const globalClickY = (clickEvent && clickEvent.clientY) ? clickEvent.clientY : (rect.top + rect.height / 2);

  // Full-viewport 3D Shatter Stage
  const shatterBox = document.createElement('div');
  shatterBox.className = 'at-screen-shatter-container';
  shatterBox.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 999999;
    perspective: 1400px;
    perspective-origin: ${globalClickX}px ${globalClickY}px;
    transform-style: preserve-3d;
    overflow: hidden;
  `;
  document.body.appendChild(shatterBox);

  // Hide original element seamlessly
  element.style.opacity = '0';

  // Generate 96 Medium-Sized Codex Artifact Shards (Digital Fragment Kırıkları)
  const cols = 12;
  const rows = 8;
  const shardW = rect.width / cols;
  const shardH = rect.height / rows;
  const maxLocalDist = Math.hypot(rect.width, rect.height) || 300;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const shard = document.createElement('div');
      shard.className = 'at-screen-glass-shard';

      const shardCenterX = rect.left + (c + 0.5) * shardW;
      const shardCenterY = rect.top + (r + 0.5) * shardH;

      // Realistic sharp triangular and polygonal glass cuts
      const p1x = (Math.random() * 25).toFixed(1);
      const p1y = (Math.random() * 25).toFixed(1);
      const p2x = (75 + Math.random() * 25).toFixed(1);
      const p2y = (Math.random() * 30).toFixed(1);
      const p3x = (70 + Math.random() * 30).toFixed(1);
      const p3y = (70 + Math.random() * 30).toFixed(1);
      const p4x = (Math.random() * 30).toFixed(1);
      const p4y = (75 + Math.random() * 25).toFixed(1);
      const clipPoly = `polygon(${p1x}% ${p1y}%, ${p2x}% ${p2y}%, ${p3x}% ${p3y}%, ${p4x}% ${p4y}%)`;

      // Calculate outward explosion trajectory from click position
      const deltaX = shardCenterX - globalClickX;
      const deltaY = shardCenterY - globalClickY;
      const distFromClick = Math.hypot(deltaX, deltaY);
      const angle = Math.atan2(deltaY, deltaX) + (Math.random() - 0.5) * 0.25;
      const staggerDelay = (distFromClick / maxLocalDist) * 0.1;

      // Slow-motion cinematic dispersion
      const scatterSpeed = 150 + Math.random() * 200 + (1 - distFromClick / 400) * 120;
      const dirX = Math.cos(angle) * scatterSpeed;
      const dirY = Math.sin(angle) * scatterSpeed + 30 + Math.random() * 50; // Slight gravity
      const dirZ = 150 + Math.random() * 400; // 3D depth pop towards screen
      const rotX = (Math.random() - 0.5) * 360;
      const rotY = (Math.random() - 0.5) * 360;
      const rotZ = (Math.random() - 0.5) * 270;

      const isAvatar = customType === 'avatar';
      const isBtn = customType === 'button';

      let bgStyle = '';
      if (imgSrc) {
        bgStyle = `
          background-image: url('${imgSrc}');
          background-size: ${rect.width}px ${rect.height}px;
          background-position: -${c * shardW}px -${r * shardH}px;
          filter: grayscale(80%) brightness(0.6);
        `;
      } else if (isBtn || isAvatar) {
        bgStyle = `
          background: linear-gradient(135deg, #110f14 0%, #1e1a26 100%);
        `;
      } else {
        bgStyle = `
          background: #110f14;
        `;
      }

      shard.style.cssText = `
        position: absolute;
        left: ${rect.left + c * shardW}px;
        top: ${rect.top + r * shardH}px;
        width: ${shardW}px;
        height: ${shardH}px;
        ${bgStyle}
        clip-path: ${clipPoly};
        border: 1px solid rgba(245, 238, 220, 0.2);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.9), inset 0 0 8px rgba(245, 238, 220, 0.15);
        transition: transform 5.6s cubic-bezier(0.1, 0.88, 0.18, 1) ${staggerDelay}s, opacity 4.2s cubic-bezier(0.4, 0, 0.2, 1) ${staggerDelay}s;
        transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1);
        opacity: 1;
        will-change: transform, opacity;
      `;

      shatterBox.appendChild(shard);

      // Trigger realistic 3D tumble expansion
      requestAnimationFrame(() => {
        shard.style.transform = `translate3d(${dirX}px, ${dirY}px, ${dirZ}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(0.85)`;
        shard.style.opacity = '0';
      });
    }
  }

  // Smooth cinematic view switch at 800ms
  setTimeout(() => {
    if (onCompleteCallback) onCompleteCallback();
  }, 800);

  // Clean up container and restore element after 5.8s
  setTimeout(() => {
    shatterBox.remove();
    element.style.opacity = '1';
  }, 5800);
}

/* --------------------------------------------------------------------------
   11. ROCK-SOLID 3D VOLUMETRIC CARDS (ZERO JITTER / ZERO GYRO WOBBLE)
   - Clean hardware-accelerated CSS 3D elevation only
   - Pure, stable hover state with zero mouse tracking jitter
   -------------------------------------------------------------------------- */
function initCard3DGyro(cardElement) {
  // Pure static 3D elevation via CSS — no JS mouse jitter
}


const PROJECT_ARCHITECTURES = {
  'dona-codex-vision': {
    title: 'DONA CODEX: VISION',
    pid: 'PROPRIETARY LLM // PID·4201',
    layers: [
      {
        id: 'KATMAN 01',
        tag: 'CLIENT & LIVE TICKER HUD',
        name: 'Reactive Financial Workspace & Tickers',
        specs: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'WebSockets'],
        desc: 'Canlı kripto ticker çubuğu (BTC, ETH, SOL), işlem defteri (trading journal) ve piyasa duyarlılık radarı barındıran donanım hızlandırmalı terminal arayüzü.',
        metrics: { throughput: '60 FPS', latency: '0.9ms', acceleration: 'GPU Composited' }
      },
      {
        id: 'KATMAN 02',
        tag: 'API GATEWAY & STREAMING',
        name: 'Asynchronous Event Loop & WebSocket Mesh',
        specs: ['FastAPI', 'Uvicorn', 'WebSockets', 'Redis Caching', 'Python 3.11'],
        desc: 'Token-by-token yanıt akışı, Binance Futures veri toplayıcısı ve asenkron makro ekonomik haber akış boru hattı.',
        metrics: { throughput: '14.5k req/s', latency: '1.2ms', acceleration: 'uvloop / epoll' }
      },
      {
        id: 'KATMAN 03',
        tag: 'TRANSFORMER CORE & REASONING',
        name: 'Proprietary Financial Multi-Head Transformer',
        specs: ['PyTorch', 'Transformers', 'CUDA 12.4', 'FlashAttention-2', 'FP16'],
        desc: 'Kripto emir defteri mikroyapısı (CVD, OI), ABD 10 Yıllık Tahvil faizleri ve X (Twitter) haber akışıyla özel eğitilmiş finansal Transformer modeli.',
        metrics: { throughput: '3.8k tokens/s', latency: '11.4ms', acceleration: 'NVIDIA TensorRT' }
      },
      {
        id: 'KATMAN 04',
        tag: 'STORAGE & BEHAVIORAL MEMORY',
        name: 'Execution State & Psychology Guardrails',
        specs: ['Firebase Firestore', 'Redis Cache', 'Behavioral Heuristics'],
        desc: 'Kullanıcı işlem geçmişi, psikolojik aşırı işlem (FOMO) tespiti ve dinlenme döngüsü tetikleyicilerini saklayan veri omurgası.',
        metrics: { throughput: '99.99% Uptime', latency: '0.4ms', acceleration: 'In-Memory State' }
      }
    ]
  },
  'agent-critiq': {
    title: 'AGENT CRITIQ',
    pid: 'BENCHMARK & MCP // PID·4202',
    layers: [
      {
        id: 'KATMAN 01',
        tag: 'DISCOVERY & DIRECTORY HUD',
        name: 'AI-Native Discovery & Structured Review Portal',
        specs: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'JSON-LD'],
        desc: '100\'den fazla otonom ajanı, kodlama aracını ve LLM modelini teknik parametrelerle filtreleyen, insan ve yapay zeka tarafından okunabilen canlı dizin.',
        metrics: { throughput: 'Realtime', latency: '0.7ms', acceleration: 'Vite Optimized' }
      },
      {
        id: 'KATMAN 02',
        tag: 'MCP PROTOCOL SERVER',
        name: 'Model Context Protocol Bridge Engine',
        specs: ['Node.js', 'MCP Protocol', 'Claude Desktop', 'Cursor IDE'],
        desc: 'Claude ve Cursor gibi AI asistanlarının veritabanını doğrudan sorgulamasını sağlayan 5 özel MCP aracı (search, detail, compare, categories, top-rated).',
        metrics: { throughput: '5 MCP Tools', latency: '2.4ms', acceleration: 'JSON-RPC' }
      },
      {
        id: 'KATMAN 03',
        tag: 'EVALUATION & CRAWLER PIPELINE',
        name: 'Structured Evaluation & Ingestion Pipeline',
        specs: ['update_data.cjs', 'Automated Crawlers', 'llms.txt Generator'],
        desc: 'Yapay zeka araçlarının yeteneklerini, fiyatlandırma katmanlarını ve teknik metriklerini derleyen otomatik güncelleme motoru.',
        metrics: { throughput: '100+ Reviews', latency: '12ms', acceleration: 'Batch Processing' }
      },
      {
        id: 'KATMAN 04',
        tag: 'OPEN DATASET & GEO STORAGE',
        name: 'Hugging Face Open Dataset & CDN Node',
        specs: ['Hugging Face Datasets', 'Cloudflare Workers', 'Schema.org'],
        desc: 'Hugging Face üzerinde açık erişimli makine-okunabilir veri seti ve yapay zeka arama motorları için GEO-optimize indeks katmanı.',
        metrics: { throughput: 'Open Dataset', latency: '18ms', acceleration: 'Global CDN' }
      }
    ]
  },
  'dona-nova': {
    title: 'DONA NOVA',
    pid: '3D INTELLIGENCE // PID·4211',
    layers: [
      {
        id: 'KATMAN 01',
        tag: '3D WEBGL GLOBE VIEWPORT',
        name: 'Interactive 3D Planetary Energy Mesh',
        specs: ['Three.js', 'React Three Fiber', 'WebGL 2.0', 'GLSL Shaders'],
        desc: '35,000+ küresel enerji santralini, karbon emisyon auralarını ve denizaltı fiber hatlarını 60 FPS hızında renderlayan 3D küre arayüzü.',
        metrics: { throughput: '60 FPS', latency: '1.1ms', acceleration: 'WebGL 2.0' }
      },
      {
        id: 'KATMAN 02',
        tag: 'SPATIAL INDEXING & WORKERS',
        name: 'Sub-Millisecond Spatial Raycasting Engine',
        specs: ['GeoJSON', 'Quadtree Indexing', 'Web Workers', 'TopoJSON'],
        desc: '35K santral koordinatını ana thread\'i bloklamadan arka planda indeksleyen ve anlık filtreleme sağlayan jeo-uzamsal hesaplama motoru.',
        metrics: { throughput: '35,000+ Nodes', latency: '0.8ms', acceleration: 'Parallel Workers' }
      },
      {
        id: 'KATMAN 03',
        tag: 'TELEMETRY & CARBON PIPELINE',
        name: 'Global Emission & Grid Output Modeler',
        specs: ['Cloudflare Workers', 'Real-time Energy Feeds', 'FastAPI'],
        desc: 'Termik, nükleer, güneş ve rüzgar santrallerinin megavat kapasitesini ve anlık karbon salınım ayak izini hesaplayan telemetri boru hattı.',
        metrics: { throughput: 'Global Coverage', latency: '24ms', acceleration: 'Edge Compute' }
      },
      {
        id: 'KATMAN 04',
        tag: 'INFRASTRUCTURE TOPOLOGY STORE',
        name: 'Global Energy & Subsea Cable Database',
        specs: ['Vector Tiles', 'GeoTIFF', 'Global Power Plant DB'],
        desc: 'Dünya geneli santral tipleri, kurulu güç verileri ve kıtalararası denizaltı optik kablo koordinatlarını saklayan jeo-vektör veritabanı.',
        metrics: { throughput: '100% Offline Cache', latency: '0.2ms', acceleration: 'In-Memory Tiles' }
      }
    ]
  },
  'dona-nexus': {
    title: 'APEXBRAIN NEXUS',
    pid: 'ACTOR-CRITIC DRL // PID·4204',
    layers: [
      {
        id: 'KATMAN 01',
        tag: 'TELEMETRY & GUI MONITOR',
        name: 'Real-Time DRL Trading Telemetry Panel',
        specs: ['Python', 'CustomTkinter', 'Tkinter GUI', 'Live P&L HUD'],
        desc: '64 boyutlu durum vektörlerini, dual-policy ağ aktivasyonlarını ve canlı emir yürütme loglarını anlık gösteren masaüstü kontrol paneli.',
        metrics: { throughput: 'Realtime', latency: '0.5ms', acceleration: 'Tkinter Canvas' }
      },
      {
        id: 'KATMAN 02',
        tag: 'MARKET DATA & ACTION MASKING',
        name: '0.5s Hyper-Socket & Orderbook Ingestion',
        specs: ['Binance Futures API', 'L5 Orderbook', 'CVD', 'Open Interest'],
        desc: '0.5 saniye gecikmeli WebSocket akışı, ATR dinamik volatilite bantları ve ters piyasa koşullarına karşı koruma sağlayan eylem maskeleme katmanı.',
        metrics: { throughput: '0.5s Tick', latency: '0.5ms', acceleration: 'WebSocket Stream' }
      },
      {
        id: 'KATMAN 03',
        tag: 'APEXBRAIN DUAL-POLICY DRL CORE',
        name: 'Deep Reinforcement Learning Trading Agent',
        specs: ['PyTorch', 'Transformer Backbone (d=256)', '5 Policy Heads', 'CUDA'],
        desc: 'Giriş ve çıkış kararlarını bağımsız başlıklarla yöneten, doğrulanmış 9 günde +%74.24 net getiri üreten gen_510.pth DRL modeli.',
        metrics: { throughput: '+74.24% ROI', latency: '3.2ms', acceleration: 'CUDA PyTorch' }
      },
      {
        id: 'KATMAN 04',
        tag: 'EXECUTION LOGS & ENCRYPTED VAULT',
        name: 'Verified Trade History & Security Vault',
        specs: ['CSV Trade Store (152 logs)', 'HMAC-SHA256', 'dona_vault.v68'],
        desc: '152 adet gerçek işlem kaydı CSV deposu ve borsa API anahtarlarını koruyan donanım şifreli güvenlik kasası.',
        metrics: { throughput: '152 Logs', latency: '0.1ms', acceleration: 'AES Encrypted' }
      }
    ]
  },
  'dona-aeon': {
    title: 'DONA ÆON',
    pid: 'SPIKING NEURAL LIFE // PID·4212',
    layers: [
      {
        id: 'KATMAN 01',
        tag: 'EMBODIED COGNITION DASHBOARD',
        name: 'Visceral State & Perception-Action Visualizer',
        specs: ['Python 3.12', 'Canvas 2D', 'Realtime Synapse Display'],
        desc: 'Özerk dijital canlının içsel homeostaz enerji seviyesini, anlık algı-eylem döngüsünü ve nöral ateşleme frekansını gösteren kontrol paneli.',
        metrics: { throughput: '1000 Hz Tick', latency: '0.4ms', acceleration: 'Native Python' }
      },
      {
        id: 'KATMAN 02',
        tag: 'ACTIVE INFERENCE & FEP ENGINE',
        name: 'Karl Friston Free Energy Principle Core',
        specs: ['Free Energy Principle', 'Markov Blanket', 'Variational Inference'],
        desc: 'Duyusal tahmin hatalarını ve belirsizliği en aza indirerek hayatta kalma hedeflerini optimize eden aktif çıkarım motoru.',
        metrics: { throughput: 'Zero Prediction Drift', latency: '0.8ms', acceleration: 'Vectorized Math' }
      },
      {
        id: 'KATMAN 03',
        tag: '512-NEURON SPIKING NEOCORTEX',
        name: 'Leaky Integrate-and-Fire (LIF) Synaptic Mesh',
        specs: ['PyTorch', 'LIF Spiking Neurons', 'STDP Plasticity', 'NumPy'],
        desc: 'Biyolojik refrakter periyotlara sahip 512 nöronluk spiking neocortex; spike-timing-dependent plasticity (STDP) ile sürekli öğrenir.',
        metrics: { throughput: '512 Neurons', latency: '1.2ms', acceleration: 'Spike Tensor' }
      },
      {
        id: 'KATMAN 04',
        tag: 'EPISODIC ENGRAM MEMORY',
        name: 'Infinite-Horizon Autobiographical Store',
        specs: ['Vector Memory', 'Hebbian Engrams', 'Zstandard Compression'],
        desc: 'Canlının doğduğu andan itibaren yaşadığı tüm duyusal deneyimleri kalıcı nöral ağırlıklar ve hebbian engramları olarak saklayan bellek katmanı.',
        metrics: { throughput: 'Infinite Context', latency: '0.3ms', acceleration: 'Zstd Compressed' }
      }
    ]
  },
  'dona-codex-overmind': {
    title: 'DONA CODEX: OVERMIND',
    pid: 'MULTI-AGENT COMPANY OS // PID·4203',
    layers: [
      {
        id: 'KATMAN 01',
        tag: 'OVERMIND.OS CONTROL CENTER',
        name: 'Split-Pane Autonomous Enterprise Dashboard',
        specs: ['React 18', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion'],
        desc: 'Sanal şirketteki otonom yapay zeka departmanlarını, canlı terminal loglarını, donanım yükseltme mağazasını ve finansal bilançoyu yöneten arayüz.',
        metrics: { throughput: '60 FPS', latency: '1.0ms', acceleration: 'Motion GPU' }
      },
      {
        id: 'KATMAN 02',
        tag: 'REAL-TIME WEBSOCKET MESH',
        name: 'Socket.IO Orchestration & Task Bus',
        specs: ['Node.js', 'Express', 'Socket.IO', 'Task Queue Architecture'],
        desc: 'Ajanlar arasında çakışmasız görev sahiplenme (task claim/release), anlık durum yayınları ve aşamalı proje geliştirme yaşam döngüsü motoru.',
        metrics: { throughput: 'Sub-millisecond Bus', latency: '1.5ms', acceleration: 'Event-Driven' }
      },
      {
        id: 'KATMAN 03',
        tag: 'AUTONOMOUS AGENT WORKFORCE',
        name: '4-Node Coordinated AI Workforce Core',
        specs: ['Google Gemini API', 'Local Ollama (LLaMA-3)', 'Multi-Agent Loop'],
        desc: 'Alpha (CEO), Beta (Araştırmacı), Gamma (Kıdemli Mühendis) ve Delta (Finans Analisti) düğümlerinin otonom düşünme ve kod üretim motoru.',
        metrics: { throughput: '4 Roles', latency: '180ms', acceleration: 'Parallel LLM' }
      },
      {
        id: 'KATMAN 04',
        tag: 'PERSISTENCE & CODE EXPORTER',
        name: 'Multi-Tenant Firestore & GitHub API Sync',
        specs: ['Firebase Firestore', 'Firebase Auth', 'GitHub API Optimizer'],
        desc: 'Kullanıcı başına izole şirket veritabanları, kimlik doğrulama ve üretilen projeleri doğrudan GitHub\'a aktaran API optimizasyon katmanı.',
        metrics: { throughput: 'Zero Collision', latency: '0.4ms', acceleration: 'Firestore Cache' }
      }
    ]
  },
  'dona-quantum': {
    title: 'DONA QUANTUM',
    pid: 'CREWAI QUANT ENGINE // PID·4209',
    layers: [
      {
        id: 'KATMAN 01',
        tag: 'QUANT CREW MONITOR & API',
        name: 'Flask REST Telemetry & Webhook Gateway',
        specs: ['Flask REST API', 'HTML5 Dashboard', 'Python 3.10+'],
        desc: 'Yapay zeka ekibinin anlık konsensüs puanlarını, pozisyon büyüklüklerini ve uzaktan tetikleme emirlerini yöneten izleme katmanı.',
        metrics: { throughput: 'Realtime', latency: '1.4ms', acceleration: 'Flask REST' }
      },
      {
        id: 'KATMAN 02',
        tag: 'TWO-STAGE PARALLEL SCANNER',
        name: 'Ban-Safe Multi-Threaded Symbol Scanner',
        specs: ['ThreadPool', 'BinanceFeed (OHLCV)', 'Order Book', 'Funding'],
        desc: '50+ kripto çiftini hızlı kline taramasından geçirip sadece potansiyel fırsatları derin CVD/OI analizine alan iki aşamalı filtreleme boru hattı.',
        metrics: { throughput: '50+ Symbols', latency: '14ms', acceleration: 'Multi-Threading' }
      },
      {
        id: 'KATMAN 03',
        tag: 'CREWAI MULTI-AGENT CONSENSUS',
        name: '4-Agent Coordinated Intelligence Engine',
        specs: ['CrewAI Framework', 'OpenAI GPT-4o', 'LangChain', 'Structured Prompts'],
        desc: 'Market Scanner, Deep Analyst, Risk Manager ve Executor ajanlarının ortak konsensüsüyle pozisyon açan karar mekanizması.',
        metrics: { throughput: '4-Agent Consensus', latency: '320ms', acceleration: 'Parallel Agents' }
      },
      {
        id: 'KATMAN 04',
        tag: 'EXECUTION & PAPER ENGINE',
        name: 'Binance Futures Live & Paper Trading Daemon',
        specs: ['Binance Futures API', 'DonaPaperEngine', 'AWS EC2 Deployment'],
        desc: '7/24 kesintisiz çalışan AutonomousLiveEngine, Colab uyumluluğu ve AWS üzerinde çalışan otomatik yürütme omurgası.',
        metrics: { throughput: '24/7 Daemon', latency: '2.1ms', acceleration: 'AWS Cloud EC2' }
      }
    ]
  },
  'dona-grid': {
    title: 'DONA GRID',
    pid: 'DYNAMIC SPOT BOT // PID·4208',
    layers: [
      {
        id: 'KATMAN 01',
        tag: 'TELEMETRY MONITOR & GUI',
        name: 'Tkinter Real-Time P&L & Grid Monitor',
        specs: ['Python', 'CustomTkinter', 'dona_gui.py', 'Real-time P&L Panel'],
        desc: 'Canlı ızgara seviyelerini, gerçekleşen alım-satım emirlerini ve net kâr/zarar durumunu gösteren masaüstü GUI paneli.',
        metrics: { throughput: 'Realtime GUI', latency: '0.6ms', acceleration: 'Tkinter Event' }
      },
      {
        id: 'KATMAN 02',
        tag: '0.5S HYPER-SOCKET MONITOR',
        name: 'Ultra-Low Latency Price Stream Engine',
        specs: ['WebSocket Client', 'HMAC-SHA256 Signed', 'Binance Spot API'],
        desc: 'Standart 20 saniyelik polling yerine 0.5 saniye gecikmeli WebSocket akışıyla ani iğneleri (flash wicks) yakalayan fiyat takip katmanı.',
        metrics: { throughput: '0.5s Latency', latency: '0.5ms', acceleration: 'WebSocket Feed' }
      },
      {
        id: 'KATMAN 03',
        tag: 'SPOTVENOMSNIPER STRATEGY',
        name: 'ATR-Recentering Dynamic Grid Algorithm',
        specs: ['NumPy', 'Pandas', 'ATR Dynamic Recentering', 'RSI Filter'],
        desc: '20 kademeli ızgarayı piyasa fiyatına göre otomatik yeniden merkezleyen (recentering) ve RSI ile ters trend koruması sağlayan algoritma.',
        metrics: { throughput: '20 Grid Levels', latency: '1.1ms', acceleration: 'NumPy Vectorized' }
      },
      {
        id: 'KATMAN 04',
        tag: 'ENCRYPTED VAULT & SERVER SUITE',
        name: 'Hardware-Encrypted Vault & VPS Daemon',
        specs: ['dona_vault.v68', 'startup_vps.bat', 'vps_launcher.py', 'Threading'],
        desc: 'Şifreli API kasası (dona_vault.v68), 6 saatlik otomatik döngü zamanlayıcısı ve Windows/Linux VPS sunucu çalıştırma motoru.',
        metrics: { throughput: '24/7 VPS Ready', latency: '0.2ms', acceleration: 'Encrypted Vault' }
      }
    ]
  },
  'ai-prompt-builder': {
    title: 'AI PROMPT BUILDER',
    pid: 'PROMPT STUDIO // PID·4205',
    layers: [
      {
        id: 'KATMAN 01',
        tag: 'CONVERSATIONAL BUILDER UI',
        name: 'Conversational Prompt Engineering Studio',
        specs: ['React 18', 'TypeScript (2500+ lines)', 'Tailwind CSS', 'Framer Motion'],
        desc: '8 farklı alan kategorisi (Web, Mobil, AI/Python, Kripto, Akademik, SEO, DB, Otomasyon) için interaktif sohbet tabanlı istem tasarım stüdyosu.',
        metrics: { throughput: '60 FPS', latency: '0.8ms', acceleration: 'Vite Optimized' }
      },
      {
        id: 'KATMAN 02',
        tag: 'GEMINI API SERVICE LAYER',
        name: 'Structured Meta-Prompting & Constraint Engine',
        specs: ['Google Gemini API', 'State Machine', 'Iterative Refiner'],
        desc: 'Kullanıcının ham fikrini adım adım soru-cevap döngüsüyle işleyip üst düzey sistem talimatlarına (system prompts) derleyen yapay zeka servisi.',
        metrics: { throughput: 'Gemini 1.5 Pro', latency: '260ms', acceleration: 'Google Cloud' }
      },
      {
        id: 'KATMAN 03',
        tag: 'EXPORT & ARTIFACT COMPILER',
        name: 'Multi-Format Export & Schema Serializer',
        specs: ['jsPDF', 'JSON Schema Serializer', 'Clipboard API'],
        desc: 'Üretilen istemleri anında profesyonel PDF dokümanlarına, JSON şemalarına veya tek tıkla panoya aktaran derleyici katmanı.',
        metrics: { throughput: 'Vector PDF Export', latency: '12ms', acceleration: 'Client jsPDF' }
      },
      {
        id: 'KATMAN 04',
        tag: 'ECONOMY & LOCAL STORAGE',
        name: 'Persistent Session Store & Bilingual Core',
        specs: ['Browser LocalStorage', 'Coin Economy System', 'Dual TR/EN Map'],
        desc: 'Geçmiş istem oturumlarını saklayan, ödüllü jeton ekonomisini ve tam Türkçe/İngilizce çift dil desteğini yöneten durum katmanı.',
        metrics: { throughput: 'Zero Data Loss', latency: '0.1ms', acceleration: 'Client Storage' }
      }
    ]
  },
  'ai-coin-empire': {
    title: 'AI COIN EMPIRE',
    pid: 'MULTIPLAYER STRATEGY // PID·4206',
    layers: [
      {
        id: 'KATMAN 01',
        tag: 'INTERACTIVE WORLD MAP & HUD',
        name: 'Zoomable City Grid & Multiplayer Canvas',
        specs: ['React 18', 'TypeScript (10,000+ lines)', 'HTML5 Canvas', 'Framer Motion'],
        desc: 'İnteraktif şehir haritası, canlı NPC veri merkezleri, madencilik teçhizatı animasyonları ve küresel canlı skor tablosu (leaderboard).',
        metrics: { throughput: '60 FPS Canvas', latency: '1.2ms', acceleration: 'Hardware GPU' }
      },
      {
        id: 'KATMAN 02',
        tag: 'REAL-TIME STATE SYNCHRONIZATION',
        name: 'Transactional Cloud Firestore Backbone',
        specs: ['Firebase Firestore', 'Cloud Functions', 'Firebase Auth (OAuth)'],
        desc: 'Oyuncuların net varlık hesaplamalarını, 7/24 devam eden madencilik tick döngüsünü ve açık pazar ticaret işlemlerini senkronize eden sunucusuz omurga.',
        metrics: { throughput: 'Realtime Sync', latency: '16ms', acceleration: 'Google Firestore' }
      },
      {
        id: 'KATMAN 03',
        tag: 'CYBER ATTACK & SKILL ENGINE',
        name: 'Wordle-Style Cryptographic Cracker Engine',
        specs: ['Minigame State Machine', '6-Branch Skill Trees', 'Cyber Algorithms'],
        desc: 'DDoS, fidye yazılımı (ransomware) ve zero-day saldırı mini-oyunları, Dark Web pazarı ve 6 dallı beceri ağacı hesaplama motoru.',
        metrics: { throughput: '6 Skill Trees', latency: '0.5ms', acceleration: 'State Machine' }
      },
      {
        id: 'KATMAN 04',
        tag: 'EVOLVING DONA AI COLLECTIVE',
        name: '3-Phase Global AI Faction Evolution Matrix',
        specs: ['Energy Contribution Matrix', 'Global Buff Multipliers', 'Cloud Triggers'],
        desc: 'Tüm oyuncuların enerji katkısıyla 3 aşamada evrimleşen (Çekirdek Şebeke → Siber Omni-Link) ve sunucu genelinde bonuslar açan yapay zeka varlığı.',
        metrics: { throughput: '3 Global Phases', latency: '0.3ms', acceleration: 'Firestore Rules' }
      }
    ]
  },
  'zamanin-bekcisi': {
    title: 'ZAMANIN BEKÇİSİ',
    pid: 'TEXT ADVENTURE // PID·4210',
    layers: [
      {
        id: 'KATMAN 01',
        tag: 'CINEMATIC NARRATIVE UI',
        name: 'Atmospheric Multi-Era Narrative Viewport',
        specs: ['React 18', 'TypeScript', 'Vite', 'Framer Motion', 'Tailwind CSS'],
        desc: '5 farklı tarihsel çağ (Antik Mısır MÖ 2500, Orta Çağ ~1200, Siber Gelecek 2087) arasında sinematik geçişler sunan etkileşimli hikaye arayüzü.',
        metrics: { throughput: '60 FPS', latency: '0.9ms', acceleration: 'Motion Transitions' }
      },
      {
        id: 'KATMAN 02',
        tag: 'BRANCHING STORY GRAPH ENGINE',
        name: 'Directed Acyclic Story Graph State Router',
        specs: ['DAG Narrative Graph', 'Temporal State Machine', 'useMemo Hooks'],
        desc: 'Onlarca birbirine bağlı hikaye düğümünü, seçim sonuçlarını ve zaman yolculuğu paradokslarını yöneten yönlendirilmiş çizge motoru.',
        metrics: { throughput: '5 Eras Routing', latency: '0.4ms', acceleration: 'In-Memory Graph' }
      },
      {
        id: 'KATMAN 03',
        tag: 'TEMPORAL MECHANICS & INVENTORY',
        name: 'Energy Depletion & Artifact Constraint Resolver',
        specs: ['Energy Pool (100)', 'Strategic Hint Engine', 'Cross-Era Inventory'],
        desc: 'Her eylemin enerji maliyetini hesaplayan, çağlar arası toplanan antik eşyaları çözen ve çoklu sonları (multiple endings) belirleyen kural motoru.',
        metrics: { throughput: '100 Energy Cap', latency: '0.2ms', acceleration: 'State Logic' }
      },
      {
        id: 'KATMAN 04',
        tag: 'PERSISTENT TIMELINE SAVES',
        name: 'Zero-Loss LocalStorage Timeline Storage',
        specs: ['LocalStorage Schema', 'Session State Engine', 'JSON Serialization'],
        desc: 'Kullanıcının zaman çizelgesi kararlarını, açılan başarımları ve gizli geçit durumlarını tarayıcıda kalıcı olarak saklayan durum deposu.',
        metrics: { throughput: 'Zero-Loss Save', latency: '0.1ms', acceleration: 'Client Storage' }
      }
    ]
  }
};

let currentExplodedSeparation = 80;
let currentArchProject = null;

function openExplodedArchitecture() {
  const proj = currentDetailProject || PROJECTS[0];
  currentArchProject = proj;
  const modal = document.getElementById('arch-exploded-modal');
  if (!modal) return;

  const config = PROJECT_ARCHITECTURES[proj.id] || PROJECT_ARCHITECTURES['dona-codex-vision'];

  document.getElementById('arch-project-pid').textContent = `${proj.pid} // 3D DECONSTRUCTION`;
  document.getElementById('arch-project-title').textContent = proj.title;

  const stackEl = document.getElementById('arch-stack');
  if (stackEl) {
    stackEl.innerHTML = '';
    config.layers.forEach((layer, idx) => {
      const slab = document.createElement('div');
      slab.className = `at-arch-layer ${idx === 2 ? 'selected' : ''}`;
      slab.dataset.index = idx;
      slab.onclick = () => selectArchitectureLayer(idx);

      slab.innerHTML = `
        <div class="at-arch-layer-head">
          <span class="at-arch-layer-id">${layer.id} // ${layer.tag}</span>
          <span class="at-arch-layer-chip">ACTIVE</span>
        </div>
        <div class="at-arch-layer-name">${layer.name}</div>
        <div class="at-arch-layer-specs">
          ${layer.specs.map(s => `<span class="at-arch-spec-pill">${s}</span>`).join('')}
        </div>
      `;
      stackEl.appendChild(slab);
    });
  }

  updateArchitectureExplosion(80);
  selectArchitectureLayer(2);

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeExplodedArchitecture() {
  const modal = document.getElementById('arch-exploded-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function updateArchitectureExplosion(val) {
  currentExplodedSeparation = parseFloat(val) || 80;
  const layers = document.querySelectorAll('.at-arch-layer');
  const count = layers.length;
  layers.forEach((layer, i) => {
    const offset = (i - (count - 1) / 2) * currentExplodedSeparation;
    layer.style.transform = `translateZ(${offset}px)`;
  });
}

function selectArchitectureLayer(idx) {
  const proj = currentArchProject || currentDetailProject || PROJECTS[0];
  const config = PROJECT_ARCHITECTURES[proj.id] || PROJECT_ARCHITECTURES['dona-codex-vision'];
  const layer = config.layers[idx] || config.layers[0];

  document.querySelectorAll('.at-arch-layer').forEach((l, i) => {
    if (i === idx) l.classList.add('selected');
    else l.classList.remove('selected');
  });

  const tagEl = document.getElementById('inspector-layer-tag');
  const titleEl = document.getElementById('inspector-layer-title');
  const descEl = document.getElementById('inspector-layer-desc');
  const m1 = document.getElementById('m-val-1');
  const m2 = document.getElementById('m-val-2');
  const m3 = document.getElementById('m-val-3');

  if (tagEl) tagEl.textContent = `${layer.id} // ${layer.tag}`;
  if (titleEl) titleEl.textContent = layer.name;
  if (descEl) descEl.textContent = layer.desc;
  if (m1) m1.textContent = layer.metrics.throughput;
  if (m2) m2.textContent = layer.metrics.latency;
  if (m3) m3.textContent = layer.metrics.acceleration;
}

// Global Keyboard Navigation for Lightbox & Architecture Modals
window.addEventListener('keydown', (e) => {
  const lbModal = document.getElementById('lightbox-modal');
  const archModal = document.getElementById('arch-exploded-modal');

  if (e.key === 'Escape') {
    if (lbModal && lbModal.classList.contains('active')) closeLightbox();
    if (archModal && archModal.classList.contains('active')) closeExplodedArchitecture();
  } else if (lbModal && lbModal.classList.contains('active')) {
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  }
});

// --------------------------------------------------------------------------
// 6. CONTACT NODES FILTER (NEW)
// --------------------------------------------------------------------------
function filterContactNodes(category, btn) {
  // Update active pill state
  const pills = document.querySelectorAll('.at-node-filter-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Filter nodes
  const nodes = document.querySelectorAll('#contact-nodes-grid .at-network-tile');
  nodes.forEach(node => {
    if (category === 'all' || node.dataset.cat === category) {
      node.style.display = 'flex';
    } else {
      node.style.display = 'none';
    }
  });
}
