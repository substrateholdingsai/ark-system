import type { APIRoute } from 'astro';

export const prerender = false;

// Types
type ServiceLine = 'legal' | 'commerce' | 'lab';
type Language = 'es' | 'en';

interface ChatRequestBody {
  message?: unknown;
  context?: unknown;
  line?: unknown;
  lang?: unknown;
}

interface KnowledgeBaseRow {
  answer: string;
  legal_reference?: string | null;
}

interface LineConfig {
  label: string;
  role: string;
}

const LINE_CONFIGS: Record<ServiceLine, LineConfig> = {
  legal: {
    label: 'ARK LEGAL',
    role: 'Guardián del expediente. Orientas sobre cumplimiento normativo, fiscal, PLD y documentación empresarial en México.',
  },
  commerce: {
    label: 'ARK COMMERCE',
    role: 'Asistente de comercio electrónico. Orientas sobre productos, pagos, envíos y soporte de tiendas digitales.',
  },
  lab: {
    label: 'ARK LAB',
    role: 'Asistente técnico y de datos. Orientas sobre Bitcoin, APIs, datos y tecnología.',
  },
};

const PRIMARY_MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const FALLBACK_MODEL = '@cf/meta/llama-3.1-8b-instruct-fast';

/**
 * Extracts client IP from request headers for rate limiting.
 */
function getClientIp(request: Request): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0];
    if (firstIp) return firstIp.trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return 'unknown';
}

/**
 * Checks and updates rate limit counter in KV session storage.
 * Limit: 15 requests per 60 seconds per client IP.
 * Skips gracefully if KV is unavailable.
 */
async function checkRateLimit(kv: any, clientIp: string): Promise<boolean> {
  if (!kv || typeof kv.get !== 'function' || typeof kv.put !== 'function') {
    return true; // Graceful skip if KV is unavailable
  }

  try {
    const key = `rl:${clientIp}`;
    const rawCount = await kv.get(key);
    const count = rawCount ? parseInt(rawCount, 10) : 0;

    if (count >= 15) {
      return false;
    }

    await kv.put(key, String(count + 1), { expirationTtl: 60 });
    return true;
  } catch (error) {
    console.warn('[api/chat] Error al verificar rate limit en KV:', error);
    return true; // Do not block request on KV failure
  }
}

/**
 * Fast keyword and amount detection for PLD (Prevención de Lavado de Dinero) alerts.
 */
function detectPldAlert(message: string): boolean {
  const lower = message.toLowerCase();

  // Keyword patterns: lavado, efectivo, UIF, reporte, operaciones en efectivo, operaciones vulnerables
  const keywordRegex = /\b(lavado|efectivo|uif|reporte|operaci[oó]n(?:es)?\s+en\s+efectivo|operaci[oó]n(?:es)?\s+vulnerable(?:s)?)\b/i;
  if (keywordRegex.test(lower)) {
    return true;
  }

  // Amounts >= 100,000 MXN
  if (lower.includes('cien mil')) {
    return true;
  }

  // Detect numeric amounts: 100000, 100,000, $100000, 100k, 100 mil
  const amountMatches = lower.match(/(?:\$|\bmxn\s*)?(\d{1,3}(?:,\d{3})+|\d+)(?:\s*(?:k|mil|pesos|mxn))?/gi);
  if (amountMatches) {
    for (const match of amountMatches) {
      const clean = match.replace(/[$,\s]|mxn|pesos/gi, '');
      if (/k$/i.test(clean)) {
        const val = parseFloat(clean.replace(/k$/i, '')) * 1000;
        if (val >= 100000) return true;
      } else if (/mil$/i.test(clean)) {
        const val = parseFloat(clean.replace(/mil$/i, '')) * 1000;
        if (val >= 100000) return true;
      } else {
        const val = parseFloat(clean);
        if (val >= 100000) return true;
      }
    }
  }

  return false;
}

/**
 * Queries D1 knowledge_base table for context matching service line and topic context.
 */
async function fetchKnowledgeBaseContext(
  db: any,
  line: ServiceLine,
  context: string
): Promise<{ kbText: string; primaryLegalReference: string }> {
  if (!db || typeof db.prepare !== 'function') {
    return { kbText: 'No hay información adicional disponible en la base de conocimientos.', primaryLegalReference: '' };
  }

  try {
    const stmt = db.prepare(
      'SELECT answer, legal_reference FROM knowledge_base WHERE line = ? AND context = ? ORDER BY id DESC LIMIT 5'
    );
    const { results } = await stmt.bind(line, context).all();

    if (!results || results.length === 0) {
      return { kbText: 'No hay información adicional disponible en la base de conocimientos.', primaryLegalReference: '' };
    }

    const rows = results as KnowledgeBaseRow[];
    const textPieces: string[] = [];
    let legalRef = '';

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!row) continue;
      const refPart = row.legal_reference ? ` (Referencia: ${row.legal_reference})` : '';
      textPieces.push(`- ${row.answer}${refPart}`);
      if (!legalRef && row.legal_reference) {
        legalRef = row.legal_reference;
      }
    }

    return {
      kbText: textPieces.join('\n'),
      primaryLegalReference: legalRef,
    };
  } catch (error) {
    console.warn('[api/chat] Error al consultar base de conocimientos D1:', error);
    return { kbText: 'No hay información adicional disponible en la base de conocimientos.', primaryLegalReference: '' };
  }
}

/**
 * Constructs the system prompt for Noah AI.
 */
