/* ====================================================
   Alkan (Dobby B) — Senior Engineer Minimalist Script
   Per-Project Lightbox Engine, Auto Asset Discovery & i18n
   ==================================================== */

// 1. i18n Translation Dictionary
const dictionary = {
  tr: {
    nav_about: "Hakkımda",
    nav_projects: "Projelerim",
    nav_store: "Veri Setleri",
    nav_stack: "Teknolojiler",
    nav_contact: "İletişim",
    store_title: "Whop Store & Veri Seti Merkezi",
    status_text: "Yeni projelere açık",
    hero_title: "Otonom Yapay Zeka Ajanları ve Algoritmik Ticaret Sistemleri Geliştiriyorum.",
    hero_bio: "Çoklu-ajan mimarileri (Multi-Agent Swarms), PyTorch tabanlı derin pekiştirmeli öğrenme (Deep RL) botları ve açık kaynaklı web platformları tasarlıyorum. Geliştirdiğim tüm araç ve kütüphaneleri GitHub üzerinde yayınlıyorum.",
    btn_explore: "Projeleri İncele ↓",
    focus_title: "Odaklandığım Mimariler",
    ab_card1_title: "Otonom Yapay Zeka Ajanları",
    ab_card1_desc: "Birden fazla AI ajanının (CEO, Araştırmacı, Yazılımcı) birbiriyle WebSocket üzerinden haberleşerek otonom görev yaptığı sistemler kuruyorum.",
    ab_card2_title: "Algoritmik Ticaret & Botlar",
    ab_card2_desc: "Binance ve kripto piyasaları için PyTorch ile derin pekiştirmeli öğrenme (ApexBrain) ve ATR merkezlemeli Grid botları tasarlıyorum.",
    ab_card3_title: "AI Platformları & Ürünler",
    ab_card3_desc: "Agent Critiq gibi yapay zeka araçlarını inceleyen, dahili MCP sunucusu sunan ve açık veri seti sağlayan web platformları geliştiriyorum.",
    projects_title: "Geliştirdiğim Projeler",
    prj_donacodexvision: "Transformer mimarisiyle özel olarak eğitilen finansal dil modeli (LLM). Kripto piyasa verileri, ABD Tahvil faizleri, X (Twitter) canlı haber akışı ve trader psikolojisi veri setiyle beslenerek canlı sohbet ve risk analizi sunar.",
    prj_agentcritiq: "100+ AI aracı ve otonom ajanı inceleyen web platformu. Claude/Cursor gibi yapay zekaların doğrudan veritabanını sorgulaması için dahili MCP Server ve Hugging Face açık veri seti içerir.",
    prj_donacodex: "4 otonom AI düğümünün (CEO, Araştırmacı, Yazılımcı, Analist) Socket.IO WebSockets haberleşmesi ve Firebase Firestore ile sanal bir yazılım şirketini yönettiği mimari.",
    prj_donanexus: "ApexBrain — PyTorch ile geliştirdiğim çift politikalı sinir ağı (Actor-Critic). Binance Futures üzerinde 7/24 otonom karar verip dinamik ATR risk bantları ile işlem yürütür.",
    prj_ailab: "Farklı LLM mimarilerini, açık kaynaklı HuggingFace modellerini ve deneysel prompt boru hatlarını kıyaslamak için tasarlanan araştırma ortamı.",
    prj_promptbuilder: "Gemini API altyapısını kullanarak sohbet üzerinden 8 farklı kategoride (Web, Mobile, Crypto, SEO...) mükemmel prompt'lar oluşturan, PDF/JSON export alan Studio.",
    prj_donagrid: "Binance spot piyasası için dinamik ATR (Average True Range) merkezlemeli ve RSI zehirli piyasa korumalı ızgara alım-satım algoritması.",
    prj_donaquantum: "CrewAI ve OpenAI GPT / Gemini API tabanlı çoklu-ajan takımı (Scanner, Analyst, Risk Manager, Executor). Binance Futures piyasasında kaldıraçlı/spot fırsatları tespit eder, CVD/OI/Emir Akışı analizi ile otonom işlem önerileri ve alım-satım kararları üretir.",
    prj_coinempire: "10,000+ satır TypeScript ile inşa edilen gerçek zamanlı multiplayer oyun. Firebase Firestore onSnapshot senkronizasyonu, madencilik ve Wordle tarzı hack mini-oyunu.",
    prj_zamaninbekcisi: "780 satır pure TypeScript hikaye motoruyla yazılmış; Antik Mısır MÖ 2500, Orta Çağ ve Siber 2087 arasında geçen dallanmalı macera oyunu.",
    stack_title: "Kullandığım Teknolojiler",
    contact_title: "İletişime Geçin",
    contact_sub: "Yeni projeler, algoritmik sistemler veya iş birliği fikirleri için bana dilediğiniz zaman e-posta atabilirsiniz."
  },
  en: {
    nav_about: "About",
    nav_projects: "Projects",
    nav_stack: "Stack",
    nav_contact: "Contact",
    status_text: "Available for new work",
    hero_title: "I Build Autonomous AI Agents and Quantitative Systems.",
    hero_bio: "Specializing in Multi-Agent Swarm architectures, Deep Reinforcement Learning (Deep RL) crypto bots, and web platforms. All tools and repositories are shared open-source.",
    btn_explore: "Explore Work ↓",
    focus_title: "Core Architectural Focus",
    ab_card1_title: "Autonomous AI Agents",
    ab_card1_desc: "Architecting multi-agent systems where LLM nodes (CEO, Researcher, Engineer) coordinate via Socket.IO WebSockets to execute tasks.",
    ab_card2_title: "Algorithmic Trading & Bots",
    ab_card2_desc: "Designing crypto trading bots using PyTorch dual-policy Deep RL (ApexBrain) and dynamic ATR-recentered grid algorithms for Binance.",
    ab_card3_title: "AI Platforms & Products",
    ab_card3_desc: "Building platforms like Agent Critiq that curate AI tools, feature native MCP Servers for AI assistants, and publish open datasets.",
    projects_title: "Featured Projects",
    prj_donacodexvision: "Custom Transformer LLM foundation model fine-tuned on proprietary financial datasets. Trained on crypto market data, US Treasury yield bonds, X (Twitter) crypto news streams, and trader execution psychology.",
    prj_agentcritiq: "Curated review platform for 100+ AI tools and autonomous agents. Features native MCP Server integration, open Hugging Face dataset, and AI-crawler search optimization.",
    prj_donacodex: "Multi-agent company simulation OS. Autonomous AI agent nodes (CEO, Researcher, Engineer, Analyst) operating in a persistent game loop with Socket.IO telemetry and Firebase state.",
    prj_donanexus: "ApexBrain — a dual-policy PyTorch neural network (Actor-Critic) executing 24/7 autonomous trades on Binance Futures with dynamic ATR volatility banding.",
    prj_ailab: "Experimental research sandbox for benchmarking model architectures, open-source HuggingFace models, and prompt pipelines.",
    prj_promptbuilder: "Conversational prompt engineering studio powered by Gemini API for interactive requirement compilation, 8 domain categories, and PDF/JSON export.",
    prj_donagrid: "Binance spot grid trading bot featuring dynamic ATR recentering and RSI anti-toxicity market filters.",
    prj_donaquantum: "Multi-agent AI crypto trading crew built on CrewAI and OpenAI GPT / Gemini API. Coordinates specialized agents (Scanner, Analyst, Risk Manager, Executor) to analyze Binance Futures leveraged opportunities via CVD, Open Interest, and LLM order flow reasoning.",
    prj_coinempire: "Real-time multiplayer strategy game built with 10,000+ lines of TypeScript. Powered by Firebase Firestore onSnapshot sync, mining algorithms, and Wordle-style hack puzzles.",
    prj_zamaninbekcisi: "Time-travel branching text adventure written with a 780-line pure TypeScript story engine spanning Ancient Egypt, Medieval era, and Cyberpunk 2087.",
    stack_title: "Technical Stack",
    contact_title: "Get In Touch",
    contact_sub: "Feel free to reach out via email or GitHub for collaboration, AI agent engineering, or quantitative tools."
  }
};

