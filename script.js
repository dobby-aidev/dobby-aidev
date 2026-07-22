/* ====================================================
   Dobby B — Clean Script & TR/EN i18n Engine
   ==================================================== */

// 1. Translation Dictionary
const dictionary = {
  en: {
    nav_about: "About",
    nav_projects: "Projects",
    nav_stack: "Stack",
    nav_contact: "Contact",
    hero_status: "Open for Senior AI Engineering & Quant Architecture Roles",
    hero_title_prefix: "Engineering",
    hero_title_suffix: "& Quantitative Trading Engines",
    hero_bio: "I am Alkan (Dobby B). I design and build production-grade multi-agent orchestration frameworks, deep reinforcement learning trading architectures (ApexBrain), and AI platform infrastructure.",
    meta_systems: "Deployed Systems",
    meta_reviews: "Curated AI Reviews",
    meta_uptime: "Cloud Uptime",
    btn_explore: "View Codebases & Systems",
    about_heading: "Core Focus Areas",
    ab_card1_title: "Autonomous Agent Engineering",
    ab_card1_desc: "Architecting robust multi-agent state machines where autonomous LLM nodes (CEO, Researcher, Engineer, Analyst) execute asynchronous workflows with WebSocket telemetry and state persistence.",
    ab_card2_title: "Deep RL & Quant Systems",
    ab_card2_desc: "Building production quantitative futures trading engines (ApexBrain) using dual-policy PyTorch neural networks, custom action masking, entropy confidence, and live execution on Binance.",
    ab_card3_title: "AI Products & MCP Protocols",
    ab_card3_desc: "Founder of Agent Critiq — developing AI discovery platforms integrated with Model Context Protocol (MCP) servers, Hugging Face open datasets, and GEO crawler optimization.",
    projects_heading: "Featured Systems",
    prj_agentcritiq: "Curated platform for 100+ AI tools and autonomous agents. Includes a native MCP Server letting Claude/Cursor query the live database, an open Hugging Face dataset, and AI-crawler optimized GEO index.",
    cat_ai: "AI Agents & Multi-Agent Platforms",
    prj_donacodex: "Multi-agent simulation where autonomous AI nodes (CEO, Researcher, Engineer, Analyst) run a software company loop with real-time Socket.IO WebSockets and Firebase state.",
    prj_ailab: "Experimental sandbox for testing novel model architectures, prompt evaluation pipelines, and Hugging Face Transformers benchmarks.",
    prj_promptbuilder: "Conversational prompt engineering tool using Gemini API for interactive requirement extraction, PDF/JSON export, and state management.",
    cat_quant: "Deep RL & Quantitative Systems",
    prj_donanexus: "ApexBrain — dual-policy PyTorch neural network with separate entry/exit heads, action masking, entropy confidence metrics, and 24/7 cloud execution on Binance Futures.",
    prj_donagrid: "Binance spot grid trading engine with dynamic ATR recentering, RSI anti-toxicity filters, 0.5s WebSocket latency, and desktop GUI.",
    prj_donaquantum: "Quantitative engine combining reinforcement learning with classical backtesting, adaptive sizing, and real-time market data pipelines.",
    cat_automation: "Automation & Applications",
    prj_donamusic: "Automation framework featuring human behavior simulation (bezier mouse curves), RL behavior agent, ADB mobile control, and Flask analytics dashboard.",
    prj_coinempire: "Real-time strategy engine on Firebase Firestore. Features mining algorithms, hacking puzzles, market pricing, and DONA AI state loop.",
    prj_zamaninbekcisi: "Interactive fiction game set across multiple historical timelines. Energy resource management and directed story graph architecture.",
    stack_heading: "Technical Stack",
    contact_heading: "Initiate Collaboration",
    contact_sub: "Available for Senior AI Systems Engineering, Deep RL Quant Architecture, and Consulting."
  },
  tr: {
    nav_about: "Hakkımda",
    nav_projects: "Projeler",
    nav_stack: "Teknolojiler",
    nav_contact: "İletişim",
    hero_status: "Kıdemli AI Mühendisliği ve Quant Rollerine Açık",
    hero_title_prefix: "Otonom",
    hero_title_suffix: "ve Kantitatif Alım-Satım Sistemleri",
    hero_bio: "Ben Alkan (Dobby B). Üretim ortamına hazır çoklu-ajan orkestrasyon çerçeveleri, derin pekiştirmeli öğrenme alım-satım mimarileri (ApexBrain) ve AI altyapıları tasarlayıp geliştiriyorum.",
    meta_systems: "Canlı Sistem",
    meta_reviews: "AI İncelemesi",
    meta_uptime: "Kesintisiz Bulut Süresi",
    btn_explore: "Kod Depolarını İnceleyin",
    about_heading: "Ana Odak Alanları",
    ab_card1_title: "Otonom Ajan Mühendisliği",
    ab_card1_desc: "Otonom LLM düğümlerinin (CEO, Araştırmacı, Mühendis, Analist) WebSocket telemetrisi ve durum kalıcılığı ile asenkron iş akışlarını çalıştırdığı dayanıklı çoklu-ajan sistemleri tasarlıyorum.",
    ab_card2_title: "Derin RL ve Quant Sistemler",
    ab_card2_desc: "Çift politikalı PyTorch sinir ağları (ApexBrain), özel eylem maskeleme, entropi güveni ve Binance üzerinde canlı çalıştırma içeren kantitatif vadeli işlem motorları geliştiriyorum.",
    ab_card3_title: "AI Ürünleri ve MCP Protokolleri",
    ab_card3_desc: "Agent Critiq'in kurucusuyum — Model Context Protocol (MCP) sunucuları, Hugging Face açık veri setleri ve GEO arama optimizasyonlu AI keşif platformları kuruyorum.",
    projects_heading: "Öne Çıkan Sistemler",
    prj_agentcritiq: "100+ AI aracı ve otonom ajan için kürate edilmiş platform. Claude/Cursor'ın veritabanını sorgulamasını sağlayan MCP sunucusu, açık Hugging Face veri seti ve GEO indeksi içerir.",
    cat_ai: "Yapay Zeka Ajanları ve Çoklu-Ajan Platformları",
    prj_donacodex: "Otonom AI düğümlerinin (CEO, Araştırmacı, Mühendis, Analist) Socket.IO ve Firebase ile sanal yazılım şirketi işlettiği çoklu-ajan simülasyonu.",
    prj_ailab: "Model mimarilerini, istem değerlendirme hatlarını ve Hugging Face Transformers testlerini değerlendirmek için deneysel araştırma ortamı.",
    prj_promptbuilder: "İnteraktif gereksinim çıkarımı, PDF/JSON aktarımı ve durum yönetimi için Gemini API kullanan sohbet tabanlı istem aracı.",
    cat_quant: "Derin Pekiştirmeli Öğrenme ve Kantitatif Sistemler",
    prj_donanexus: "ApexBrain — Ayrı giriş/çıkış kafaları, eylem maskeleme, entropi güveni ve AWS üzerinde 7/24 otonom Binance Futures çalıştırmasına sahip çift politikalı PyTorch sinir ağı.",
    prj_donagrid: "Dinamik ATR merkezleme, RSI anti-toksisite filtreleri, 0.5s WebSocket gecikmesi ve masaüstü GUI içeren Binance spot ızgara botu.",
    prj_donaquantum: "Pekiştirmeli öğrenmeyi klasik geriye dönük testler, uyarlanabilir boyutlandırma ve canlı veri hatlarıyla birleştiren kantitatif motor.",
    cat_automation: "Otomasyon ve Uygulamalar",
    prj_donamusic: "İnsan davranışı simülasyonu (fare eğrileri), RL davranış ajanı, ADB mobil kontrolü ve Flask analitik paneli içeren otomasyon çerçevesi.",
    prj_coinempire: "Firebase Firestore üzerinde gerçek zamanlı strateji motoru. Madencilik algoritmaları, şifre bulmacaları ve DONA AI durum döngüsü içerir.",
    prj_zamaninbekcisi: "Tarihsel zaman çizelgelerinde geçen etkileşimli macera oyunu. Enerji kaynak yönetimi ve yönlendirilmiş hikaye grafiği mimarisi.",
    stack_heading: "Teknik Yetkinlikler",
    contact_heading: "İş Birliği Başlatın",
    contact_sub: "Kıdemli Yapay Zeka Sistem Mühendisliği, Derin RL Quant Mimarisi ve Danışmanlık için uygundur."
  }
};

