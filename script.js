/* ====================================================
   Alkan (Dobby B) — Personal Portfolio Script & TR/EN i18n
   ==================================================== */

// 1. Translation Dictionary (Natural Personal Voice)
const dictionary = {
  tr: {
    nav_about: "Hakkımda",
    nav_projects: "Projelerim",
    nav_stack: "Teknolojiler",
    nav_contact: "İletişim",
    hero_title_prefix: "Selam, ben Alkan.",
    hero_title_highlight: "Yapay zeka projeleri ve otonom araçlar geliştiriyorum.",
    hero_bio: "Kod yazmayı, AI ajanları kurmayı ve borsa/kripto için algoritmik araçlar geliştirmeyi seviyorum. GitHub üzerinde otonom ajanlardan borsa botlarına kadar yaptığım projeleri paylaşıyorum.",
    btn_explore: "Yaptığım Projeleri İncele ↓",
    about_heading: "Odaklandığım Alanlar",
    ab_card1_title: "Otonom Yapay Zeka Ajanları",
    ab_card1_desc: "Birden fazla AI ajanının (CEO, Araştırmacı, Yazılımcı) birbiriyle haberleşerek kendi kendine görev yaptığı sistemler kuruyorum.",
    ab_card2_title: "Algoritmik Ticaret & Botlar",
    ab_card2_desc: "Binance ve finans piyasaları için derin pekiştirmeli öğrenme (RL) ve ızgara (Grid) mantığıyla çalışan otomatik alım-satım botları geliştiriyorum.",
    ab_card3_title: "AI Platformları & Web Ürünleri",
    ab_card3_desc: "Agent Critiq gibi yapay zeka araçlarını inceleyen ve indeksleyen web ürünleri tasarlayıp canlıya alıyorum.",
    projects_heading: "Geliştirdiğim Sistemler",
    prj_agentcritiq: "100'den fazla yapay zeka aracını inceleyen web platformu. Claude ve Cursor gibi yapay zekaların doğrudan veritabanını sorgulaması için dahili MCP Sunucusu ve açık Hugging Face veri seti içerir.",
    cat_ai: "AI Ajanları ve Sistemler",
    prj_donacodex: "Farklı rollere sahip AI ajanlarının (CEO, Araştırmacı, Yazılımcı) gerçek zamanlı Socket.IO haberleşmesiyle sanal bir yazılım şirketini yönettiği simülasyon.",
    prj_ailab: "Farklı yapay zeka modellerini ve istem (prompt) testlerini denemek için kullandığım deneysel çalışma ortamı.",
    prj_promptbuilder: "Gemini API kullanarak sohbet üzerinden kaliteli ve hazır istemler (prompt) oluşturan web uygulaması.",
    cat_quant: "Alım-Satım Botları & Algoritmalar",
    prj_donanexus: "PyTorch ile geliştirdiğim çift politikalı sinir ağı (ApexBrain). Binance Futures üzerinde otonom karar verip işlem açıp kapatıyor.",
    prj_donagrid: "Binance spot piyasası için dinamik ATR merkezlemeli ve RSI korumalı grid alım-satım botu.",
    prj_donaquantum: "Geriye dönük testler (backtest) ve piyasa sinyalleri için geliştirdiğim strateji test altyapısı.",
    cat_automation: "Otomasyon ve Diğer Projeler",
    prj_donamusic: "İnsan fare hareketlerini simüle eden, Selenium ve mobil ADB destekli otomasyon altyapısı.",
    prj_coinempire: "Firebase Firestore altyapılı, madencilik, hack mini-oyunu ve piyasa ticareti içeren web oyunu.",
    prj_zamaninbekcisi: "Farklı zaman dönemlerinde geçen, envanterli ve dallanmalı metin macerası oyunu.",
    stack_heading: "Neler Kullanıyorum?",
    contact_heading: "İletişime Geçin",
    contact_sub: "Yeni projeler, fikirler veya iş birliği için bana GitHub veya bağlantılar üzerinden ulaşabilirsiniz."
  },
  en: {
    nav_about: "About",
    nav_projects: "Projects",
    nav_stack: "Stack",
    nav_contact: "Contact",
    hero_title_prefix: "Hi, I'm Alkan.",
    hero_title_highlight: "I build AI projects and autonomous tools.",
    hero_bio: "I like coding, building AI agent workflows, and quantitative trading tools for crypto/finance. On GitHub, I share open-source projects ranging from multi-agent systems to trading algorithms.",
    btn_explore: "Explore My Projects ↓",
    about_heading: "Core Focus",
    ab_card1_title: "Autonomous AI Agents",
    ab_card1_desc: "Building multi-agent systems where LLM nodes (CEO, Researcher, Engineer) coordinate to execute tasks autonomously.",
    ab_card2_title: "Algorithmic Trading & Bots",
    ab_card2_desc: "Developing crypto and futures trading bots using Deep Reinforcement Learning (RL) and dynamic grid strategies for Binance.",
    ab_card3_title: "AI Platforms & Products",
    ab_card3_desc: "Building web platforms like Agent Critiq that curate, review, and index AI tools and agents.",
    projects_heading: "Featured Projects",
    prj_agentcritiq: "Curated platform reviewing 100+ AI tools and agents. Features a native MCP Server letting AI assistants query the database, plus an open Hugging Face dataset.",
    cat_ai: "AI Agents & Systems",
    prj_donacodex: "Multi-agent simulation where AI nodes (CEO, Researcher, Engineer) manage a virtual software company in real-time via Socket.IO WebSockets.",
    prj_ailab: "Experimental research sandbox for benchmarking model architectures and prompt pipelines.",
    prj_promptbuilder: "Conversational prompt engineering tool using Gemini API for interactive requirement compilation and export.",
    cat_quant: "Trading Bots & Algorithms",
    prj_donanexus: "ApexBrain — a dual-policy PyTorch neural network executing autonomous trades on Binance Futures 24/7.",
    prj_donagrid: "Binance spot grid trading bot featuring dynamic ATR recentering and RSI anti-toxicity filters.",
    prj_donaquantum: "Quantitative strategy testing framework combining RL with backtesting and market data feeds.",
    cat_automation: "Automation & Other Work",
    prj_donamusic: "Stealth browser automation framework with human bezier mouse curves, ADB mobile control, and analytics.",
    prj_coinempire: "Real-time multiplayer web strategy game powered by Firebase Firestore with mining and market trading.",
    prj_zamaninbekcisi: "Interactive text adventure game with inventory management and directed story graph architecture.",
    stack_heading: "My Tech Stack",
    contact_heading: "Get In Touch",
    contact_sub: "Feel free to reach out via GitHub or my platforms for projects or collaboration."
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
  initImageSliders();
});

// 2. Dynamic Image Slider Loader
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
          const fallbackImg = new Image();
          const fallbackPath = `./assets/${baseName}.jpg`;
          fallbackImg.src = fallbackPath;
          fallbackImg.onload = () => {
            validImages.push(fallbackPath);
            renderSlider();
          };
          fallbackImg.onerror = () => {
            box.style.display = 'none';
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
