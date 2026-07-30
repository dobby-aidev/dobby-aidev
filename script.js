/* ═══════════════════════════════════════════════════════════════════
   NEURAL OS v2.0 — MAIN JAVASCRIPT ENGINE
   Dobby B Portfolio · dobby-aidev
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════════════════════════
// 0. GLOBALS & STATE
// ═══════════════════════════════════════════════════════════
const STATE = {
  lang: 'tr',
  bootDone: false,
  mouseX: 0,
  mouseY: 0,
  targetCursorX: 0,
  targetCursorY: 0,
  cursorX: 0,
  cursorY: 0,
};

// ═══════════════════════════════════════════════════════════
// 1. TRANSLATIONS
// ═══════════════════════════════════════════════════════════
const i18n = {
  tr: {
    sec_about_title:   'Mimariler & Odak',
    sec_projects_title: 'Geliştirilen Projeler',
    sec_stack_title:   'Teknoloji Yığını',
    sec_store_title:   'Whop Store & Veri Seti Merkezi',
    sec_contact_title: 'İletişime Geçin',
    hero_status:       'Otonom AI & Quant Sistemleri',
    hero_bio:          'Çoklu-ajan swarm\'ları, PyTorch derin pekiştirmeli öğrenme botları ve açık kaynaklı AI web platformları inşa ediyorum.',
    form_success:      '> Handshake başarıyla kuruldu. En kısa sürede dönüş yapılacak.',
    form_error:        '> HATA: Lütfen tüm alanları doldurun.',
    nav_about:         'SİSTEM',
    nav_projects:      'SÜREÇLER',
    nav_stack:         'MODÜLLER',
    nav_store:         'VERİ KASASI',
    nav_contact:       'BAĞLANTI',
    btn_store:         'STORE ↗'
  },
  en: {
    sec_about_title:   'Architectures & Focus',
    sec_projects_title: 'Featured Engineering Work',
    sec_stack_title:   'Technical Stack',
    sec_store_title:   'Whop Store & Datasets Hub',
    sec_contact_title: 'Get In Touch',
    hero_status:       'Autonomous AI & Quant Systems',
    hero_bio:          'Architecting multi-agent swarms, PyTorch deep reinforcement learning trading bots, and open-source AI web platforms.',
    form_success:      '> Handshake established successfully. Will respond shortly.',
    form_error:        '> ERROR: Please fill in all required fields.',
    nav_about:         'SYSTEM',
    nav_projects:      'PROCESSES',
    nav_stack:         'MODULES',
    nav_store:         'DATA VAULT',
    nav_contact:       'CONNECT',
    btn_store:         'STORE ↗'
  }
};

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang] && i18n[lang][key]) {
      // Keep number span intact for nav links
      const numSpan = el.querySelector('.nav-link-num');
      if (numSpan) {
        el.innerHTML = '';
        el.appendChild(numSpan);
        el.appendChild(document.createTextNode(i18n[lang][key]));
      } else {
        el.textContent = i18n[lang][key];
      }
    }
  });
  const heroStatus = document.getElementById('hero-status-text');
  if (heroStatus) heroStatus.textContent = i18n[lang].hero_status;
  const heroBio = document.getElementById('hero-bio');
  if (heroBio) heroBio.textContent = i18n[lang].hero_bio;
}

// ═══════════════════════════════════════════════════════════
// 2. BOOT SEQUENCE
// ═══════════════════════════════════════════════════════════
const BOOT_LINES = [
  { text: 'NEURAL OS v2.0 — DOBBY B // LAB', delay: 0,    color: 'white',   bold: true },
  { text: '────────────────────────────────────────────', delay: 150,  color: 'muted' },
  { text: 'BIOS: Neural Matrix v8.2.1 — OK', delay: 300 },
  { text: 'CPU: AI Cortex [8 Cores] .............. [OK]', delay: 500,  color: 'ok' },
  { text: 'MEM: Synaptic RAM 128TB ............... [OK]', delay: 700,  color: 'ok' },
  { text: 'GPU: WebGL 2.0 Accelerator ............ [OK]', delay: 900,  color: 'ok' },
  { text: '', delay: 1000 },
  { text: 'Loading consciousness matrix ........... [OK]', delay: 1200, color: 'ok' },
  { text: 'Calibrating synaptic pathways ......... [OK]', delay: 1450, color: 'ok' },
  { text: 'Establishing neural links .............. [OK]', delay: 1700, color: 'ok' },
  { text: 'Mounting /dev/quant_engine ............. [OK]', delay: 1950, color: 'ok' },
  { text: 'Starting AI agent swarm ................ [OK]', delay: 2200, color: 'ok' },
  { text: 'Deploying portfolio interface .......... [OK]', delay: 2450, color: 'ok' },
  { text: '', delay: 2600 },
  { text: '█ BOOT COMPLETE — WELCOME TO THE LAB', delay: 2750, color: 'cyan', bold: true },
  { text: 'Press any key or wait to enter...', delay: 2950, color: 'muted', blink: true },
];

function runBootSequence() {
  const terminal   = document.getElementById('boot-terminal');
  const progressBar= document.getElementById('boot-progress-bar');
  const hintEl     = document.getElementById('boot-hint');
  const bootScreen = document.getElementById('boot-screen');
  const mainContent= document.getElementById('main-content');

  if (!terminal) { finishBoot(bootScreen, mainContent); return; }

  let lineIndex = 0;
  const total = BOOT_LINES.length;

  function appendLine() {
    if (lineIndex >= total) {
      setTimeout(() => finishBoot(bootScreen, mainContent), 400);
      return;
    }

    const item = BOOT_LINES[lineIndex];
    const span = document.createElement('div');

    if (item.color === 'ok')    span.style.color = 'var(--pulse)';
    else if (item.color === 'muted') span.style.color = 'var(--text-muted)';
    else if (item.color === 'cyan')  span.style.color = 'var(--synapse)';
    else if (item.color === 'white') span.style.color = 'var(--text-white)';

    if (item.bold) span.style.fontWeight = '700';
    if (item.blink) {
      span.classList.add('boot-blink-cursor');
      hintEl.textContent = 'Enter veya boşluk tuşuna basın...';
    }

    span.textContent = item.text || '\u00A0';
    terminal.appendChild(span);
    terminal.scrollTop = terminal.scrollHeight;

    const pct = Math.round(((lineIndex + 1) / total) * 100);
    progressBar.style.width = pct + '%';
    lineIndex++;
    setTimeout(appendLine, (BOOT_LINES[lineIndex] ? BOOT_LINES[lineIndex].delay : 0) - item.delay + 60);
  }

  const firstDelay = BOOT_LINES[0].delay;
  setTimeout(appendLine, firstDelay);

  // Allow clicking anywhere on boot screen or pressing Enter/Space to skip immediately
  const skipBoot = (e) => {
    if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
      finishBoot(bootScreen, mainContent);
    }
  };
  document.addEventListener('keydown', skipBoot);
  bootScreen.addEventListener('click', skipBoot);
  STATE.skipBootRef = skipBoot;

  // Maximum 3.5s safety timeout to ensure site never hangs under any condition
  setTimeout(() => {
    if (!STATE.bootDone) {
      finishBoot(bootScreen, mainContent);
    }
  }, 3500);
}

function finishBoot(bootScreen, mainContent) {
  if (STATE.bootDone) return;
  STATE.bootDone = true;

  if (STATE.skipBootRef) {
    document.removeEventListener('keydown', STATE.skipBootRef);
  }

  bootScreen.classList.add('boot-hidden');
  document.body.classList.remove('boot-active');

  mainContent.classList.remove('main-content-hidden');
  mainContent.classList.add('main-content-visible');

  // Init all systems
  initNeuralBgCanvas();
  initNeuralNodeCanvas();
  initRevealObserver();
  initNeuralStatCounter();
  initProjectExpand();
  initFilterBar();
  initContactForm();
  initFooterBinary();
  initNavScroll();
  initMobileMenu();
  initConsciousnessBar();
  initSectionActiveNav();
  initStackChipLevels();
  initCardGlowEffect();
  initLangToggle();
  initUTCClock();
  initTypewriter();
  initLightboxGallery();
  initThemeSelector();
  initSettingsModal();
  initCommandPalette();
  initNavDropdowns();
}

// ═══════════════════════════════════════════════════════════
// 3. SYNAPTIC CURSOR
// ═══════════════════════════════════════════════════════════
function initCursor() {
  const dot   = document.getElementById('cursor-dot');
  const ring  = document.getElementById('cursor-ring');
  const trail = document.getElementById('cursor-trail-canvas');
  if (!dot || !ring || !trail) return;

  const ctx = trail.getContext('2d');
  let W = window.innerWidth;
  let H = window.innerHeight;
  trail.width = W;
  trail.height = H;

  // Floating Constellation Nodes
  const nodes = [];
  const NODE_COUNT = Math.min(50, Math.floor(W / 28));
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.35 + 0.15
    });
  }

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    trail.width = W;
    trail.height = H;
  }, { passive: true });

  const trailPoints = [];
  const MAX_POINTS  = 24;

  document.addEventListener('pointermove', e => {
    STATE.mouseX = e.clientX;
    STATE.mouseY = e.clientY;
    STATE.targetCursorX = e.clientX;
    STATE.targetCursorY = e.clientY;

    trailPoints.push({ x: e.clientX, y: e.clientY, life: 1.0 });
    if (trailPoints.length > MAX_POINTS) trailPoints.shift();
  }, { passive: true });

  // Hover detection
  document.querySelectorAll('a, button, [role="button"], .process-row, .sys-card, .stack-chip, .social-node, .vault-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });

  document.addEventListener('pointerdown', () => {
    ring.classList.add('cursor-click');
    setTimeout(() => ring.classList.remove('cursor-click'), 200);
  });

  let prevRingX = 0, prevRingY = 0;

  function animateCursor() {
    // Smooth ring follow
    prevRingX += (STATE.targetCursorX - prevRingX) * 0.16;
    prevRingY += (STATE.targetCursorY - prevRingY) * 0.16;

    dot.style.left  = STATE.targetCursorX + 'px';
    dot.style.top   = STATE.targetCursorY + 'px';
    ring.style.left = prevRingX + 'px';
    ring.style.top  = prevRingY + 'px';

    ctx.clearRect(0, 0, W, H);

    // 1) Render Interactive Constellation Mesh
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > W) node.vx *= -1;
      if (node.y < 0 || node.y > H) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${node.alpha})`;
      ctx.fill();

      // Connect to mouse cursor
      const dx = STATE.targetCursorX - node.x;
      const dy = STATE.targetCursorY - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 170) {
        const lineAlpha = (1 - dist / 170) * 0.35;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(STATE.targetCursorX, STATE.targetCursorY);
        ctx.strokeStyle = `rgba(107, 33, 232, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // 2) Render Cursor Motion Trail
    trailPoints.forEach((pt, i) => {
      pt.life -= 0.06;
      const alpha = Math.max(0, pt.life);
      const size  = alpha * 3.5;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(107, 33, 232, ${alpha * 0.5})`;
      ctx.fill();

      if (i > 0) {
        const prev = trailPoints[i - 1];
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.25})`;
        ctx.lineWidth = alpha * 1.8;
        ctx.stroke();
      }
    });

    for (let i = trailPoints.length - 1; i >= 0; i--) {
      if (trailPoints[i].life <= 0) trailPoints.splice(i, 1);
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

// ═══════════════════════════════════════════════════════════
// 4. NEURAL BACKGROUND CANVAS (Domain Warped Shader - Three.js)
// ═══════════════════════════════════════════════════════════
function initNeuralBgCanvas() {
  const canvas = document.getElementById('neural-bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const geo = new THREE.PlaneGeometry(2, 2);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime:   { value: 0 },
      uMouseX: { value: 0 },
      uMouseY: { value: 0 },
      uColorA: { value: new THREE.Color('#6B21E8') },
      uColorB: { value: new THREE.Color('#06B6D4') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uMouseX;
      uniform float uMouseY;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying vec2 vUv;

      // Multi-octave organic noise generator
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 3; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv;
        vec2 m = vec2(uMouseX * 0.5 + 0.5, uMouseY * 0.5 + 0.5);

        // Domain warping calculation for dynamic organic fluid flow
        vec2 q = vec2(0.0);
        q.x = fbm(uv * 2.2 + vec2(0.0, uTime * 0.04));
        q.y = fbm(uv * 2.2 + vec2(1.0, uTime * 0.04));

        vec2 r = vec2(0.0);
        r.x = fbm(uv * 2.0 + 1.0 * q + vec2(1.7, 9.2) + 0.12 * uTime + m * 0.3);
        r.y = fbm(uv * 2.0 + 1.0 * q + vec2(8.3, 2.8) + 0.10 * uTime + m * 0.3);

        float f = fbm(uv * 2.5 + r * 1.8);

        // Organic color blend using theme variables
        vec3 colA = uColorA * 0.18;
        vec3 colB = uColorB * 0.16;
        vec3 baseVoid = vec3(0.012, 0.012, 0.025);

        vec3 col = mix(colA, colB, clamp(f * f * 3.5, 0.0, 1.0));
        col = mix(col, uColorB * 0.25, clamp(length(q), 0.0, 1.0));
        col = mix(col, uColorA * 0.28, clamp(length(r.x), 0.0, 1.0));

        vec3 finalCol = mix(baseVoid, col, 0.8 + 0.2 * f);
        gl_FragColor = vec4(finalCol, 1.0);
      }
    `,
    transparent: true,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  STATE.bgMaterial = mat;

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, { passive: true });

  const clock = new THREE.Clock();
  let animationFrameId;
  let lastTime = 0;

  function animate(time) {
    animationFrameId = requestAnimationFrame(animate);
    if (time - lastTime < 16) return;
    lastTime = time;

    const t = clock.getElapsedTime();
    mat.uniforms.uTime.value = t;
    mat.uniforms.uMouseX.value += ((STATE.mouseX / window.innerWidth  * 2 - 1) - mat.uniforms.uMouseX.value) * 0.02;
    mat.uniforms.uMouseY.value += (-(STATE.mouseY / window.innerHeight * 2 - 1) - mat.uniforms.uMouseY.value) * 0.02;

    renderer.render(scene, camera);
  }

  animate(0);
}

// ═══════════════════════════════════════════════════════════
// 5. NEURAL NODE CANVAS (Hero 3D Widget — Three.js)
// ═══════════════════════════════════════════════════════════
function initNeuralNodeCanvas() {
  const canvas = document.getElementById('neural-node-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = document.getElementById('neural-node-container');
  const closeBtn  = document.getElementById('neural-core-close');

  let W = container.clientWidth || 400;
  let H = container.clientHeight || 400;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
  camera.position.z = 4.5;

  // Group to rotate everything (nodes & lines) together
  const group = new THREE.Group();
  scene.add(group);

  // 1) Core Glow Sphere (Inner core)
  const coreSphereGeom = new THREE.SphereGeometry(0.85, 32, 32);
  const coreSphereMat = new THREE.MeshBasicMaterial({
    color: 0x06B6D4,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending
  });
  const coreSphere = new THREE.Mesh(coreSphereGeom, coreSphereMat);
  group.add(coreSphere);

  // Inner bright nucleus
  const nucleusGeom = new THREE.SphereGeometry(0.35, 16, 16);
  const nucleusMat = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });
  const nucleus = new THREE.Mesh(nucleusGeom, nucleusMat);
  group.add(nucleus);

  // 2) Outer wireframe purple icosahedron (The shell)
  const outerWireGeom = new THREE.IcosahedronGeometry(1.6, 2);
  const outerWireMat = new THREE.MeshBasicMaterial({
    color: 0x8B5CF6,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending
  });
  const outerWireframe = new THREE.Mesh(outerWireGeom, outerWireMat);
  group.add(outerWireframe);

  // Secondary outer thin cyan wireframe for parallax depth
  const secondWireGeom = new THREE.IcosahedronGeometry(1.95, 1);
  const secondWireMat = new THREE.MeshBasicMaterial({
    color: 0x06B6D4,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending
  });
  const secondWireframe = new THREE.Mesh(secondWireGeom, secondWireMat);
  group.add(secondWireframe);

  // 3) Synaptic Nodes Setup (Floating organically inside and outside the core structures)
  const NODE_COUNT = 85;
  const nodes = [];
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array(NODE_COUNT * 3);

  for (let i = 0; i < NODE_COUNT; i++) {
    // Spherical distribution
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    // Radius ranges from 0.45 (deep inside) to 2.45 (way outside the core shell)
    const r = 0.45 + Math.random() * 2.0;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    nodes.push({
      baseR: r,
      theta: theta,
      phi: phi,
      // Speeds of oscillation
      speedTheta: (Math.random() - 0.5) * 0.008,
      speedPhi: (Math.random() - 0.5) * 0.008,
      // Current positions
      pos: new THREE.Vector3(x, y, z)
    });
  }

  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Node Points (Glowing dots)
  const nodeMat = new THREE.PointsMaterial({
    color: 0x06B6D4,
    size: 0.11,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const nodeSystem = new THREE.Points(geom, nodeMat);
  group.add(nodeSystem);

  // Line segment links (Synaptic cords)
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x8B5CF6,
    transparent: true,
    opacity: 0.32,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  let connectionLines = new THREE.LineSegments(new THREE.BufferGeometry(), lineMat);
  group.add(connectionLines);

  // 2) Drag to Rotate Camera (Interactive Orbit)
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotX = 0, targetRotY = 0;
  let curRotX = 0, curRotY = 0;

  // Mouse tilt when not dragging & not fullscreen
  document.addEventListener('pointermove', e => {
    if (isDragging || container.classList.contains('fullscreen')) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    targetRotY = x * 0.35;
    targetRotX = -y * 0.35;
  }, { passive: true });

  // Custom drag rotations
  canvas.addEventListener('pointerdown', e => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  document.addEventListener('pointermove', e => {
    if (!isDragging) return;
    const deltaMove = {
      x: e.clientX - previousMousePosition.x,
      y: e.clientY - previousMousePosition.y
    };

    const speedScale = 0.007;
    group.rotation.y += deltaMove.x * speedScale;
    group.rotation.x += deltaMove.y * speedScale;

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  document.addEventListener('pointerup', () => {
    isDragging = false;
  });

  // 3) Focus Mode Transition Logic (Clean & Non-disruptive)
  const focusBtn = document.getElementById('neural-focus-toggle');

  function toggleFocusMode(e) {
    if (e) e.stopPropagation();
    const isFocus = container.classList.toggle('focus-mode');
    document.body.classList.toggle('modal-open', isFocus);

    if (focusBtn) {
      focusBtn.innerHTML = isFocus
        ? `<span class="focus-icon">✕</span> <span class="focus-text">KAPAT</span>`
        : `<span class="focus-icon">⛶</span> <span class="focus-text">ODAK MODU</span>`;
    }

    setTimeout(() => {
      W = container.clientWidth || window.innerWidth;
      H = container.clientHeight || window.innerHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    }, 120);
  }

  if (focusBtn) {
    focusBtn.addEventListener('click', toggleFocusMode);
  }

  // Escape key to exit focus mode
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && container.classList.contains('focus-mode')) {
      toggleFocusMode(e);
    }
  });

  const resizeObs = new ResizeObserver(() => {
    W = container.clientWidth;
    H = container.clientHeight;
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  });
  resizeObs.observe(container);

  // Render Loop
  const clock = new THREE.Clock();
  let lastTime = 0;

  function animate(time) {
    requestAnimationFrame(animate);
    if (time - lastTime < 16) return;
    lastTime = time;

    const t = clock.getElapsedTime();

    // 4) Drift particles & bounce off boundaries
    const posArr = nodeSystem.geometry.attributes.position.array;
    const linePositions = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const node = nodes[i];
      
      // Update spherical angles and radius dynamically for organic wave drift
      node.theta += node.speedTheta;
      node.phi += node.speedPhi;
      
      // Radial breathing oscillation
      const waveR = node.baseR + Math.sin(t * 1.5 + i) * 0.08;

      node.pos.x = waveR * Math.sin(node.phi) * Math.cos(node.theta);
      node.pos.y = waveR * Math.sin(node.phi) * Math.sin(node.theta);
      node.pos.z = waveR * Math.cos(node.phi);

      posArr[i * 3] = node.pos.x;
      posArr[i * 3 + 1] = node.pos.y;
      posArr[i * 3 + 2] = node.pos.z;
    }
    nodeSystem.geometry.attributes.position.needsUpdate = true;

    // 5) Synthesize lines dynamic bindings
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodes[i].pos.distanceTo(nodes[j].pos);
        if (dist < 0.78) { // links threshold
          linePositions.push(nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z);
          linePositions.push(nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z);
        }
      }
    }

    if (connectionLines.geometry) {
      connectionLines.geometry.dispose();
    }
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    connectionLines.geometry = lineGeom;

    // Parallax depth offset rotations for individual shells
    coreSphere.rotation.y = t * -0.06;
    outerWireframe.rotation.y = t * 0.04;
    outerWireframe.rotation.x = t * 0.02;
    secondWireframe.rotation.y = t * -0.02;

    // Drift rotation when not dragging
    if (!isDragging && !container.classList.contains('fullscreen')) {
      curRotX += (targetRotX - curRotX) * 0.05;
      curRotY += (targetRotY - curRotY) * 0.05;
      group.rotation.x = t * 0.08 + curRotX;
      group.rotation.y = t * 0.10 + curRotY;
    } else if (!isDragging && container.classList.contains('fullscreen')) {
      group.rotation.y += 0.0012;
    }

    renderer.render(scene, camera);
  }

  animate(0);
}



// ═══════════════════════════════════════════════════════════
// 8. TYPEWRITER EFFECT (Hero accent line)
// ═══════════════════════════════════════════════════════════
function initTypewriter() {
  const el = document.getElementById('typewriter-target');
  if (!el) return;

  const words = ['Yapay Zeka', 'AI Ajanları', 'Quant Botları', 'Deep RL', 'Neural OS'];
  let wordIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const word = words[wordIdx];
    if (!deleting) {
      el.textContent = word.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 95);
    } else {
      el.textContent = word.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 50);
    }
  }

  setTimeout(tick, 1000);
}

// ═══════════════════════════════════════════════════════════
// 9. REVEAL OBSERVER (Intersection Observer)
// ═══════════════════════════════════════════════════════════
function initRevealObserver() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

// ═══════════════════════════════════════════════════════════
// 10. STAT COUNTERS
// ═══════════════════════════════════════════════════════════
function initNeuralStatCounter() {
  const stats = document.querySelectorAll('.stat-val[data-target]');
  if (!stats.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const duration = 1400;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        start = Math.round(eased * target);
        el.textContent = start + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target + suffix;
      }

      requestAnimationFrame(update);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => obs.observe(el));
}

// ═══════════════════════════════════════════════════════════
// 11. PROJECT EXPAND (Process Manager)
// ═══════════════════════════════════════════════════════════
function initProjectExpand() {
  document.querySelectorAll('.pr-btn-expand').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const projectKey = btn.dataset.project;
      const row = btn.closest('.process-row');
      const panel = row ? row.querySelector('.pr-detail-panel') : null;
      if (!panel) return;

      const isOpen = panel.classList.contains('open');

      // Close all
      document.querySelectorAll('.pr-detail-panel.open').forEach(p => {
        p.classList.remove('open');
      });
      document.querySelectorAll('.pr-btn-expand.expanded').forEach(b => {
        b.classList.remove('expanded');
        b.textContent = 'EXPAND';
      });

      if (!isOpen) {
        panel.classList.add('open');
        btn.classList.add('expanded');
        btn.textContent = 'CLOSE';
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════
// 12. PROJECT FILTER BAR
// ═══════════════════════════════════════════════════════════
function initFilterBar() {
  const btns = document.querySelectorAll('.filter-btn');
  const rows = document.querySelectorAll('.process-row');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      rows.forEach(row => {
        if (filter === 'all') {
          row.classList.remove('hidden');
        } else {
          const cats = (row.dataset.category || '').split(' ');
          row.classList.toggle('hidden', !cats.includes(filter));
        }
      });
    });
  });
}

// ═══════════════════════════════════════════════════════════
// 13. CONTACT FORM
// ═══════════════════════════════════════════════════════════
function initContactForm() {
  const form   = document.getElementById('contact-form');
  const btn    = document.getElementById('contact-submit');
  const status = document.getElementById('form-status');
  if (!form || !btn || !status) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name    = document.getElementById('contact-name')?.value.trim();
    const contact = document.getElementById('contact-email')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !contact || !message) {
      status.textContent = i18n[STATE.lang].form_error;
      status.className   = 't-form-status error';
      return;
    }

    btn.classList.add('loading');
    btn.disabled = true;
    status.className = 't-form-status';

    // Simulate async submission
    await new Promise(r => setTimeout(r, 1500));

    btn.classList.remove('loading');
    btn.disabled = false;
    status.textContent = i18n[STATE.lang].form_success;
    status.className   = 't-form-status success';
    form.reset();
    showToast('✔ Mesaj başarıyla gönderildi!');

    setTimeout(() => { status.className = 't-form-status'; }, 6000);
  });
}

// ═══════════════════════════════════════════════════════════
// 14. TOAST NOTIFICATION
// ═══════════════════════════════════════════════════════════
function showToast(msg, duration = 3500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ═══════════════════════════════════════════════════════════
// 15. FOOTER BINARY
// ═══════════════════════════════════════════════════════════
function initFooterBinary() {
  const el = document.getElementById('footer-binary');
  if (!el) return;
  let bin = '';
  for (let i = 0; i < 600; i++) bin += Math.random() > 0.5 ? '1 ' : '0 ';
  el.textContent = bin;
}

// ═══════════════════════════════════════════════════════════
// 16. SMART NAVBAR SCROLL (Hide on scroll down, show on scroll up)
// ═══════════════════════════════════════════════════════════
function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  let lastScrollY = window.scrollY;

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    nav.classList.toggle('scrolled', currentScrollY > 30);

    if (currentScrollY > 120 && currentScrollY > lastScrollY) {
      // Scrolling down -> hide navbar
      nav.classList.add('nav-hidden');
    } else {
      // Scrolling up -> reveal navbar
      nav.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ═══════════════════════════════════════════════════════════
// 16b. NAVBAR DROPDOWNS (Palette & Language)
// ═══════════════════════════════════════════════════════════
function initNavDropdowns() {
  const paletteWrap = document.getElementById('palette-dropdown-wrap');
  const paletteBtn  = document.getElementById('palette-btn');

  const langWrap = document.getElementById('lang-dropdown-wrap');
  const langBtn  = document.getElementById('lang-btn');
  const langLabel = document.getElementById('lang-current-label');

  if (paletteBtn && paletteWrap) {
    paletteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (langWrap) langWrap.classList.remove('active');
      paletteWrap.classList.toggle('active');
    });
  }

  if (langBtn && langWrap) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (paletteWrap) paletteWrap.classList.remove('active');
      langWrap.classList.toggle('active');
    });
  }

  document.addEventListener('click', () => {
    if (paletteWrap) paletteWrap.classList.remove('active');
    if (langWrap) langWrap.classList.remove('active');
  });

  // Palette selection
  document.querySelectorAll('.palette-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const theme = option.dataset.theme;
      document.querySelectorAll('.palette-option').forEach(o => o.classList.toggle('active', o.dataset.theme === theme));
      applyTheme(theme);
      if (paletteWrap) paletteWrap.classList.remove('active');
    });
  });

  // Language selection
  document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = option.dataset.lang;
      document.querySelectorAll('.lang-option').forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
      if (langLabel) langLabel.textContent = lang.toUpperCase();
      STATE.lang = lang;
      applyTranslations(lang);
      if (langWrap) langWrap.classList.remove('active');
    });
  });
}

// ═══════════════════════════════════════════════════════════
// 17. MOBILE MENU
// ═══════════════════════════════════════════════════════════
function initMobileMenu() {
  const hamburger = document.getElementById('nav-hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open', !expanded);
    menu.setAttribute('aria-hidden', String(expanded));
  });

  // Close on link click
  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
}

// ═══════════════════════════════════════════════════════════
// 18. CONSCIOUSNESS BAR (scroll depth)
// ═══════════════════════════════════════════════════════════
function initConsciousnessBar() {
  const bar = document.getElementById('consciousness-bar');
  const val = document.getElementById('consciousness-value');
  if (!bar || !val) return;

  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll > 0 ? Math.round((window.scrollY / maxScroll) * 100) : 0;
    bar.style.height = pct + '%';
    val.textContent  = pct + '%';
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════
// 19. ACTIVE NAV SECTION HIGHLIGHT
// ═══════════════════════════════════════════════════════════
function initSectionActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));
}

// ═══════════════════════════════════════════════════════════
// 20. STACK CHIP LEVELS (CSS variable)
// ═══════════════════════════════════════════════════════════
function initStackChipLevels() {
  document.querySelectorAll('.stack-chip[data-level]').forEach(chip => {
    chip.style.setProperty('--level', chip.dataset.level);
  });
}

// ═══════════════════════════════════════════════════════════
// 21. CARD GLOW EFFECT (mouse tracking)
// ═══════════════════════════════════════════════════════════
function initCardGlowEffect() {
  document.querySelectorAll('.sys-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });
}

// ═══════════════════════════════════════════════════════════
// 22. LANGUAGE TOGGLE
// ═══════════════════════════════════════════════════════════
function initLangToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      STATE.lang = lang;
      document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
        b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
      });
      applyTranslations(lang);
    });
  });
}

// ═══════════════════════════════════════════════════════════
// 23. UTC CLOCK
// ═══════════════════════════════════════════════════════════
function initUTCClock() {
  const el = document.getElementById('utc-clock');
  if (!el) return;

  function update() {
    const now = new Date();
    const h = String(now.getUTCHours()).padStart(2, '0');
    const m = String(now.getUTCMinutes()).padStart(2, '0');
    const s = String(now.getUTCSeconds()).padStart(2, '0');
    el.textContent = `${h}:${m}:${s} UTC`;
  }

  update();
  setInterval(update, 1000);
}

// ═══════════════════════════════════════════════════════════
// 24. FULLSCREEN LIGHTBOX GALLERY
// ═══════════════════════════════════════════════════════════
function initLightboxGallery() {
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');
  const lbCounter = document.getElementById('lb-counter');
  const lbClose = document.getElementById('lb-close');
  const lbOverlay = document.getElementById('lb-close-overlay');
  if (!lightbox) return;

  let currentPrefix = '';
  let currentCount = 0;
  let currentIndex = 1;

  function updateImage() {
    lbImg.src = `assets/${currentPrefix}_${currentIndex}.jpg`;
    lbCounter.textContent = `${currentIndex} / ${currentCount}`;
  }

  function openGallery(prefix, count, startIndex = 1) {
    currentPrefix = prefix;
    currentCount = count;
    currentIndex = startIndex;
    updateImage();
    lightbox.classList.add('visible');
  }

  function closeGallery() {
    lightbox.classList.remove('visible');
  }

  function nextImg() {
    if (currentIndex < currentCount) {
      currentIndex++;
      updateImage();
    }
  }

  function prevImg() {
    if (currentIndex > 1) {
      currentIndex--;
      updateImage();
    }
  }

  // 1) Create Thumbnail Galleries dynamically and attach triggers
  document.querySelectorAll('.pr-gallery').forEach(gallery => {
    const prefix = gallery.dataset.galleryPrefix;
    const count = parseInt(gallery.dataset.galleryCount, 10);
    if (!prefix || count <= 0) return;

    let html = `<div class="pr-thumbnails">`;
    const maxThumbs = Math.min(count, 3);
    for (let i = 1; i <= maxThumbs; i++) {
      if (i === 3 && count > 3) {
        html += `<div class="pr-thumb-more" data-prefix="${prefix}" data-count="${count}" data-index="${i}">
                   <img src="assets/${prefix}_${i}.jpg" alt="${prefix} thumbnail" loading="lazy" />
                   <div class="pr-more-overlay">+${count - 2} Görsel</div>
                 </div>`;
      } else {
        html += `<img src="assets/${prefix}_${i}.jpg" class="pr-thumb-img" data-prefix="${prefix}" data-count="${count}" data-index="${i}" alt="${prefix} thumbnail" loading="lazy" />`;
      }
    }
    html += `</div>`;
    gallery.innerHTML = html;

    // Attach click events to the newly generated thumbnails
    gallery.querySelectorAll('.pr-thumb-img, .pr-thumb-more').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent expanding the row if double clicking or single clicking inside
        const startIdx = parseInt(e.currentTarget.dataset.index, 10);
        openGallery(prefix, count, startIdx);
      });
    });
  });

  // 1b) Add dblclick to process-row elements to open the gallery directly
  const rows = document.querySelectorAll('.process-row');
  rows.forEach(row => {
    row.addEventListener('dblclick', (e) => {
      // Prevent dblclick text selection behavior
      e.preventDefault();
      const galleryDiv = row.querySelector('.pr-gallery');
      if (galleryDiv) {
        const prefix = galleryDiv.dataset.galleryPrefix;
        const count = parseInt(galleryDiv.dataset.galleryCount, 10);
        if (prefix && count > 0) {
          openGallery(prefix, count, 1);
        }
      }
    });
  });

  // 2) UI buttons
  if (lbClose) lbClose.addEventListener('click', closeGallery);
  if (lbOverlay) lbOverlay.addEventListener('click', closeGallery);
  if (lbNext) lbNext.addEventListener('click', nextImg);
  if (lbPrev) lbPrev.addEventListener('click', prevImg);

  // 3) Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('visible')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'ArrowLeft') prevImg();
  });
}

// ═══════════════════════════════════════════════════════════
// 25. THEME SELECTOR ENGINE (6 Neon Themes)
// ═══════════════════════════════════════════════════════════
function applyTheme(theme) {
  // Update body classes
  document.body.className = document.body.className.replace(/\btheme-\S+/g, '').trim();
  if (theme !== 'default') {
    document.body.classList.add(`theme-${theme}`);
  }

  // Update active state on all theme selectors
  document.querySelectorAll('.palette-option, .theme-card, .theme-btn').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === theme);
  });

  // Live WebGL Background color transitions
  if (STATE.bgMaterial) {
    if (theme === 'gold') {
      STATE.bgMaterial.uniforms.uColorA.value.set('#D4AF37');
      STATE.bgMaterial.uniforms.uColorB.value.set('#F59E0B');
    } else if (theme === 'aurora') {
      STATE.bgMaterial.uniforms.uColorA.value.set('#10B981');
      STATE.bgMaterial.uniforms.uColorB.value.set('#059669');
    } else if (theme === 'ruby') {
      STATE.bgMaterial.uniforms.uColorA.value.set('#E11D48');
      STATE.bgMaterial.uniforms.uColorB.value.set('#F97316');
    } else if (theme === 'sapphire') {
      STATE.bgMaterial.uniforms.uColorA.value.set('#2563EB');
      STATE.bgMaterial.uniforms.uColorB.value.set('#38BDF8');
    } else if (theme === 'synthwave') {
      STATE.bgMaterial.uniforms.uColorA.value.set('#EC4899');
      STATE.bgMaterial.uniforms.uColorB.value.set('#8B5CF6');
    } else {
      // default theme
      STATE.bgMaterial.uniforms.uColorA.value.set('#6B21E8');
      STATE.bgMaterial.uniforms.uColorB.value.set('#06B6D4');
    }
  }
}

function initThemeSelector() {
  const btns = document.querySelectorAll('.theme-btn, .theme-card, .palette-option');
  if (btns.length === 0) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
    });
  });
}

// ═══════════════════════════════════════════════════════════
// 26. SCI-FI AUDIO SFX SYNTHESIZER (Web Audio API)
// ═══════════════════════════════════════════════════════════
let audioCtx = null;
const SFX = {
  enabled: true,
  play(type = 'click') {
    if (!SFX.enabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'open') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(850, now + 0.12);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'close') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(850, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      // AudioContext suppressed silently
    }
  }
};

// ═══════════════════════════════════════════════════════════
// 27. SYSTEM CONTROL CENTER & SETTINGS CONTROLLER
// ═══════════════════════════════════════════════════════════
function initSettingsModal() {
  const modal = document.getElementById('settings-modal');
  const openBtn = document.getElementById('open-settings-btn');
  const floatBtn = document.getElementById('floating-settings-btn');
  const closeBtn = document.getElementById('close-settings-btn');
  const saveBtn = document.getElementById('save-settings-btn');
  const resetBtn = document.getElementById('reset-settings-btn');
  const backdrop = document.getElementById('settings-backdrop');
  const sfxToggle = document.getElementById('sfx-toggle');
  const scanlinesToggle = document.getElementById('scanlines-toggle');
  const densityBtns = document.querySelectorAll('.density-btn');
  const themeCards = document.querySelectorAll('.theme-card');

  if (!modal) return;

  function openSettings() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    SFX.play('open');
  }

  function closeSettings() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    SFX.play('close');
  }

  if (openBtn) openBtn.addEventListener('click', openSettings);
  if (floatBtn) floatBtn.addEventListener('click', openSettings);
  if (closeBtn) closeBtn.addEventListener('click', closeSettings);
  if (saveBtn) saveBtn.addEventListener('click', closeSettings);
  if (backdrop) backdrop.addEventListener('click', closeSettings);

  // SFX Toggle
  if (sfxToggle) {
    sfxToggle.addEventListener('click', () => {
      SFX.enabled = !SFX.enabled;
      sfxToggle.classList.toggle('active', SFX.enabled);
      sfxToggle.setAttribute('aria-pressed', SFX.enabled);
      if (SFX.enabled) SFX.play('click');
      localStorage.setItem('neural_sfx', SFX.enabled ? 'true' : 'false');
    });
  }

  // Scanlines Toggle
  if (scanlinesToggle) {
    scanlinesToggle.addEventListener('click', () => {
      const isCurrentlyActive = scanlinesToggle.classList.contains('active');
      const newState = !isCurrentlyActive;
      scanlinesToggle.classList.toggle('active', newState);
      scanlinesToggle.setAttribute('aria-pressed', newState);
      const grain = document.querySelector('.grain-overlay');
      if (grain) grain.style.display = newState ? 'block' : 'none';
      SFX.play('click');
      localStorage.setItem('neural_scanlines', newState ? 'true' : 'false');
    });
  }

  // Particle Density Buttons
  densityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      densityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const density = btn.dataset.density;
      SFX.play('click');
      localStorage.setItem('neural_density', density);
    });
  });

  // Theme Cards
  themeCards.forEach(card => {
    card.addEventListener('click', () => {
      themeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const theme = card.dataset.theme;

      // Sync navbar theme buttons
      const navThemeBtn = document.querySelector(`.theme-btn[data-theme="${theme}"]`);
      if (navThemeBtn) navThemeBtn.click();

      SFX.play('click');
      localStorage.setItem('neural_theme', theme);
    });
  });

  // Reset Settings
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      SFX.enabled = true;
      if (sfxToggle) sfxToggle.classList.add('active');
      if (scanlinesToggle) scanlinesToggle.classList.add('active');
      const grain = document.querySelector('.grain-overlay');
      if (grain) grain.style.display = 'block';

      const defaultCard = document.querySelector('.theme-card[data-theme="default"]');
      if (defaultCard) defaultCard.click();

      localStorage.clear();
      SFX.play('click');
    });
  }

  // Audio SFX on general user interactions
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, a, .pr-btn, .nav-link, .process-row, .social-node, .whop-card')) {
      SFX.play('click');
    }
  });

  // Restore saved preferences
  const savedSfx = localStorage.getItem('neural_sfx');
  if (savedSfx === 'false') {
    SFX.enabled = false;
    if (sfxToggle) sfxToggle.classList.remove('active');
  }

  const savedTheme = localStorage.getItem('neural_theme');
  if (savedTheme) {
    const card = document.querySelector(`.theme-card[data-theme="${savedTheme}"]`);
    if (card) {
      themeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const navThemeBtn = document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`);
      if (navThemeBtn) navThemeBtn.click();
    }
  }
}

// ═══════════════════════════════════════════════════════════
// 29. COMMAND PALETTE (⌘K HUD OVERLAY)
// ═══════════════════════════════════════════════════════════
function initCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  const triggerBtn = document.getElementById('cmd-k-btn');
  const backdrop = document.getElementById('cmd-backdrop');
  const input = document.getElementById('cmd-input');
  const resultsContainer = document.getElementById('cmd-results');
  if (!modal || !input || !resultsContainer) return;

  const COMMANDS = [
    { icon: '🚀', title: 'Geliştirilen Projeler (Processes)', desc: 'Proje vitrini ve teknik detaylara git', badge: 'GEZİNTİ', action: () => scrollToSection('projects') },
    { icon: '⚡', title: 'Sistem & Mimari (System)', desc: 'Mimariler ve uzmanlık alanlarına git', badge: 'GEZİNTİ', action: () => scrollToSection('about') },
    { icon: '🛠️', title: 'Teknoloji Yığını (Modules)', desc: 'Kullanılan diller ve kütüphaneler', badge: 'GEZİNTİ', action: () => scrollToSection('stack') },
    { icon: '🛍️', title: 'Whop Store & Veri Kasası', desc: 'Veri setleri ve dijital mağaza', badge: 'GEZİNTİ', action: () => scrollToSection('store') },
    { icon: '✉️', title: 'İletişime Geç (Connect)', desc: 'Mesaj gönder ve bağlantı kur', badge: 'GEZİNTİ', action: () => scrollToSection('contact') },
    { icon: '⚙️', title: 'Sistem Ayarları & Kontrol Paneli', desc: 'Renk teması, ses efektleri ve parçacıklar', badge: 'AYARLAR', action: () => openSettingsModal() },
    { icon: '🎨', title: 'Tema: Synaptic Void', desc: 'Mor & Neon Mavi varsayılan tema', badge: 'TEMA', action: () => setTheme('default') },
    { icon: '🎨', title: 'Tema: Obsidian Gold', desc: 'Lüks Altın & Kehribar teması', badge: 'TEMA', action: () => setTheme('gold') },
    { icon: '🎨', title: 'Tema: Nordic Aurora', desc: 'Zümrüt & Nane Yeşili doğa teması', badge: 'TEMA', action: () => setTheme('aurora') },
    { icon: '🎨', title: 'Tema: Cyber Ruby', desc: 'Kıpkırmızı & Turuncu matris teması', badge: 'TEMA', action: () => setTheme('ruby') },
    { icon: '🌐', title: 'GitHub Profilini Aç (dobby-aidev)', desc: 'Açık kaynaklı kod depoları', badge: 'HARİCİ', action: () => window.open('https://github.com/dobby-aidev', '_blank') },
  ];

  let selectedIndex = 0;
  let filteredCommands = [...COMMANDS];

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    closePalette();
  }

  function openSettingsModal() {
    closePalette();
    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal) {
      settingsModal.classList.add('active');
      settingsModal.setAttribute('aria-hidden', 'false');
    }
  }

  function setTheme(theme) {
    const navThemeBtn = document.querySelector(`.theme-card[data-theme="${theme}"]`);
    if (navThemeBtn) navThemeBtn.click();
    closePalette();
  }

  function renderResults() {
    resultsContainer.innerHTML = '';
    if (filteredCommands.length === 0) {
      resultsContainer.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.8rem;">Sonuç bulunamadı.</div>`;
      return;
    }

    filteredCommands.forEach((cmd, index) => {
      const item = document.createElement('div');
      item.className = `cmd-item ${index === selectedIndex ? 'selected' : ''}`;
      item.setAttribute('role', 'option');
      item.innerHTML = `
        <div class="cmd-item-left">
          <span class="cmd-item-icon">${cmd.icon}</span>
          <div>
            <div class="cmd-item-title">${cmd.title}</div>
            <div class="cmd-item-desc">${cmd.desc}</div>
          </div>
        </div>
        <span class="cmd-item-badge">${cmd.badge}</span>
      `;

      item.addEventListener('click', () => {
        cmd.action();
      });

      item.addEventListener('mouseenter', () => {
        selectedIndex = index;
        updateSelectedHighlight();
      });

      resultsContainer.appendChild(item);
    });
  }

  function updateSelectedHighlight() {
    const items = resultsContainer.querySelectorAll('.cmd-item');
    items.forEach((item, index) => {
      item.classList.toggle('selected', index === selectedIndex);
    });
  }

  function openPalette() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    input.value = '';
    filteredCommands = [...COMMANDS];
    selectedIndex = 0;
    renderResults();
    setTimeout(() => input.focus(), 50);
    if (typeof SFX !== 'undefined') SFX.play('open');
  }

  function closePalette() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (typeof SFX !== 'undefined') SFX.play('close');
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openPalette);
  if (backdrop) backdrop.addEventListener('click', closePalette);

  // Global Ctrl+K / Cmd+K listener
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('active')) closePalette();
      else openPalette();
    } else if (modal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closePalette();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        updateSelectedHighlight();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
        updateSelectedHighlight();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    }
  });

  // Filter input typing
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      filteredCommands = [...COMMANDS];
    } else {
      filteredCommands = COMMANDS.filter(cmd => 
        cmd.title.toLowerCase().includes(query) || 
        cmd.desc.toLowerCase().includes(query) ||
        cmd.badge.toLowerCase().includes(query)
      );
    }
    selectedIndex = 0;
    renderResults();
  });
}

// ═══════════════════════════════════════════════════════════
// 30. DYNAMIC CIRCULAR FAVICON ENGINE
// ═══════════════════════════════════════════════════════════
function makeFaviconCircular() {
  const imgUrl = 'profile.png';
  const img = new Image();
  // With a local file, we bypass restrictive CORS rules causing the white SVG issues
  img.onload = function() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');

      // Circular clip mask
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, 0, 0, 32, 32);

      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/png';
      link.href = canvas.toDataURL('image/png');
    } catch (e) {
      console.error("Favicon process failed:", e);
    }
  };
  img.src = imgUrl;
}

// ═══════════════════════════════════════════════════════════
// INIT ENTRY POINT
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('boot-active');

  // Convert square GitHub profile into a clean circle in browser tab dynamically
  makeFaviconCircular();

  // Cursor is always active (even during boot)
  initCursor();

  // Boot sequence
  runBootSequence();
});
