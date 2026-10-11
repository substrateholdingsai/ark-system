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
  logoSrc: string; // Logo cuadrado (PNG) para el JSON-LD: Exige dimensiones declaradas
  faviconSrc: string; // SVG generado por scripts/generate-assets.py
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
  badge?: string;
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
  id: string;
  line?: 'legal' | 'commerce' | 'lab';
  vertical: string;
  traditional: string;
  arkSolution: string;
  badge: string;
}

export interface CostRow {
  concept: string;
  traditional: string;
  arkEdge: string;
  highlight: boolean;
}

export interface CostsSection {
  label: string;
  headline: string;
  subheadline: string;
  headers: {
    concept: string;
    traditional: string;
    arkEdge: string;
  };
  rows: CostRow[];
  summaryNote: string;
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

export interface PricingPageFaq {
  q: string;
  a: string;
}

export interface PricingPageConfig {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
  };
  comparison: {
    badge: string;
    headline: string;
    subheadline: string;
    items: Array<{
      name: string;
      tone: 'negative' | 'positive';
      bullets: string[];
    }>;
  };
  faqs: {
    badge: string;
    headline: string;
    items: PricingPageFaq[];
  };
  finalCta: {
    headline: string;
    subheadline: string;
    primary: CTAButton;
    secondary: CTAButton;
    microcopy: string;
  };
}

export interface PortfolioItem {
  line: 'legal' | 'commerce' | 'lab';
  name: string;
  url?: string;
  image: string;
  description: string;
  tags: string[];
  available?: boolean;
  realUrl?: string;
  seals?: { label: string; value: string }[];
  disclaimer?: string;
}

export interface BusinessLine {
  id: 'legal' | 'commerce' | 'lab';
  name: string;
  tagline: string;
}

export interface AssistantContextConfig {
  key: string;
  label: string;
  iconName: 'scale' | 'shield' | 'coins' | 'file' | 'headphones';
}

export interface AssistantConfig {
  name: string;
  tagline: string;
  line: 'legal' | 'commerce' | 'lab';
  disclaimer: string;
  defaultContext?: string;
  contexts?: AssistantContextConfig[];
}

// --- GLOBAL CONFIG TYPE ---

export interface SiteConfig {
  brand: BrandConfig;
  assistant: AssistantConfig;
  locale: string;
  theme: {
    default: 'legal' | 'commerce' | 'lab';
    accentHex?: string; // Opcional override
  };
  lines: BusinessLine[];
  nav: NavLink[];
  hero: HeroSection;
  portfolio: PortfolioItem[];
  how: HowSection;
  stackSection: StackSectionCopy;
  stack: StackItem[];
  pricingPage: PricingPageConfig;
  useCases: {
    label: string;
    headline: string;
    subheadline: string;
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
    foundation: string;
  };
  contact: {
    email: string;
    whatsapp?: string;
    facebook?: string;
    x?: string;
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
    domain: 'arksystems.site',
    // El header/footer usan el sello inline (components/brand/ArkMark.astro).
    // Este PNG es el logo machine-readable del JSON-LD (Organization.logo).
    logoSrc: '/assets/vector/logo-512.png',
    faviconSrc: '/assets/vector/favicon.svg',
    ogImageSrc: '/assets/og-default.svg',
  },

  assistant: {
    name: 'Noah',
    tagline: 'El guardián de tu expediente',
    line: 'legal',
    disclaimer:
      'Respuesta generada por IA. No constituye asesoría legal. Valida con tu abogado o contador.',
    defaultContext: 'fiscal',
    contexts: [
      { key: 'cumplimiento', label: 'Cumplimiento', iconName: 'shield' },
      { key: 'fiscal', label: 'Fiscal', iconName: 'scale' },
      { key: 'pld', label: 'PLD / Lavado', iconName: 'shield' },
      { key: 'cripto', label: 'Criptoactivos', iconName: 'coins' },
      { key: 'expediente', label: 'Expediente', iconName: 'file' },
      { key: 'soporte', label: 'Soporte', iconName: 'headphones' },
    ],
  },

  locale: 'es_MX',

  theme: {
    default: 'legal', // Ark Systems usa el tema legal por defecto
  },

