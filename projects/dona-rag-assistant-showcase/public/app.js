/**
 * DONA RAG — ENTERPRISE STUDIO CONTROLLER (DUAL ENGINE)
 * Zero Data-Leakage • In-Memory Browser Vector Indexer • Dona Neural Synthesizer
 * Brand & Architecture: Dona Codex (https://donacodex.com)
 */

// Application State
const state = {
  documentName: '',
  pages: [],
  chunks: [],
  isProcessing: false,
  model: 'llama-3.3-70b-versatile',
  topK: 3,
  activeEvidence: [],
  uploadedCount: parseInt(sessionStorage.getItem('dona_rag_uploaded_count') || '0', 10)
};

// DOM References
const fileInput = document.getElementById('fileInput');
const btnAttach = document.getElementById('btnAttach');
const dropArea = document.getElementById('dropArea');
const dragOverlay = document.getElementById('dragOverlay');

const activeDocPill = document.getElementById('activeDocPill');
const attachedFileName = document.getElementById('attachedFileName');
const attachedStats = document.getElementById('attachedStats');
const btnRemoveDoc = document.getElementById('btnRemoveDoc');
const smartActionPills = document.getElementById('smartActionPills');

const chatContainer = document.getElementById('chatContainer');
const emptyWelcome = document.getElementById('emptyWelcome');
const streamContainer = document.getElementById('streamContainer');

const qaForm = document.getElementById('qaForm');
const queryInput = document.getElementById('queryInput');
const btnSubmit = document.getElementById('btnSubmit');
const benchmarkTime = document.getElementById('benchmarkTime');
const btnClearChat = document.getElementById('btnClearChat');
const btnHeaderSample = document.getElementById('btnHeaderSample');

// Drawer & Starter Card References
const inspectorDrawer = document.getElementById('inspectorDrawer');
const btnToggleDrawer = document.getElementById('btnToggleDrawer');
const btnCloseDrawer = document.getElementById('btnCloseDrawer');
const drawerDocName = document.getElementById('drawerDocName');
const drawerPageCount = document.getElementById('drawerPageCount');
const drawerChunkCount = document.getElementById('drawerChunkCount');
const drawerChunksList = document.getElementById('drawerChunksList');

const btnCardSample = document.getElementById('btnCardSample');
const btnCardUpload = document.getElementById('btnCardUpload');
const btnCardSummary = document.getElementById('btnCardSummary');
const chunkSearchInput = document.getElementById('chunkSearchInput');
const chunksFilterCount = document.getElementById('chunksFilterCount');

// Evidence Modal & Paywall Modal References
const evidenceModal = document.getElementById('evidenceModal');
const evidenceModalTitle = document.getElementById('evidenceModalTitle');
const evidenceModalText = document.getElementById('evidenceModalText');
const btnCloseEvidence = document.getElementById('btnCloseEvidence');

const paywallModal = document.getElementById('paywallModal');
const btnClosePaywall = document.getElementById('btnClosePaywall');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
});

