export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/seed') {
      return new Response('POST /seed to run', { status: 404 });
    }

    const db = env.DB;
    const ai = env.AI;
    const vectorize = env.VECTORIZE;

    const { results } = await db
      .prepare('SELECT id, line, context, topic, answer, legal_reference FROM knowledge_base')
      .all();

    const rows = results || [];
    const batchSize = 25;
    let upserted = 0;

    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const vectors = [];
      for (const r of batch) {
        const text = `${r.topic}. ${r.answer}`;
        let res;
        try {
          res = await ai.run('@cf/baai/bge-base-en-v1.5', { text });
        } catch (e) {
          return new Response(JSON.stringify({ error: String(e), id: r.id }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
          });
        }
        const embedding =
          Array.isArray(res?.data) && Array.isArray(res.data[0])
            ? res.data[0]
            : Array.isArray(res?.data) && res.data[0]?.embedding
              ? res.data[0].embedding
              : null;
        if (!embedding) {
          return new Response(JSON.stringify({ error: 'no embedding', id: r.id, res }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
          });
        }
        vectors.push({
          id: String(r.id),
          values: embedding,
          metadata: {
            id: r.id,
            line: r.line,
            context: r.context,
            topic: r.topic,
            answer: r.answer,
            legal_reference: r.legal_reference || '',
          },
        });
      }
      await vectorize.upsert(vectors);
      upserted += vectors.length;
    }

    return new Response(JSON.stringify({ upserted, total: rows.length }), {
      headers: { 'content-type': 'application/json' },
    });
  },
};
