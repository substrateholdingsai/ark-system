// THE ARK ENGINE — single source of truth for all site content.
// Change copy, links, pricing, or work here; every page and component reads from this file.

export interface NavItem {
  label: string;
  href: string;
}

export interface PricingTier {
  tier: string;
  price: number;
  currency: string;
  features: string[];
  ctaLink: string;
  tagline?: string;
  ctaLabel?: string;
  highlighted?: boolean;
}

export interface PortfolioItem {
  name: string;
  url: string;
  image: string;
  tags?: string[];
  blurb?: string;
}

export interface TechItem {
  name: string;
}

export const config = {
  brand: {
    name: 'Ark',
    tagline: 'Frictionless, Edge-Native Web Infrastructure.',
  },

  site: {
    url: 'https://ark.systems',
    locale: 'en_US',
    description:
      'Frictionless, edge-native web infrastructure. Fast, resilient storefronts and sites deployed to the edge.',
    ogImage: '/assets/og-default.png',
  },

  contact: {
    calComLink: 'https://cal.com/your-ark-team/30min',
    email: 'hello@ark.systems',
  },

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ] satisfies NavItem[],

  hero: {
    subheadline:
      'We build and ship fast, resilient web infrastructure on the edge — storefronts, marketing sites, and the plumbing behind them.',
    primaryCta: { label: 'Book a call', href: '/contact' },
    secondaryCta: { label: 'See our work', href: '/portfolio' },
    stats: [
      { value: '120+', label: 'Projects shipped' },
      { value: '99', label: 'Avg. Lighthouse score' },
      { value: '0', label: 'Cold starts on the edge' },
    ],
  },

  pricing: [
    {
      tier: 'Launch',
      price: 999,
      currency: 'USD',
      features: [
        '1-Page Static Site',
        'Cal.com Integration',
        'Stripe/MP Link Setup',
        'Cloudflare Deploy',
      ],
      ctaLink: 'https://cal.com/your-ark-team/30min?category=launch', // Pre-fills Cal.com!
      tagline: 'Everything needed to go live, fast.',
      ctaLabel: 'Start with Launch',
      highlighted: true,
    },
  ] satisfies PricingTier[],

  portfolio: [
    {
      name: 'La Bianca Tropical',
      url: 'https://labianca.ark.systems',
      image: '/assets/portfolio/labianca.jpg',
      blurb: 'Edge-hosted storefront with instant global delivery.',
      tags: ['Storefront'],
    },
  ] satisfies PortfolioItem[],

  techStack: [
    { name: 'Cloudflare' },
    { name: 'Astro' },
    { name: 'Stripe' },
    { name: 'Shopify' },
    { name: 'Sanity' },
    { name: 'Wrangler' },
  ] satisfies TechItem[],
} as const;

export const pageTitle = `${config.brand.name} — ${config.brand.tagline}`;
