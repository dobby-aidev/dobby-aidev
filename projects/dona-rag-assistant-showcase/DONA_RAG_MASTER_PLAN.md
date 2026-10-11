# ✦ DONA RAG PRO: KURUMSAL DOKÜMAN & MICRO-SAAS GELİŞTİRME PLANI

> **Proje Kodu:** `DONA-RAG-ENTERPRISE-v3`  
> **Geliştirici:** Alkan ([@dobbyb](https://bionluk.com/dobbyb)) — Dona Codex  
> **Strateji:** Çift Yönlü Para Kazanma (B2B Özel Şirket Kurulumu + Whop Micro-SaaS Jeton Modeli)

---

## 🧭 BÖLÜM 1: ÇİFT TARAFLI GELİR STRATEJİSİ

```
                          ┌───────────────────────────┐
                          │    DONA RAG ÇEKİRDEK      │
                          │   (1000+ Sayfa Motoru)    │
                          └─────────────┬─────────────┘
                                        │
           ┌────────────────────────────┴───────────────────────────┐
           ▼                                                         ▼
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     KANAL A: B2B ÖZEL KURULUM   │       │   KANAL B: WHOP MİCRO-SAAS     │
│ (Bionluk / Kurumsal Şirketler)  │       │     (rag.donacodex.com)         │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ • Şirkete özel özel panel       │       │ • Herkese açık canlı web sitesi │
│ • Şirket sunucusuna / bulutuna  │       │ • 1. PDF ücretsiz (kanca)       │
│ • Slack / WhatsApp / Webhook    │       │ • Whop ile Kredi Satışı:        │
│ • Fiyat: 15.000 TL - 45.000 TL  │       │   - 10 PDF Kredisi: $5          │
│ • Aylık Bakım: 3.000 - 7.500 TL │       │   - Sınırsız Aylık: $19/ay      │
└─────────────────────────────────┘       └─────────────────────────────────┘
```

---

## ⚡ BÖLÜM 2: 1000+ SAYFALIK DEVASA PDF MİMARİSİ (BELLEK ÇÖKMESİNİ ENGELLEME)

1000 sayfalık bir PDF (~500.000 kelime) tek seferde tarayıcı belleğine veya standart API'ye yüklenirse sistem kilitlenir. Bunu çözen **3 Kademeli Hiyerarşik RAG** planı:

### 1. Parçalı Akış Yükleme (Streamed Chunking Worker)
* PDF tek parça olarak RAM'e basılmaz; Web Worker arka planda 50'şer sayfalık pencereler (sliding window) halinde okur.
* Tarayıcı hiçbir zaman donmaz veya 1 GB RAM tüketmez.

### 2. İki Kademeli Hiyerarşik Vektör İndeksleme (Hierarchical Indexing)
* **1. Kademe (Makro Özet Haritası):** 1000 sayfanın her 10 sayfası için bir "bölüm başlığı & özet vektörü" çıkarılır (toplam 100 üst düğüm).
* **2. Kademe (Mikro Paragraflar):** Soru geldiğinde önce ilgili 2-3 bölüm bulunur, ardından yalnızca o 30 sayfanın içindeki paragraflar taranır. 1000 sayfa anında 20 sayfaya indirgenir.

### 3. Hibrit Arama Motoru (BM25 + Dense Cosine Re-Ranking)
* Hem tam kelime eşleşmesi (madde no, kanun no, parasal tutar) hem de anlamsal bağlam aynı anda taranır. Sıfır halüsinasyon garanti edilir.

---

## 🎨 BÖLÜM 3: ELİTE ARAYÜZ (APPLE / LINEAR SPATIAL STANDARDI)

* **Sol Ekran (Gelişmiş PDF Görüntüleyici):** PDF'in kendisi sayfalarıyla açılır. Bot bir cevap verdiğinde, PDF üzerindeki ilgili cümle **sarı/altın fosforlu kalemle** gerçek zamanlı aydınlatılır.
* **Sağ Ekran (Yapay Zeka Diyalog Konsolu):** Daktilo efektiyle akan yanıt, altında *"Doğruluk Oranı: %99.4"*, *"Referans: Sayfa 412, Paragraf 3"* tıklanabilir kanıt etiketleri.
* **Üst Bar (Kredi & Jeton Sayacı):** Kalan analiz hakkı: `3/10 PDF`. *"Kredi Yükle (Whop)"* butonu.

---

## 💳 BÖLÜM 4: WHOP & JETON ÖDEME ALTYAPISI ENTEGRASYONU

1. **Kullanıcı Tanıma:** Çerez/LocalStorage veya basit e-posta doğrulama kodu.
2. **Whop Checkout Modalı:** Site içinden ayrılmadan açılan modern ödeme penceresi.
3. **Webhook Listener (Cloudflare Worker):**
   * Whop'tan gelen `payment.succeeded` sinyali Cloudflare KV veya veritabanına `user_email: credits + 10` yazar.
4. **Maliyet & Kar Marjı:**
   * 1 PDF analizi için OpenAI (gpt-4o-mini) maliyeti: **~$0.002 (Kuruş mertebesi)**.
   * Müşteriye satış: **$0.50 - $1.00**.
   * **Net Kar Marjı: %99.6!**

---

## 📅 BÖLÜM 5: AŞAMALI İCRA YOL HARİTASI

| Aşama | Görev | Çıktı |
| :--- | :--- | :--- |
| **Faz 1** | 1000+ sayfa okuyabilen Streamed PDF Chunker motoru | Bellek şişmeyen arka plan çekirdeği |
| **Faz 2** | Çift ekranlı (Split-view PDF + Chat) Linear tarzı lüks UI | Müşteriyi ilk bakışta büyüleyen arayüz |
| **Faz 3** | Whop Webhook & Kredi düşüm sistemi entegrasyonu | Otomatik para tahsilat motoru |
| **Faz 4** | Bionluk'a "Şirketinize Özel Akıllı Doküman & Sözleşme Analiz Paneli" ilanı girişi | 20.000 TL+ B2B müşteri avı |
| **Faz 5** | Tauri v2 + llama.cpp ile Çevrimdışı Windows Desktop (.exe) ihracı | $199 - $399 Air-Gapped Kurumsal Lisans Satışı |
| **Faz 6** | Özel Dona-LLM-1B (LoRA) + CNN-OCR görsel tablo okuma motoru eğitimi | %100 Bağımsız Tescilli Kurumsal Yapay Zeka |

---

## 🔬 BÖLÜM 6: ÇEVRİMDIŞI MASAÜSTÜ AI (AIR-GAPPED .EXE) & ÖZEL MODEL EĞİTİM MİMARİSİ

### 1. Neden Çevrimdışı (Offline) Masaüstü Sürümü?
* **Kurumsal Uyumluluk (Compliance):** Bankalar, hastaneler, savunma sanayii ve avukatlık büroları internete evrak yüklemeyi kesin olarak yasaklar.
* **Sıfır API / Token Maliyeti:** LLM doğrudan müşterinin bilgisayarında çalıştığı için bizim tarafımızda sıfır API faturası oluşur.
* **Tek Seferlik Yüksek Lisans Bedeli:** Whop veya web sitemiz üzerinden tek seferlik **$199 — $499** peşin lisansla satılır.

### 2. Masaüstü Mimari Yığını:
* **Çatı:** `Tauri v2` (Rust tabanlı ultra hafif runtime, ~15 MB installer boyutu, Electron'dan 10 kat hafif).
* **Yerel Çıkarım Motoru:** `llama.cpp` / GGUF (4-bit kuantize edilmiş, harici GPU istemez, standart ofis i5/i7 CPU'da 40-50 token/sn akar).
* **Müşteri Kurulumu:** Tek tıkla `Dona_RAG_Setup.exe` kurulumu + offline RSA lisans anahtarı doğrulama.

### 3. Özel Model Eğitimi (Dona-LLM-1B):
* Sıfırdan alfabe öğretmek yerine **Llama-3.2-1B** veya **Qwen-2.5-1.5B** omurgası üzerine LoRA / QLoRA ile:
  * Türk Hukuku & Sözleşme Terminolojisi
  * Şartname Analizi ve Tablo Muhakemesi
  * Özel `dona_agent_v1.gguf` ağırlık dosyası oluşturulması.
* **Özel CNN-OCR Katmanı:** Taranmış (resim halindeki) eski PDF'ler ve karmaşık mali tablolar için özel bir **CNN + Vision Transformer (ViT)** hibrit görsel okuma boru hattı.

