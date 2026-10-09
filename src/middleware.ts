import { defineMiddleware } from 'astro:middleware';

/**
 * Ark System Middleware
 * Inyecta los bindings de Cloudflare Workers en el contexto de Astro (locals).
 * Esto permite que las API Routes accedan a AI, DB, KV, etc. sin pasar `env` manualmente.
 */

interface CloudflareEnv {
  AI: any;
  DB: any;
  SESSION: any;
}

interface ExtendedContext {
  env: CloudflareEnv;
  locals: {
    ai: CloudflareEnv['AI'];
    db: CloudflareEnv['DB'];
    session: CloudflareEnv['SESSION'];
  };
}

export const onRequest = defineMiddleware(async (context, next) => {
  // Type assertion for Cloudflare bindings (via unknown to satisfy strict checks)
  const ctx = context as unknown as ExtendedContext;

  // Inyectar bindings de Cloudflare en locals
  // Nota: Estos bindings deben existir en wrangler.jsonc
  ctx.locals.ai = ctx.env.AI;
  ctx.locals.db = ctx.env.DB;
  ctx.locals.session = ctx.env.SESSION;

  // Opcional: Log de depuración en desarrollo
  if (import.meta.env.DEV) {
    console.log('[middleware] Bindings inyectados:', {
      ai: !!ctx.env.AI,
      db: !!ctx.env.DB,
      session: !!ctx.env.SESSION,
    });
  }

  return next();
});