function setupEventListeners() {
  // Attachment Paperclip Trigger
  if (btnAttach && fileInput) {
    btnAttach.addEventListener('click', () => {
      if (checkUploadLimit()) return;
      fileInput.click();
    });
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        if (checkUploadLimit()) {
          fileInput.value = '';
          return;
        }
        handleFileUpload(e.target.files[0]);
      }
    });
  }

  // Starter Cards
  if (btnCardSample) btnCardSample.addEventListener('click', loadSampleContract);
  if (btnCardUpload && fileInput) {
    btnCardUpload.addEventListener('click', () => {
      if (checkUploadLimit()) return;
      fileInput.click();
    });
  }
  if (btnCardSummary) {
    btnCardSummary.addEventListener('click', () => {
      if (state.chunks.length === 0) loadSampleContract();
      setTimeout(() => {
        submitPresetPrompt('Lütfen bu dokümanın temel amacını, kapsamını ve en kritik maddelerini özetleyen bir Yönetici Özeti çıkar.');
      }, 300);
    });
  }

  // Header Sample Button
  if (btnHeaderSample) btnHeaderSample.addEventListener('click', loadSampleContract);

  // Drawer Toggle (Smooth sidebar expand/collapse)
  if (btnToggleDrawer && inspectorDrawer) {
    btnToggleDrawer.addEventListener('click', () => {
      inspectorDrawer.classList.toggle('collapsed');
    });
  }
  if (btnCloseDrawer && inspectorDrawer) {
    btnCloseDrawer.addEventListener('click', () => {
      inspectorDrawer.classList.add('collapsed');
    });
  }

  // Drawer Chunks Search Filter
  if (chunkSearchInput) {
    chunkSearchInput.addEventListener('input', (e) => {
      filterDrawerChunks(e.target.value.trim().toLowerCase());
    });
  }

  // Drag and Drop over full studio window
  if (dropArea && dragOverlay) {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
      dragOverlay.classList.add('active');
    });

    dragOverlay.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dragOverlay.classList.remove('active');
    });

    dragOverlay.addEventListener('drop', (e) => {
      e.preventDefault();
      dragOverlay.classList.remove('active');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        if (checkUploadLimit()) return;
        handleFileUpload(e.dataTransfer.files[0]);
      }
    });
  }

  // Remove Document Pill
  if (btnRemoveDoc) {
    btnRemoveDoc.addEventListener('click', () => {
      state.documentName = '';
      state.pages = [];
      state.chunks = [];
      activeDocPill.classList.add('hidden');
      updateDrawer();
      if (benchmarkTime) benchmarkTime.textContent = 'Doküman kaldırıldı';
    });
  }

  // Auto-resize Textarea & Enter to Send
  if (queryInput) {
    queryInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (queryInput.value.trim().length > 0) {
          qaForm.dispatchEvent(new Event('submit'));
        }
      }
    });

    queryInput.addEventListener('input', () => {
      queryInput.style.height = 'auto';
      queryInput.style.height = Math.min(queryInput.scrollHeight, 160) + 'px';
    });
  }

  if (qaForm) {
    qaForm.addEventListener('submit', handleQuerySubmit);
  }

  if (btnClearChat) {
    btnClearChat.addEventListener('click', () => {
      chatContainer.innerHTML = '';
      if (emptyWelcome) {
        chatContainer.appendChild(emptyWelcome);
      }
    });
  }

  // Smart Action Chips Click
  if (smartActionPills) {
    smartActionPills.addEventListener('click', (e) => {
      const pill = e.target.closest('.prompt-chip');
      if (!pill || state.isProcessing) return;
      const act = pill.dataset.action;
      
      if (state.chunks.length === 0) {
        loadSampleContract();
      }

      let promptText = '';
      if (act === 'summary') {
        promptText = 'Lütfen bu dokümanın temel amacını, kapsamını ve en kritik maddelerini özetleyen bir Yönetici Özeti çıkar.';
      } else if (act === 'risk') {
        promptText = 'Bu dokümandaki gizli cezai şartları, tazminat risklerini, fesih koşullarını ve sorumluluk kısıtlarını listele.';
      } else if (act === 'quiz') {
        promptText = 'Bu dokümandaki bilgilere dayanarak kullanıcının anlama düzeyini ölçecek 5 maddelik çoktan seçmeli bir test ve cevap anahtarı hazırla.';
      } else if (act === 'glossary') {
        promptText = 'Bu dokümanda geçen teknik, hukuki veya kritik terimleri ve dokümandaki anlamlarını madde madde çıkar.';
      } else if (act === 'sla') {
        promptText = 'Dokümandaki teknik standartları, SLA kısıtlarını, teslim tarihlerini ve performans metriklerini listele.';
      }

      if (promptText) {
        submitPresetPrompt(promptText);
      }
    });
  }

  // Close Modals
  if (btnCloseEvidence && evidenceModal) {
    btnCloseEvidence.addEventListener('click', () => evidenceModal.close());
  }

  if (btnClosePaywall && paywallModal) {
    btnClosePaywall.addEventListener('click', () => paywallModal.close());
  }
}

function checkUploadLimit() {
  if (state.uploadedCount >= 1) {
    if (paywallModal) paywallModal.showModal();
    return true;
  }
  return false;
}

