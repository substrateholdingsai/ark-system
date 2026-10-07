// src/data/config.ts

/**
 * Ark System — Configuration Contract v1
 *
 * Este archivo es la ÚNICA fuente de verdad para contenido, links y metadata.
 * Los componentes NO deben hardcodear strings, URLs ni precios.
 *
 * Arquitectura:
 * - Interfaces definen el contrato del MOTOR (reutilizable).
 * - La constante `config` contiene la INSTANCIA de ARK SYSTEMS (Cliente 0).
 */

// ==========================================
// TIPOS / INTERFACES (El Contrato del Motor)
// ==========================================

export interface BrandConfig {
  name: string;
  displayName: string; // Ej: "ARK SYSTEMS_" con cursor
  legalName: string; // Ej: "Substrate Holdings LLC"
  tagline: string;
  domain: string; // Dominio principal sin protocolo
  logoSrc: string; // Ruta relativa o absoluta al SVG/PNG
  faviconSrc: string;
  ogImageSrc: string;
}

export interface NavLink {
  label: string;
  href: string; // Puede ser "#id" o "/ruta"
  external?: boolean; // true si abre nueva pestaña
}

export interface CTAButton {
  label: string;
  href: string;
  external?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface HeroStat {
  value: string; // Ej: "95+", "$0", "2"
  label: string; // Ej: "LIGHTHOUSE", "SSL AUTOMÁTICO"
}

export interface HeroSection {
  headline: string;
  subheadline: string;
  stats: HeroStat[];
  primaryCta: CTAButton;
  secondaryCta?: CTAButton;
  microcopy?: string;
}

export interface ProblemCard {
  id: string; // key único para React/Astro keys
  label: string; // Ej: "01 / WORDPRESS MUSEO"
  title: string;
  bullets: string[];
  cost: string; // Texto de costo comparativo
  badge?: string; // Ej: "RECOMENDADO"
  highlight?: boolean; // Si debe tener estilo especial
}

export interface HowStep {
  n: string; // "01", "02"...
  title: string;
  desc: string;
  meta: string; // Tag pequeña, ej: "single source of truth"
}

export interface HowSection {
  label: string;
  headline: string;
  subheadline: string;
  steps: HowStep[];
  rule: string; // La frase memorable de cierre
}

export interface StackItem {
  name: string;
  desc: string;
}

export interface StackSectionCopy {
  label: string;
  headline: string;
  subheadline: string;
}

export interface UseCase {
  tag: string; // "RESTAURANTES"
  before: string; // Estado actual doloroso
  after: string; // Solución Ark
}

export interface CostRow {
  concept: string;
  wpWix: string;
  ark: string;
}

export interface CostsSection {
  badge: string;
  headline: string;
  disclaimer: string;
  rows: CostRow[];
  total: {
    wpWix: string;
    ark: string;
  };
}

// --- PRICING TYPES ---

export type PlanKind = 'anti-plan' | 'offer';

export interface PaymentMethod {
  code: string; // "MXN", "USD", "BTC"
  title: string;
  method: string; // Descripción técnica breve
  badge?: string; // "Más usado", "0% comisión"
  detail: string; // Detalles adicionales
}

export interface FiscalBlock {
  badge: string;
  headline: string;
  body: string;
  badges: string[];
  comparison: Array<{
    model: string;
    effect: string;
    cashflow: string;
  }>;
  disclaimer: string;
}

export interface PricingPlan {
  id: string;
  kind: PlanKind;
  label: string; // Badge superior, ej: "PARA TECHIES"
  name: string;

  // Precios (flexibles según tipo de plan)
  price?: number;
  currency?: string;
  billing?: 'one_time' | 'monthly' | 'annual';
  monthlyEquivalent?: number; // Para mostrar en anti-plans

  setup?: number; // Costo inicial (0 para leasing)
  monthly?: number; // Cuota mensual
  residual?: number; // Pago final opcional

  subprice?: string; // Texto explicativo debajo del precio grande
  summary: string; // Pitch corto
  badge?: string;
  contractMonths?: number;

  includes?: string[];
  excludes?: string[];
  bullets?: string[]; // Usado principalmente en anti-plans

  total?: string; // Texto de total acumulado (ej: "~$45k en 3 años")
  total36Months?: string; // Texto específico para leasing

  cta?: CTAButton;
  ctaBadge?: string; // Ej: "sin setup"
  microcopy?: string;

