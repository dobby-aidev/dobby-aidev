/* ==========================================================================
   1:1 FAITHFUL ACTIVE THEORY (ACTIVETHEORY.NET) CREATIVE WEBGL ENGINE
   GLSL Fluid Shaders · Dynamic Floating Previews · Web Audio API · Lightbox
   ========================================================================== */

// ================================================================
// 1. TRANSLATION DICTIONARY
// ================================================================
const dictionary = {
  tr: {
    nav_about: "Hakkımda",
    nav_projects: "Projelerim",
    nav_store: "Veri Setleri",
    nav_stack: "Teknolojiler",
    nav_contact: "İletişim",
    status_text: "Otonom AI & Quant Sistemleri",
    hero_title: "Otonom Yapay Zeka Ajanları ve Derin Pekiştirmeli Öğrenme.",
    hero_bio: "Çoklu-ajan mimarileri (Multi-Agent Swarms), PyTorch tabanlı derin pekiştirmeli öğrenme (Deep RL) botları ve açık kaynaklı web platformları tasarlıyorum.",
    btn_explore: "Projeleri İncele ↓",
    btn_whop: "Whop Mağazası ↗",
    sec_about_title: "Mimariler & Odak",
    sec_projects_title: "Geliştirdiğim Projeler",
    sec_stack_title: "Kullandığım Teknolojiler",
    sec_store_title: "Whop Store & Veri Seti Merkezi",
    sec_contact_title: "İletişime Geçin"
  },
  en: {
    nav_about: "About",
    nav_projects: "Projects",
    nav_store: "Datasets & Store",
    nav_stack: "Tech Stack",
    nav_contact: "Contact",
    status_text: "Autonomous AI & Quant Systems",
    hero_title: "Building Autonomous AI Agent Swarms & Quantitative Systems.",
    hero_bio: "Architecting multi-agent swarms, PyTorch-based deep reinforcement learning trading bots, and open-source AI web platforms.",
    btn_explore: "Explore Work ↓",
    btn_whop: "Whop Store ↗",
    sec_about_title: "Architectures & Focus",
    sec_projects_title: "Featured Engineering Work",
    sec_stack_title: "Technical Stack",
    sec_store_title: "Whop Store & Datasets Hub",
    sec_contact_title: "Get In Touch"
  }
};

// ================================================================
// 2. PROJECT GALLERIES MAPPING (Includes Zamanın Bekçisi 9-Images)
// ================================================================
const projectGalleries = {
  'dona-codex-vision': {
    title: 'Dona Codex: Vision',
    preview: './assets/dona_codex_vision_1.jpg',
    images: Array.from({ length: 13 }, (_, i) => `./assets/dona_codex_vision_${i + 1}.jpg`)
  },
  'agent-critiq': {
    title: 'Agent Critiq',
    preview: './assets/agent_critiq_1.jpg',
    images: Array.from({ length: 7 }, (_, i) => `./assets/agent_critiq_${i + 1}.jpg`)
  },
  'dona-codex': {
    title: 'Dona Codex: Overmind',
    preview: './assets/dona_codex_overmind_1.jpg',
    images: Array.from({ length: 19 }, (_, i) => `./assets/dona_codex_overmind_${i + 1}.jpg`)
  },
  'dona-nexus': {
    title: 'Dona Nexus (ApexBrain)',
    preview: './assets/dona_nexus_1.jpg',
    images: Array.from({ length: 8 }, (_, i) => `./assets/dona_nexus_${i + 1}.jpg`)
  },
  'ai-prompt-builder': {
    title: 'AI Prompt Builder',
    preview: './assets/ai_prompt_builder_1.jpg',
    images: Array.from({ length: 10 }, (_, i) => `./assets/ai_prompt_builder_${i + 1}.jpg`)
  },
  'ai-coin-empire': {
    title: 'AI Coin Empire',
    preview: './assets/ai_coin_empire_1.jpg',
    images: Array.from({ length: 21 }, (_, i) => `./assets/ai_coin_empire_${i + 1}.jpg`)
  },
  'dona-grid': {
    title: 'Dona Grid',
    preview: './assets/dona_grid_1.jpg',
    images: Array.from({ length: 5 }, (_, i) => `./assets/dona_grid_${i + 1}.jpg`)
  },
  'dona-quantum': {
    title: 'Dona Quantum',
    preview: './assets/dona_quantum_1.jpg',
    images: Array.from({ length: 8 }, (_, i) => `./assets/dona_quantum_${i + 1}.jpg`)
  },
  'zamanin-bekcisi': {
    title: 'Zamanın Bekçisi',
    preview: './assets/zamanin_bekcisi_1.jpg',
    images: Array.from({ length: 9 }, (_, i) => `./assets/zamanin_bekcisi_${i + 1}.jpg`)
  },
  'dona-ai-lab': {
    title: 'Dona AI Lab',
    preview: '',
    images: []
  }
};

