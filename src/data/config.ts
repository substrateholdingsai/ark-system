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
    displayName: 'ARK SYSTEMS',
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
    headline: 'Sitios web ultra rápidos en arrendamiento o compra',
    subheadline:
      'Construimos e-commerces, catálogos y plataformas de alto rendimiento desplegadas en el Edge global de Cloudflare. Elige entre suscripción mensual sin costo inicial o compra única.',
    stats: [
      { value: '100/100', label: 'LIGHTHOUSE SCORE' },
      { value: '<0.4s', label: 'TIEMPO DE CARGA' },
      { value: '300+', label: 'CIUDADES EN EDGE' },
    ],
    primaryCta: {
      label: 'Ver Demos y Portafolio',
      href: '/portfolio',
      variant: 'primary',
    },
    secondaryCta: {
      label: 'Planes de Arrendamiento',
      href: '#pricing',
      variant: 'ghost',
    },
    microcopy: 'Publicado en el Edge en < 15 segundos • Carga instantánea • 100/100 Lighthouse',
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
    label: 'INFRAESTRUCTURA & TECNOLOGÍA',
    headline: 'Desarrollo Edge-Native con arquitectura moderna',
    subheadline:
      'Construimos e-commerces y plataformas digitales sobre el stack técnico más rápido del mundo, bajo un modelo de leasing fiscalmente optimizado para PYMEs y profesionales.',
  },

  stack: [
    {
      name: 'Astro 5 + TypeScript',
      desc: 'Arquitectura de islas tipo-segura para velocidad extrema y score 100/100 en Lighthouse.',
    },
    {
      name: 'Cloudflare Edge / Workers',
      desc: 'Ejecución serverless en +300 ciudades con latencia <40ms y cero cold starts.',
    },
    {
      name: 'Python & Engine IA',
      desc: 'Scripts de automatización, procesamiento de datos y microservicios de IA integrados.',
    },
    {
      name: 'Bases de Datos Edge (D1 & Vector)',
      desc: 'Almacenamiento SQL y búsqueda vectorial para agentes inteligentes sin servidores tradicionales.',
    },
    {
      name: 'Pasarelas Multi-Moneda',
      desc: 'Integración nativa de cobros con Tarjeta (Stripe), SPEI o Bitcoin / Lightning Network.',
    },
    {
      name: 'Seguridad WAF & Zero Trust',
      desc: 'Protección anti-DDoS, certificados SSL automáticos y cifrado de grado empresarial.',
    },
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
    label: 'MODELO DE INFRAESTRUCTURA',
    headline: 'Elige cómo desplegar tu presencia digital',
    subheadline:
      'Sin sorpresas de mantenimiento ni servidores obsoletos. Escoge entre un arrendamiento mensual todo incluido o la adquisición de tu código fuente.',

    plans: [
      {
        id: 'leasing',
        kind: 'offer',
        label: 'OPEX • MÁS POPULAR',
        name: 'Arrendamiento Core',
        monthly: 3890,
        currency: 'MXN',
        setup: 0,
        subprice: 'Renta 100% deducible de ISR e IVA acreditable',
        available: true,
        badge: 'RECOMENDADO',
        summary:
          'Ideal para pymes, restaurantes, e-commerce y firmas profesionales que buscan lanzar sin gasto inicial alto.',
        includes: [
          'Desarrollo e infraestructura Edge completa (Astro + Cloudflare)',
          'Hosting global serverless + SSL + WAF anti-DDoS',
          'Carga ultra rápida (< 400ms en Edge global)',
          'Soporte y actualización de contenidos incluida',
          'Mantenimiento continuo y monitoreo 24/7',
        ],
        cta: {
          label: 'Comenzar en Leasing',
          href: 'https://cal.com/pablo-cortes-wuzivu/15min',
          external: true,
          variant: 'primary',
        },
        microcopy: 'Cancelación flexible • Sin activos desactualizados',
      },
      {
        id: 'leasing-pro',
        kind: 'offer',
        label: 'OPEX • ENTERPRISE',
        name: 'Arrendamiento Pro + IA / Apps',
        monthly: 6890,
        currency: 'MXN',
        setup: 0,
        subprice: 'Deducción de ISR efectiva (~$2,410 MXN costo real)',
        summary:
          'Para negocios que requieren pasarelas de pago avanzadas, agentes de IA o integraciones de catálogo/agenda.',
        includes: [
          'Todo lo del Plan Core',
          'Agente de IA nativo para atención al cliente 24/7',
          'Pasarelas de pago múltiples (Tarjetas, SPEI o Crypto/Lightning)',
          'Integración de agenda en vivo o checkout automatizado',
          'Infraestructura dedicada (Workers + Vector DB)',
        ],
        cta: {
          label: 'Agendar Demo Pro',
          href: 'https://cal.com/pablo-cortes-wuzivu/15min',
          external: true,
          variant: 'primary',
        },
        available: true,
      },
      {
        id: 'buyout',
        kind: 'offer',
        label: 'CAPEX • ADQUISICIÓN',
        name: 'Licencia / Compra Única',
        price: 55000,
        currency: 'MXN',
        billing: 'one_time',
        subprice: 'Activo intangible amortizable',
        summary:
          'Para empresas con equipo técnico propio que desean ser dueñas absolutas del código fuente y repositorio.',
        includes: [
          'Entrega total del repositorio de código (GitHub)',
          'Despliegue inicial en tu propia cuenta de Cloudflare',
          'Ownership y licencias completas del software',
          '30 días de garantía y transferencia técnica',
        ],
        cta: {
          label: 'Cotizar Compra Única',
          href: 'https://cal.com/pablo-cortes-wuzivu/15min',
          external: true,
          variant: 'secondary',
        },
        available: true,
      },
    ],

    fiscal: {
      badge: 'ESTRATEGIA FINANCIERA Y FISCAL',
      headline: '¿Por qué conviene el Arrendamiento Operativo (OPEX)?',
      body: 'Desarrollar software propio implica un gasto de capital (CAPEX) difícil de amortizar y que pierde valor rápidamente. Nuestro esquema de Arrendamiento Tecnológico convierte el desarrollo web en un gasto operativo puro.',
      badges: [
        '100% Deducible ISR',
        'IVA Acreditable',
        'Flujo de Cero Sorpresas',
        'Siempre Actualizado',
      ],
      comparison: [
        {
          model: 'Desarrollo Tradicional (CAPEX)',
          effect:
            'Inversión inicial fuerte ($60k - $120k+ MXN) + costos mensuales de servidor, parches y cambios.',
          cashflow: 'Impacta tu flujo de efectivo inmediato y deprecia como activo a varios años.',
        },
        {
          model: 'Arrendamiento Ark-System (OPEX)',
          effect:
            'Cuota fija mensual 100% deducible. Incluye código, cambios, hosting en Cloudflare y soporte.',
          cashflow:
            'Optimiza tu estrategia fiscal desde el mes 1 y mantiene tu sitio en la tecnología más moderna.',
        },
      ],
      disclaimer:
        '* El impacto fiscal exacto depende del régimen tributario de tu empresa (RESICO, Persona Moral Ley General, etc.). Consulta con tu área contable.',
    },

    paymentMethods: [
      {
        code: 'MXN',
        title: 'Transferencia SPEI',
        method: 'Factura fiscal B2B',
        detail: 'Inmediato con CFDI 4.0',
      },
      {
        code: 'STRIPE',
        title: 'Tarjetas de Crédito/Débito',
        method: 'Cargo automático mensual',
        detail: 'Suscripción sin fricción',
      },
      {
        code: 'BTC / SATS',
        title: 'Bitcoin / Lightning Network',
        method: 'Soberanía digital',
        detail: 'Sin intermediarios vía BTCPay/Blink',
      },
      {
        code: 'STABLECOINS',
        title: 'USDT / USDC',
        method: 'Redes Polygon / Solana / Tron',
        detail: 'Pagos internacionales instantáneos',
      },
    ],

    btcCopy:
      'Soportamos pagos en activos digitales tanto en capa base como en capas de segunda generación (Lightning/Solana) con facturación equivalente.',
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

export const demos = {
  temozonia: {
    enabled: true,
    demoMode: true,
    brand: {
      name: 'Temozonia Carnes Ahumadas',
      colors: { primary: '#7E1D0F', bg: '#FFF9F3', accent: '#FF8800' },
    },
    payments: {
      clabe: {
        number: '123456789012345678',
        bank: 'BBVA',
        holder: 'Temozonia Carnes Ahumadas',
      },
      btcpayUrl: 'https://btcpay.temozonia.com',
      whatsapp: '529994918221',
      whatsappDisplay: '+52 999 491 8221',
      lightningAddress: 'temozonia@blink.sv',
      satsRate: 2.5,
    },
    products: [
      {
        id: 'carne',
        name: 'Carne Ahumada',
        weight: '1kg',
        price: 380,
        desc: 'Brisquet ahumado 8h con mezquite. Jugosa, en lonchas.',
        badge: 'MÁS VENDIDA',
        stock: 12,
        image:
          'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'costilla',
        name: 'Costilla Ahumada',
        weight: '1kg',
        price: 420,
        desc: 'Costillar St. Louis con rub de la casa, ahumado bajo y lento.',
        badge: 'PREMIUM',
        stock: 8,
        image:
          'https://images.unsplash.com/photo-1679711246825-1f2bd51b16d0?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'longaniza',
        name: 'Longaniza Ahumada',
        weight: '1kg',
        price: 320,
        desc: 'Artesanal, tripa natural, ahumada con encino. Ideal para tacos.',
        badge: 'TOP',
        stock: 15,
        image:
          'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'chamorro',
        name: 'Chamorro Ahumado',
        weight: 'pieza 1.2kg',
        price: 280,
        desc: 'Chamorro curado y ahumado, gelatinoso y tierno. Listo para calentar.',
        badge: 'NUEVO',
        stock: 9,
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'pack',
        name: 'Pack Parrillero',
        weight: '2kg mixto',
        price: 650,
        desc: 'Mix bestseller: 1kg carne + 500g costilla + 500g longaniza. Ahorra $70',
        badge: 'AHORRO',
        stock: 6,
        image:
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      },
    ],
  },
} as const;

export const pageTitle = `${config.brand.name} — ${config.brand.tagline}`;
