import { config } from '../data/config';

export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPrice(tier: { price: number; currency: string }): string {
  return formatCurrency(tier.price, tier.currency);
}

/**
 * Builds a Cal.com booking URL from config.contact.bookingUrl, pre-filling
 * any fields provided as params.
 */
export function buildCalUrl(
  params: {
    name?: string;
    email?: string;
    tier?: string;
    notes?: string;
    duration?: number;
    extra?: Record<string, string>;
  } = {},
): string {
  const url = new URL(config.contact.bookingUrl);
  if (params.name) url.searchParams.set('name', params.name);
  if (params.email) url.searchParams.set('email', params.email);
  if (params.tier) url.searchParams.set('category', params.tier);
  if (params.notes) url.searchParams.set('a1', params.notes);
  if (params.duration) url.searchParams.set('duration', String(params.duration));
  if (params.extra) {
    for (const [key, value] of Object.entries(params.extra)) {
      url.searchParams.set(key, value);
    }
  }
  url.searchParams.set('hide_gdpr_banner', '1');
  return url.toString();
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