let currentLang = 'tr';
let currentGallery = [];
let currentImgIndex = 0;
let currentTitle = '';
let audioEnabled = false;

// ================================================================
// 3. APPLICATION INITIALIZATION
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  initGLSLFluidCanvas();
  init3DHeroWidget();
  initFloatingPreviewEngine();
  initSpecularBentoCards();
  initSkillsRadar();
  initScrollEffects();
  initUTCClock();
  setupAudioEngine();
  setupCommandPalette();
  setupLanguageSwitcher();
  setupFilterTabs();
  setupLightbox();
  setupContactForm();
  setupHeaderScroll();
});

// ================================================================
// 4. FULL-SCREEN GLSL FLUID SHADER CANVAS ENGINE (BACKGROUND)
// ================================================================
function initGLSLFluidCanvas() {
  const canvas = document.getElementById('activetheory-glsl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const uniforms = {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) }
  };

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    varying vec2 vUv;

    // Simplex noise approximation
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      vec2 mouse = u_mouse;
      
      float dist = distance(st, mouse);
      float ripple = sin(dist * 25.0 - u_time * 3.0) * exp(-dist * 4.0);

      float n = snoise(st * 3.0 + vec2(u_time * 0.1, u_time * 0.15));
      
      vec3 cyan = vec3(0.0, 0.94, 1.0);
      vec3 violet = vec3(0.65, 0.33, 0.96);
      vec3 base = mix(cyan, violet, n * 0.5 + 0.5);

      float alpha = clamp(n * 0.08 + ripple * 0.12, 0.0, 0.25);
      gl_FragColor = vec4(base, alpha);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true
  });

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(plane);

  window.addEventListener('mousemove', (e) => {
    uniforms.u_mouse.value.x = e.clientX / window.innerWidth;
    uniforms.u_mouse.value.y = 1.0 - (e.clientY / window.innerHeight);
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    uniforms.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
  });
}

// ================================================================
// 5. HERO 3D WIDGET (3D CORE)
// ================================================================
function init3DHeroWidget() {
  const container = document.getElementById('hero-webgl-container');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // Outer Wireframe Icosahedron
  const outerGeo = new THREE.IcosahedronGeometry(1.8, 2);
  const outerMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const outerMesh = new THREE.Mesh(outerGeo, outerMat);
  mainGroup.add(outerMesh);

  // Inner Core Sphere
  const innerGeo = new THREE.IcosahedronGeometry(0.95, 3);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.8,
    roughness: 0.2,
    metalness: 0.8
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  mainGroup.add(innerMesh);

  // Particles
  const particleCount = 1200;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 2.2 + (Math.random() - 0.5) * 0.8;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.035,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  mainGroup.add(particleSystem);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const light1 = new THREE.PointLight(0x00f0ff, 2.5, 10);
  light1.position.set(3, 3, 3);
  scene.add(light1);

  let targetRotX = 0, targetRotY = 0;
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    targetRotY = mx * 0.8;
    targetRotX = my * 0.8;
  });

  let impulse = 0;
  container.addEventListener('click', () => {
    impulse = 1.0;
    innerMat.emissiveIntensity = 2.2;
    playClickAudio();
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
    mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;

    outerMesh.rotation.y = elapsed * 0.2;
    innerMesh.rotation.y = -elapsed * 0.3;
    particleSystem.rotation.y = elapsed * 0.1;

    if (impulse > 0) {
      impulse *= 0.94;
      mainGroup.scale.setScalar(1.0 + impulse * 0.15);
      innerMat.emissiveIntensity = 0.8 + impulse * 1.5;
    } else {
      mainGroup.scale.setScalar(1.0);
      innerMat.emissiveIntensity = 0.8;
    }

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

// ================================================================
// 6. DYNAMIC FLOATING PREVIEW ENGINE (ACTIVE THEORY SIGNATURE)
// ================================================================
function initFloatingPreviewEngine() {
  const floatingBox = document.getElementById('floating-project-preview');
  const previewImg  = document.getElementById('floating-preview-img');
  const listItems   = document.querySelectorAll('.activetheory-item');

  if (!floatingBox || !previewImg) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateFloatingPos() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    floatingBox.style.left = `${currentX}px`;
    floatingBox.style.top  = `${currentY}px`;
    requestAnimationFrame(updateFloatingPos);
  }
  updateFloatingPos();

  listItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const key = item.getAttribute('data-project-key');
      if (key && projectGalleries[key] && projectGalleries[key].preview) {
        previewImg.src = projectGalleries[key].preview;
        floatingBox.classList.add('active');
        playHoverAudio();
      }
    });

    item.addEventListener('mouseleave', () => {
      floatingBox.classList.remove('active');
    });

    item.addEventListener('click', () => {
      const key = item.getAttribute('data-project-key');
      if (key && projectGalleries[key] && projectGalleries[key].images.length > 0) {
        currentGallery = projectGalleries[key].images;
        currentTitle   = projectGalleries[key].title;
        currentImgIndex = 0;
        openLightbox();
        playClickAudio();
      }
    });
  });
}

