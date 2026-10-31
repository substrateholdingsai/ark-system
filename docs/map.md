# Ark System — Platform Map & Master Index

> **Status:** 2026-10-30 · Repositorio: `ark-system` (`arksystems.site`)
> **Role in the ecosystem:** This repo is the **front door and platform index** for the entire
> ARK stack. It is no longer a single-product marketing site. It is the unified
> narrative layer that explains, sells, and routes to seven production products
> running on a shared Cloudflare edge substrate.
> **Companion docs:** the per-product `map.md` files in each sibling repo remain
> the source of truth for implementation detail. This document is the entry point.

---

## 1. Executive Summary

ARK is an **agentic B2B operating system for Mexican professional services** —
fiscal compliance, collections, commerce, and sales — built edge-native on Cloudflare,
auditable by SHA-256, and multi-tenant from day one. It is delivered as seven
interoperable products on one substrate, sold through one federated funnel, and
distributed through institutional channels (CANACO white-label) as well as direct.

`arksystems.site` is the **public face of that platform**. It must:

1. State the platform thesis in one paragraph a CFO understands.
2. Present the seven products as a coherent matrix, not a portfolio.
3. Show the federated funnel (Ark Sales → Ledger/Angel/Commerce) as the moat.
4. Route visitors to the correct product entry point (live domain, demo, or contact).
5. Preserve the existing portfolio demos as **proof-of-craft**, not as the main story.

