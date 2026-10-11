# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Birincil:** Potansiyel müşteriler ve ajans sahipleri — freelance proje arayanlar, AI otomasyon ihtiyacı olan founders ve startup'lar, özel ajan / model / WebGL deneyimi yaptırmak isteyen teknik karar vericiler. Ziyaretçi tek bir oturumda Dobby B'nin kapasitesini değerlendirip iletişime geçmeye karar verir.

**İkincil:** Global teknik işverenler ve CTO'lar (opsiyonel açık pozisyonlar için).

## Product Purpose

Dobby B'nin (Hüseyin Alkan Kınsız / @dobby-aidev) kişisel portfolyo ve işe alım platformu. Ziyaretçiye şunları kanıtlar:

1. Autonomous multi-agent sistemleri, custom Transformer LLM'leri ve deep reinforcement learning quant botları inşa edebilir.
2. Production-grade spatial WebGL / Three.js deneyimleri üretir (Neural OS v2.0 konsepti).
3. Dona Codex şirketi altında gerçek canlı ürünler yayında tutar.

Başarı: ziyaretçi bir iş teklifini veya freelance/danışmanlık talebini başlatır.

## Positioning

"Neural OS v2.0" — kullanıcının bir işletim sistemi panelini geziyormuş hissi veren 3D arc-deck portfolyo. Komşu portfolyolar bu deneyimi birebir kopyalayamaz çünkü:
- Vanilla HTML/CSS/ES6+ ile sıfırdan custom WebGL + Canvas fizik motoru
- Gerçek ölçümlü canlı ürünler (Agent Critiq, Dona Mistik, Dona Nova, AI Coin Empire)
- Dona Performance Engine: FPS watchdog, VRAM GC, background throttle

## Operating Context

- **Dağıtım:** Cloudflare Pages + GitHub Actions CI/CD; `deploy.ps1` / `deploy.bat` ile tetikleme.
- **Yerelleştirme:** TR ana dizin (`/`) + EN alt dizin (`/en/`) — hreflang etiketleri senkron.
- **Sayfalar:** `index.html`, `work.html`, `about.html`, `resume.html`, `cv_template.html` + `/en/` duplikaları.
- **Routing:** HTML5 History + URL hash deep-link (`#work`, `#contact`, `#detail?p=...`); tek sayfa geçişi in-memory 3D SPA.
- **SEO & GEO:** `llms.txt`, `llms-full.txt`, Schema.org tam grafiği (Person, Organization, ItemList, SoftwareApplication, EducationalOccupationalCredential).

## Capabilities and Constraints

**Kesinleşmiş yetenekler:**
- 3D arc-deck proje vitrini (WebGL/Canvas, object-fit:contain, uncropped viewport)
- Stardust particle physics canvas (upward ambient, distance² constellation)
- TR/EN iki yönlü lokalizasyon
- WebP asset pipeline (toplam 4.7 MB, %69 bant genişliği tasarrufu)
- Cloudflare edge global dağıtım

**Teknik kısıtlar:**
- Zero heavy framework lock-in: core Vanilla HTML5/CSS3/ES6+
- Privacy-first: sıfır yetkisiz tracking, kullanıcı telemetrisi client-side
- `_headers` dosyasıyla CSP ve güvenlik başlıkları aktif

## Brand Commitments

- **Ad:** Dobby B / @dobby-aidev / Dona Codex
- **Kimlik çekirdeği:** "Neural OS v2.0" konsepti korunacak — bu kimlik sacayağıdır, değiştirilmez
- **Ses tonu:** Teknik otorite + futuristik; ezoterism yoktur
- **Renk/görsel dünya:** Mevcut sistem üzerine inşa edilecek (Dona Nova design language)
- **Bağlı varlıklar:** Dona Codex logosu, profil görseli (`profile.webp`), sertifika dosyaları (`/Sertifikalar/`)

## Evidence on Hand

**Canlı ürünler:**
- Agent Critiq: https://agentcritiq.com — 100+ AI aracı benchmark platformu
- Dona Mistik: https://mistik.donacodex.com — AI astroloji + natal chart motoru
- Dona Nova: https://donanova.donacodex.workers.dev — 35.000+ güç tesisi WebGL haritası
- AI Coin Empire: https://aicoinempire.donacodex.com — multiplayer WebSocket strateji oyunu

**Kanıtlanmış kimlik bilgileri:**
- IBM AI Engineering Professional Certificate (13 kurs, Credential: PD2I2XBB2NG0)
- University of Alberta RL Specialization (4 kurs, Credential: BEBRVX1A161B)
- ApexBrain Nexus quant model: +74.24% ROI (DRL Actor-Critic)

**İçerik varlıkları mevcut:** project screenshots (WebP), sertifika görselleri, profil fotoğrafı.

**Olmayan / icat edilmemesi gereken:** Müşteri referansları/testimonial'lar, fiyatlandırma sayfası, lisanslama koşulları.

## Product Principles

1. **Kanıt, söylem değil** — Her iddia canlı URL veya ölçüm ile desteklenir; testimonial icat edilmez.
2. **Tarayıcı yük denklemi** — Görsel ihtişam performans maliyeti ödemeden gelir; FPS watchdog ve VRAM GC daima aktif.
3. **Sıfır framework lock-in** — Vanilla stack zorunludur; ağır bağımlılıklar eklenmez.
4. **Kimlik sürekliliği** — "Neural OS v2.0" konsepti değişmez referans noktasıdır; geliştirme bu çekirdeği büyütür, yerini almaz.
5. **Çift dil paritesi** — TR ve EN sayfaları içerik, SEO ve hreflang açısından her zaman senkronda tutulur.

## Accessibility & Inclusion

- Zorunlu standart henüz belirtilmedi; `_headers` dosyasında CSP aktif.
- Keyboard navigation: açık gereksinim yok ama hybrid SPA routing'de fokus yönetimi kritik.
