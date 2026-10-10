import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { message, context } = await request.json();

    if (!locals.ai || !locals.db) {
      return new Response(JSON.stringify({ error: 'Bindings de AI o DB no configurados' }), { status: 500 });
    }

    // PASO 1: Usar Clef para tomar una decisión estructurada sobre la pregunta
    const clefResponse = await locals.ai.run('@cf/cloudflare/clef', {
      model: 'clef',
      state: `Contexto del usuario: ${context}. Pregunta del cliente: "${message}"`,
      questions: {
        is_pld_alert: {
          type: 'noul', // Yes/No probability
          instructions: '¿La pregunta menciona operaciones en efectivo mayores a $100,000 MXN o lavado de dinero?',
        },
        topic_category: {
          type: 'choice',
          instructions: '¿A qué categoría fiscal pertenece esta pregunta?',
          criteria: {
            pld: 'Prevención de Lavado de Dinero y reportes a la UIF',
            isr: 'Impuesto Sobre la Renta y declaraciones',
            iva: 'Impuesto al Valor Agregado',
            general: 'Dudas generales o fuera de alcance',
          },
        },
      },
    });

    // Extraer la decisión de Clef (la categoría con mayor probabilidad)
    const category = clefResponse.answers.topic_category.choice;
    const isPldAlert = clefResponse.answers.is_pld_alert.probability > 0.7;

    // PASO 2: Buscar en D1 la respuesta pre-aprobada basada en la decisión de Clef
    const stmt = locals.db.prepare(`
      SELECT answer, legal_reference FROM knowledge_base 
      WHERE topic = ? 
      ORDER BY id DESC LIMIT 1
    `);
    const { results } = await stmt.bind(category).all();

    let finalAnswer = '';
    let legalRef = '';

    if (results && results.length > 0) {
      finalAnswer = results[0].answer;
      legalRef = results[0].legal_reference;
    } else {
      finalAnswer = 'Para esta consulta específica, te recomiendo agendar una revisión estratégica con nuestro equipo, ya que requiere un análisis personalizado.';
    }

    // PASO 3: (Opcional) Usar un LLM ligero solo para dar formato sobrio a la respuesta, si se desea
    // Pero para máxima velocidad y cero alucinaciones, podemos devolver la respuesta directa de D1:
    
    const responsePayload = {
      response: finalAnswer,
      legal_reference: legalRef,
      metadata: {
        clef_decision: category,
        pld_alert: isPldAlert,
        confidence: clefResponse.answers.topic_category.confidence,
      }
    };

    // Si es una alerta PLD, podríamos disparar un webhook interno aquí para notificar al contador

    return new Response(JSON.stringify(responsePayload), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('[api/chat] Error:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
};