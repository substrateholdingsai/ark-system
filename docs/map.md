# Ark System — Project Map

> Current status snapshot for the repo as of 2026-10-14.
> This document reflects the current implementation in the codebase today, with the active deployment model set to Astro + Cloudflare Workers (hybrid SSR + static assets). It is not the original aspirational roadmap.

## 1. Executive Summary

Ark System is an edge-native marketing and conversion site built with Astro, Tailwind CSS, TypeScript, React islands, and Cloudflare Workers. The repo contains a functioning site scaffold, a typed config contract with Ark as Client 0, CI/Lighthouse checks, and a portfolio with 14 entries: eleven interactive demos, two external sites, and one unimplemented concept.

Status at a glance:

- Build status: latest `npm run check` passes; `npm run build` passes locally (2026-10-14)
- Core platform: Astro 5 + Tailwind 3 + React 19 + Cloudflare Workers (hybrid SSR + static assets)
- Content model: typed reusable contract and Ark Client 0 instance in `src/data/config.ts`
- Route architecture: implemented for the home, pricing, contact, portfolio, brand preview, Acepta Bitcoin case-study, SBC 2026 and ISN 2026 calculators, leasing contract, and eleven interactive demo pages, plus 404
- Deployment config: Cloudflare adapter with server output, Worker config in `wrangler.jsonc`, with `SESSION` KV binding, `AI` binding, `DB` D1 binding, and `VECTORIZE` index binding
- Portfolio: 14 cards — eleven interactive demos (Temozonia, Tomato for Bitcoin, Arkangel, Velvet Room, Medical Express, Talos, Mapa Crypto, SBC 2026 Calculadora, ISN 2026 Calculadora, Ikigai Wellness, and Calculadora Vintage), two external sites (Acepta Bitcoin and La Bianca Tropical), and the Padel Outlet concept, which has no interactive demo yet
- Placeholder content: still present, including some contact/booking destinations, form endpoint, and sample pricing content
- Latest local updates: NoahChatWidget includes educative header (`AboutHeader`) explaining what Noah is, its architecture, and limitations; `/api/chat` upgraded to hybrid Vectorize RAG + D1 fallback with citations; Vectorize binding added to wrangler
- Git/deployment status: `main` is synchronized with `origin/main` at `7983b43`. Local working-tree changes include the new Calculadora Vintage demo, the homepage portfolio preview card, the logo refresh, the educative header, and Vectorize RAG upgrades; these local changes have not been deployed
- Onboarding documentation: available in `docs/client-onboarding.md`
- CI: workflow is defined in `.github/workflows/ci.yml`; Lighthouse budget exists in `lighthouserc.json`; remote CI status is not recorded here
- Vector asset generator: `scripts/generate-assets.py` creates theme assets, the cube mark, and the favicon source; `npm run favicon` generates browser and structured-data raster variants. The full Ark Systems lockup is maintained separately in `public/assets/vector/ark-systems-lockup.svg`.
- **New integrations**: AI binding for Cloudflare Workers AI, D1 database binding for fiscal/legal data, Vectorize binding for semantic search, NoahChatWidget for conversational UI
- **Intelligent chat endpoint**: `/api/chat` uses hybrid RAG — Vectorize semantic search (Workers AI embeddings @cf/baai/bge-base-en-v1.5, topK=3, filtered by line) with D1 exact-match fallback — returning citations (topic, legal_reference, snippet, score) in SSE meta events
- **Knowledge base**: `schema.sql` defines `knowledge_base` table (topic, question, answer, legal_reference); seeded with PLD, fiscal, and line-specific samples; executed on local D1

## 2. What the Project Is

The repo is best described as a content-driven marketing site template rather than a general-purpose application backend. It is meant to sell an "Ark" brand as a web infrastructure package and provide a reusable reference implementation for future client brands.

The guiding design decisions in code are:

1. Single source of truth for copy and links via `src/data/config.ts`
2. Semantic design tokens in `src/styles/global.css` and `tailwind.config.mjs`
3. File-based route composition with Astro pages and reusable section components
4. Server-rendered Astro deployment on Cloudflare Workers, with client-side hydration limited to interactive islands

## 3. Current Runtime / Deployment Model

```text
Browser
  -> Cloudflare Worker (Astro server output)
  -> dist/
     -> Worker entrypoint (`_worker.js/`)
     -> static assets and client bundles (`_astro/`)
```

Current implementation details:

- Astro config uses `output: 'server'` and the Cloudflare adapter in `astro.config.mjs`
- `wrangler.jsonc` configures the Cloudflare Worker, static asset binding, session KV binding, AI binding, D1 database binding, and Vectorize index binding
- React is integrated through `@astrojs/react`; the interactive portfolio demos mount as hydrated React islands
- CI performs `npm run build` and runs Lighthouse checks against `./dist`
- The project has a generated `dist/` directory from the latest local build attempt