let activeLang = localStorage.getItem('dobby_lang') || 'en';

function applyLanguage(lang) {
  if (!dictionary[lang]) return;
  activeLang = lang;
  localStorage.setItem('dobby_lang', lang);

  // Update button active state
  document.querySelectorAll('#lang-toggle .lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Replace text for all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (dictionary[lang][key]) {
      node.textContent = dictionary[lang][key];
    }
  });
}

// Bind events on load
document.addEventListener('DOMContentLoaded', () => {
  // Bind Language Switcher Buttons
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = btn.getAttribute('data-lang');
        applyLanguage(selectedLang);
      });
    });
  }

  // Initial Language Set
  applyLanguage(activeLang);

  // Initialize Project Image Sliders
  initImageSliders();
});

// 2. Multi-Image Slider Loader
function initImageSliders() {
  const imageContainers = document.querySelectorAll('[data-images-base]');

  imageContainers.forEach((box) => {
    const baseName = box.getAttribute('data-images-base');
    if (!baseName) return;

    let validImages = [];
    const maxIndex = 4;

    function checkImage(idx) {
      if (idx > maxIndex) {
        renderSlider();
        return;
      }

      const testImg = new Image();
      const testPath = `./assets/${baseName}-${idx}.jpg`;
      testImg.src = testPath;

      testImg.onload = () => {
        validImages.push(testPath);
        checkImage(idx + 1);
      };

      testImg.onerror = () => {
        if (idx === 1) {
          // Fallback to baseName.jpg
          const fallbackImg = new Image();
          const fallbackPath = `./assets/${baseName}.jpg`;
          fallbackImg.src = fallbackPath;
          fallbackImg.onload = () => {
            validImages.push(fallbackPath);
            renderSlider();
          };
          fallbackImg.onerror = () => {
            box.style.display = 'none'; // Hide if no images exist
          };
        } else {
          renderSlider();
        }
      };
    }

    function renderSlider() {
      if (validImages.length === 0) {
        box.style.display = 'none';
        return;
      }

      box.innerHTML = '';
      let currentIndex = 0;

      const imgElement = document.createElement('img');
      imgElement.src = validImages[0];
      imgElement.className = 'project-preview-img';
      imgElement.alt = `${baseName} Preview`;
      box.appendChild(imgElement);

      if (validImages.length > 1) {
        // Create Previous / Next Arrows
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-btn prev';
        prevBtn.innerHTML = '&#10094;';
        prevBtn.onclick = (e) => {
          e.preventDefault();
          currentIndex = (currentIndex - 1 + validImages.length) % validImages.length;
          updateDisplay();
        };

        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-btn next';
        nextBtn.innerHTML = '&#10095;';
        nextBtn.onclick = (e) => {
          e.preventDefault();
          currentIndex = (currentIndex + 1) % validImages.length;
          updateDisplay();
        };

        box.appendChild(prevBtn);
        box.appendChild(nextBtn);

        // Create Navigation Dots
        const dotsBox = document.createElement('div');
        dotsBox.className = 'slider-dots';

        validImages.forEach((_, i) => {
          const dot = document.createElement('span');
          dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
          dot.onclick = (e) => {
            e.preventDefault();
            currentIndex = i;
            updateDisplay();
          };
          dotsBox.appendChild(dot);
        });

        box.appendChild(dotsBox);

        function updateDisplay() {
          imgElement.style.opacity = '0.3';
          setTimeout(() => {
            imgElement.src = validImages[currentIndex];
            imgElement.style.opacity = '1';
          }, 100);

          const dots = dotsBox.querySelectorAll('.slider-dot');
          dots.forEach((d, idx) => d.classList.toggle('active', idx === currentIndex));
        }
      }
    }

    checkImage(1);
  });
}

// 3. Console Info
console.log('%cDobby B (Alkan) — AI Systems Architect & Quant Engineer', 'color:#6366f1; font-weight:bold; font-size:14px;');
console.log('%cgithub.com/dobby-aidev | agentcritiq.com', 'color:#9ca3af; font-size:12px;');
