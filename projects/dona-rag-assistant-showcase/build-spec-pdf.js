const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');

async function createAuthenticDesktopSpecificationPdf() {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Load Arial from Windows
  const fontPath = 'C:\\Windows\\Fonts\\arial.ttf';
  const fontBoldPath = 'C:\\Windows\\Fonts\\arialbd.ttf';
  
  const fontBytes = fs.readFileSync(fontPath);
  const fontBoldBytes = fs.readFileSync(fontBoldPath);

  const customFont = await pdfDoc.embedFont(fontBytes);
  const customFontBold = await pdfDoc.embedFont(fontBoldBytes);

  // Metadata
  pdfDoc.setTitle('Dona RAG Desktop — Windows Sürümü Teknik Kılavuz ve Lisans Standartları');
  pdfDoc.setAuthor('Dona Codex (https://donacodex.com)');
  pdfDoc.setSubject('Dona RAG Desktop v1.0 Masaüstü Yerel Mimari ve EULA Lisans Dokümantasyonu');
  pdfDoc.setKeywords(['Dona RAG', 'Desktop', 'Windows App', 'Offline RAG', 'Local AI', 'Dona Codex']);
  pdfDoc.setCreationDate(new Date('2026-03-01T09:00:00Z'));

  const pagesData = [
    {
      pageNo: 1,
      header: 'BÖLÜM 1: ÜRÜN TANIMI, YEREL MİMARİ VE SIFIR BULUT TELEMETRİSİ',
      sections: [
        {
          title: 'Madde 1.1: Ürün Tanımı ve Dağıtım Modeli',
          body: 'Dona RAG Desktop, Windows 10 ve 11 (64-bit) işletim sistemlerinde bağımsız olarak çalışan, yerel (local) yapay zekâ doküman analiz ve anlamsal arama yazılımıdır. Ürün, aylık abonelik modeli yerine tek seferlik satın alımla (49.90 USD) kullanıcılara ömür boyu lisanslı (perpetual license) olarak sunulmaktadır. Satın alma işlemi sonrası kurulum paketi kullanıcının e-posta adresine doğrudan teslim edilir; herhangi bir üyelik veya hesap oluşturma zorunluluğu bulunmamaktadır.'
        },
        {
          title: 'Madde 1.2: Sıfır Bulut Bağımlılığı ve Yerel İzolasyon İlkesi',
          body: 'Yazılım, kullanıcının bilgisayarına yüklenen dokümanları (PDF, DOCX, TXT, MD) hiçbir harici sunucuya veya üçüncü taraf bulut depolama alanına aktarmaz. Tüm ayrıştırma (parsing), anlamsal bloklama (chunking) ve vektörel indeksleme işlemleri doğrudan yerel bilgisayarın RAM ve işlemci kaynaklarında gerçekleştirilir. Uygulama tamamen internetsiz (Air-Gapped) ortamlarda da tam kapasiteyle çalışabilir.'
        },
        {
          title: 'Madde 1.3: Web Önizleme Deneyimi ve 1 Doküman Sınırı',
          body: 'Dona RAG web arayüzü (Studio), kullanıcıların yazılımın anlamsal çıkarım yeteneklerini test edebilmesi amacıyla oturum başına 1 dokümanlık ücretsiz deneme imkânı sunar. Sınırsız doküman analizi, toplu evrak tarama ve tam gizlilik için kullanıcıların Dona RAG Desktop Windows masaüstü sürümünü edinmesi esastır.'
        }
      ]
    },
    {
      pageNo: 2,
      header: 'BÖLÜM 2: SİSTEM GEREKSİNİMLERİ, PERFORMANS VE ALGORİTMA STANDARTLARI',
      sections: [
        {
          title: 'Madde 2.1: Donanım ve İşletim Sistemi Gereksinimleri',
          body: 'Asgari Sistem Özellikleri: Windows 10 / 11 64-bit işletim sistemi, minimum 8 GB sistem belleği (16 GB önerilir), AVX2 destekli 64-bit Intel veya AMD çok çekirdekli işlemci, 500 MB boş disk alanı. Opsiyonel olarak NVIDIA CUDA (RTX serisi) donanım ivmelendirmesi desteklenmektedir.'
        },
        {
          title: 'Madde 2.2: İndeksleme ve Çıkarım Hızı (Local Benchmark)',
          body: 'Yerel vektör işleme motoru, 150 sayfalık teknik doküman veya sözleşmeyi standart bir masaüstü bilgisayarda 1.8 saniyenin altında bellek içi vektör dizinine dönüştürür. Cosine Similarity ve TF-IDF hibrit alaka sıralaması 15 milisaniyenin altında sonuç üretir. Yerel çıkarım akışı minimum 280 token/saniye üretim hızını hedefler.'
        },
        {
          title: 'Madde 2.3: Vektör Bloklama (Chunking) ve Örtüşme (Overlap)',
          body: 'Dokümanlar, anlamsal bağlamın korunması amacıyla 512 karakterlik dinamik bloklara bölünür ve ardışık bloklar arasında 64 karakterlik ardışık bindirme (overlap) uygulanır. Alaka eşiği (Cosine Similarity Threshold) 0.65 altında kalan alıntılar sorgu yanıtlarına dahil edilmez.'
        }
      ]
    },
    {
      pageNo: 3,
      header: 'BÖLÜM 3: LİSANS SÖZLEŞMESİ (EULA), GİZLİLİK VE KULLANICI HAKLARI',
      sections: [
        {
          title: 'Madde 3.1: Tek Seferlik Ömür Boyu Lisans Kapsamı (Perpetual EULA)',
          body: '49.90 USD tutarındaki satın alım, kullanıcıya Dona RAG Desktop v1.x yazılımını kişisel veya ticari amaçla tek bir cihazda süresiz olarak çalıştırma hakkı tanır. Yazılımda aylık yinelenen ücret, kullanım kotası veya token sınırı bulunmaz. v1.x serisi altındaki tüm kararlılık ve güvenlik güncellemeleri ücretsiz olarak sağlanır.'
        },
        {
          title: 'Madde 3.2: Veri Gizliliği ve Telemetri Yokluğu Taahhüdü',
          body: 'Dona Codex, Dona RAG Desktop yazılımı aracılığıyla kullanıcıların doküman içeriklerini, arama sorgularını veya analiz çıktılarını toplamaz, kaydetmez ve üçüncü taraflara iletmez. Kullanıcı verisi üzerinde tam ve münhasır mülkiyet kullanıcının kendisine aittir.'
        },
        {
          title: 'Madde 3.3: Destek ve Geliştirici İletişimi',
          body: 'Kurulum veya lisans anahtarı ile ilgili her türlü soru ve teknik destek talepleri için resmi geliştirici iletişim kanalı info@donacodex.com e-posta adresi veya donacodex.com web platformudur.'
        }
      ]
    }
  ];

  for (const pageInfo of pagesData) {
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size
    const { width, height } = page.getSize();

    // Top Gold Accent Bar
    page.drawRectangle({
      x: 0,
      y: height - 6,
      width: width,
      height: 6,
      color: rgb(0.85, 0.65, 0.13), // Gold accent #d4af37
    });

    // Header Background
    page.drawRectangle({
      x: 36,
      y: height - 70,
      width: width - 72,
      height: 50,
      color: rgb(0.04, 0.06, 0.11), // Midnight #0b101c
    });

    // Header Title
    page.drawText('DONA RAG DESKTOP — WINDOWS SÜRÜMÜ TEKNİK KILAVUZ & LİSANS', {
      x: 48,
      y: height - 42,
      size: 10.5,
      font: customFontBold,
      color: rgb(0.96, 0.75, 0.20),
    });

    page.drawText('DONA CODEX YAZILIM LABORATUVARI • RESMİ TEKNİK KILAVUZ (v1.0)', {
      x: 48,
      y: height - 58,
      size: 8,
      font: customFont,
      color: rgb(0.65, 0.70, 0.80),
    });

    // Subheader section
    page.drawText(pageInfo.header, {
      x: 36,
      y: height - 92,
      size: 9.5,
      font: customFontBold,
      color: rgb(0.20, 0.25, 0.35),
    });

    page.drawLine({
      start: { x: 36, y: height - 98 },
      end: { x: width - 36, y: height - 98 },
      thickness: 1,
      color: rgb(0.85, 0.88, 0.92),
    });

    // Body Sections
    let currentY = height - 120;

    for (const sec of pageInfo.sections) {
      // Draw Section Badge & Title
      page.drawRectangle({
        x: 36,
        y: currentY - 4,
        width: 6,
        height: 18,
        color: rgb(0.85, 0.65, 0.13),
      });

      page.drawText(sec.title, {
        x: 48,
        y: currentY + 1,
        size: 11,
        font: customFontBold,
        color: rgb(0.06, 0.10, 0.18),
      });

      currentY -= 18;

      // Word wrap body text
      const maxLineWidth = width - 72;
      const words = sec.body.split(' ');
      let line = '';
      const lines = [];

      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        const textWidth = customFont.widthOfTextAtSize(testLine, 9.5);
        if (textWidth > maxLineWidth) {
          lines.push(line);
          line = word;
        } else {
          line = testLine;
        }
      }
      if (line) lines.push(line);

      for (const l of lines) {
        page.drawText(l, {
          x: 36,
          y: currentY,
          size: 9.5,
          font: customFont,
          color: rgb(0.22, 0.26, 0.34),
          lineHeight: 14,
        });
        currentY -= 15;
      }

      currentY -= 16;
    }

    // Seal box at bottom
    page.drawRectangle({
      x: 36,
      y: 50,
      width: width - 72,
      height: 28,
      color: rgb(0.96, 0.97, 0.99),
      borderColor: rgb(0.88, 0.90, 0.95),
      borderWidth: 1,
    });

    page.drawText('DONA RAG DESKTOP (WINDOWS EDITION) • TEK SEFERLİK LİSANS (49.90 USD) • SIFIR BULUT TELEMETRİSİ', {
      x: 48,
      y: 60,
      size: 7.5,
      font: customFontBold,
      color: rgb(0.40, 0.45, 0.55),
    });

    // Footer
    page.drawText(`Sayfa ${pageInfo.pageNo} / 3 — DONA RAG DESKTOP v1.0`, {
      x: width - 180,
      y: 30,
      size: 8.5,
      font: customFont,
      color: rgb(0.50, 0.55, 0.65),
    });

    page.drawText('✦ DONA RAG | donacodex.com', {
      x: 36,
      y: 30,
      size: 8.5,
      font: customFontBold,
      color: rgb(0.85, 0.65, 0.13),
    });
  }

  const pdfBytes = await pdfDoc.save();
  
  // Save both as the primary sample and under both names for compatibility
  const outputPath1 = path.join(__dirname, 'public', 'Dona_Codex_Kurumsal_Sartname.pdf');
  const outputPath2 = path.join(__dirname, 'public', 'Dona_RAG_Masaustu_Teknik_Dokumantasyon.pdf');
  fs.writeFileSync(outputPath1, pdfBytes);
  fs.writeFileSync(outputPath2, pdfBytes);
  console.log(`Generated authentic desktop specification PDF: ${outputPath1} (${pdfBytes.length} bytes)`);
}

createAuthenticDesktopSpecificationPdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