The local build currently passes. Astro reports a non-blocking warning that Cloudflare does not support Sharp at runtime; this does not establish remote CI or production deployment status.

## 4. Repository Structure

```text
ark-system/
├── .github/
│   └── workflows/
│       └── ci.yml                     CI pipeline: format, lint, build, Lighthouse
├── docs/
│   ├── assets.md
│   ├── ark-brand-copy.md             Fuente de verdad narrativa de Ark (Cliente 0)
│   ├── client-onboarding.md           Runbook para clonar y personalizar una marca
│   ├── designsystem.md
│   └── map.md                        This document
├── public/
│   ├── _headers
│   ├── _redirects
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/
│       ├── og-default.png
│       ├── vector/                   NEW: Generated vector assets
│       │   ├── ark-systems-lockup.svg     Full brand lockup
│       │   ├── ark-mark.svg               Generated cube icon
│       │   ├── favicon.svg
│       │   ├── apple-touch-icon.png
│       │   ├── logo-512.png                Structured-data logo
│       │   ├── grid-accent.svg
│       │   ├── grid-gold.svg
│       │   ├── glow-accent.svg
│       │   ├── glow-gold.svg
│       │   ├── glow-success.svg
│       │   ├── portfolio-placeholder-1.svg
│       │   ├── portfolio-placeholder-2.svg
│       │   └── portfolio-placeholder-3.svg
│       └── portfolio/
│           └── labianca.jpg
├── scripts/
│   ├── generate-assets.py              Generates themed SVG assets and the cube mark
│   └── generate-favicon.mjs            Generates favicon, Apple touch icon, and logo rasters
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Container.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Header.astro
│   │   │   ├── Nav.astro
│   │   │   ├── Section.astro
│   │   │   └── Seo.astro
│   │   ├── sections/
│   │   │   ├── CalEmbed.astro
│   │   │   ├── ConfiguredContent.astro  Config-driven problem, process, use-case, and cost sections
│   │   │   ├── Hero.astro
│   │   │   ├── PortfolioGrid.astro
│   │   │   ├── PricingTable.astro
│   │   │   └── TechStack.astro
│   │   ├── portfolio/
│   │   │   ├── ArkangelApp.jsx             Interactive compliance-flow simulation
│   │   │   ├── IkigaiApp.jsx               Ceremony booking demo
│   │   │   ├── IsnCalculator.jsx           Interactive ISN 2026 calculator (32 estados)
│   │   │   ├── MedicalApp.jsx              Fictional appointment and payment-flow demo
│   │   │   ├── SbcCalculator.jsx           Interactive SBC 2026 calculator
│   │   │   ├── TalosApp.jsx                Simulated mining-data collector concept
│   │   │   ├── TemozoniaApp.jsx            Interactive Temozonia checkout demo
│   │   │   ├── TomatoApp.jsx               Interactive Tomato for Bitcoin storefront demo
│   │   │   ├── VelvetApp.jsx               Interactive bar storefront demo
│   │   │   ├── VirtualAssetsMapApp.jsx     Legal-topic filtering demo; references unverified
│   │   │   └── VintageCalculatorApp.jsx    Vintage arithmetic calculator widget
│   │   ├── brand/
│   │   │   └── ArkMark.astro               Compact cube mark used in header/footer
│   │   └── ui/
│   │       ├── Badge.astro
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       └── Input.astro
│   ├── data/
│   │   └── config.ts                  Typed site contract and Ark Client 0 content (expanded with pricing, fiscal, payment methods, demos)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── 404.astro
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   ├── portfolio.astro
│   │   ├── portfolio/
│   │   │   ├── acepta-bitcoin.astro
│   │   │   ├── temozonia.astro
│   │   │   ├── tomato.astro
│   │   │   ├── arkangel.astro
│   │   │   ├── velvet.astro
│   │   │   ├── medical.astro
│   │   │   ├── talos.astro
│   │   │   ├── mapa-crypto.astro
│   │   │   ├── sbc-2026-calculadora.astro
│   │   │   ├── isn-2026-calculadora.astro
│   │   │   ├── ikigai.astro
│   │   │   └── calculadora-vintage.astro
│   │   ├── pricing.astro
│   │   ├── brand.astro
│   │   ├── leasing-contrato.astro    NEW: Leasing contract template page
│   │   └── api/
│   │       └── chat.ts               NEW: AI chat API endpoint (Workers AI + Clef + D1)
│   ├── styles/
│   │   └── global.css                 Core theme tokens and base component styles (fire, amber, temozonia variants)
│   ├── utils/
│   │   └── helpers.ts                 formatting + Cal link helpers
│   └── env.d.ts
├── .dev.vars.example
├── .env.example
├── .gitignore
├── .nvmrc
├── .lighthouseci/
├── astro.config.mjs
├── eslint.config.js
├── lighthouserc.json
├── LICENSE
├── package.json
├── package-lock.json
├── prettier.config.mjs
├── README.md
├── schema.sql                      NEW: D1 schema for knowledge_base table
├── tailwind.config.mjs
├── tsconfig.json
├── wrangler.jsonc                     Cloudflare Worker, assets, KV, AI, and D1 configuration
└── dist/                              Generated Astro Worker and client build output
```

