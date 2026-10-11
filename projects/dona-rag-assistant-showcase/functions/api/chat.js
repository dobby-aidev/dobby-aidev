/**
 * Cloudflare Pages Function: /api/chat
 * Enterprise-Hardened Serverless Proxy for Dona RAG Neural Core
 * Zero Data-Leakage • Strict Origin Protection • Payload Armor
 */

// Allowed Origin Patterns (Production, Staging, Local Preview)
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/rag\.donacodex\.com$/,
  /^https:\/\/donacodex\.com$/,
  /^https:\/\/.*\.pages\.dev$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/
];

function isOriginAllowed(origin) {
  if (!origin) return true; // Direct same-origin requests or local tools
  return ALLOWED_ORIGIN_PATTERNS.some(pattern => pattern.test(origin));
}

function getCorsHeaders(origin) {
  const allowed = isOriginAllowed(origin) ? origin : 'https://rag.donacodex.com';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('Origin') || '';

  // 1. Strict Origin Validation
  if (origin && !isOriginAllowed(origin)) {
    return new Response(JSON.stringify({
      error: 'Erişim Engellendi: Yetkisiz Alan Adı (CORS Violation)'
    }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders(origin)
      }
    });
  }

  const corsHeaders = {
    ...getCorsHeaders(origin),
    'Content-Type': 'application/json'
  };

  // 2. Content-Length & Body Size Armor (Max 150 KB)
  const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
  if (contentLength > 153600) {
    return new Response(JSON.stringify({
      error: 'İstek boyutu izin verilen sınırı aştı (Maksimum 150 KB).'
    }), {
      status: 413,
      headers: corsHeaders
    });
  }

  try {
    const apiKey = env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({
        error: 'Çıkarım motoru yapılandırma anahtarı (GROQ_API_KEY) Cloudflare ortam değişkenlerinde tanımlı değil.'
      }), {
        status: 503,
        headers: corsHeaders
      });
    }

    const body = await request.json();

    // 3. Payload Validation & Sanitization
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(JSON.stringify({
        error: 'Geçersiz istek gövdesi: Mesaj dizisi gereklidir.'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Limit conversation history to maximum 10 messages to prevent token drain
    const sanitizedMessages = body.messages.slice(-10).map(m => ({
      role: m.role === 'system' ? 'system' : (m.role === 'assistant' ? 'assistant' : 'user'),
      content: typeof m.content === 'string' ? m.content.slice(0, 12000) : ''
    }));

    // Whitelist and clamp parameters
    const requestedModel = (body.model === 'llama-3.1-8b-instant') 
      ? 'llama-3.1-8b-instant' 
      : 'llama-3.3-70b-versatile';

    const maxTokens = Math.min(Math.max(parseInt(body.max_tokens, 10) || 1200, 32), 2048);
    const temperature = Math.min(Math.max(parseFloat(body.temperature) || 0.2, 0.0), 1.0);
    const isStream = body.stream === true;

    // 4. Secure Upstream Request
    const upstreamResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: requestedModel,
        messages: sanitizedMessages,
        temperature: temperature,
        max_tokens: maxTokens,
        stream: isStream
      })
    });

    // 5. Upstream Error Masking (Never expose raw vendor error text or keys)
    if (!upstreamResponse.ok) {
      console.error('Upstream Neural Core Error Status:', upstreamResponse.status);
      return new Response(JSON.stringify({
        error: 'Dona RAG Neural Core servisi şu anda yoğun. Lütfen birkaç saniye sonra tekrar deneyin.'
      }), {
        status: upstreamResponse.status >= 500 ? 503 : 400,
        headers: corsHeaders
      });
    }

    // 6. Real-time Streaming SSE Output
    if (isStream) {
      return new Response(upstreamResponse.body, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no'
        }
      });
    }

    // 7. Non-streaming Output
    const data = await upstreamResponse.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: corsHeaders
    });

  } catch (err) {
    console.error('Serverless Execution Exception:', err.message);
    return new Response(JSON.stringify({
      error: 'İstek işlenirken güvenli bağlantı hatası oluştu.'
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

export async function onRequestOptions(context) {
  const origin = context.request.headers.get('Origin') || '';
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin)
  });
}