  lines: [
    {
      id: 'legal',
      name: 'Ark Legal',
      tagline: 'Cumplimiento documental y análisis jurídico.',
    },
    {
      id: 'commerce',
      name: 'Ark Commerce',
      tagline: 'Sitios de alto rendimiento para negocios.',
    },
    {
      id: 'lab',
      name: 'Ark Lab',
      tagline: 'Datos, Bitcoin y agentes inteligentes.',
    },
  ],

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
      line: 'commerce',
      name: 'Temozonia Carnes Ahumadas',
      url: '/portfolio/temozonia',
      image:
        'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80',
      description:
        'Tienda demo de carnes ahumadas con catálogo, carrito y checkout ilustrativo con transferencia, BTCPay, Lightning y pedido por WhatsApp. Productos y datos de pago son de ejemplo.',
      tags: ['DEMO INTERACTIVA', 'React', 'Catálogo', 'Carrito', 'Checkout demo'],
      realUrl: 'https://temozonia.com',
    },
    {
      line: 'lab',
      name: 'Acepta Bitcoin',
      url: 'https://www.aceptabitcoin.org',
      image:
        'https://images.unsplash.com/photo-1623227413711-25ee4388dae3?auto=format&fit=crop&w=1200&q=80',
      description:
        'Directorio y recursos para encontrar comercios que aceptan Bitcoin. El botón abre el sitio publicado de Acepta Bitcoin.',
      tags: ['CASO DE ESTUDIO', 'Directorio', 'Bitcoin', 'Sitio externo'],
    },
    {
      line: 'commerce',
      name: 'Tomato for Bitcoin',
      url: '/portfolio/tomato',
      image:
        'https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=1200&auto=format&fit=crop',
      description:
        'Tienda ilustrativa de cosecha con seis productos de ejemplo, carrito y selector de pago (Bitcoin/Lightning, tarjeta/BTCPay, transferencia o efectivo). No confirma pagos ni pedidos reales.',
      tags: ['DEMO INTERACTIVA', 'Catálogo demo', 'Carrito', 'Bitcoin/Lightning', 'Checkout demo'],
    },
    {
      line: 'commerce',
      name: 'La Bianca Tropical',
      url: 'https://labianca.aceptabitcoin.org/',
      image:
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop',
      description:
        'Sitio storefront para La Bianca Tropical. El botón abre el sitio externo; esta galería no integra ni verifica sus reservas o servicios.',
      tags: ['SITIO EXTERNO', 'Hotel boutique', 'Storefront'],
    },
    {
      line: 'commerce',
      name: 'Padel Outlet',
      image:
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop',
      description:
        'Concepto de tienda outlet de pádel con catálogo y filtros por talla o marca propuestos. Aún no tiene demo interactiva, inventario ni checkout implementados.',
      tags: ['PLANTILLA', 'Concepto e-commerce', 'Pádel', 'No implementado'],
      available: false,
    },
    {
      line: 'commerce',
      name: 'Velvet Room',
      url: '/portfolio/velvet',
      image:
        'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80',
      description:
        'Concepto ficticio de cocktail bar con seis bebidas de muestra, video y galería de ambiente. La reserva y el pago son secciones ilustrativas; no están disponibles.',
      tags: ['DEMO INTERACTIVA', 'Carta demo', 'Galería', 'Video ambiente', 'Sin reservas'],
    },
    {
      line: 'commerce',
      name: 'Medical Express',
      url: '/portfolio/medical',
      image:
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      description:
        'Prototipo ficticio con selección local de horarios y botones de simulación de Stripe/Lightning. No es un prestador de salud, no agenda citas ni procesa pagos o datos personales.',
      tags: ['DEMO INTERACTIVA', 'Agenda demo', 'Pago simulado', 'Sin atención médica'],
    },
    {
      line: 'legal',
      name: 'Arkangel • Cobranza Automatizada',
      url: '/portfolio/arkangel',
      image:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
      description:
        'Simulación con conductas ilustrativas, casos ficticios y ledger local no persistente. No se conecta a sistemas de cobranza; las referencias no son asesoría legal.',
      tags: ['DEMO INTERACTIVA', 'Casos demo', 'Ledger local', 'Referencias ilustrativas'],
      disclaimer: 'Simulación educativa; las referencias mostradas no constituyen asesoría legal.',
    },
    {
      line: 'lab',
      name: 'Talos • Colector de Datos',
      url: '/portfolio/talos',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      description:
        'Prototipo visual de un colector de datos para minería Bitcoin con spread y tick simulados localmente. No consulta fuentes, pools o mercados ni realiza operaciones financieras.',
      tags: ['DEMO INTERACTIVA', 'Datos simulados', 'Minería Bitcoin', 'Sin API activa'],
    },
    {
      line: 'legal',
      name: 'Mapa Crypto • Activos Virtuales',
      url: '/portfolio/mapa-crypto',
      image:
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      description:
        'Explorador con búsqueda y filtros para 12 temas sobre activos virtuales. Las referencias vienen del material de origen, no están verificadas y no constituyen asesoría legal.',
      tags: ['DEMO INTERACTIVA', '12 temas', 'Búsqueda y filtros', 'Referencias sin validar'],
      disclaimer:
        'Las referencias no están verificadas y el contenido no constituye asesoría legal.',
    },
    {
      line: 'legal',
      name: 'SBC 2026 • Calculadora Interactiva',
      url: '/portfolio/sbc-2026-calculadora.html',
      image:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
      description:
        'Calculadora demostrativa del Salario Base de Cotización que actualiza sus resultados en el navegador. No envía datos; sus valores son referencias educativas y no constituyen asesoría fiscal o legal.',
      tags: ['DEMO INTERACTIVA', 'Calculadora SBC', 'Cálculo local', 'Sin backend'],
      disclaimer: 'Referencias educativas; los resultados no constituyen asesoría fiscal o legal.',
    },
  ],

  how: {
    label: 'CÓMO LO HACEMOS',
    headline: 'Arquitectura moderna. Sin la complejidad tradicional.',
    subheadline:
      'Eliminamos los servidores lentos, el mantenimiento costoso y las dependencias técnicas. Un proceso directo diseñado para que tu negocio opere en el Edge.',
    steps: [
      {
        n: '01',
        title: 'Centralización total de contenido',
        meta: 'Single Source of Truth',
        desc: 'Tu marca, precios y catálogo viven en un solo punto central. Actualizamos o personalizamos tu sitio en minutos sin tocar la infraestructura.',
        badge: 'Cambios en minutos',
      },
      {
        n: '02',
        title: 'Rendimiento extremo sin sobreprecio',
        meta: 'Astro 5 + Zero JS por defecto',
        desc: 'Páginas ultraligeras que cargan en menos de 400ms. Sin plugins pesados de WordPress ni bases de datos vulnerables que ralenticen tu sitio.',
        badge: '100/100 Lighthouse',
      },
      {
        n: '03',
        title: 'Despliegue global en el Edge',
        meta: 'Cloudflare Edge Network',
        desc: 'Tu sitio se replica en +300 ciudades simultáneamente. Máxima disponibilidad, protección anti-DDoS e infraestructura de nivel empresarial incluida.',
        badge: '300+ PoPs globales',
      },
    ],
    rule: 'Cero mantenimiento complejo. Tu sitio corre directamente en la red global de Cloudflare: ultrarrápido, seguro y 100% deducible de impuestos.',
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
    label: 'CASOS DE USO Y VERTICALES',
    headline: 'Diseñado para negocios que no pueden permitirse una web lenta',
    subheadline:
      'Reemplazamos sitios pesados, plataformas con comisiones ocultas y hosting tradicional por infraestructura Edge de alto rendimiento.',
    items: [
      {
        id: 'restaurantes',
        line: 'commerce',
        vertical: 'RESTAURANTES Y GASTRONOMÍA',
        traditional: 'Sitios lentos que obligan a descargar un PDF pesado para ver el menú.',
        arkSolution:
          'Menú interactivo instantáneo (<0.4s), pedidos a WhatsApp y reservas sin comisiones.',
        badge: 'Carga en < 0.4s',
      },
      {
        id: 'despachos',
        line: 'legal',
        vertical: 'DESPACHOS Y CONSULTORES',
        traditional:
          'Plantillas genéricas con plugins pesados que transmiten una imagen desactualizada.',
        arkSolution:
          'Presencia sobria, rápida y profesional con estrategia SEO limpia para captar clientes B2B.',
        badge: 'Imagen B2B Premium',
      },
      {
        id: 'clinicas',
        line: 'commerce',
        vertical: 'CLÍNICAS Y SALUD',
        traditional:
          'Sistemas de citas de terceros que cobran comisiones por paciente o rentas altas.',
        arkSolution:
          'Agendamiento en vivo integrado directamente en tu sitio web sin comisiones por cita.',
        badge: 'Cero comisiones por cita',
      },
      {
        id: 'realestate',
        line: 'commerce',
        vertical: 'REAL ESTATE Y PROPIEDADES',
        traditional: 'Galerías con renders de alta resolución que tardan segundos en cargar.',
        arkSolution:
          'Catálogo de propiedades con imágenes optimizadas al instante en cualquier celular.',
        badge: 'Imágenes de carga rápida',
      },
      {
        id: 'saas',
        line: 'commerce',
        vertical: 'STARTUPS Y SAAS',
        traditional:
          'Costos de hosting inflados en servidores en la nube solo para la landing comercial.',
        arkSolution:
          'Infraestructura Edge con $0 costo de hosting para la web comercial y capacidad ilimitada.',
        badge: 'Infraestructura $0 MXN',
      },
      {
        id: 'ecommerce',
        line: 'commerce',
        vertical: 'E-COMMERCE Y CATÁLOGOS',
        traditional: 'Plataformas lentas que pierden el 40% de las ventas en el carrito de compra.',
        arkSolution: 'Experiencia de compra fluida con cobro por Stripe, SPEI o activos digitales.',
        badge: 'Alta conversión de checkout',
      },
    ],
  },

  costs: {
    label: 'COMPARATIVA FINANCIERA Y OPERATIVA',
    headline: 'Modelo Tradicional vs. Infraestructura Ark Systems',
    subheadline:
      'Descubre cómo el arrendamiento tecnológico elimina el gasto inicial, evita cobros ocultos de hosting y optimiza la estrategia fiscal de tu empresa.',
    headers: {
      concept: 'Concepto / Renglón',
      traditional: 'Desarrollo Tradicional (WordPress/Wix)',
      arkEdge: 'Ark Systems (Leasing Edge)',
    },
    rows: [
      {
        concept: 'Inversión Inicial (CAPEX)',
        traditional: '$40,000 - $100,000 MXN (Pago único elevado)',
        arkEdge: '$0 MXN (Sin desembolso inicial)',
        highlight: true,
      },
      {
        concept: 'Modelo Fiscal',
        traditional: 'Activo Intangible (Depreciación lenta)',
        arkEdge: 'Gasto Operativo (100% Deducible ISR + IVA)',
        highlight: true,
      },
      {
        concept: 'Hosting y Servidores',
        traditional: '$1,500 - $5,000 MXN/año + aumentos en renovación',
        arkEdge: 'Incluido en tu renta (Cloudflare Edge Network)',
        highlight: false,
      },
      {
        concept: 'Mantenimiento y Parches',
        traditional: 'A cargo del cliente (o cobro por hora de dev)',
        arkEdge: 'Monitoreo 24/7 y parches continuos incluidos',
        highlight: false,
      },
      {
        concept: 'Certificados SSL y Ciberseguridad',
        traditional: 'Costo extra anual o plugins frágiles',
        arkEdge: 'Protección WAF y SSL Enterprise automático',
        highlight: false,
      },
      {
        concept: 'Rendimiento (Velocidad de Carga)',
        traditional: '3.5s - 6.0s (Pierde el 40% de visitas)',
        arkEdge: '< 0.4s en la red Edge de Cloudflare',
        highlight: true,
      },
      {
        concept: 'Riesgo de Obsolescencia',
        traditional: 'Alto (El sitio queda obsoleto en 2 años)',
        arkEdge: 'Cero (Arquitectura siempre actualizada)',
        highlight: false,
      },
    ],
    summaryNote:
      'Resultado: En lugar de congelar $60k+ en un sitio que se devalúa, pagas una cuota mensual accesible y totalmente deducible que mantiene tu web operando como el primer día.',
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

  pricingPage: {
    hero: {
      badge: 'PRECIOS TRANSPARENTES',
      headline: 'Sin sorpresas. Sin letra chica.',
      subheadline:
        'Elige entre arrendamiento mensual o adquisición del código fuente. El alcance, los costos y las condiciones se definen en el plan y contrato correspondiente.',
    },
    comparison: {
      badge: 'COMPARATIVA',
      headline: 'Una infraestructura pensada para tu operación.',
      subheadline: 'Compara modelos de trabajo, costos y responsabilidades antes de elegir.',
      items: [
        {
          name: 'Carpetas + WhatsApp + Drive',
          tone: 'negative',
          bullets: [
            'Documentos repartidos entre distintas herramientas',
            'Seguimiento manual de expedientes y pendientes',
            'Difícil reconstruir quién hizo cada cambio',
            'Dependencia de respaldos y dispositivos individuales',
            'Búsqueda manual de información',
          ],
        },
        {
          name: 'Software legal tradicional',
          tone: 'negative',
          bullets: [
            'Inversión inicial que puede ser elevada',
            'Costos de soporte o actualización según proveedor',
            'Dependencia de infraestructura local o de terceros',
            'Alcance y personalización variables',
            'La arquitectura puede no estar diseñada para Edge',
          ],
        },
        {
          name: 'Ark Systems',
          tone: 'positive',
          bullets: [
            'Flujos documentales definidos según el alcance del proyecto',
            'Herramientas configurables para apoyar controles internos',
            'Integridad y trazabilidad sujetas a las funciones contratadas',
            'Arquitectura desplegada sobre Cloudflare Edge',
            'Opciones de arrendamiento o adquisición de código',
          ],
        },
      ],
    },
    faqs: {
      badge: 'PREGUNTAS FRECUENTES',
      headline: 'Lo que conviene saber antes de contratar.',
      items: [
        {
          q: '¿Necesito saber de tecnología?',
          a: 'No necesitas programar. El equipo acompaña la configuración y el despliegue; el contenido, las integraciones y la migración se acuerdan según el alcance del proyecto.',
        },
        {
          q: '¿Qué pasa después del despliegue?',
          a: 'El sitio o aplicación queda publicado en la infraestructura acordada. El monitoreo, mantenimiento, soporte y actualizaciones dependen del plan y de las condiciones del contrato.',
        },
        {
          q: '¿Puedo editar el contenido yo mismo?',
          a: 'Las opciones de edición dependen del producto y del alcance contratado. Antes de iniciar, definimos si los cambios se harán desde una interfaz o mediante el equipo de Ark.',
        },
        {
          q: '¿Cumple con LFPIORPI y CFF?',
          a: 'Ark puede configurarse para apoyar flujos documentales relacionados con obligaciones de cumplimiento. No certifica el cumplimiento ni sustituye la asesoría profesional; las obligaciones, plazos y controles deben validarse con tu equipo legal o contable.',
        },
        {
          q: '¿Qué pasa si necesito agregar más expedientes después?',
          a: 'El alcance puede ampliarse conforme a las capacidades del producto y la infraestructura contratada. Revisamos volumen, permisos, almacenamiento e integraciones antes de estimar el cambio.',
        },
        {
          q: '¿Ofrecen soporte continuo?',
          a: 'Los planes indican el soporte y las actualizaciones incluidos. También es posible cotizar soporte extendido; los tiempos de respuesta y el alcance quedan definidos por contrato.',
        },
        {
          q: '¿Puedo comprar el código fuente?',
          a: 'Sí. La opción de Compra Única aparece en los planes e incluye la entrega y transferencia técnica indicadas ahí. Los derechos, licencias y condiciones de despliegue se especifican en el contrato.',
        },
        {
          q: '¿Qué pasa si quiero cancelar?',
          a: 'Las condiciones de cancelación, entrega de información y cierre del servicio se detallan en el contrato aplicable. Revísalas antes de firmar para confirmar que se ajustan a tus necesidades.',
        },
      ],
    },
    finalCta: {
      headline: '¿Listo para elegir el modelo adecuado?',
      subheadline:
        'Conversemos sobre el alcance, las funciones necesarias y las condiciones antes de iniciar.',
      primary: {
        label: 'Solicitar demo 3 min',
        href: '/contact',
        variant: 'primary',
      },
      secondary: {
        label: 'Ver contrato tipo leasing',
        href: '/leasing-contrato',
        variant: 'secondary',
      },
      microcopy: 'Alcance claro · Condiciones por escrito · Sin compromisos antes de revisar',
    },
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
    tagline:
      'Agencia de desarrollo web edge-native que vende infraestructura moderna con modelo de leasing fiscalmente optimizado para PYMEs y profesionales en México/Latam.',
    tech: 'Astro 5 • Cloudflare Edge • <0.4s de carga',
    foundation: 'Cimiento: Cloudflare Edge',
  },

  contact: {
    email: 'pavel@arksystems.site',
    whatsapp: '+525657062511',
    facebook: 'https://www.facebook.com/profile.php?id=61595271624798',
    x: 'https://x.com/substrateholdns',
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