## 5. Route Map

The site includes the following implemented pages:

- `/` — home page with hero, tech stack, portfolio preview, pricing
- `/portfolio` — portfolio gallery page
- `/portfolio/acepta-bitcoin` — Acepta Bitcoin case-study page; its production link opens the external site
- `/portfolio/temozonia` — interactive Temozonia storefront and checkout prototype
- `/portfolio/tomato` — interactive Tomato for Bitcoin marketplace prototype
- `/portfolio/arkangel` — interactive Arkangel compliance-flow simulation
- `/portfolio/velvet` — interactive Velvet Room bar concept with sample menu and gallery
- `/portfolio/medical` — interactive Medical Express appointment and prepayment concept
- `/portfolio/talos` — interactive Talos mining-data collector concept with simulated metrics
- `/portfolio/mapa-crypto` — interactive topic map with filters and unverified legal references
- `/portfolio/sbc-2026-calculadora` — NEW: interactive SBC 2026 calculator (Salario Base de Cotización)
- `/portfolio/isn-2026-calculadora` — interactive ISN 2026 calculator (Impuesto Sobre Nómina, 32 estados)
- `/portfolio/ikigai` — interactive ceremony booking demo with cart, payment method previews, and WhatsApp handoff
- `/portfolio/calculadora-vintage` — interactive local-only arithmetic calculator widget for accounting-office sites
- La Bianca Tropical is linked directly from the gallery to its external storefront; it has no local portfolio detail route
- Padel Outlet is a concept card only; it has no route or interactive demo
- `/pricing` — pricing page
- `/contact` — contact form + Cal.com embed
- `/404` — branded not-found view
- `/brand` — brand system preview page (internal)
- `/leasing-contrato` — NEW: leasing contract template page

The route model is file-based and follows Astro conventions.

The `/portfolio` page presents 14 config-driven cards grouped into Ark Legal, Ark Commerce, and Ark Lab: eleven interactive demos, two external sites, and one concept without an interactive demo. Portfolio metadata, line assignments, tags, and disclaimers live in the typed `config.portfolio` collection in `src/data/config.ts`. Interactive demos mount React islands; the calculators and widgets use visibility-based hydration where configured. The homepage `PortfolioGrid.astro` preview shows the featured item for each line plus the Calculadora Vintage as a second Ark Legal card. The Acepta Bitcoin case study has a local detail page whose portfolio link opens the external site; La Bianca Tropical links directly to its external storefront. The SBC and ISN calculators are local-only demos.

The demos are: Temozonia, a sample storefront with catalog, cart, and illustrative checkout; Tomato for Bitcoin, a sample produce storefront with six products, cart, and payment-method selection; Arkangel, a UI simulation with illustrative conduct categories, mock cases, and a non-persistent ledger; Velvet Room, a fictional bar menu and atmosphere gallery; Medical Express, a fictional schedule selector with local-only payment-flow simulations; Talos, simulated mining-data metrics and spread; Mapa Crypto, searchable and filterable topic summaries with unverified references; SBC 2026 Calculadora, a browser-based Salario Base de Cotización calculator; ISN 2026 Calculadora, a browser-based Impuesto Sobre Nómina calculator with 32 state reference rates, editable perception breakdown, and CSV export; Ikigai Wellness, a ceremony booking interface with a local cart and illustrative payment details that hands off to WhatsApp; and Calculadora Vintage, a local-only arithmetic widget for accounting-office sites. The vintage calculator performs basic arithmetic and percentages; it does not calculate taxes or replace accounting software or professional advice. Ikigai's pricing, payment identifiers, and contact details are illustrative and must not be used for real transactions. Velvet Room and Medical Express do not accept reservations or payments. Medical Express is not a healthcare provider and offers no medical care or advice; no patient data is collected. Talos does not connect to data sources, mining pools, exchanges, a treasury, payment APIs, or trading services, and makes no financial recommendations. Mapa Crypto reproduces topics and legal references from user-provided material without validating them; the references may be incomplete, outdated, or inaccurate, and the demo provides no legal interpretation or advice. None of Arkangel's indicators represent a live integration, operational legal controls, verified legal citations, or legal advice. Temozonia's data is explicitly demo data; storefront payment and contact values generally must be confirmed before real transactions or production use. Padel Outlet is a concept card only, with no inventory, interactive experience, or checkout. SBC and ISN calculator values are educational references only and do not constitute fiscal or legal advice.

