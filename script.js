/* ====================================================
   Dobby B (@dobby-aidev) — AI Dev Minimalist Script
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
    prj_coinempire: "10,000+ satır TypeScript ile inşa edilen gerçek zamanlı multiplayer oyun. Firebase Firestore `onSnapshot` senkronizasyonu, madencilik ve Wordle tarzı hack mini-oyunu.",
    prj_donagrid: "Binance spot piyasası için dinamik ATR (Average True Range) merkezlemeli ve RSI zehirli piyasa korumalı ızgara alım-satım algoritması.",
    prj_donaquantum: "CrewAI ve OpenAI GPT / Gemini API tabanlı çoklu-ajan takımı. Binance Futures piyasasında kaldıraçlı/spot fırsatları tespit eder, CVD/OI/Emir Akışı analizi ile otonom işlem önerileri üretir.",
    prj_zamaninbekcisi: "780 satır pure TypeScript hikaye motoruyla yazılmış; Antik Mısır MÖ 2500, Orta Çağ ve Siber 2087 arasında geçen dallanmalı macera oyunu.",
    stack_title: "Kullandığım Teknolojiler",
    contact_title: "İletişime Geçin",
    contact_sub: "Otonom AI mimarileri, algoritmik sistemler veya danışmanlık talepleri için dilediğiniz kanaldan ulaşabilirsiniz."
  },
  en: {
    nav_about: "About",
    nav_projects: "Projects",
    nav_store: "Datasets & Store",
    nav_stack: "Tech Stack",
    nav_contact: "Contact",
    store_title: "Whop Store & Datasets Hub",
    status_text: "Available for projects",
    hero_title: "Building Autonomous AI Swarms & Algorithmic Trading Systems.",
    hero_bio: "Designing multi-agent swarms, PyTorch-based deep reinforcement learning trading bots, and open-source AI web platforms. Publishing models and tools on GitHub & HuggingFace.",
    btn_explore: "Explore Work ↓",
    focus_title: "Architectural Focus",
    ab_card1_title: "Autonomous AI Swarms",
    ab_card1_desc: "Building multi-agent nodes (CEO, Researcher, Engineer) communicating via WebSockets for fully autonomous task execution.",
    ab_card2_title: "Quantitative Trading & Bots",
    ab_card2_desc: "Engineering PyTorch Deep RL neural networks (ApexBrain) and ATR-centered grid trading bots for Binance crypto futures.",
    ab_card3_title: "AI Products & Platforms",
    ab_card3_desc: "Architecting web platforms like Agent Critiq with native MCP servers and open HuggingFace datasets for AI crawlers.",
    projects_title: "Featured Engineering Work",
    prj_donacodexvision: "Proprietary Transformer LLM foundation model fine-tuned on crypto order flow, US 10-Year Treasury Yield bonds, X live news feeds, and trader psychology.",
    prj_agentcritiq: "AI-native discovery platform indexing 100+ AI tools and autonomous agents. Features native MCP Server and open Hugging Face dataset.",
    prj_donacodex: "Multi-agent company simulation OS running 4 autonomous AI nodes via Socket.IO WebSockets and Firebase Firestore.",
    prj_donanexus: "ApexBrain — Dual-policy PyTorch neural network (Actor-Critic) executing 24/7 autonomous trades on Binance Futures with dynamic ATR risk bands.",
    prj_ailab: "Experimental research sandbox for benchmarking open-source LLMs, HuggingFace models, and prompt pipelines.",
    prj_promptbuilder: "Conversational prompt engineering studio built on Gemini API with 8 domain categories, PDF/JSON export, and coin economy.",
    prj_coinempire: "Real-time multiplayer strategy game with 10,000+ lines of TypeScript, Firebase Firestore `onSnapshot` sync, and Wordle hack puzzle.",
    prj_donagrid: "Spot grid trading bot for Binance with dynamic ATR recentering and RSI anti-toxicity market protection.",
    prj_donaquantum: "Multi-agent AI trading crew built on CrewAI and OpenAI GPT/Gemini API for CVD, Open Interest, and order flow analysis.",
    prj_zamaninbekcisi: "Branching interactive text adventure driven by a 780-line pure TypeScript engine spanning Ancient Egypt MÖ 2500 to Cyberpunk 2087.",
    stack_title: "Technical Stack",
    contact_title: "Get In Touch",
    contact_sub: "Feel free to reach out for autonomous AI agent architectures, quantitative systems, or consultancy."
  }
};

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

// 3. State Variables
let currentLang = 'tr';
let currentGallery = [];
let currentImageIndex = 0;
let currentProjectTitle = '';

// 4. Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupLanguageSwitcher();
  setupFilterTabs();
  setupLightboxModal();
  setupContactForm();
});

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

// 5. Language Switcher Logic
function setupLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.target.getAttribute('data-lang');
      if (selectedLang === currentLang) return;

      currentLang = selectedLang;
      langBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      applyTranslations(currentLang);
    });
  });
}

function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dictionary[lang] && dictionary[lang][key]) {
      el.textContent = dictionary[lang][key];
    }
  });
}

// 6. Category Filtering System
function setupFilterTabs() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#projects .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// 7. Lightbox Modal System
function setupLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  // Trigger buttons
  document.querySelectorAll('.gallery-trigger-btn, .card-thumb-box').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const projectKey = trigger.getAttribute('data-project-key');
      if (!projectKey || !projectGalleries[projectKey]) return;

      const galleryData = projectGalleries[projectKey];
      if (galleryData.images.length === 0) return; // Repoya doğrudan giden projeler

      currentGallery = galleryData.images;
      currentProjectTitle = galleryData.title;
      currentImageIndex = 0;

      openLightbox();
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  });
}

function openLightbox() {
  const modal = document.getElementById('lightbox-modal');
  updateLightboxContent();
  modal.classList.add('active');
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.remove('active');
}

function showPrevImage() {
  if (currentGallery.length <= 1) return;
  currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
  updateLightboxContent();
}

function showNextImage() {
  if (currentGallery.length <= 1) return;
  currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const counterEl = document.getElementById('lightbox-counter');

  imgEl.src = currentGallery[currentImageIndex];
  captionEl.textContent = `${currentProjectTitle} — Görsel ${currentImageIndex + 1}`;
  counterEl.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
}