// ================================================================
// 7. SPECULAR BENTO CARDS & TILT
// ================================================================
function initSpecularBentoCards() {
  const cards = document.querySelectorAll('.bento-card, .stack-card, .store-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -4;
      const rotY = ((x - cx) / cx) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ================================================================
// 8. SKILLS RADAR CANVAS
// ================================================================
function initSkillsRadar() {
  const canvas = document.getElementById('skills-radar-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const SIZE = 380;
  canvas.width = SIZE;
  canvas.height = SIZE;

  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const radius = 135;

  const skills = [
    { label: 'Deep RL',     val: 0.92, col: '#00f0ff' },
    { label: 'LLM Swarms',  val: 0.96, col: '#a855f7' },
    { label: 'Quant Engine',val: 0.90, col: '#ff007a' },
    { label: 'TypeScript',  val: 0.88, col: '#38bdf8' },
    { label: 'PyTorch',     val: 0.94, col: '#00ff9d' },
    { label: 'FastAPI/Node',val: 0.86, col: '#d4af37' }
  ];

  const N = skills.length;
  let progress = 0;

  function getAngle(i) {
    return (Math.PI * 2 * i) / N - Math.PI / 2;
  }

  function draw(p) {
    ctx.clearRect(0, 0, SIZE, SIZE);

    for (let r = 1; r <= 4; r++) {
      const rr = (radius * r) / 4;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const a = getAngle(i);
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const a = getAngle(i);
      const v = skills[i].val * p;
      const x = cx + Math.cos(a) * radius * v;
      const y = cy + Math.sin(a) * radius * v;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
    grad.addColorStop(0.6, 'rgba(168, 85, 247, 0.2)');
    grad.addColorStop(1, 'rgba(255, 0, 122, 0.1)');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.stroke();

    for (let i = 0; i < N; i++) {
      const a = getAngle(i);
      const v = skills[i].val * p;
      const x = cx + Math.cos(a) * radius * v;
      const y = cy + Math.sin(a) * radius * v;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = skills[i].col;
      ctx.shadowColor = skills[i].col;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      const lx = cx + Math.cos(a) * (radius + 24);
      const ly = cy + Math.sin(a) * (radius + 24);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 11px "Geist Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(skills[i].label, lx, ly);
    }
  }

  function animate() {
    if (progress < 1) {
      progress += 0.03;
      draw(Math.min(progress, 1));
      requestAnimationFrame(animate);
    } else {
      draw(1);
    }
  }

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      progress = 0;
      animate();
      observer.unobserve(canvas);
    }
  }, { threshold: 0.3 });

  observer.observe(canvas);
}

// ================================================================
// 9. WEB AUDIO API SYNTHESIZER
// ================================================================
let audioCtx = null;

function setupAudioEngine() {
  const btn = document.getElementById('audio-toggle-btn');
  btn?.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    audioEnabled = !audioEnabled;
    btn.classList.toggle('active', audioEnabled);
    btn.querySelector('span:last-child').textContent = audioEnabled ? 'SOUND: ON' : 'SOUND: OFF';
    if (audioEnabled) playClickAudio();
  });
}