## 6. Design / Theme Architecture

The global styling layer is set up around semantic design tokens and a dark default theme.

Key files:

- `src/styles/global.css` — root tokens, component styles, and Ark, Temozonia, amber, and fire theme variants
- `tailwind.config.mjs` — custom colors, fonts, shadows, animations using CSS variables
- `src/data/config.ts` — copy, nav, pricing, portfolio, CTA links, theme config

Current theme behavior in code:

- dark palette is default (`base` / `surface` / `void` tokens); Temozonia has a warm light theme
- accent is configurable via CSS variables, with amber and fire theme variants
- theme overrides exist for `[data-theme='temozonia']`, `[data-theme='amber']`, and `[data-theme='fire']`
- custom Tailwind colors are defined for `void`, `base`, `surface`, `surface-hover`, and `ark.accent` using `hsl(var(--token) / <alpha-value>)` syntax
- Font families: `display` (Plus Jakarta Sans), `body` (Inter), `mono` (JetBrains Mono) via CSS variables

This means the design system is mostly in place, but the implementation is not yet fully clean or consistently validated across the repo.

## 7. Content And Data Model

The system is intentionally config-driven:

- `src/data/config.ts` owns brand copy, pricing, nav links, portfolio metadata, contact info, and CTA URLs
- `src/data/config.ts` also exports `demos.temozonia`, centralizing its demo-mode flag, brand, sample payment details, and product catalog
- components read from this config instead of hard-coding content
- `src/utils/helpers.ts` provides formatting and URL-building helpers

This is the main architectural strength of the repo and is the closest thing to a reusable product engine.

### Key Config Expansions (2026-10-11)

The `config.ts` has been significantly expanded:

- **Brand**: legalName, tagline, domain, logo/favicon/ogImage paths pointing to generated vector assets
- **Hero**: updated stats (100/100 Lighthouse, <0.4s load, 300+ cities)
- **Nav**: Spanish labels with anchor links
- **Pricing**: three plans (Leasing Core, Leasing Pro + IA, Buyout/License) with detailed includes, fiscal block, payment methods (MXN/SPEI, Stripe, BTC/Lightning, USDT/USDC)
- **Fiscal block**: OPEX vs CAPEX comparison with ISR/IVA deductions
- **Payment methods**: 4 methods with codes, titles, methods, and details
- **Final CTA**: primary booking link, secondary leasing contract link
- **Contact**: email, WhatsApp, Facebook, X, formEndpoint (`/api/contact`), bookingUrl (Cal.com)
- **Official identity**: header and footer use the compact Ark cube mark; browser icons and the structured-data logo are generated from `public/assets/vector/favicon.svg`.
- **Pricing page**: comparison content, eight FAQs, and final CTA/seals are centralized under `pricingPage`
- **Demos**: Temozonia configuration with products, payments (CLABE, BTCPay, WhatsApp, Lightning), and stock

## 8. Current Status by Area

### 8.1 Implemented and mostly working