The site is Astro 5 + Tailwind 3 + React 19 islands on Cloudflare Workers
(hybrid SSR + static assets), with `AI`, `DB` (D1), `SESSION` (KV) and
`VECTORIZE` bindings already wired. Noah (the site's AI assistant) stays, but
its knowledge base must be re-seeded against the platform map, not just the
fiscal/PLD topics it currently covers.

---

## 2. The Platform Thesis (the one paragraph the site must lead with)

> **ARK is the agentic back-office for Mexican professional services.**
> Seven edge-native products — Ledger (fiscal & nómina), Angel (collections),
> Commerce (multi-tenant storefronts), Sales (agentic acquisition), Sentinela
> (regulatory intelligence), Hermes (US proptech intelligence) and Legaltech
> (multi-tenant landing infrastructure) — run on one Cloudflare substrate with
> shared auth, shared SHA-256 audit doctrine, and a federated funnel where
> Sales feeds Ledger, Angel and Commerce under a versioned contract
> (`LEAD_INGEST_V3`). One paying customer in any product line becomes a
> candidate for the others. One institutional channel (CANACO SERVYTUR, ~1M
> affiliated businesses nationally) becomes a distribution surface for all
> seven. This is not a portfolio of side projects. It is a vertically
> integrated platform with a distribution moat.

---

## 3. Product Matrix (the seven modules)

| #   | Product             | Live domain                        | One-line job                                                                                     | TAM                                                        | Revenue model                                                       | Maturity                     |
| --- | ------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------- |
| 1   | **Ark Ledger**      | `ledger.arksystems.site`           | 19-tool fiscal & nómina suite; white-label CANACO; CFDI 4.0 timbrado; SHA-256 papeles de trabajo | MX despachos contables + cámaras empresariales             | Pro $399–499 MXN/mo (Clip/Stripe) + Timbrado PAC + CANACO licensing | 547 tests · live             |
| 2   | **Ark Angel**       | `arkangel.arksystems.site`         | Agentic collections: Telnyx Voice AI, NOM-151/ATEB PSC, Hermes forensics, campaigns              | MX despachos de cobranza + bancos + fintechs CNBV/CONDUSEF | Usage (voice $0.25/min, msg $0.20) + Enterprise                     | 422 tests · live             |
| 3   | **Ark Commerce**    | `tiendas.arksystems.site`          | Multi-tenant storefronts (Temozonia, Baakal, Ark Oficios) + Envia + queues + R2                  | MX SMB commerce                                            | SaaS per tenant + transaction                                       | build green · 3 tenants live |
| 4   | **Ark Sales**       | `sales.arksystems.site`            | Agentic acquisition: 4 LLM agents, DO, outbox, Telnyx Voice AI, Conekta SPEI, Super Admin CRM    | Internal + Enterprise resale                               | Internal engine + Enterprise $8–12k MXN/mo                          | 67 tests · live              |
| 5   | **Sentinela**       | edge worker (no public domain yet) | RegTech monitor: DOF/SAT/CONDUSEF/CNBV/BANXICO + HMAC webhooks                                   | MX RegTech B2B                                             | Subscription per tenant                                             | 28 tests · live              |
| 6   | **Hermes US Intel** | (US, no MX public domain)          | Proptech intelligence: SOS, SEC EDGAR, skip-trace TCPA, property equity                          | US proptech                                                | Per-report + subscription                                           | 37 tests · live              |
| 7   | **Ark Legaltech**   | (absorbed into Ledger/Angel)       | Multi-tenant landing infrastructure for lawyers + Sentinela widget                               | MX legal                                                   | Bundled into Ledger                                                 | 18 tests · partial           |

**Reading rule for the site:** rows 1–4 are the _commercial core_ and get
primary billing. Row 5 is an _enabling layer_ (feeds Angel and Ledger). Row 6 is
a _second geography beachhead_ and gets its own section but not the hero. Row 7
is _absorbed_ — do not present it as a separate product; fold its capability
into Ledger (landing widget) and Angel (legal-tech flows).

---

## 4. The Substrate (what makes the seven one platform)

All seven share, verbatim:

- **Runtime:** Cloudflare Workers (Hono 4.6 / Astro 5 / TypeScript ESM)
- **Data:** Cloudflare D1 (per-product DB, shared SQL doctrine) + KV (cache/session) + R2 (artifacts/evidence) + Queues (async) + Durable Objects (stateful actors)
- **AI:** Workers AI (`@cf/meta/llama-3.3-70b-instruct-fp8-fast` as primary)
- **Voice:** Telnyx Voice AI Assistants (used by Angel _and_ Sales — one measurement covers both)
- **Auth:** PBKDF2-SHA256 + JWT HS256 + HttpOnly cookies + D1 sessions (native, no third-party IdP)
- **Audit doctrine:** SHA-256 hash of every artifact (papeles de trabajo, constancias NOM-151, lead payloads, payment reconciliations) + `worm_audit_log` chained retention
- **Anti-hardcode doctrine:** prices, catalogs, rates, and legal references live in D1 or a typed catalog, never in prompts or UI constants
- **Fail-closed doctrine:** any missing catalog, missing REPEP list, missing PSC credentials, or missing recording policy blocks the operation rather than degrading silently
- **Design lineage:** ARK PULSE (commerce/sales), Meridian Core (Angel), AUREUS / HENEQUÉN (Ledger / CANACO), VEKTOR (Hermes) — all derived from one semantic-token philosophy ("color is meaning, never decoration")

This substrate is the reason a customer buying Ledger is a warm lead for Angel,
and the reason CANACO can be sold one white-label contract that lights up seven
products for its members.

---

## 5. The Federated Funnel (the moat)

┌──────────────────────────────┐
│ Ark Sales │
│ (agentic acquisition) │
│ 4 LLM agents · DO · outbox │
└──────────────┬───────────────┘
│ LEAD_INGEST_V3
│ (versioned contract)
┌───────────────────┼───────────────────┐
▼ ▼ ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Ark Ledger │ │ Ark Angel │ │Ark Commerce│
│ fiscal │ │ collections│ │ storefronts│
└────────────┘ └────────────┘ └────────────┘
▲ ▲ ▲
└───────────────────┴───────────────────┘
│
┌──────────────┴───────────────┐
│ Sentinela (regulatory) │
│ feeds Angel + Ledger │
└──────────────────────────────┘

**Why this is a moat and not a diagram:** every lead Sales qualifies is
delivered with a versioned contract, retried through an outbox, and idempotent
by `lead_id`. That means the cost of acquiring a customer for Ledger, Angel, or
Commerce _approaches zero_ once Sales has touched them. No competitor selling
only one of these products can match that CAC structure.

**The site must show this diagram.** It is the single most defensible asset the
company has.

---

## 6. Distribution (why this can scale faster than a typical SaaS)

1. **CANACO SERVYTUR Mérida** — white-label portal live in Ark Ledger. CANACO
   SERVYTUR nationally has ~1M affiliated businesses. Mérida is the pilot; the
   contract template (`CanacoLandingPage.tsx`, `CanacoAdminPadron.tsx`,
   `canacoStripeService.ts`, `canacoBuzonApi.ts`) is portable to any cámara or
   colegio. **This is the single highest-leverage distribution asset in the
   company.**
2. **Stripe Connect + Clip + Conekta** — three payment rails already
   integrated. CANACO collects under its own Stripe connected account; ARK
   collects its Pro subscriptions under Clip; Ark Sales collects Enterprise via
   Conekta SPEI. The rails are built.
3. **Telnyx Voice AI** — one provider, two products (Angel + Sales). Voice
   minutes are a usage-based revenue surface _and_ a data surface.
4. **Sentinela feed** — regulatory changes become leads (via Sales) and
   operational alerts (via Angel/Ledger). The regulatory intelligence layer
   feeds the funnel.

---

## 7. Two Geographies

- **Mexico (core):** Ledger, Angel, Commerce, Sales, Sentinela, Legaltech.
  Spanish-first, CFF/LISR/LFT/LSS/CONDUSEF/NOM-151-native, MXN pricing,
  SPEI/Clip/Stripe rails, CANACO distribution.
- **United States (beachhead):** Hermes US Intel. TCPA-compliant skip-trace,
  SOS + SEC EDGAR + county assessor aggregation, USD pricing. Separate GTM,
  same substrate. **Do not blur the two on the site** — give Hermes its own
  section labeled "US Intelligence" and keep the hero Mexican-professional-
  services-focused.

---

## 8. What the Site Must Communicate (in priority order)

1. **Hero:** the one-paragraph platform thesis (§2 above), with a single
   primary CTA ("Ver la plataforma" → scrolls to product matrix) and a
   secondary CTA ("Hablar con ventas" → `pavel@arksystems.site` / Cal.com).
2. **The Federated Funnel diagram** (§5 above), animated on scroll if possible.
   This is the moat; show it above the fold on desktop.
3. **Product matrix** (§3 above) as seven cards, each linking to its live
   domain, its demo, or its contact path. Rows 1–4 get larger cards; rows 5–7
   get compact cards.
4. **Substrate strip** (§4 above) — the shared Cloudflare / auth / SHA-256 /
   fail-closed / design lineage. One horizontal band, iconographic.
5. **Distribution proof** — CANACO Mérida logo + one sentence + link to the
   live portal. This is the strongest social proof the company has.
6. **Usage & pricing** — one transparent pricing block per commercial product
   (Ledger Pro $399–499, Angel usage $0.25/min + $0.20/msg, Sales Enterprise
   $8–12k MXN/mo, Commerce per tenant). No "contact us for pricing" anywhere.
7. **Proof points** — "~1,100 automated tests across seven products", "six live
   domains", "NOM-151 / ATEB PSC / CONDUSEF / LFPIORPI native", "SHA-256
   auditable by design". Numbers, not adjectives.
8. **Honest disclosure** — one short section: "What we're still proving" (ATEB
   PSC Modo A validation in progress, Alegra E2E in progress, Voice AI p50/p95
   telemetry in progress). This is what sophisticated buyers and acquirers
   respect, and it pre-empts the DD questions.
9. **Portfolio / demos** — preserve the 14 interactive demos as a _secondary_
   section titled "Craft & demos", clearly separated from the product matrix.
   They prove execution speed; they do not sell the platform.
10. **Noah (site AI)** — keep the chat widget, but re-seed its knowledge base
    against _this_ platform map, not just fiscal/PLD topics. Noah should be
    able to answer "what is Ark Angel?" and "how does Ark Sales feed Ledger?"
    with citations.

---

## 9. What Must Change in the Repo (concrete)

### 9.1 `src/data/config.ts` — restructure

- Replace the current single-product config with a **platform config**:
  - `platform`: thesis paragraph, substrate strip items, proof-point stats
  - `products`: array of 7 entries (id, name, domain, tagline, tam, revenue,
    maturity, cta_url, cta_label, size: 'primary' | 'compact')
  - `funnel`: the diagram data (nodes + edges) for the animated component
  - `distribution`: CANACO entry + payment rails
  - `geographies`: MX core + US beachhead
  - `proofPoints`: test count, domains, standards, audit doctrine
  - `disclosures`: the "what we're still proving" list
  - `demos`: keep the existing 14-entry portfolio, but move it under a
    `craftAndDemos` key so it's clearly secondary
- Keep `pricingPage`, `nav`, `contact`, `fiscal` as-is where they apply to
  Ledger specifically; move them under `products.ledger.pricing` etc.

### 9.2 New Astro components

- `src/components/sections/PlatformHero.astro` — thesis + dual CTA
- `src/components/sections/FunnelDiagram.astro` — the §5 diagram (SVG +
  scroll-triggered reveal; can reuse the `grid-gold.svg` / `glow-gold.svg`
  assets already generated)
- `src/components/sections/ProductMatrix.astro` — seven cards, primary vs
  compact sizing, each pulling from `config.products`
- `src/components/sections/SubstrateStrip.astro` — the shared doctrine band
- `src/components/sections/DistributionProof.astro` — CANACO + rails
- `src/components/sections/PricingTransparent.astro` — per-product pricing
- `src/components/sections/ProofPoints.astro` — numbers strip
- `src/components/sections/HonestDisclosure.astro` — "what we're still proving"
- `src/components/sections/CraftAndDemos.astro` — the existing 14-demo grid,
  demoted and retitled

### 9.3 Routes

- `/` — new platform landing (composes the nine sections above)
- `/products` — full matrix, one card per product with deeper detail
- `/products/ledger`, `/products/angel`, `/products/commerce`,
  `/products/sales`, `/products/sentinela`, `/products/hermes`,
  `/products/legaltech` — per-product detail pages, each linking to the live
  domain and demo
- `/platform` — the substrate + funnel deep dive (for technical buyers)
- `/pricing` — rewrite to transparent per-product pricing
- `/proof` — test counts, standards, audit doctrine, disclosures
- `/contact` — keep, add direct email + Cal.com + WhatsApp
- `/portfolio` — keep, retitled "Craft & demos"
- `/portfolio/*` — keep all 14 demos unchanged
- `/brand` — keep, internal
- `/leasing-contrato` — keep, but fold into Ledger's commercial path
- `/api/chat` — keep, but re-seed `knowledge_base` with platform-level Q&A

### 9.4 Noah knowledge base re-seed

Replace the current PLD/fiscal-only `knowledge_base` rows with a
platform-first set (minimum 40 rows across these topics):

- `platform` — thesis, substrate, funnel, distribution, geographies
- `ledger` — 19 tools, CANACO white-label, CFDI timbrado, SHA-256 papeles
- `angel` — NOM-151/ATEB PSC, Telnyx Voice AI, campaigns, Hermes forensics,
  Modo A vs Modo B disclosure
- `commerce` — tenants live, Envia, queues, R2
- `sales` — 4 agents, LEAD_INGEST_V3, outbox, Conekta SPEI, Super Admin
- `sentinela` — sources monitored, HMAC webhooks, cron schedule
- `hermes` — US proptech, TCPA compliance, SOS/SEC/assessor aggregation
- `pricing` — per-product prices, rails, what's included
- `disclosures` — the three unmeasured claims and their closure plan

Every row gets `legal_reference` where applicable (e.g. NOM-151-SCFI-2016,
LFPIORPI Art. 17, CFF Art. 17-A). Then run the embedding script (currently a
TODO) to upsert into `ark-kb-index` with metadata `{id, line, context, topic,
answer, legal_reference}`.

### 9.5 Keep

- All 14 portfolio demos and their routes
- `NoahChatWidget` + `AboutHeader`
- The design tokens and theme variants
- The Astro + Cloudflare Workers hybrid deployment
- CI + Lighthouse budget + cspell

---

## 10. Honest Disclosure (the three unmeasured claims)

The site must disclose these because sophisticated buyers will find them:

1. **ATEB PSC Modo A** — NOM-151 constancias are currently issued in Modo B
   (internal evidence, WORM-sealed, admissible as complementary IT evidence
   under Arts. 1298-A CCom and 210-A CFPC). Modo A (official TSA RFC 3161 +
   ASN.1 DER from the Secretaría de Economía-accredited PSC) is implemented but
   pending production credential validation. The Cuaderno Procesal
   distinguishes Modo A folios (green) from Modo B folios (yellow) to avoid
   process objections.
2. **Alegra MCP E2E** — the Alegra MCP JSON-RPC 2.0 client is unit-tested but
   has not yet run a full journal round-trip against a sandbox Alegra instance.
3. **Telnyx Voice AI p50/p95** — the <800ms conversational latency is a design
   target under Telnyx SLA; formal production telemetry (p50/p95 across 200+
   real calls with AMD on) is in progress and will be published when measured.

Publishing these is not a weakness. It is the difference between a credible
platform and a marketing claim, and it is exactly what an acquirer's technical
DD team will ask first.

---

## 11. Build / Quality Status

- `npm run check` passes (Astro check clean)
- `npm run build` passes locally
- CI workflow + Lighthouse budget in place
- `arksystems.site` is the canonical entry point for the platform
- The seven sibling repos each maintain their own `map.md`; this document is
  the master index and narrative layer
- **The site now reflects the seven-product reality.** The restructure
  described in §9 (phases 0–4) is complete: platform config, nine sections,
  new routes, Noah KB re-seed (40 rows + Vectorize upsert) and verification.

---

## 12. Bottom Line

`arksystems.site` was built as a marketing site for a web-infrastructure
package. It is now the front door to a seven-product, two-geography,
federated-funnel agentic B2B platform with ~1,100 tests, six live domains, and
a CANACO distribution moat. The site must be rewritten to tell that story in
the priority order of §8, backed by the substrate and funnel in §4–§5, priced
transparently per §3, distributed through CANACO per §6, and honest about the
three unmeasured claims per §10. The existing 14 demos survive as proof of
craft, not as the main narrative.
