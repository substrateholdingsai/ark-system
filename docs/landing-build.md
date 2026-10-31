# Ark Systems Landing Page — Build Instructions (Platform Edition)

> Companion to `docs/map.md` (Platform Map & Master Index).
> Target: `arksystems.site` · Astro 5 + Tailwind 3 + React 19 on Cloudflare Workers.

## 0. Non-negotiables

- **The hero states the platform thesis**, not a product pitch.
- **The federated funnel diagram appears above the fold** on desktop (below
  the hero on mobile). It is the moat; show it.
- **Pricing is transparent per product.** No "contact us for pricing."
- **The three unmeasured claims are disclosed** (§10 of the map). This is a
  trust asset, not a liability.
- **The 14 demos survive** but are demoted to a "Craft & demos" section.
- **No hardcoded numbers** in components — everything reads from
  `src/data/config.ts` (`platform`, `products`, `funnel`, `distribution`,
  `proofPoints`, `disclosures`, `craftAndDemos`).
- **Noah is re-seeded** with platform-level knowledge (see §9.4 of the map).

## 1. Information architecture (final)

/ → Platform landing (9 sections below)
/products → Full product matrix
/products/ledger → Ark Ledger detail
/products/angel → Ark Angel detail
/products/commerce → Ark Commerce detail
/products/sales → Ark Sales detail
/products/sentinela → Sentinela detail
/products/hermes → Hermes US Intel detail
/products/legaltech → Ark Legaltech detail (absorbed; points to Ledger/Angel)
/platform → Substrate + funnel deep dive (technical buyers)
/pricing → Transparent per-product pricing
/proof → Test counts, standards, disclosures
/portfolio → "Craft & demos" (existing 14 demos)
/portfolio/* → Unchanged (all 14)
/contact → Email + Cal.com + WhatsApp
/brand → Internal design system (unchanged)
/leasing-contrato → Fold into Ledger commercial path
/api/chat → Keep; re-seed KB
/404 → Branded

## 2. Section-by-section spec for `/`

### §1 — PlatformHero

- Eyebrow: `Plataforma agéntica para servicios profesionales en México`
- H1: `El back-office agéntico de los servicios profesionales mexicanos.`
- Subhead (the thesis, verbatim from map §2, condensed):
  > Siete productos edge-native — Ledger, Angel, Commerce, Sales, Sentinela,
  > Hermes y Legaltech — sobre un solo sustrato Cloudflare, con auth compartida,
  > auditoría SHA-256 y un embudo federado donde Sales alimenta a Ledger, Angel
  > y Commerce. Un cliente en cualquier línea es candidato para las otras.
- Primary CTA: `Ver la plataforma` → scrolls to §3 ProductMatrix
- Secondary CTA: `Hablar con ventas` → `/contact`
- Right column (desktop only): live counter strip
  - `~1,100` tests automatizados
  - `6` dominios en producción
  - `1` canal institucional (CANACO SERVYTUR)
- Background: reuse `glow-gold.svg` + `grid-gold.svg` (already generated);
  do not introduce new visual language.

### §2 — FunnelDiagram

- Full-width SVG diagram (desktop) / simplified vertical stack (mobile)
- Nodes: Sales (top), Ledger / Angel / Commerce (middle row), Sentinela (bottom)
- Edge label: `LEAD_INGEST_V3` with a small `versioned · idempotent · outbox`
  caption
- Scroll-triggered reveal: nodes fade in top→bottom, edges draw left→right
- Caption below diagram:
  > Cada lead que Sales califica se entrega con contrato versionado,
  > reintentos por outbox e idempotencia por `lead_id`. El costo de adquirir
  > un cliente para Ledger, Angel o Commerce tiende a cero una vez que Sales
  > lo ha tocado.
- Data source: `config.funnel` (nodes + edges arrays)

### §3 — ProductMatrix

- Section title: `Siete productos. Un sustrato. Un embudo.`
- Grid: 2×2 large cards (Ledger, Angel, Commerce, Sales) + 3 compact cards
  (Sentinela, Hermes, Legaltech)
- Each large card contains:
  - Product name + live domain badge (linked)
  - One-line job (from `config.products[i].tagline`)
  - TAM line (from `config.products[i].tam`)
  - Revenue model line
  - Maturity chip (`547 tests · live` style)
  - Primary CTA: `Ver producto` → `/products/<id>`
  - Secondary CTA: `Ir al dominio` → live domain (external)
- Each compact card: name + one-liner + `Ver producto` link only
- Legaltech card carries a small `Absorbido en Ledger + Angel` chip

### §4 — SubstrateStrip

- Horizontal band, one row of 6 iconographic items:
  - `Cloudflare edge` (Workers · D1 · KV · R2 · Queues · DO)
  - `Workers AI` (Llama 3.3 70B)
  - `Telnyx Voice AI`
  - `Auth nativa` (PBKDF2 + JWT HS256)
  - `SHA-256 auditable`
  - `Fail-closed`
- Below strip, a one-line caption:
  > Todos los productos comparten el mismo sustrato, la misma doctrina de
  > auditoría y la misma línea de diseño. Por eso un cliente de Ledger es un
  > lead caliente para Angel.

### §5 — DistributionProof

- CANACO SERVYTUR Mérida logo (official, from `CanacoLogo.tsx`) centered
- Headline: `Canal institucional: CANACO SERVYTUR`
- Body: one paragraph on the ~1M affiliated businesses nationally, Mérida as
  pilot, and that the contract template is portable to any cámara or colegio
- CTA: `Ver el portal de socios` → `https://canacomerida.com.mx` (or the
  actual live CANACO domain)
- Below: three payment-rail chips: `Stripe Connect`, `Clip`, `Conekta SPEI`

### §6 — PricingTransparent

- Title: `Precios transparentes. Sin "contáctanos".`
- Four pricing cards, one per commercial product:

| Product              | Price                                   | Includes                                              | CTA                |
| -------------------- | --------------------------------------- | ----------------------------------------------------- | ------------------ |
| Ark Ledger Pro       | `$399–499 MXN / mes`                    | 19 tools, Noah AI, SHA-256 papeles, CFDI timbrado     | Suscribirme (Clip) |
| Ark Angel            | `$0.25 USD / min voz · $0.20 USD / msg` | Telnyx Voice AI, NOM-151, campaigns, Hermes forensics | Ver uso            |
| Ark Commerce         | `desde $299 MXN / tenant / mes`         | Storefront, Envia, queues, R2, checkout WhatsApp      | Crear tienda       |
| Ark Sales Enterprise | `$8,000–12,000 MXN / mes`               | 4 agentes, DO, outbox, Conekta SPEI, Super Admin      | Hablar con ventas  |

- Below cards: one line on Sentinela + Hermes pricing (`subscription` / `per-report`)
- No "contact for pricing" anywhere on this section

### §7 — ProofPoints

- Four large numbers, one line each:
  - `~1,100` tests automatizados (34+73+547+67+28+37+18 across the seven repos)
  - `6` dominios en producción
  - `NOM-151 · ATEB PSC · CONDUSEF · LFPIORPI` — estándares nativos
  - `SHA-256` auditable en cada artefacto
- Each number links to `/proof`

### §8 — HonestDisclosure

- Title: `Lo que todavía estamos probando.`
- Three items, each with a one-line status:
  1. **ATEB PSC Modo A** — constancias NOM-151 en Modo B (evidencia interna
     WORM, admisible como prueba complementaria Arts. 1298-A CCom / 210-A
     CFPC). Modo A pendiente de validación de credenciales de producción.
  2. **Alegra MCP E2E** — cliente unit-tested; round-trip de journal contra
     sandbox Alegra en curso.
  3. **Telnyx Voice AI p50/p95** — <800ms es objetivo de diseño bajo SLA
     Telnyx; telemetría formal en producción (200+ llamadas reales con AMD)
     en curso y se publicará al medirse.
- Closing line: `Publicamos esto porque es exactamente lo que un equipo de
debida diligencia técnica preguntará primero.`

### §9 — CraftAndDemos

- Title: `Craft & demos`
- One-line intro: `Los demos que nos trajeron hasta aquí. Prueba de ejecución,
no la propuesta de plataforma.`
- Render the existing 14-demo grid unchanged (`PortfolioGrid.astro`)
- Keep `/portfolio` and all `/portfolio/*` routes
- Footer link back to `/products` so visitors don't get stuck in demo-land

## 3. Footer

- Columns: Products (7 links) · Platform (funnel, substrate, proof, pricing) ·
  Company (contact, brand, leasing-contract) · Demos (portfolio)
- Contact: `pavel@arksystems.site` · WhatsApp `+52 56 5706 2511` ·
  Cal.com link (existing `bookingUrl`)
- Legal line: `Desarrollado con tecnología de Ark Systems (Substrate Holdings
LLC) · White-label CANACO disponible`
- B2B lead capture: one line for cámara/colegio leaders →
  `pavel@arksystems.site` (reuse the CANACO footer card pattern)

## 4. Data contract (`src/data/config.ts`)

Add these exports alongside the existing ones. **Do not delete** existing
`demos`, `pricing`, `nav`, `contact`, `fiscal` keys — they are consumed by
existing components; add the new keys and migrate components incrementally.

```ts
export const platform = {
  thesis: string,
  substrate: Array<{ icon: string; label: string; detail: string }>,
  proofPoints: Array<{ value: string; label: string; href: string }>,
  disclosures: Array<{ title: string; status: string; detail: string }>,
};

export const products: Array<{
  id: 'ledger' | 'angel' | 'commerce' | 'sales' | 'sentinela' | 'hermes' | 'legaltech';
  name: string;
  domain: string | null;
  tagline: string;
  tam: string;
  revenue: string;
  maturity: string;
  size: 'primary' | 'compact';
  ctaProduct: string; // internal /products/<id>
  ctaDomain: string | null; // live domain
  absorbedInto?: string[]; // for legaltech
}>;

export const funnel = {
  nodes: Array<{ id: string; label: string; x: number; y: number }>,
  edges: Array<{ from: string; to: string; label?: string }>,
};

export const distribution = {
  canaco: { name: string, url: string, blurb: string },
  rails: Array<{ name: string; blurb: string }>,
};

export const craftAndDemos = {
  title: string,
  intro: string,
  items: Array<{/* same shape as current demos */}>,
};
```

Hardcode prohibition: every number on the page (tests, domains, prices,
standards) must be read from these exports. If a value is not yet known, use a
status: 'pending' flag and render a chip, never a fake number.

## 5. Component checklist

Create new:

□ PlatformHero.astro
□ FunnelDiagram.astro (+ small client island for scroll reveal)
□ ProductMatrix.astro
□ SubstrateStrip.astro
□ DistributionProof.astro
□ PricingTransparent.astro
□ ProofPoints.astro
□ HonestDisclosure.astro
□ CraftAndDemos.astro (wraps existing PortfolioGrid.astro)

Update existing:

□ Footer.astro — 4-column layout above
□ Header.astro / Nav.astro — nav items: Productos · Plataforma ·
Precios · Proof · Demos · Contacto
□ Seo.astro — new title/description:
title: ARK — Plataforma agéntica para servicios profesionales en México

description: the thesis paragraph

□ config.ts — add platform, products, funnel, distribution,
craftAndDemos (keep existing keys)
□ index.astro — compose the 9 sections
□ pricing.astro — rewrite to PricingTransparent
□ portfolio.astro — retitle to "Craft & demos", keep grid

Create new routes:

□ products/index.astro
□ products/[id].astro (dynamic, 7 entries)
□ platform.astro
□ proof.astro

## 6. Noah re-seed

□ Replace schema.sql knowledge_base seed with ≥40 platform-first rows
across topics: platform, ledger, angel, commerce, sales,
sentinela, hermes, pricing, disclosures
□ Every row gets line (legal / commerce / lab → map to new lines:
platform / ledger / angel / commerce / sales / sentinela /
hermes), context, topic, answer, legal_reference
□ Write and run the embedding upsert script (the map's §9.4 TODO):
embed each row with @cf/baai/bge-base-en-v1.5, upsert to
ark-kb-index with metadata `{id, line, context, topic, answer,
legal_re