- Astro site scaffold and routing
- Tailwind design tokens and global styles (CSS variable based)
- Reusable UI primitives (Button, Card, Badge, Input)
- Config-driven landing page sections
- Cloudflare Workers deployment configuration (Astro server output + static asset binding + AI + D1 + Vectorize)
- React integration via `@astrojs/react`, used by the eleven portfolio demos
- Temozonia checkout prototype with cart quantity management, WhatsApp order link, CLABE copy action, and Lightning payment details
- Tomato for Bitcoin marketplace prototype at `/portfolio/tomato`, with six sample products, cart, payment-method selection, WhatsApp order link, and CLABE copy action
- Arkangel compliance-flow simulation at `/portfolio/arkangel`, with eight illustrative sections, mock cases, and a non-persistent sample ledger
- Ikigai Wellness at `/portfolio/ikigai`, a ceremony booking interface with a local cart, sample payment details, and WhatsApp handoff; the production page was browser-verified after fixing its React hydration import
- Calculadora Vintage at `/portfolio/calculadora-vintage`, a local-only arithmetic widget prototype for accounting-office sites; it does not calculate taxes
- Velvet Room bar concept at `/portfolio/velvet`, with a sample cocktail menu, ambient video, and CSS scroll-snap gallery; reservation and payment actions are disabled
- Medical Express concept at `/portfolio/medical`, with selectable fictional appointment slots and clearly labeled local-only payment-flow simulations; no real healthcare, appointment, or payment service is provided
- Talos concept at `/portfolio/talos`, with local-only simulated mining-data metrics and spread values; no connected collector, data sources, treasury, financial products, or active API, and it is not financial or investment advice
- Mapa Crypto at `/portfolio/mapa-crypto`, with searchable/filterable subject summaries and references explicitly marked as unverified; it gives no legal classification or advice
- **SBC 2026 Calculadora** at `/portfolio/sbc-2026-calculadora`, interactive Salario Base de Cotización calculator with local-only calculations; values are educational references only
- **ISN 2026 Calculadora** at `/portfolio/isn-2026-calculadora`, interactive Impuesto Sobre Nómina calculator with 32 official state rates, editable perception breakdown (gravadas/exentas), and CSV export; values are educational references only
- **Leasing contract page** at `/leasing-contrato`, template for client contracts
- **Pricing page** with config-driven comparison, FAQs, and final CTA
- **Contact booking**: header and mobile navigation CTAs lead to the Spanish Cal.com embed at `/contact#booking`
- **Ark cube logo refresh**: the header/footer inline mark and matching favicon/raster assets are present locally; full lockup is at `public/assets/vector/ark-systems-lockup.svg`. These uncommitted assets are not part of the current production deployment
- **Homepage portfolio preview** includes the featured cards plus a second Ark Legal card for Calculadora Vintage; this local change is not deployed
- **Brand preview page** at `/brand`, internal design system showcase
- **AI chat endpoint** at `/api/chat`, hybrid Vectorize RAG + D1 fallback with streaming SSE and citations
- **NoahChatWidget** component for conversational UI, with line-specific contexts, educative header (`AboutHeader`), response fingerprints (local SHA-256 hash + timestamp), citation badges, and `client:load` for immediate hydration on homepage
- CI workflow and Lighthouse budget configuration
- **Vector asset generation script** (`scripts/generate-assets.py`) supports Legal, Commerce, and Lab themes plus legacy site paths
- Generated brand assets include the cube icon, favicon, full lockup, glows, grids, and portfolio placeholders
- **Hero section** uses vector glow/grid backgrounds
- **Portfolio grid** uses vector placeholders with hover animations
- **BaseLayout** uses proper SVG favicon with type attribute

### 8.2 Present but incomplete / placeholder-driven

- Cal.com booking URL is configured but client-specific and should be confirmed before launch; the navigation CTA now routes through `/contact#booking`
- Form uses `/api/contact` endpoint (needs implementation)
- Pricing and portfolio details remain sample content and require client approval
- Portfolio metadata and demo catalogs remain sample content; `/portfolio` contains eleven interactive demos, two external sites, and the Padel Outlet concept card
- Calculadora Vintage and its Ark Legal homepage-preview card are implemented locally but not yet deployed; its keyboard controls and arithmetic are illustrative UI, not accounting or tax software
- Ikigai Wellness is deployed and its live cart interaction was verified; the sample reservation/payment details remain illustrative and are not a real payment service
- Temozonia's product, payment, and contact values are explicitly configured as demo data; all demo payment identifiers and contact details must be confirmed before real use
- `public/sitemap.xml` is manually maintained instead of generated by Astro
- `src/layouts/BaseLayout.astro` still pulls Google Fonts directly and is not fully optimized for performance
- `/api/contact` endpoint not yet implemented
- `/api/chat` endpoint exists; Vectorize index (`ark-kb-index`) needs to be created and populated with embeddings from `knowledge_base` for full RAG capability

### 8.3 Not yet production-ready

- The Temozonia and Tomato React demos are interactive prototypes; their payment/contact configuration is sample data and is not evidence of a production payment integration
- Arkangel is a UI simulation only; sample case statuses, block counts, hashes, and legal references are not live data, verified legal conclusions, or evidence of deployed compliance controls
- Velvet Room is a fictional bar concept; its menu, prices, location, hours, and media are illustrative and it has no active reservation, payment, or social links
- Medical Express is a fictional healthcare scheduling concept, not a medical provider; its clinician, schedule, and prices are not real, its interactions are local-only, and it collects no personal or medical information or accepts appointments or payments
- Talos is a fictional mining-data collector concept; its metrics and spread are simulated locally, with no connected collector, data sources, treasury, financial products, or active API, and it is not financial or investment advice
- Mapa Crypto's legal topics and references came from unverified user-provided material; the demo omits penalty amounts and legal conclusions, and is not legal advice
- SBC 2026 calculator at `/portfolio/sbc-2026-calculadora` — values are educational references only and do not constitute fiscal or legal advice
- ISN 2026 calculator at `/portfolio/isn-2026-calculadora` — values are educational references only and do not constitute fiscal or legal advice
- Business-specific links, form handling, and demo content still need client-approved production values
- The cube logo refresh is local and not deployed; the existing production site may continue to show the previously deployed mark until a release containing the refresh is made
- The Cloudflare Worker deployment requires valid account configuration, including the session KV binding, AI binding, and D1 database
- The theming engine is partially implemented; the client onboarding workflow is documented in `docs/client-onboarding.md`
- No end-to-end integration or feature tests beyond CI/static checks

