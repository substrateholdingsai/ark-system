import type { APIRoute } from 'astro';

export const prerender = false; // Forzar ejecución en el Edge

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { message, context } = await request.json();

    // Validación básica
    if (!locals.ai) {
      return new Response(
        JSON.stringify({ error: 'Workers AI no está configurado' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Mensaje inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // System prompt sobrio y profesional
    const systemPrompt = `Eres B.O.B., un asistente fiscal y legal experto, sobrio y profesional.
Tu especialidad es: ${context || 'fiscal'}.
Responde de manera concisa, clara y en español. 
Si no sabes algo, indícalo. No inventes leyes ni artículos.
Mantén un tono profesional, como un contador o abogado senior.`;

    // Llamar a Workers AI (Llama 3 8B Instruct)
    const response = await locals.ai.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      stream: false
    });

    return new Response(
      JSON.stringify({ response: response.response }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('[api/chat] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};