  available: boolean; // false para anti-plans
}

export interface PricingSection {
  label: string;
  headline: string;
  subheadline: string;
  plans: PricingPlan[];
  fiscal: FiscalBlock;
  paymentMethods: PaymentMethod[];
  btcCopy?: string;
}

export interface PortfolioItem {
  name: string;
  url: string;
  image: string;
  description: string;
  tags: string[];
}

// --- GLOBAL CONFIG TYPE ---

export interface SiteConfig {
  brand: BrandConfig;
  locale: string;
  theme: {
    default: string;
    accentHex?: string; // Opcional override
  };
  nav: NavLink[];
  hero: HeroSection;
  portfolio: PortfolioItem[];
  problems: ProblemCard[];
  how: HowSection;
  stackSection: StackSectionCopy;
  stack: StackItem[];
  useCases: {
    intro: string;
    items: UseCase[];
  };
  costs: CostsSection;
  pricing: PricingSection;
  finalCta: {
    headline: string;
    subheadline: string;
    primary: CTAButton;
    secondary?: CTAButton;
    microcopy?: string;
  };
  footer: {
    copyright: string;
    tagline: string;
    tech: string;
  };
  contact: {
    email: string;
    whatsapp?: string;
    facebook?: string;
    formEndpoint: string; // URL real o placeholder marcado
    bookingUrl: string; // Cal.com real o placeholder
  };
  repo: {
    url: string;
  };
}

// ==========================================
// INSTANCIA: ARK SYSTEMS (CLIENTE 0)
// ==========================================

export const config: SiteConfig = {
  brand: {
    name: 'ARK SYSTEMS',
    displayName: 'ARK SYSTEMS_',
    legalName: 'Substrate Holdings LLC',
    tagline: '0 servidores. 0 humo.',
    domain: 'arksystems.dev',
    logoSrc: '/assets/vector/logo-mark.svg',
    faviconSrc: '/assets/vector/favicon.svg',
    ogImageSrc: '/assets/og-default.png',
  },

  locale: 'es_MX',

  theme: {
    default: 'fire', // Ark usa el tema fire (#FF6B1A)
  },

  nav: [
    { label: 'QUÉ ES', href: '/#que-es' },
    { label: 'CÓMO', href: '/#como' },
    { label: 'PARA QUÉ', href: '/#para-que' },
    { label: 'COSTOS', href: '/#costos' },
    { label: 'PRICING', href: '/#pricing' },
    { label: 'PORTFOLIO', href: '/portfolio' },
  ],

  hero: {
    headline: 'Las webs de museo murieron.',
    subheadline:
      'WordPress te cobra por respirar. Wix te encierra en su juguete. Ark Systems es infraestructura real: 1 config, 0 servidores, deploy en 2 comandos.',
    stats: [
      { value: '95+', label: 'LIGHTHOUSE' },
      { value: '$0', label: 'SSL AUTOMÁTICO' },
      { value: '2', label: 'COMANDOS DEPLOY' },
    ],
    primaryCta: {
      label: 'AGENDAR DEMO',
      href: 'https://cal.com/pablo-cortes-wuzivu/15min',
      external: true,
      variant: 'primary',
    },
    secondaryCta: {
      label: 'VER PRICING',
      href: '#pricing',
      external: false,
      variant: 'secondary',
    },
    microcopy: 'Sin humo. Sin lock-in. Sin museos digitales.',
  },

  portfolio: [
    {
      name: 'La Bianca Tropical',
      url: 'https://labianca.ark.systems',
      image: '/assets/portfolio/labianca.jpg',
      description: 'Edge-hosted storefront with instant global delivery.',
      tags: ['Storefront'],
    },
  ],

  problems: [
    {
      id: 'wordpress',
      label: '01 / WORDPRESS MUSEO',
      title: 'El stack que huele a humedad',
      bullets: [
        'hosting barato que se cae cuando más vendes',
        'SSL que pagas aparte como si fuera lujo',
        'plugins que se rompen entre sí',
        '3s de carga y una experiencia que asusta',
      ],
      cost: '✕ $185/año + $300 de mantenimiento escondido',
      highlight: false,
    },
    {
      id: 'wix',
      label: '02 / WIX / CONSTRUCTORES',
      title: 'Juguete caro con candado',
      bullets: [
        'tu web vive dentro de su jaula',
        'no exportas, no controlas, no te vas fácil',
        'pagas por funciones que deberían ser básicas',
        'el editor se siente como navegar con arena en los ojos',
      ],
      cost: '✕ lock-in total. soporte copy/paste que odia su trabajo (yo fui).',
      highlight: false,
    },
    {
      id: 'ark',
      label: '03 / ARK SYSTEMS • PARADIGMA NUEVO',
      title: '0 servidores. 0 humo.',
      bullets: [
        'Cloudflare Pages edge global • 300+ pops',
        'SSL $0, automático y para siempre',
        'config.ts como única fuente de verdad',
        '0 JS por defecto, interactividad opcional',
        'Lighthouse 95+ o devolvemos el setup, según términos',
      ],
      cost: '✓ $15/año total. el resto es arquitectura.',
      badge: 'RECOMENDADO',
      highlight: true,
    },
  ],

  how: {
    label: 'CÓMO LO HACE',
    headline: 'Una fuente de verdad. El resto es ruido.',
    subheadline:
      'Ningún componente decide colores. Ningún texto vive escondido en la UI. Todo el contenido, brand, precios y links viven en un solo lugar.',
    steps: [
      {
        n: '01',
        title: 'src/data/config.ts',
        desc: 'Copy, precios, links, brand y contenido. Editas texto sin tocar componentes.',
        meta: 'single source of truth',
      },
      {
        n: '02',
        title: 'Astro 5 + Tailwind',
        desc: 'Build estático, tokens semánticos, zero JS por defecto. CSS variables, no colores inline.',
        meta: '16 líneas JS total',
      },
      {
        n: '03',
        title: 'wrangler pages deploy',
        desc: 'Edge global en 12s. Sin servidores, sin Docker, sin cPanel, sin lágrimas.',
        meta: '12s deploy • 300 pops',
      },
    ],
    rule: 'No component owns a color. Colores = variables CSS. Espaciado = tokens. JS = islas explícitas. 2 scripts de 16 líneas: menú + modal. El resto es HTML que vuela.',
  },

  stackSection: {
    label: 'STACK EDGE-NATIVE',
    headline: 'La infraestructura detrás de la promesa.',
    subheadline:
      'Cada pieza tiene una función clara: servir rápido, mantener el control y evitar dependencias innecesarias.',
  },

  stack: [
    { name: 'Cloudflare Pages', desc: 'Edge global, 300+ pops, deploys atómicos.' },
    { name: 'Astro 5', desc: 'Static first, islands opcionales, 0 JS default.' },
    { name: 'Tailwind', desc: 'Tokens semánticos, sin componente con color hardcodeado.' },
    { name: 'TypeScript strict', desc: 'config.ts tipada, no any, no sustos.' },
    { name: 'Wrangler', desc: 'wrangler pages deploy • 12s • una línea.' },
  ],

  useCases: {
    intro:
      'No es para blogs con 400 plugins. Es para negocios que necesitan una web que cargue, que no se rompa y que no cobre renta por SSL.',
    items: [
      {
        tag: 'RESTAURANTES',
        before: 'WP + Elementor 4.1s • menú PDF',
        after: 'Ark edge 0.4s • menú real • reservas directas',
      },
      {
        tag: 'DESPACHOS',
        before: 'Template ThemeForest + 9 plugins',
        after: 'Config tipada • marca sobria • SEO técnico limpio',
      },
      {
        tag: 'CLÍNICAS',
        before: 'Wix booking que cobra comisión',
        after: 'Cal.com embebido • sin comisión • edge',
      },
      {
        tag: 'REAL ESTATE',
        before: 'WP IDX lento • imágenes 6MB',
        after: 'Astro Image • imágenes optimizadas • mapas edge',
      },
      {
        tag: 'SAAS EARLY',
        before: 'Next.js en Vercel $200/mes',
        after: 'Astro static + edge • $0 hosting para marketing site',
      },
      {
        tag: 'PORTFOLIOS',
        before: 'Squarespace lock-in • export no',
        after: 'Código tuyo • deploy tuyo • dominio tuyo',
      },
    ],
  },

  costs: {
    badge: 'TABLA REAL, NO MARKETING',
    headline: '¿Cuánto te roban al año sin Ark?',
    disclaimer:
      '* Costos típicos de un setup pequeño/medio con hosting compartido, SSL externo y mantenimiento básico. Tu caso puede variar.',
    rows: [
      { concept: 'Hosting', wpWix: '$120/año', ark: '$0 incluido en Pages' },
      { concept: 'SSL', wpWix: '$50/año', ark: '$0 auto' },
      { concept: 'Dominio', wpWix: '$15/año', ark: '$15/año — solo esto pagas' },
      { concept: 'Mantenimiento', wpWix: '$300/año plugins + sustos', ark: '$0' },
      { concept: 'Tiempo de carga', wpWix: '2.8s', ark: '0.4s' },
    ],
    total: {
      wpWix: '$485/año + ansiedad',
      ark: '$15/año. Fin.',
    },
  },

  pricing: {
    label: 'PRICING • SIN TRUCOS',
    headline: 'Elige tu forma de no quedarte obsoleto.',
    subheadline:
      'Compra única si quieres código y control inmediato. Leasing si quieres web siempre actual, deducible y sin golpe fuerte al flujo.',

    plans: [
      {
        id: 'museum',
        kind: 'anti-plan',
        label: 'PLAN MUSEO',
        name: 'WordPress Museo',
        price: 20000,
        currency: 'MXN',
        billing: 'one_time',
        monthlyEquivalent: 500,
        available: false,
        badge: 'NO RECOMENDADO • MUSEO DIGITAL',
        summary:
          'Setup + plantilla premium. Tú pagas hosting, SSL y dominio aparte. Se ve bien 6 meses. Luego museo.',
        bullets: [
          'Hosting $1,200 MXN/año, y sube cada año',
          'SSL $1,000 MXN/año',
          'Dominio $400 MXN/año',
          'Mantenimiento WordPress/plugins $3,600 MXN/año o te hackean',
          'Actualización de diseño $8,000 MXN cada 3 años, que nunca pagas',
          'Velocidad 2.8s–4s: pierdes clientes',
          'Obsolescencia garantizada a los 2 años',
          'Fiscal: se capitaliza, amortizas en 3 años, contador sufre',
          'Código: te entregan un zip que nadie puede mantener',
        ],
        total: '~$45,000 MXN en 3 años + web vieja',
        cta: undefined, // Anti-plan no tiene CTA
      },
      {
        id: 'purchase',
        kind: 'offer',
        label: 'PARA TECHIES',
        name: 'Ark Compra Única',
        price: 999,
        currency: 'USD',
        billing: 'one_time',
        subprice: '+ $0/mes. Repo tuyo desde día 1.',
        summary:
          'Para quien quiere código, control y fork. Tú hosteas. Nosotros guiamos. Sin updates incluidos.',
        includes: [
          'Código completo Astro 5',
          'config.ts + brand + tokens + contenido inicial',
          'Guía de deploy en Cloudflare Pages',
          'Repo privado GitHub entregado',
          'Dominio configurado por tu cuenta',
          'SSL gestionado por plataforma',
        ],
        excludes: [
          'Updates anuales incluidos',
          'Cambios mensuales incluidos',
          'Hosting administrado',
          'Soporte infinito',
        ],
        cta: {
          label: 'VER REPO →',
          href: 'https://github.com/your-org/ark-system', // PENDIENTE: URL real
          external: true,
          variant: 'secondary',
        },
        microcopy: 'Ideal si quieres el código y sabes mantenerlo.',
        available: true,
      },
      {
        id: 'leasing',
        kind: 'offer',
        label: '★ RECOMENDADO • LEASING',
        name: 'Ark Leasing',
        setup: 0,
        monthly: 249,
        currency: 'USD',
        contractMonths: 12,
        residual: 499,
        subprice:
          'Residual $499 USD al final, o renueva y te la dejamos como nueva con última tecnología.',
        summary: 'TODO incluido por $249 USD/mes — renta fija, no sorpresas.',
        includes: [
          'Hosting Edge Global Cloudflare',
          'SSL infinito auto-renovable',
          'Dominio según plan, pendiente definir inclusión exacta',
          'Updates de infraestructura base',
          '1 hora de cambios/mes incluidos',
          'Rediseño anual si renuevas',
          '100% deducible + CFDI mensual, sujeto a criterio contable',
          'Lighthouse 95+ como estándar bajo presupuesto definido',
          'Repo privado GitHub durante el contrato',
          'Opción de pagar residual $499 USD y quedarte con repo completo',
        ],
        total36Months: '$8,964 USD en 36 meses, 100% deducible según estructura fiscal acordada.',
        cta: {
          label: 'Empezar Leasing →',
          href: 'https://cal.com/pablo-cortes-wuzivu/15min',
          external: true,
          variant: 'primary',
        },
        ctaBadge: 'sin setup',
        microcopy: 'Sin permanencia forzada • Cancela cuando quieras • CFDI mensual',
        available: true,
      },
    ],

    fiscal: {
      badge: '100% DEDUCIBLE • TU CONTADOR VA A QUERER SER NUESTRO SOCIO',
      headline: 'No es un gasto. Es infraestructura deducible mes a mes.',
      body: 'Compra única = activo intangible que se amortiza en 36 meses. Tu contador hace malabares, tu flujo sufre. Leasing Ark = gasto operativo mensual 100% deducible de ISR. Facturamos desde Substrate Holdings LLC (US) / Substrate México S.A. CFDI mensual incluido. Ideal para personas morales y físicas con actividad empresarial.',
      badges: ['Incluye CFDI mensual', 'ISR 100% deducible', 'Sin activo en balance'],
      comparison: [
        {
          model: 'Compra $20k',
          effect: 'Amortizas $555/mes x 36m',
          cashflow: 'No deduces hoy',
        },
        {
          model: 'Leasing $249/mes',
          effect: 'Deduces $4,200 MXN aprox. hoy',
          cashflow: 'Flujo intacto',
        },
      ],
      disclaimer:
        '* La deducibilidad depende del régimen fiscal, criterio contable y estructura contractual de cada cliente. Esto no es asesoría fiscal.',
    },

    paymentMethods: [
      {
        code: 'MXN',
        title: 'Pesos Mexicanos',
        method: 'SPEI / Transferencia interbancaria',
        badge: 'Más usado',
        detail: 'CLABE • Referencia automática • CFDI en MXN',
      },
      {
        code: 'USD',
        title: 'Dólares',
        method: 'ACH / Wire / USD-MXN sin comisión',
        badge: 'Para US LLC',
        detail: 'Mercury / Relay • Tipo de cambio FIX sin spread',
      },
      {
        code: 'USDT',
        title: 'Stablecoins',
        method: 'TRC20, ERC20, Polygon, Arbitrum',
        badge: 'USDT • USDC • DAI',
        detail: 'Confirmación <2 min • Sin volatilidad',
      },
      {
        code: 'BTC',
        title: 'Bitcoin',
        method: 'On-chain + Lightning Network',
        badge: '0% comisión',
        detail: 'BTCPay Server self-hosted • No custodial',
      },
    ],

    btcCopy:
      'Si aceptas Bitcoin en tu negocio, ¿por qué tu agencia no? BTCPay Server • Sin intermediarios • Tú controlas tus llaves.',
  },

  finalCta: {
    headline: '¿Tu web sigue igual desde 2012?',
    subheadline:
      'Es hora de rentar futuro, no comprar obsolescencia. Deja de pagar por un museo digital. Renta una web que trabaja, deduce, y nunca da vergüenza presentar.',
    primary: {
      label: 'Agendar demo 15 min ↗',
      href: 'https://cal.com/pablo-cortes-wuzivu/15min',
      external: true,
      variant: 'primary',
    },
    secondary: {
      label: 'Ver contrato tipo leasing',
      href: '/leasing-contrato', // PENDIENTE: Página real o PDF
      external: false,
      variant: 'ghost',
    },
    microcopy: 'Respuesta < 2h • Contrato en 1 página • Sin letra chica',
  },

  footer: {
    copyright: '© 2026 Substrate Holdings LLC • ARK SYSTEMS',
    tagline: 'Hecho por alguien que sufrió Wix y no quiere que tú sufras.',
    tech: 'Astro 5 • Cloudflare Edge • 0.4s',
  },

  contact: {
    email: 'substrateholdingsai@gmail.com',
    whatsapp: '+525657062511',
    facebook: 'https://www.facebook.com/profile.php?id=61595271624798',
    formEndpoint: '/api/contact',
    bookingUrl: 'https://cal.com/pablo-cortes-wuzivu/15min',
  },
  repo: {
    url: 'https://github.com/substrateholdingsai/ark-system',
  },
} as const;

export const pageTitle = `${config.brand.name} — ${config.brand.tagline}`;