## 8.4 Intelligent Chat Architecture (2026-10-14)

The `/api/chat` endpoint implements a **hybrid RAG (Retrieval-Augmented Generation)** pattern using Cloudflare Workers AI, Vectorize, and D1 to provide grounded answers with citations and avoid hallucinations.

### Architecture

```
User Message → Embedding (Workers AI) → Vectorize Search (topK=3, filtered by line) → D1 Fallback (exact context match) → LLM Generation (streaming) → SSE with citations
```

### Components

1. **Embedding Model** (`@cf/baai/bge-base-en-v1.5` via Workers AI) — Generates 768-dim embeddings for the user query.

2. **Vectorize Index** (`ark-kb-index`) — Semantic search over knowledge base chunks with metadata filtering by `line` (legal/commerce/lab). Returns top 3 matches with scores.

3. **D1 Knowledge Base** (`knowledge_base` table) — Fallback for exact context matches when Vectorize returns no results. Pre-approved answers with legal references:
   - `id` — Primary key
   - `line` — Service line (legal/commerce/lab)
   - `context` — Topic context (e.g., fiscal, pld, cumplimiento)
   - `topic` — Human-readable topic
   - `answer` — Approved response text
   - `legal_reference` — Citation (e.g., "Artículo 13, fracción II, LFPIORPI")

4. **LLM Generation** (Workers AI, Llama 3.3 70B primary / Llama 3.1 8B fallback) — Streams response grounded in retrieved context. System prompt enforces: concise professional tone, cite KB as primary, never invent legal articles/figures, PLD alert mention for cash >$100k MXN, include AI disclaimer.

5. **SSE Response** — Streaming with metadata preamble:
   ```json
   {
     "type": "meta",
     "source": "vector|kb|llm",
     "legal_reference": "primary citation or null",
     "model": "llama-3.3-70b|llama-3.1-8b",
     "citations": [
       { "id": 1, "topic": "PLD Umbral", "legal_reference": "Art. 13 LFPIORPI", "snippet": "...", "score": 0.89 }
     ]
   }
   ```

6. **Observability** — Chat logs persisted to D1 (`chat_logs`) with: session_id, line, context, message, response, model, source, pld_alert, latency_ms, citations, kb_hit, fallback_used.

### Data Flow

1. Request receives `{ message, context, line, lang, session_id }`
2. Rate limit check (15 req/min/IP via KV)
3. PLD keyword/amount detection on message
4. Generate embedding for message via Workers AI
5. Query Vectorize with embedding + line filter → get top 3 matches
6. If Vectorize hits: build KB context from matches, set `source="vector"`
7. Else: query D1 by `(line, context)` exact match → get up to 5 rows
8. If D1 hits: build KB context from rows, set `source="kb"`
9. Else: no KB context, set `source="llm"`
10. Build system prompt with KB context
11. Load last 5 turns from KV session history
12. Stream LLM response (primary → fallback on error)
13. Persist full response + history to KV; log to D1 via `waitUntil`
14. Client receives SSE stream; widget displays citations badges under assistant messages

### Files

- `src/pages/api/chat.ts` — Endpoint implementation (hybrid Vectorize RAG + D1 fallback)
- `src/components/NoahChatWidget.tsx` — React widget with `AboutHeader` (educative header), context tabs, streaming, citations, local hash/timestamp
- `schema.sql` — D1 schema (run via `npx wrangler d1 execute ark-fiscal-db --local --file=schema.sql`)
- `wrangler.jsonc` — Defines `ai`, `d1_databases`, `kv_namespaces`, and `vectorize` bindings

### Why This Pattern

- **Grounded answers**: Responses cite KB sources (Vectorize or D1) via `citations[]` in meta event
- **Auditability**: Every response includes source type (`vector|kb|llm`) and legal references
- **Speed**: Vectorize semantic search is fast; D1 fallback for exact context; Workers AI at edge
- **Compliance**: PLD alerts detected on input; logged with `pld_alert=true`
- **Extensibility**: New KB content via D1 inserts; Vectorize upserts via embedding script (TODO)
- **Zero vendor lock-in**: Pure Cloudflare stack (Workers AI + Vectorize + D1 + KV)

### Educative Header

