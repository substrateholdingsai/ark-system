/// <reference types="astro/client" />

/**
 * Typed environment variables.
 *
 * Astro inlines `PUBLIC_*` into the client bundle at build time — only put
 * public identifiers behind that prefix. Everything else is server-only and is
 * only reachable from Pages Functions / SSR routes, never from client code.
 *
 * See `.env.example` for the full annotated list.
 */
interface ImportMetaEnv {
  /** Plausible analytics domain, e.g. `ark.systems`. */
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  /** Sanity project id (public, but not secret). */
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
  readonly PUBLIC_CAL_LINK?: string;
  readonly PUBLIC_FORMSPREE_FORM_ID?: string;
  readonly PUBLIC_SITE_URL?: string;

  /** Server-only. Requires `output: 'server'` or a Pages Function. */
  readonly STRIPE_SECRET_KEY?: string;
  readonly MERCADO_PAGO_ACCESS_TOKEN?: string;
  readonly BTCPAY_URL?: string;
  readonly BTCPAY_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