function buildSystemPrompt(
  line: ServiceLine,
  context: string,
  lang: Language,
  kbContext: string
): string {
  const lineConfig = LINE_CONFIGS[line];
  const langLabel = lang === 'en' ? 'Inglés' : 'Español';

  return `Eres Noah, el asistente de IA de ARK SYSTEMS — ${lineConfig.label}.
Tu rol: ${lineConfig.role}

CONTEXTO ACTIVO: ${context}
IDIOMA: Responde en ${langLabel}.

COMPORTAMIENTO:
- Sé conciso, profesional y directo. Máximo 3 párrafos cortos.
- Si tienes información de la base de conocimientos, úsala como referencia primaria.
- NUNCA inventes artículos de ley, cifras o datos. Si no tienes la información exacta, di que el usuario consulte con un profesional.
- Si detectas temas de PLD (lavado de dinero, operaciones en efectivo >$100,000 MXN), menciona la obligación de reportar ante la UIF.
- No ofrezcas asesoría legal vinculante. Siempre incluye el disclaimer de que es una respuesta generada por IA.

BASE DE CONOCIMIENTOS (referencia):
${kbContext}`;
}

/**
 * Calls Cloudflare Workers AI with primary model and automatic fallback.
 */
async function generateAiResponse(
  ai: any,
  systemPrompt: string,
  userMessage: string
): Promise<{ responseText: string; modelName: string }> {
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage },
  ];

  const payload = {
    messages,
    max_tokens: 800,
    temperature: 0.3,
  };

  // Attempt Primary Model
  try {
    const aiResult = await ai.run(PRIMARY_MODEL, payload);
    const text = typeof aiResult?.response === 'string' ? aiResult.response : String(aiResult?.response || '');
    if (text) {
      return { responseText: text, modelName: 'llama-3.3-70b' };
    }
  } catch (primaryError) {
    console.warn('[api/chat] Falló modelo primario (@cf/meta/llama-3.3-70b-instruct-fp8-fast). Intentando fallback...', primaryError);
  }

  // Attempt Fallback Model
  try {
    const fallbackResult = await ai.run(FALLBACK_MODEL, payload);
    const text = typeof fallbackResult?.response === 'string' ? fallbackResult.response : String(fallbackResult?.response || '');
    if (text) {
      return { responseText: text, modelName: 'llama-3.1-8b' };
    }
  } catch (fallbackError) {
    console.error('[api/chat] Falló modelo de fallback (@cf/meta/llama-3.1-8b-instruct-fast):', fallbackError);
  }

  throw new Error('No se pudo generar respuesta con ninguno de los modelos de Workers AI.');
}

/**
 * Endpoint POST /api/chat
 * Noah AI Assistant - Cloudflare Workers AI + D1 + KV powered chat endpoint.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. Verify Workers AI availability early
    if (!locals?.ai) {
      console.error('[api/chat] Binding locals.ai no configurado');
      return new Response(
        JSON.stringify({ error: 'El servicio de IA no está disponible. Intenta de nuevo más tarde.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Parse and Validate Request Payload
    let body: ChatRequestBody;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'El cuerpo de la solicitud no es un JSON válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';
    if (!rawMessage || rawMessage.length === 0) {
      return new Response(
        JSON.stringify({ error: 'El campo "message" es obligatorio y no puede estar vacío.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (rawMessage.length > 2000) {
      return new Response(
        JSON.stringify({ error: 'El mensaje excede el límite máximo de 2000 caracteres.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const context = typeof body.context === 'string' ? body.context.trim() : '';

    const line: ServiceLine = (body.line === 'legal' || body.line === 'commerce' || body.line === 'lab')
      ? body.line
      : 'legal';

    const lang: Language = (body.lang === 'es' || body.lang === 'en')
      ? body.lang
      : 'es';

    // 3. Rate Limiting via KV
    const clientIp = getClientIp(request);
    const isAllowed = await checkRateLimit(locals.session, clientIp);
    if (!isAllowed) {
      return new Response(
        JSON.stringify({ error: 'Demasiadas solicitudes. Por favor, intenta de nuevo en un minuto.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }

    // 4. PLD Alert Detection
    const isPldAlert = detectPldAlert(rawMessage);
    if (isPldAlert) {
      console.warn('[api/chat] Alerta PLD detectada:', {
        clientIp,
        messagePreview: rawMessage.slice(0, 100),
      });
    }

    // 5. Knowledge Base Lookup (D1)
    const { kbText, primaryLegalReference } = await fetchKnowledgeBaseContext(locals.db, line, context);

    // 6. Build System Prompt
    const systemPrompt = buildSystemPrompt(line, context, lang, kbText);

    // 7. Workers AI Execution
    let aiOutput: { responseText: string; modelName: string };
    try {
      aiOutput = await generateAiResponse(locals.ai, systemPrompt, rawMessage);
    } catch (aiError) {
      console.error('[api/chat] Error al invocar Workers AI:', aiError);
      return new Response(
        JSON.stringify({ error: 'El servicio de IA no está disponible. Intenta de nuevo más tarde.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 8. Build and Return Response
    const responsePayload = {
      response: aiOutput.responseText,
      legal_reference: primaryLegalReference,
      metadata: {
        model: aiOutput.modelName,
        context,
        line,
        pld_alert: isPldAlert,
      },
    };

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[api/chat] Error interno no controlado:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor. Por favor, intenta más tarde.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};