The `NoahChatWidget` now renders an `AboutHeader` component when the conversation is empty (shows in hero mode on homepage). It explains:
- What Noah is (ARK SYSTEMS' AI assistant per line: Legal/Commerce/Lab)
- Architecture: Workers AI at edge + D1 grounding + Vectorize semantic search + KV history
- Limitations: Not binding legal advice; verify with professional; PLD alerts may appear

This improves user trust and sets correct expectations for the AI's capabilities and boundaries.

## 9. Build / Quality Status

### Current verification result (2026-10-14)

`npm run check` passed (57 Astro files, 0 errors, 0 warnings, 0 hints). `npm run build` passes locally. The latest build includes the NoahChatWidget educative header, hybrid Vectorize RAG + D1 fallback in `/api/chat`, and Vectorize binding in `wrangler.jsonc`. Astro emits a non-blocking warning that Cloudflare does not support Sharp at runtime. These checks do not verify third-party form delivery or remote CI.

### Existing quality scaffolding

- `.github/workflows/ci.yml` runs format check, lint, and build on pushes and PRs
- `lighthouserc.json` enforces Lighthouse performance/accessibility thresholds (95% performance/accessibility, 90% best-practices/SEO)
- `npm run verify` exists for a combined quality pass (format:check + lint + build)
- **`cspell.json`** added for Spanish vocabulary spell-checking (legal/fiscal terms: cumplimiento, lavado, cripto, criptoactivos, expediente, productos, pagos, envíos, datos, respuesta, generada, constituye, asesoría, abogado, contador, huella, navegador, registro, auditoría, cerrar, necesita, resguardar, selecciona, tema, pregúntame, necesites, buscas, duda, exploramos, técnica, enviar, mensaje, servidor, tiene, formato, inválido, pudo, calcular, está, disponible, momento, intenta, nuevo, abrir, soporte)

## 10. High-Level Risks And Gaps

1. Client-facing placeholders remain and must be replaced before launch.
2. Portfolio and payment-demo details are not yet client-approved for production use.
3. Cloudflare Worker deployment configuration and account bindings (KV, AI, D1, Vectorize) must remain valid for deployment.
4. The design system is partially tokenized; hardcoded text/border colors and the logo/header integration may require client-specific changes.
5. `/api/contact` endpoint needs implementation for form submissions.
6. Sitemap is manually maintained; should be generated by Astro.
7. Vectorize index `ark-kb-index` needs to be created (`wrangler vectorize create ark-kb-index --dimensions 768 --metric cosine`) and populated with embeddings from `knowledge_base` for the chat RAG to use semantic search.

## 11. Recommended Next Priorities

1. Confirm client-specific booking details and replace any remaining placeholder CTA and form destinations with approved production values.
2. Replace demo copy, pricing, statistics, and portfolio entries with approved client content.
3. **Local, not deployed: Ark cube logo refresh and generated favicon/logo variants**
4. Implement `/api/contact` endpoint for form handling.
5. Confirm the Cloudflare Worker project, domain, sitemap, robots, and deployment configuration for the target site.
6. Review whether to generate the currently hand-maintained sitemap.
7. **Create and populate Vectorize index**: `wrangler vectorize create ark-kb-index --dimensions 768 --metric cosine` then write a script to embed `knowledge_base` rows and upsert to Vectorize with metadata (`id`, `line`, `context`, `topic`, `answer`, `legal_reference`).
8. Extend design tokens where needed and add integration/end-to-end coverage if the template's scope requires it.

## 12. Bottom Line

The repo is a structured, config-driven marketing site with reusable routes, components, documented client-onboarding steps, and a portfolio of eleven interactive React demos, two external sites, and one concept card. Local Astro checking passes. A full production build passes locally. It is not yet production-ready for a particular client: placeholders, demo payment/contact values, external integrations, Vectorize index population, and deployment details still need to be supplied and verified.

**Current status (2026-10-14)**: `main` and `origin/main` are synchronized at `7983b43`. The Ikigai React hydration fix is committed, deployed, and verified live: the page mounts the app and adding a ceremony updates the cart and total. The current local working tree contains uncommitted changes: Calculadora Vintage demo and Ark Legal homepage preview card, Ark cube logo refresh and generated favicon/logo variants, NoahChatWidget educative header (`AboutHeader`), `/api/chat` hybrid Vectorize RAG + D1 fallback with citations, Vectorize binding in `wrangler.jsonc`; these changes have not been deployed. Astro checking passed. The informational leasing page is not a signed contract or legal advice. Existing demo, pricing, and client-specific content still require confirmation before production use.

---

## 13. Current Deployment Model (2026-10-12)

> This section reflects the active deployment model in the repo today: a **Cloudflare Workers hybrid setup** that serves the Astro SSR build through a Worker with static asset bindings, AI binding, and D1 database.

### 13.1 What Changed

| File               | Before                                                                        | After                                                                    |
| ------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `package.json`     | `wrangler: ^3.80.0`                                                           | `wrangler: ^4.147.0`                                                     |
| `astro.config.mjs` | `output: 'static'`, `build.format: 'directory'`, adapter with `platformProxy` | `output: 'server'`, `build.format: 'file'`, adapter with `platformProxy` |
| `wrangler.toml`    | Pages config (`pages_build_output_dir = "./dist"`)                            | **Deleted** — replaced by `wrangler.jsonc`                               |
| `wrangler.jsonc`   | Did not exist                                                                 | New Worker config (see 13.2)                                             |

### 13.2 Current `wrangler.jsonc`

```jsonc
{
  "name": "ark-system",
  "compatibility_date": "2026-10-09",
  "account_id": "ccab12c2e99a74d45eda626cb81c5c0c",
  "main": "./dist/_worker.js/index.js",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
  },
  "compatibility_flags": ["nodejs_compat"],
  "ai": {
    "binding": "AI",
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "ark-fiscal-db",
      "database_id": "9f7f2e3c-030c-47b0-974f-d4d70fd44296",
    },
  ],
  "kv_namespaces": [
    {
      "binding": "SESSION",
      "id": "316c37d5fe864e4bab912a0dbbe6b00a",
      "preview_id": "b93b8db2fc3e4cfeabc0e494db14ee2e",
    },
  ],
  "vectorize": [
    {
      "binding": "VECTORIZE",
      "index_name": "ark-kb-index"
    }
  ],
  "observability": { "enabled": true },
}
```

- `main` points to the Astro SSR entrypoint generated by the Cloudflare adapter.
- `assets.directory` serves the client-side build output (`dist/`) via the `ASSETS` binding.
- `kv_namespaces.SESSION` satisfies the adapter's session KV requirement.
- `ai.binding` enables Cloudflare Workers AI for the `/api/chat` endpoint.
- `d1_databases.DB` provides a D1 database binding for fiscal/legal data storage.
- `vectorize` binding provides a Vectorize index (`ark-kb-index`) for semantic search in the chat RAG pipeline.
- `observability` enables Cloudflare telemetry.

### 13.3 Build Verification

The latest local `npm run build` passes on the current branch. `astro check` reports **0 errors, 0 warnings, and 0 hints**; the Cloudflare adapter still emits a non-blocking Sharp runtime compatibility warning during the build. The output directory contains:

```
dist/
└── _worker.js/
    ├── index.js              # Worker entrypoint
    ├── pages/
    ├── chunks/
    └── manifest_*.mjs
```

### 13.4 Known Non-Blocking Warnings

- **Sharp**: Cloudflare Workers does not support Sharp at runtime. Prerendered images are optimized at build time; this does not fail the build.
- **`imageService: 'compile'`**: Not available in Astro 5. The above warning is informational only.

### 13.5 Deployment Command

```bash
npm run build
npm run deploy   # runs: wrangler deploy
```

### 13.6 Last Confirmed Live Status

- **URL**: https://ark-system.substrateholdingsai.workers.dev
- **Version ID**: `8320af54-e312-4e94-a501-dd55c2d53935`
- **Bindings**: `SESSION` KV namespace (`316c37d5fe864e4bab912a0dbbe6b00a`), `ASSETS`, `AI`, `DB` (D1)
- **Worker startup time**: 23 ms
- **Assets uploaded**: 3 changed assets; 36 were already present (1.07 seconds upload)
- **Active model**: Cloudflare Workers hybrid deployment using Astro server output and static assets
- `https://arksystems.site/portfolio/ikigai` was browser-verified after deployment: the React app mounted, ceremony content appeared, and adding an item updated the cart and total. This version contains the Ikigai hydration fix but does not include the uncommitted Calculadora Vintage or cube logo refresh.

### 13.7 Deployment Troubleshooting Log

| Error                                                              | Fix                                                                                                                                                            |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN` required                                    | Generate token at https://developers.cloudflare.com/api/tokens/ using the "Create API Token" preset                                                            |
| `Uploading a Pages _worker.js directory as an asset`               | Add `dist/.assetsignore` containing `_worker.js`                                                                                                               |
| `Invalid _redirects configuration: Only relative URLs are allowed` | Rewrite `public/_redirects` to use relative paths only; host canonicalisation moves to Dashboard Rules                                                         |
| `KV namespace 'SESSION' is not valid`                              | Create namespace via API (`POST /accounts/<id>/storage/kv/namespaces` with `{"name":"SESSION","title":"SESSION"}`) and store its real `id` in `wrangler.jsonc` |
| `Vectorize index not found`                                        | Create index: `wrangler vectorize create ark-kb-index --dimensions 768 --metric cosine` then populate via embedding script                                    |
