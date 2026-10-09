import { defineMiddleware } from 'astro:middleware';

/**
 * Ark System Middleware
 * Inyecta los bindings de Cloudflare Workers en el contexto de Astro (locals).
 * Esto permite que las API Routes accedan a AI, DB, KV, etc. sin pasar `env` manualmente.
 */

export const onRequest = defineMiddleware(async (context, next) => {
  // Obtener bindings del runtime de Cloudflare (inyectado por el adapter en locals.runtime)
  const runtime = (context.locals as any).runtime?.env;

  if (runtime) {
    context.locals.ai = runtime.AI;
    context.locals.db = runtime.DB;
    context.locals.session = runtime.SESSION;
  }

  // Opcional: Log de depuración en desarrollo
  if (import.meta.env.DEV) {
    console.log('[middleware] Bindings inyectados:', {
      ai: !!context.locals.ai,
      db: !!context.locals.db,
      session: !!context.locals.session,
    });
  }

  return next();
});