let activeLang = localStorage.getItem('dobby_lang') || 'tr';

function applyLanguage(lang) {
  if (!dictionary[lang]) return;
  activeLang = lang;
  localStorage.setItem('dobby_lang', lang);

  document.querySelectorAll('#lang-toggle .lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (dictionary[lang][key]) {
      node.textContent = dictionary[lang][key];
    }
  });
}

// 2. Project Screenshot Mapping & Dynamic Asset Discovery Engine
const projectGalleries = {
  'ai-prompt-builder': {
    title: 'AI Prompt Builder',
    prefix: 'ai_prompt_builder',
    images: [
      './assets/ai_prompt_builder_1.jpg',
      './assets/ai_prompt_builder_2.jpg',
      './assets/ai_prompt_builder_3.jpg',
      './assets/ai_prompt_builder_4.jpg',
      './assets/ai_prompt_builder_5.jpg',
      './assets/ai_prompt_builder_6.jpg',
      './assets/ai_prompt_builder_7.jpg',
      './assets/ai_prompt_builder_8.jpg',
      './assets/ai_prompt_builder_9.jpg',
      './assets/ai_prompt_builder_10.jpg'
    ]
  },
  'zamanin-bekcisi': {
    title: 'Zamanın Bekçisi',
    prefix: 'zamanin_bekcisi',
    images: [
      './assets/zamanin_bekcisi_1.jpg',
      './assets/zamanin_bekcisi_2.jpg',
      './assets/zamanin_bekcisi_3.jpg',
      './assets/zamanin_bekcisi_4.jpg',
      './assets/zamanin_bekcisi_5.jpg',
      './assets/zamanin_bekcisi_6.jpg',
      './assets/zamanin_bekcisi_7.jpg',
      './assets/zamanin_bekcisi_8.jpg',
      './assets/zamanin_bekcisi_9.jpg'
    ]
  },
  'agent-critiq': {
    title: 'Agent Critiq',
    prefix: 'agent_critiq',
    images: [
      './assets/agent_critiq_1.jpg',
      './assets/agent_critiq_2.jpg',
      './assets/agent_critiq_3.jpg',
      './assets/agent_critiq_4.jpg',
      './assets/agent_critiq_5.jpg',
      './assets/agent_critiq_6.jpg',
      './assets/agent_critiq_7.jpg'
    ]
  },
  'dona-codex': {
    title: 'Dona Codex: Overmind',
    prefix: 'dona_codex_overmind',
    images: [
      './assets/dona_codex_overmind_1.jpg',
      './assets/dona_codex_overmind_2.jpg',
      './assets/dona_codex_overmind_3.jpg',
      './assets/dona_codex_overmind_4.jpg',
      './assets/dona_codex_overmind_5.jpg',
      './assets/dona_codex_overmind_6.jpg',
      './assets/dona_codex_overmind_7.jpg',
      './assets/dona_codex_overmind_8.jpg',
      './assets/dona_codex_overmind_9.jpg',
      './assets/dona_codex_overmind_10.jpg',
      './assets/dona_codex_overmind_11.jpg',
      './assets/dona_codex_overmind_12.jpg',
      './assets/dona_codex_overmind_13.jpg',
      './assets/dona_codex_overmind_14.jpg',
      './assets/dona_codex_overmind_15.jpg',
      './assets/dona_codex_overmind_16.jpg',
      './assets/dona_codex_overmind_17.jpg',
      './assets/dona_codex_overmind_18.jpg',
      './assets/dona_codex_overmind_19.jpg'
    ]
  },
  'dona-codex-vision': {
    title: 'Dona Codex: Vision',
    prefix: 'dona_codex_vision',
    images: [
      './assets/dona_codex_vision_1.jpg',
      './assets/dona_codex_vision_2.jpg',
      './assets/dona_codex_vision_3.jpg',
      './assets/dona_codex_vision_4.jpg',
      './assets/dona_codex_vision_5.jpg',
      './assets/dona_codex_vision_6.jpg',
      './assets/dona_codex_vision_7.jpg',
      './assets/dona_codex_vision_8.jpg',
      './assets/dona_codex_vision_9.jpg',
      './assets/dona_codex_vision_10.jpg',
      './assets/dona_codex_vision_11.jpg',
      './assets/dona_codex_vision_12.jpg',
      './assets/dona_codex_vision_13.jpg'
    ]
  },
  'dona-nexus': {
    title: 'Dona Nexus (ApexBrain)',
    prefix: 'dona_nexus',
    images: [
      './assets/dona_nexus_1.jpg',
      './assets/dona_nexus_2.jpg',
      './assets/dona_nexus_3.jpg',
      './assets/dona_nexus_4.jpg',
      './assets/dona_nexus_5.jpg',
      './assets/dona_nexus_6.jpg',
      './assets/dona_nexus_7.jpg',
      './assets/dona_nexus_8.jpg'
    ]
  },
  'ai-coin-empire': {
    title: 'AI Coin Empire',
    prefix: 'ai_coin_empire',
    images: [
      './assets/ai_coin_empire_1.jpg',
      './assets/ai_coin_empire_2.jpg',
      './assets/ai_coin_empire_3.jpg',
      './assets/ai_coin_empire_4.jpg',
      './assets/ai_coin_empire_5.jpg',
      './assets/ai_coin_empire_6.jpg',
      './assets/ai_coin_empire_7.jpg',
      './assets/ai_coin_empire_8.jpg',
      './assets/ai_coin_empire_9.jpg',
      './assets/ai_coin_empire_10.jpg',
      './assets/ai_coin_empire_11.jpg',
      './assets/ai_coin_empire_12.jpg',
      './assets/ai_coin_empire_13.jpg',
      './assets/ai_coin_empire_14.jpg',
      './assets/ai_coin_empire_15.jpg',
      './assets/ai_coin_empire_16.jpg',
      './assets/ai_coin_empire_17.jpg',
      './assets/ai_coin_empire_18.jpg',
      './assets/ai_coin_empire_19.jpg',
      './assets/ai_coin_empire_20.jpg',
      './assets/ai_coin_empire_21.jpg'
    ]
  },
  'dona-grid': {
    title: 'Dona Grid',
    prefix: 'dona_grid',
    images: [
      './assets/dona_grid_1.jpg',
      './assets/dona_grid_2.jpg',
      './assets/dona_grid_3.jpg',
      './assets/dona_grid_4.jpg',
      './assets/dona_grid_5.jpg'
    ]
  },
  'dona-quantum': {
    title: 'Dona Quantum',
    prefix: 'dona_quantum',
    images: [
      './assets/dona_quantum_1.jpg',
      './assets/dona_quantum_2.jpg',
      './assets/dona_quantum_3.jpg',
      './assets/dona_quantum_4.jpg',
      './assets/dona_quantum_5.jpg',
      './assets/dona_quantum_6.jpg',
      './assets/dona_quantum_7.jpg',
      './assets/dona_quantum_8.jpg'
    ]
  },
  'dona-ai-lab': { title: 'Dona AI Lab', prefix: 'dona_ai_lab', images: [] }
};