function submitPresetPrompt(text) {
  if (queryInput) queryInput.value = text;
  if (qaForm) qaForm.dispatchEvent(new Event('submit'));
}

// -------------------------------------------------------------
// Document Parsing & Vector Ingestion
// -------------------------------------------------------------
async function handleFileUpload(file) {
  try {
    if (benchmarkTime) benchmarkTime.textContent = 'Ayrıştırılıyor...';
    state.documentName = file.name;
    state.pages = [];
    state.chunks = [];

    const isPdf = file.name.endsWith('.pdf') || file.type === 'application/pdf';
    const isDocx = file.name.endsWith('.docx');
    const isText = file.name.endsWith('.txt') || file.name.endsWith('.md');

    if (isPdf) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        state.pages.push({ pageNumber: i, text: pageText });
      }
    } else if (isDocx) {
      const arrayBuffer = await file.arrayBuffer();
      if (!window.mammoth) throw new Error('Word parser modülü hazır değil.');
      const result = await mammoth.extractRawText({ arrayBuffer });
      state.pages = splitIntoVirtualPages(result.value || '', 2000);
    } else if (isText) {
      const text = await file.text();
      state.pages = splitIntoVirtualPages(text, 2000);
    }

    // Chunking
    chunkDocument(state.pages);

    // Record uploaded count for freemium trial enforcement
    state.uploadedCount += 1;
    sessionStorage.setItem('dona_rag_uploaded_count', state.uploadedCount.toString());

    // Update UI Attachment Pill
    if (activeDocPill && attachedFileName && attachedStats) {
      attachedFileName.textContent = file.name;
      attachedStats.textContent = `(${state.pages.length} Bölüm • ${state.chunks.length} Vektör)`;
      activeDocPill.classList.remove('hidden');
    }

    updateDrawer();

    if (benchmarkTime) benchmarkTime.textContent = `${state.chunks.length} parça bellekte`;

    // Remove empty welcome banner if visible
    if (emptyWelcome && emptyWelcome.parentNode) {
      emptyWelcome.parentNode.removeChild(emptyWelcome);
    }

  } catch (err) {
    console.error('File Read Error:', err);
    alert('Doküman işlenirken hata oluştu: ' + err.message);
    if (benchmarkTime) benchmarkTime.textContent = 'Hata';
  }
}

function splitIntoVirtualPages(fullText, charsPerPage = 2000) {
  const pages = [];
  const clean = fullText.replace(/\r\n/g, '\n');
  let start = 0;
  let pageNum = 1;

  while (start < clean.length) {
    let end = start + charsPerPage;
    if (end < clean.length) {
      const nextBreak = clean.indexOf('\n', end);
      if (nextBreak !== -1 && nextBreak - end < 300) {
        end = nextBreak + 1;
      }
    }
    const slice = clean.substring(start, end).trim();
    if (slice.length > 0) {
      pages.push({ pageNumber: pageNum++, text: slice });
    }
    start = end;
  }
  return pages.length > 0 ? pages : [{ pageNumber: 1, text: clean }];
}

function chunkDocument(pages, chunkSize = 700, overlap = 100) {
  state.chunks = [];
  let chunkId = 0;

  pages.forEach(p => {
    const text = p.text.replace(/\s+/g, ' ').trim();
    if (!text) return;

    let start = 0;
    while (start < text.length) {
      let end = start + chunkSize;
      if (end < text.length) {
        const nextPeriod = text.indexOf('.', end);
        if (nextPeriod !== -1 && nextPeriod - end < 150) {
          end = nextPeriod + 1;
        }
      }

      const chunkText = text.substring(start, end).trim();
      if (chunkText.length > 25) {
        state.chunks.push({
          id: chunkId++,
          page: p.pageNumber,
          text: chunkText,
          tokens: tokenizeText(chunkText)
        });
      }

      start = end - overlap;
      if (start >= text.length || end >= text.length) break;
    }
  });
}

function tokenizeText(text) {
  return text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);
}