function playHoverAudio() {
  if (!audioEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {}
}

function playClickAudio() {
  if (!audioEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {}
}

// ================================================================
// 10. UTC CLOCK
// ================================================================
function initUTCClock() {
  const clockEl = document.getElementById('utc-clock');
  function update() {
    if (!clockEl) return;
    const now = new Date();
    const hrs = String(now.getUTCHours()).padStart(2, '0');
    const mins = String(now.getUTCMinutes()).padStart(2, '0');
    const secs = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.textContent = `${hrs}:${mins}:${secs} UTC`;
  }
  update();
  setInterval(update, 1000);
}

// ================================================================
// 11. COMMAND PALETTE (`Cmd + K` MENU)
// ================================================================
function setupCommandPalette() {
  const modal = document.getElementById('cmdk-modal');
  const triggerBtn = document.getElementById('cmdk-trigger-btn');
  const input = document.getElementById('cmdk-input');
  const items = document.querySelectorAll('.cmdk-item');

  function openCmdk() {
    if (!modal) return;
    modal.classList.add('active');
    input?.focus();
    playClickAudio();
  }

  function closeCmdk() {
    if (!modal) return;
    modal.classList.remove('active');
    if (input) input.value = '';
  }

  triggerBtn?.addEventListener('click', openCmdk);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (modal?.classList.contains('active')) closeCmdk();
      else openCmdk();
    }
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeCmdk();
    }
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeCmdk();
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target-id');
      closeCmdk();
      if (target) {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ================================================================
// 12. SCROLL REVEAL & HEADER STICKY
// ================================================================
function initScrollEffects() {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
}

function setupHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
}

// ================================================================
// 13. LANGUAGE SWITCHER
// ================================================================
function setupLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      if (lang === currentLang) return;

      currentLang = lang;
      langBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      applyTranslations(lang);
      playClickAudio();
    });
  });
}

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dictionary[lang]?.[key]) el.textContent = dictionary[lang][key];
  });
}

// ================================================================
// 14. PROJECT FILTER TABS
// ================================================================
function setupFilterTabs() {
  const filterBtns = document.querySelectorAll('.filter-chip');
  const projectItems = document.querySelectorAll('#projects .activetheory-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const cats = item.getAttribute('data-category') || '';
        if (filter === 'all' || cats.includes(filter)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });

      playClickAudio();
    });
  });
}

// ================================================================
// 15. LIGHTBOX ENGINE (Includes Zamanın Bekçisi 9-Images)
// ================================================================
function setupLightbox() {
  const modal    = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn  = document.getElementById('lightbox-prev-btn');
  const nextBtn  = document.getElementById('lightbox-next-btn');

  document.querySelectorAll('.btn-item-gallery').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = trigger.getAttribute('data-project-key');
      if (!key || !projectGalleries[key]) return;

      const gallery = projectGalleries[key];
      if (!gallery.images || gallery.images.length === 0) return;

      currentGallery = gallery.images;
      currentTitle   = gallery.title;
      currentImgIndex = 0;

      openLightbox();
      playClickAudio();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn)  prevBtn.addEventListener('click', () => changeImage(-1));
  if (nextBtn)  nextBtn.addEventListener('click', () => changeImage(1));

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
  });
}

function openLightbox() {
  const modal = document.getElementById('lightbox-modal');
  updateLightboxContent();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function changeImage(dir) {
  if (currentGallery.length <= 1) return;
  currentImgIndex = (currentImgIndex + dir + currentGallery.length) % currentGallery.length;
  updateLightboxContent();
  playHoverAudio();
}

function updateLightboxContent() {
  const imgEl     = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const counterEl = document.getElementById('lightbox-counter');

  if (!imgEl) return;

  imgEl.style.opacity = '0';
  setTimeout(() => {
    imgEl.src = currentGallery[currentImgIndex];
    imgEl.onload = () => { imgEl.style.opacity = '1'; };
  }, 80);

  if (captionEl) captionEl.textContent = `${currentTitle} — Görsel ${currentImgIndex + 1}`;
  if (counterEl) counterEl.textContent = `${currentImgIndex + 1} / ${currentGallery.length}`;
}

// ================================================================
// 16. CONTACT FORM & TOAST
// ================================================================
const CLOUDFLARE_WORKER_URL = 'https://dobby-contact-form.donacodex.workers.dev/';

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name    = document.getElementById('contact-name').value;
    const handle  = document.getElementById('contact-handle').value;
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value;

    showToast('⏳ Mesajınız iletiliyor...');

    if (CLOUDFLARE_WORKER_URL && !CLOUDFLARE_WORKER_URL.includes('YOUR_CLOUDFLARE')) {
      try {
        const res = await fetch(CLOUDFLARE_WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, handle, service, message })
        });
        if (res.ok) {
          showToast('✔ Mesajınız doğrudan Dobby B\'nin e-posta kutusuna ulaştı!');
          form.reset();
          return;
        }
      } catch (err) {
        console.warn('Worker fallback:', err);
      }
    }

    setTimeout(() => {
      showToast('✔ E-posta istemciniz açılıyor...');
      const subject = encodeURIComponent(`[İletişim Talebi] ${service} - ${name}`);
      const body    = encodeURIComponent(`Gönderen: ${name} (${handle})\nHizmet: ${service}\n\nMesaj:\n${message}`);
      window.location.href = `mailto:dobbyb.aidev@gmail.com?subject=${subject}&body=${body}`;
    }, 1000);
  });
}

function showToast(msg) {
  const toast    = document.getElementById('toast-bar');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}