// Automatic Asset Discovery Scanner for Newly Added Images
function discoverNewAssets() {
  Object.keys(projectGalleries).forEach((key) => {
    const item = projectGalleries[key];
    if (item.images.length > 0) return; // Already populated

    const discovered = [];
    const maxCheck = 30;

    function checkNext(idx) {
      if (idx > maxCheck) {
        if (discovered.length > 0) {
          item.images = discovered;
          updateCardThumbnailUI(key);
        }
        return;
      }

      const img = new Image();
      const testPath = `./assets/${item.prefix}_${idx}.jpg`;
      img.src = testPath;

      img.onload = () => {
        discovered.push(testPath);
        checkNext(idx + 1);
      };

      img.onerror = () => {
        checkNext(idx + 1);
      };
    }

    checkNext(1);
  });
}

function updateCardThumbnailUI(projKey) {
  const item = projectGalleries[projKey];
  if (!item || item.images.length === 0) return;

  const cardThumbBox = document.querySelector(`.card-thumb-box[data-project-key="${projKey}"]`);
  if (!cardThumbBox) return;

  cardThumbBox.innerHTML = `
    <img src="${item.images[0]}" alt="${item.title}" class="card-thumb-img" />
    <span class="card-thumb-badge">📸 ${item.images.length} Görsel (İncele)</span>
  `;

  const footerCard = cardThumbBox.closest('.project-card');
  if (footerCard) {
    const triggerBtn = footerCard.querySelector('.gallery-trigger-btn');
    if (triggerBtn) {
      triggerBtn.className = 'gallery-trigger-btn';
      triggerBtn.setAttribute('data-project-key', projKey);
      triggerBtn.innerHTML = `📸 Galeri (${item.images.length})`;
    }
  }
}