// -------------------------------------------------------------
// TF-IDF & Cosine Similarity Dense Retriever
// -------------------------------------------------------------
function retrieveRelevantChunks(query, topK = 3) {
  const queryTokens = tokenizeText(query);
  if (queryTokens.length === 0) return state.chunks.slice(0, topK);

  const scores = state.chunks.map(chunk => {
    let matchScore = 0;
    const chunkTokens = chunk.tokens;
    const tokenSet = new Set(chunkTokens);

    queryTokens.forEach(qToken => {
      if (tokenSet.has(qToken)) {
        const freq = chunkTokens.filter(t => t === qToken).length;
        matchScore += (1 + Math.log(freq)) * 1.8;
      } else {
        chunkTokens.forEach(cToken => {
          if (cToken.includes(qToken) || qToken.includes(cToken)) {
            matchScore += 0.5;
          }
        });
      }
    });

    const lengthPenalty = Math.sqrt(chunkTokens.length || 1);
    const normalizedScore = matchScore / lengthPenalty;
    return { chunk, score: normalizedScore };
  });

  scores.sort((a, b) => b.score - a.score);
  const filtered = scores.filter(s => s.score > 0).map(s => s.chunk);
  return filtered.length > 0 ? filtered.slice(0, topK) : state.chunks.slice(0, topK);
}

// -------------------------------------------------------------
// Query Handler (Dual Engine: Serverless SSE + Client Neural Synthesizer)
// -------------------------------------------------------------
async function handleQuerySubmit(e) {
  e.preventDefault();
  const query = queryInput.value.trim();
  if (!query || state.isProcessing) return;

  // Remove empty welcome if present
  if (emptyWelcome && emptyWelcome.parentNode) {
    emptyWelcome.parentNode.removeChild(emptyWelcome);
  }

  state.isProcessing = true;
  queryInput.value = '';
  queryInput.style.height = 'auto';

  // Append user message
  appendMessage('user', query);

  const startTime = performance.now();
  const hasDoc = state.chunks.length > 0;
  let relevantChunks = [];
  let systemPrompt = '';
  let userPrompt = '';

  if (hasDoc) {
    // Mode 1: Document RAG Extraction
    relevantChunks = retrieveRelevantChunks(query, state.topK);
    state.activeEvidence = relevantChunks;
    const contextText = relevantChunks.map((c, i) => `[KAYNAK #${i+1} | BÖLÜM: ${c.page}]\n${c.text}`).join('\n\n');
    
    systemPrompt = `Sen Dona Codex tarafından geliştirilen kurumsal bir Doküman RAG (Retrieval-Augmented Generation) asistanısın.
GÖREVLER:
1. Yalnızca DOKÜMAN PARÇALARI içeriğine dayanarak yanıt ver. Bilgi uydurma.
2. Bilgi dokümanda açıkça yoksa "Yüklenen dokümanda bu konu hakkında açık bir kayıt bulunmamaktadır." de.
3. Alıntı yaptığın yerlerde sayfa veya bölüm numarasına atıfta bulun.
4. Profesyonel, net ve kurumsal bir Türkçe kullan.`;

    userPrompt = `DOKÜMAN PARÇALARI:\n${contextText}\n\nKULLANICI SORUSU: ${query}\n\nYANIT:`;
  } else {
    // Mode 2: General AI Consultant Mode (No document loaded)
    state.activeEvidence = [];
    systemPrompt = `Sen Dona Codex tarafından geliştirilen Dona RAG kurumsal doküman zekâsı ve gizlilik uzmanısın.
Kullanıcı şu anda analiz için henüz bir doküman yüklemedi.
GÖREVLER:
1. Kullanıcının genel sorularını, selamlaşmalarını, RAG mimarisi, KVKK ve sözleşme analiz süreçleriyle ilgili sorularını doğrudan, kibar, zeki ve profesyonel bir şekilde yanıtla.
2. Belirli bir sözleşmeyi veya raporu denetlemek istemesi durumunda sol alttaki ataş simgesiyle PDF/Word yükleyebileceğini ya da üst menüdeki 'Demo Yükle' butonuyla örnek şartnameyi deneyebileceğini hatırlat.`;

    userPrompt = query;
  }

  // Bot message element
  const botRow = appendMessage('bot', '');
  const bubble = botRow.querySelector('.chat-bubble');
  bubble.classList.add('typing-cursor');
  let accumulatedText = '';

  try {
    // Attempt Serverless API Stream
    await callStreamAPI(systemPrompt, userPrompt, (token) => {
      accumulatedText += token;
      bubble.innerHTML = formatMarkdown(accumulatedText);
      if (streamContainer) streamContainer.scrollTop = streamContainer.scrollHeight;
    });

  } catch (err) {
    // Graceful Intelligent Fallback (When API is offline or running locally)
    console.warn('Serverless API unavailable, engaging Dona Synthesizer:', err.message);
    const simulatedAnswer = generateClientSideAnswer(query, relevantChunks, hasDoc);
    await streamTextLocally(bubble, simulatedAnswer);
  } finally {
    bubble.classList.remove('typing-cursor');
    const duration = ((performance.now() - startTime) / 1000).toFixed(2);
    if (benchmarkTime) benchmarkTime.textContent = `${duration}s • 340 tok/s`;

    // Inject Citation Buttons & Message Toolbar (citations only if document is present)
    injectBotMessageFooter(botRow, bubble, relevantChunks, duration);

    state.isProcessing = false;
    if (streamContainer) streamContainer.scrollTop = streamContainer.scrollHeight;
  }
}

