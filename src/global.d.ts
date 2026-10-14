/// <reference types="astro/client" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
  readonly PUBLIC_CAL_LINK?: string;
  readonly PUBLIC_FORMSPREE_FORM_ID?: string;
  readonly PUBLIC_SITE_URL?: string;

  readonly STRIPE_SECRET_KEY?: string;
  readonly MERCADO_PAGO_ACCESS_TOKEN?: string;
  readonly BTCPAY_URL?: string;
  readonly BTCPAY_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    ai: any;
    db: any;
    session: any;
  }
}