let activeGalleryKey = null;
let activeImageIndex = 0;

function initPerProjectLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const modalCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (!modal || !modalImg) return;

  function updateLightboxView() {
    if (!activeGalleryKey || !projectGalleries[activeGalleryKey]) return;
    const gallery = projectGalleries[activeGalleryKey];
    const images = gallery.images;

    if (images.length === 0) return;

    modalImg.src = images[activeImageIndex];
    if (modalCaption) modalCaption.textContent = `${gallery.title} — Screen ${activeImageIndex + 1}`;
    if (modalCounter) modalCounter.textContent = `${activeImageIndex + 1} / ${images.length}`;
  }

  function openLightbox(projKey) {
    if (!projectGalleries[projKey] || projectGalleries[projKey].images.length === 0) return;
    activeGalleryKey = projKey;
    activeImageIndex = 0;
    updateLightboxView();
    modal.classList.add('active');
  }

  function closeLightbox() {
    modal.classList.remove('active');
  }

  function nextImage() {
    if (!activeGalleryKey || !projectGalleries[activeGalleryKey]) return;
    const count = projectGalleries[activeGalleryKey].images.length;
    if (count === 0) return;
    activeImageIndex = (activeImageIndex + 1) % count;
    updateLightboxView();
  }

  function prevImage() {
    if (!activeGalleryKey || !projectGalleries[activeGalleryKey]) return;
    const count = projectGalleries[activeGalleryKey].images.length;
    if (count === 0) return;
    activeImageIndex = (activeImageIndex - 1 + count) % count;
    updateLightboxView();
  }

  // Attach triggers to thumb boxes & gallery buttons
  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project-key]');
    if (trigger) {
      const projKey = trigger.getAttribute('data-project-key');
      if (projKey && projectGalleries[projKey] && projectGalleries[projKey].images.length > 0) {
        e.preventDefault();
        openLightbox(projKey);
      }
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

// 3. Category Filter Tabs Engine
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// 4. Clipboard Toast Notification
function initClipboardToast() {
  const toastBar = document.getElementById('toast-bar');
  const toastMsg = document.getElementById('toast-msg');

  function copyText(text, message) {
    navigator.clipboard.writeText(text).then(() => {
      if (toastBar && toastMsg) {
        toastMsg.textContent = message || '✔ E-posta adresi kopyalandı!';
        toastBar.classList.add('show');
        setTimeout(() => toastBar.classList.remove('show'), 2800);
      }
    });
  }

  const copyEmailBtn = document.getElementById('btn-copy-email');
  const contactEmailBtn = document.getElementById('contact-email-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => copyText('contact@donacodex.com', '✔ E-posta adresi kopyalandı!'));
  }
  if (contactEmailBtn) {
    contactEmailBtn.addEventListener('click', () => copyText('contact@donacodex.com', '✔ E-posta adresi kopyalandı!'));
  }
}

// Cloudflare Worker Endpoint URL (Set your deployed worker URL here)
const CLOUDFLARE_WORKER_URL = 'https://dobby-contact-form.donacodex.workers.dev/';

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const handle = document.getElementById('contact-handle').value;
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value;

    const payload = { name, handle, service, message };

    if (CLOUDFLARE_WORKER_URL && !CLOUDFLARE_WORKER_URL.includes('YOUR_CLOUDFLARE_WORKER_URL')) {
      showToast('⏳ Mesajınız e-posta kutusuna iletiliyor...');
      try {
        const res = await fetch(CLOUDFLARE_WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          showToast('✔ Mesajınız doğrudan Dobby B\'nin Gmail kutusuna iletildi!');
          form.reset();
          return;
        }
      } catch (err) {
        console.warn('Cloudflare Worker fallback mailto triggered:', err);
      }
    }

    // Fallback Mailto
    showToast('✔ İletişim talebiniz kurgulandı! E-posta istemciniz açılıyor...');
    const subject = encodeURIComponent(`[İletişim Talebi] ${service} - ${name}`);
    const body = encodeURIComponent(`Merhaba Dobby B,\n\nBen ${name} (${handle}).\n\nİlgilendiğim Hizmet: ${service}\n\nProje Detayı / Mesaj:\n${message}\n\nİletişim Bilgilerim: ${handle}`);
    
    setTimeout(() => {
      window.location.href = `mailto:dobbyb.aidev@gmail.com?subject=${subject}&body=${body}`;
    }, 1000);
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast-bar');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        applyLanguage(btn.getAttribute('data-lang'));
      });
    });
  }

  applyLanguage(activeLang);
  initPerProjectLightbox();
  discoverNewAssets();
  initCategoryFilters();
  initClipboardToast();
});