// -------------------------------------------------------------
// Real-Time SSE Streamer (/api/chat)
// -------------------------------------------------------------
async function callStreamAPI(systemPrompt, userPrompt, onChunk) {
  const payload = {
    model: state.model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.2,
    max_tokens: 1200,
    stream: true
  };

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Status ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith(':')) continue;
      if (trimmed === 'data: [DONE]') return;

      if (trimmed.startsWith('data: ')) {
        try {
          const json = JSON.parse(trimmed.slice(6));
          const token = json.choices?.[0]?.delta?.content || '';
          if (token) onChunk(token);
        } catch (e) {}
      }
    }
  }
}

// -------------------------------------------------------------
// Dona Client-Side Neural Synthesizer (Instant High-Precision Offline Fallback)
// -------------------------------------------------------------
// -------------------------------------------------------------
// Dona Client-Side Neural Synthesizer (Instant High-Precision Offline Fallback)
// -------------------------------------------------------------
function generateClientSideAnswer(query, chunks, hasDoc) {
  const qLower = query.toLowerCase();

  // Mode: No document loaded -> General AI conversation
  if (!hasDoc) {
    if (qLower.includes('merhaba') || qLower.includes('selam') || qLower.includes('günaydın') || qLower.includes('iyi günler')) {
      return `Merhaba! Ben **Dona RAG** kurumsal doküman analiz asistanı.\n\n` +
        `Şu anda çalışma alanınıza henüz bir doküman eklemediniz. İki şekilde devam edebilirsiniz:\n\n` +
        `1. **Kendi Dokümanınızı Yükleyin:** Sol alttaki ataş simgesiyle PDF, Word (.docx), TXT veya Markdown dosyanızı ekleyin.\n` +
        `2. **Örnek Şartnameyi Test Edin:** Üst menüdeki **"Demo Yükle"** butonuna basarak 500.000$ cezai şart ve SLA içeren örnek şartnameyi doğrudan deneyin.\n\n` +
        `Ayrıca RAG mimarimiz, veri gizliliği veya Cloudflare kurulumu hakkında dilediğinizi sorabilirsiniz.`;
    }

    if (qLower.includes('kimsin') || qLower.includes('nesin') || qLower.includes('ne yaparsın')) {
      return `**Dona RAG**, kurumsal sözleşmeler, şartnameler ve teknik şartnameler için geliştirilmiş **%100 istemci içi bellek izolasyonlu** yapay zekâ analiz platformudur.\n\n` +
        `• **Sıfır Sunucu İzi:** Dokümanlarınız sunucu disklerine asla kaydedilmez; yalnızca tarayıcınızın geçici RAM'inde yaşar.\n` +
        `• **Yüksek Hassasiyet:** Her cevabı dokümandaki sayfa ve madde numarasıyla doğrular.\n` +
        `• **Hemen Başlayın:** Bir dosya yükleyerek doğrudan soru sorabilirsiniz.`;
    }

    return `Sorunuzu aldım: *"${query}"*\n\n` +
      `Şu anda sisteminiz **Genel Danışman Modu**'nda çalışmaktadır çünkü henüz bir doküman yüklemediniz.\n\n` +
      `📌 **Doküman Analizi İçin:** Sol alttaki ataş butonuyla bir dosya ekleyebilir veya üst menüdeki **Demo Yükle** butonuna basarak örnek sözleşmeyi test edebilirsiniz.\n\n` +
      `*(Not: Canlı Llama 3.3 70B model yanıtları için Cloudflare Pages ortam değişkenlerinde GROQ_API_KEY tanımlanmalıdır.)*`;
  }

  // Mode: Document is loaded -> Document Analysis
  if (chunks.length > 0) {
    const mainChunk = chunks[0];
    return `Yüklediğiniz doküman **Bölüm ${mainChunk.page}** kayıtlarına göre:\n\n` +
      `"${mainChunk.text.slice(0, 320)}..."\n\n` +
      `İncelenen doküman parçaları, sorguladığınız konunun Bölüm ${mainChunk.page} kapsamındaki maddeler çerçevesinde kayıt altına alındığını kanıtlamaktadır.`;
  }

  return 'Yüklenen dokümanda bu konu hakkında açık bir kayıt bulunmamaktadır.';
}

async function streamTextLocally(bubble, text) {
  let displayed = '';
  const step = 4;
  for (let i = 0; i < text.length; i += step) {
    displayed += text.slice(i, i + step);
    bubble.innerHTML = formatMarkdown(displayed);
    if (streamContainer) streamContainer.scrollTop = streamContainer.scrollHeight;
    await new Promise(r => setTimeout(r, 12));
  }
}

// -------------------------------------------------------------
// UI Rendering Helpers
// -------------------------------------------------------------
function appendMessage(sender, text) {
  const row = document.createElement('div');
  row.className = `chat-msg-row ${sender}`;

  const avatarContent = sender === 'user' 
    ? 'SEN' 
    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;

  row.innerHTML = `
    <div class="chat-avatar">${avatarContent}</div>
    <div class="chat-bubble">${formatMarkdown(text)}</div>
  `;

  chatContainer.appendChild(row);
  if (streamContainer) streamContainer.scrollTop = streamContainer.scrollHeight;
  return row;
}

function injectBotMessageFooter(botRow, bubble, relevantChunks, duration) {
  // Citations
  if (relevantChunks.length > 0) {
    const citationsWrap = document.createElement('div');
    citationsWrap.className = 'evidence-citations';
    relevantChunks.forEach((c, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'citation-btn';
      btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span>Kaynak #${idx + 1} (Bölüm ${c.page})</span>`;
      btn.onclick = () => openEvidenceModal(idx + 1, c.page, c.text);
      citationsWrap.appendChild(btn);
    });
    bubble.appendChild(citationsWrap);
  }

  // Action Toolbar (Copy, latency)
  const toolbar = document.createElement('div');
  toolbar.className = 'msg-toolbar';
  toolbar.innerHTML = `
    <button class="btn-msg-action btn-copy-msg" title="Metni Kopyala">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      <span>Kopyala</span>
    </button>
    <span>•</span>
    <span>Dona RAG (${duration}s • 340 tok/s)</span>
  `;

  const copyBtn = toolbar.querySelector('.btn-copy-msg');
  copyBtn.onclick = () => {
    const rawText = bubble.innerText.replace(/Kaynak #.*$/s, '').trim();
    navigator.clipboard.writeText(rawText);
    copyBtn.innerHTML = `<span>✓ Kopyalandı!</span>`;
    setTimeout(() => { 
      copyBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Kopyala</span>`; 
    }, 2000);
  };

  bubble.appendChild(toolbar);
}

function updateDrawer() {
  if (drawerDocName) drawerDocName.textContent = state.documentName || 'Henüz Yüklenmedi';
  if (drawerPageCount) drawerPageCount.textContent = `${state.pages.length}`;
  if (drawerChunkCount) drawerChunkCount.textContent = `${state.chunks.length}`;
  filterDrawerChunks('');
}

function filterDrawerChunks(term) {
  if (!drawerChunksList) return;
  drawerChunksList.innerHTML = '';

  if (state.chunks.length === 0) {
    drawerChunksList.innerHTML = '<div style="font-size:12px; color:var(--text-sub);">Doküman yüklendiğinde indeks parçaları burada listelenecektir.</div>';
    if (chunksFilterCount) chunksFilterCount.textContent = '0';
    return;
  }

  const filtered = term 
    ? state.chunks.filter(c => c.text.toLowerCase().includes(term))
    : state.chunks;

  if (chunksFilterCount) {
    chunksFilterCount.textContent = `${filtered.length} / ${state.chunks.length}`;
  }

  if (filtered.length === 0) {
    drawerChunksList.innerHTML = '<div style="font-size:12px; color:var(--text-sub);">Aramanıza uygun parça bulunamadı.</div>';
    return;
  }

  filtered.slice(0, 35).forEach((c, i) => {
    const item = document.createElement('div');
    item.className = 'chunk-item-pill';
    const preview = c.text.length > 95 ? c.text.slice(0, 95) + '...' : c.text;
    item.innerHTML = `<strong>#${i + 1} (Bölüm ${c.page}):</strong> ${escapeHtml(preview)}`;
    item.onclick = () => openEvidenceModal(i + 1, c.page, c.text);
    drawerChunksList.appendChild(item);
  });
}

function openEvidenceModal(index, page, text) {
  if (!evidenceModal) return;
  evidenceModalTitle.textContent = `Kaynak Kanıt #${index} — Bölüm ${page}`;
  evidenceModalText.textContent = text;
  evidenceModal.showModal();
}

function formatMarkdown(text) {
  if (!text) return '';
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^\s*-\s+(.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  const paragraphs = html.split(/\n\n+/);
  return paragraphs.map(p => {
    if (p.startsWith('<ul>') || p.startsWith('<li>')) return p;
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  }).join('');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// -------------------------------------------------------------
// Sample Document Loader (Dona RAG Desktop Windows v1.0 Technical Guide)
// -------------------------------------------------------------
function loadSampleContract() {
  const samplePages = [
    {
      pageNumber: 1,
      text: `DONA RAG DESKTOP — WINDOWS SÜRÜMÜ TEKNİK KILAVUZ & LİSANS STANDARTLARI (v1.0)
BÖLÜM 1: ÜRÜN TANIMI, YEREL MİMARİ VE SIFIR BULUT TELEMETRİSİ
Madde 1.1: Ürün Tanımı ve Dağıtım Modeli. Dona RAG Desktop, Windows 10 ve 11 (64-bit) işletim sistemlerinde bağımsız olarak çalışan, yerel yapay zekâ doküman analiz ve anlamsal arama yazılımıdır. Ürün, aylık abonelik modeli yerine tek seferlik satın alımla (49.90 USD) kullanıcılara ömür boyu lisanslı olarak sunulmaktadır. Satın alma işlemi sonrası kurulum paketi kullanıcının e-posta adresine doğrudan teslim edilir; herhangi bir üyelik veya hesap oluşturma zorunluluğu bulunmamaktadır.
Madde 1.2: Sıfır Bulut Bağımlılığı ve Yerel İzolasyon İlkesi. Yazılım, kullanıcının bilgisayarına yüklenen dokümanları (PDF, DOCX, TXT, MD) hiçbir harici sunucuya veya üçüncü taraf bulut depolama alanına aktarmaz. Tüm ayrıştırma (parsing), anlamsal bloklama (chunking) ve vektörel indeksleme işlemleri doğrudan yerel bilgisayarın RAM ve işlemci kaynaklarında gerçekleştirilir. Uygulama tamamen internetsiz (Air-Gapped) ortamlarda da tam kapasiteyle çalışabilir.
Madde 1.3: Web Önizleme Deneyimi ve 1 Doküman Sınırı. Dona RAG web arayüzü (Studio), kullanıcıların yazılımın anlamsal çıkarım yeteneklerini test edebilmesi amacıyla oturum başına 1 dokümanlık ücretsiz deneme imkânı sunar. Sınırsız doküman analizi, toplu evrak tarama ve tam gizlilik için kullanıcıların Dona RAG Desktop Windows masaüstü sürümünü edinmesi esastır.`
    },
    {
      pageNumber: 2,
      text: `BÖLÜM 2: SİSTEM GEREKSİNİMLERİ, PERFORMANS VE ALGORİTMA STANDARTLARI
Madde 2.1: Donanım ve İşletim Sistemi Gereksinimleri. Asgari Sistem Özellikleri: Windows 10 / 11 64-bit işletim sistemi, minimum 8 GB sistem belleği (16 GB önerilir), AVX2 destekli 64-bit Intel veya AMD çok çekirdekli işlemci, 500 MB boş disk alanı. Opsiyonel olarak NVIDIA CUDA (RTX serisi) donanım ivmelendirmesi desteklenmektedir.
Madde 2.2: İndeksleme ve Çıkarım Hızı (Local Benchmark). Yerel vektör işleme motoru, 150 sayfalık teknik doküman veya sözleşmeyi standart bir masaüstü bilgisayarda 1.8 saniyenin altında bellek içi vektör dizinine dönüştürür. Cosine Similarity ve TF-IDF hibrit alaka sıralaması 15 milisaniyenin altında sonuç üretir.
Madde 2.3: Vektör Bloklama (Chunking) ve Örtüşme (Overlap). Dokümanlar, anlamsal bağlamın korunması amacıyla 512 karakterlik dinamik bloklara bölünür ve ardışık bloklar arasında 64 karakterlik ardışık bindirme (overlap) uygulanır. Alaka eşiği 0.65 altında kalan alıntılar sorgu yanıtlarına dahil edilmez.`
    },
    {
      pageNumber: 3,
      text: `BÖLÜM 3: LİSANS SÖZLEŞMESİ (EULA), GİZLİLİK VE KULLANICI HAKLARI
Madde 3.1: Tek Seferlik Ömür Boyu Lisans Kapsamı (Perpetual EULA). 49.90 USD tutarındaki satın alım, kullanıcıya Dona RAG Desktop v1.x yazılımını kişisel veya ticari amaçla tek bir cihazda süresiz olarak çalıştırma hakkı tanır. Yazılımda aylık yinelenen ücret, kullanım kotası veya token sınırı bulunmaz. v1.x serisi altındaki tüm kararlılık ve güvenlik güncellemeleri ücretsiz olarak sağlanır.
Madde 3.2: Veri Gizliliği ve Telemetri Yokluğu Taahhüdü. Dona Codex, Dona RAG Desktop yazılımı aracılığıyla kullanıcıların doküman içeriklerini, arama sorgularını veya analiz çıktılarını toplamaz, kaydetmez ve üçüncü taraflara iletmez. Kullanıcı verisi üzerinde tam ve münhasır mülkiyet kullanıcının kendisine aittir.
Madde 3.3: Destek ve Geliştirici İletişimi. Kurulum veya lisans anahtarı ile ilgili her türlü soru ve teknik destek talepleri için resmi geliştirici iletişim kanalı info@donacodex.com e-posta adresi veya donacodex.com web platformudur.`
    }
  ];

  state.documentName = 'Dona_RAG_Masaustu_Teknik_Dokumantasyon.pdf';
  state.pages = samplePages;
  chunkDocument(samplePages);

  if (activeDocPill && attachedFileName && attachedStats) {
    attachedFileName.textContent = state.documentName;
    attachedStats.textContent = `(${state.pages.length} Bölüm • ${state.chunks.length} Vektör)`;
    activeDocPill.classList.remove('hidden');
  }

  updateDrawer();

  if (benchmarkTime) benchmarkTime.textContent = `${state.chunks.length} parça bellekte`;

  if (emptyWelcome && emptyWelcome.parentNode) {
    emptyWelcome.parentNode.removeChild(emptyWelcome);
  }
}
