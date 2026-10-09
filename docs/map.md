# Ark System — Project Map

> Current status snapshot for the repo as of 2026-10-07.
> This document reflects the current implementation in the codebase today, with the active deployment model set to Astro + Cloudflare Workers. It is not the original aspirational roadmap.

## 1. Executive Summary

Ark System is an edge-native marketing and conversion site built with Astro, Tailwind CSS, TypeScript, React islands, and Cloudflare Workers. The repo contains a functioning site scaffold, a typed config contract with Ark as Client 0, CI/Lighthouse checks, and a portfolio with 10 entries: seven interactive demos, two external sites, and one unimplemented concept. The production build passes locally.

Status at a glance:

- Build status: **green** locally (`npm run build` passes with the current Cloudflare Workers configuration)
- Core platform: Astro 5 + Tailwind 3 + React 19 + Cloudflare Workers (hybrid SSR + static assets)
- Content model: typed reusable contract and Ark Client 0 instance in `src/data/config.ts`
- Route architecture: implemented for the home, pricing, contact, portfolio, brand preview, Acepta Bitcoin case-study, and seven interactive demo pages, plus 404
- Deployment config: Cloudflare adapter with server output, Worker config in `wrangler.jsonc`, and a `SESSION` KV binding for the adapter runtime
- Portfolio: 10 cards — seven interactive demos (Temozonia, Tomato for Bitcoin, Arkangel, Velvet Room, Medical Express, Talos, and Mapa Crypto), two external sites (Acepta Bitcoin and La Bianca Tropical), and the Padel Outlet concept, which has no interactive demo yet
- Placeholder content: still present, including contact/booking destinations, form endpoint, and sample pricing content
- Onboarding documentation: available in `docs/client-onboarding.md`
- Latest portfolio update: project cards now describe the implemented demo behavior and mark sample data, mock integrations, external destinations, and the unimplemented Padel Outlet concept. The latest portfolio changes are committed to `main`; a corresponding production deployment has not been confirmed here.
- CI: workflow is defined in `.github/workflows/ci.yml`; Lighthouse budget exists, but remote CI status is not recorded here
- **Vector assets**: 10 SVG assets generated via `scripts/generate-assets.py` in `public/assets/vector/`

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
- `wrangler.jsonc` configures the Cloudflare Worker, static asset binding, and session KV binding
- React is integrated through `@astrojs/react`; all seven interactive portfolio demos mount client-only React islands
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
│       ├── ark-logo.svg
│       ├── og-default.png
│       ├── vector/                   NEW: Generated vector assets
│       │   ├── logo-mark.svg
│       │   ├── favicon.svg
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
├── scripts/                           NEW: Asset generation script
│   └── generate-assets.py
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
│   │   │   ├── TemozoniaApp.jsx        Interactive Temozonia checkout demo
│   │   │   ├── TomatoApp.jsx           Interactive Tomato for Bitcoin storefront demo
│   │   │   ├── ArkangelApp.jsx         Interactive compliance-flow simulation
│   │   │   ├── VelvetApp.jsx           Interactive bar storefront demo
│   │   │   ├── MedicalApp.jsx          Fictional appointment and payment-flow demo
│   │   │   ├── TalosApp.jsx            Simulated mining-data collector concept
│   │   │   └── VirtualAssetsMapApp.jsx Legal-topic filtering demo; references unverified
│   │   └── ui/
│   │       ├── Badge.astro
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       └── Input.astro
│   ├── data/
│   │   └── config.ts                  Typed site contract and Ark Client 0 content
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
│   │   │   └── mapa-crypto.astro
│   │   ├── pricing.astro
│   │   └── brand.astro
│   ├── styles/
│   │   └── global.css                 Core theme tokens and base component styles
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
├── tailwind.config.mjs
├── tsconfig.json
├── wrangler.jsonc                     Cloudflare Worker, assets, and KV configuration
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
- La Bianca Tropical is linked directly from the gallery to its external storefront; it has no local portfolio detail route
- Padel Outlet is a concept card only; it has no route or interactive demo
- `/pricing` — pricing page
- `/contact` — contact form + Cal.com embed
- `/404` — branded not-found view
- `/brand` — brand system preview page (internal)

The route model is file-based and follows Astro conventions.

The `/portfolio` page presents 10 cards: seven interactive demos, two external sites, and one concept without an interactive demo. Each interactive demo has its own page and mounts its React app with `client:only="react"`. The Acepta Bitcoin case study has a local detail page whose production link opens the external site; La Bianca Tropical links directly to its external storefront.

The demos are: Temozonia, a sample storefront with catalog, cart, and illustrative checkout; Tomato for Bitcoin, a sample produce storefront with six products, cart, and payment-method selection; Arkangel, a UI simulation with illustrative conduct categories, mock cases, and a non-persistent ledger; Velvet Room, a fictional bar menu and atmosphere gallery; Medical Express, a fictional schedule selector with local-only payment-flow simulations; Talos, simulated mining-data metrics and spread; and Mapa Crypto, searchable and filterable topic summaries with unverified references. Velvet Room and Medical Express do not accept reservations or payments. Medical Express is not a healthcare provider and offers no medical care or advice; no patient data is collected. Talos does not connect to data sources, mining pools, exchanges, a treasury, payment APIs, or trading services, and makes no financial recommendations. Mapa Crypto reproduces topics and legal references from user-provided material without validating them; the references may be incomplete, outdated, or inaccurate, and the demo provides no legal interpretation or advice. None of Arkangel's indicators represent a live integration, operational legal controls, verified legal citations, or legal advice. Temozonia's data is explicitly demo data; storefront payment and contact values generally must be confirmed before real transactions or production use. Padel Outlet is a concept card only, with no inventory, interactive experience, or checkout.

## 6. Design / Theme Architecture

The global styling layer is set up around semantic design tokens and a dark default theme.

Key files:

- `src/styles/global.css` — root tokens, component styles, and Ark, Temozonia, amber, and fire theme variants
- `tailwind.config.mjs` — custom colors, fonts, shadows, animations
- `src/data/config.ts` — copy, nav, pricing, portfolio, CTA links

Current theme behavior in code:

- dark palette is default (`base` / `surface` / `void` tokens); Temozonia has a warm light theme
- accent is configurable via CSS variables, with amber and fire theme variants
- theme overrides exist for `[data-theme='temozonia']`, `[data-theme='amber']`, and `[data-theme='fire']`
- custom Tailwind colors are defined for `void`, `base`, `surface`, `surface-hover`, and `ark.accent`

This means the design system is mostly in place, but the implementation is not yet fully clean or consistently validated across the repo.

## 7. Content And Data Model

The system is intentionally config-driven:

- `src/data/config.ts` owns brand copy, pricing, nav links, portfolio metadata, contact info, and CTA URLs
- `src/data/config.ts` also exports `demos.temozonia`, centralizing its demo-mode flag, brand, sample payment details, and product catalog
- components read from this config instead of hard-coding content
- `src/utils/helpers.ts` provides formatting and URL-building helpers

This is the main architectural strength of the repo and is the closest thing to a reusable product engine.

## 8. Current Status by Area

### 8.1 Implemented and mostly working

- Astro site scaffold and routing
- Tailwind design tokens and global styles
- Reusable UI primitives (Button, Card, Badge, Input)
- Config-driven landing page sections
- Cloudflare Workers deployment configuration (Astro server output + static asset binding)
- React integration via `@astrojs/react`, used by the Temozonia, Tomato for Bitcoin, Arkangel, Velvet Room, Medical Express, Talos, and Mapa Crypto portfolio demos
- Temozonia checkout prototype with cart quantity management, WhatsApp order link, CLABE copy action, and Lightning payment details
- Tomato for Bitcoin marketplace prototype at `/portfolio/tomato`, with six sample products, cart, payment-method selection, WhatsApp order link, and CLABE copy action
- Arkangel compliance-flow simulation at `/portfolio/arkangel`, with eight illustrative sections, mock cases, and a non-persistent sample ledger
- Velvet Room bar concept at `/portfolio/velvet`, with a sample cocktail menu, ambient video, and CSS scroll-snap gallery; reservation and payment actions are disabled
- Medical Express concept at `/portfolio/medical`, with selectable fictional appointment slots and clearly labeled local-only payment-flow simulations; no real healthcare, appointment, or payment service is provided
- Talos concept at `/portfolio/talos`, with local-only simulated mining-data metrics and spread values; no collector, live API, treasury, or financial operations are connected
- Mapa Crypto at `/portfolio/mapa-crypto`, with searchable/filterable subject summaries and references explicitly marked as unverified; it gives no legal classification or advice
- CI workflow and Lighthouse budget configuration
- **Vector asset generation script (`scripts/generate-assets.py`)**
- **10 SVG brand assets (logo, favicon, glows, grids, portfolio placeholders)**
- **Hero section uses vector glow/grid backgrounds**
- **Portfolio grid uses vector placeholders with hover animations**
- **BaseLayout uses proper SVG favicon with type attribute**

### 8.2 Present but incomplete / placeholder-driven

- Contact CTA link uses placeholder `cal.com/your-ark-team/...`
- Form uses placeholder Formspree endpoint or a non-functional form target
- Pricing data is a single-tier demo configuration
- Portfolio metadata and demo catalogs remain sample content; `/portfolio` contains seven interactive demos, two external sites, and the Padel Outlet concept card
- Temozonia's product, payment, and contact values are explicitly configured as demo data; all demo payment identifiers and contact details must be confirmed before real use
- `public/sitemap.xml` is manually maintained instead of generated by Astro
- `src/layouts/BaseLayout.astro` still pulls Google Fonts directly and is not fully optimized for performance

### 8.3 Not yet production-ready

- The Temozonia and Tomato React demos are interactive prototypes; their payment/contact configuration is sample data and is not evidence of a production payment integration
- Arkangel is a UI simulation only; sample case statuses, block counts, hashes, and legal references are not live data, verified legal conclusions, or evidence of deployed compliance controls
- Velvet Room is a fictional bar concept; its menu, prices, location, hours, and media are illustrative and it has no active reservation, payment, or social links
- Medical Express is a fictional healthcare scheduling concept, not a medical provider; its clinician, schedule, and prices are not real, its interactions are local-only, and it collects no personal or medical information or accepts appointments or payments
- Talos is a fictional mining-data collector concept; its metrics and spread are simulated locally, with no connected collector, data sources, treasury, financial products, or active API, and it is not financial or investment advice
- Mapa Crypto's legal topics and references came from unverified user-provided material; the demo omits penalty amounts and legal conclusions, and is not legal advice
- Business-specific links, form handling, and demo content still need client-approved production values
- The Cloudflare Worker deployment requires valid account configuration, including the session KV binding
- The theming engine is partially implemented; the client onboarding workflow is documented in `docs/client-onboarding.md`
- No end-to-end integration or feature tests beyond CI/static checks

## 9. Build / Quality Status

### Current verification result

A local `npm run build` passes with the current configuration, including the portfolio React islands and the Cloudflare Workers adapter:

- `astro check`: 0 errors, 0 warnings, 0 hints
- `astro build`: completed the Cloudflare Worker server build and client build; the Temozonia, Tomato, Arkangel, Velvet Room, Medical Express, Talos, and Mapa Crypto demo client modules were emitted as separate bundles
- Astro emitted a non-blocking warning that Cloudflare does not support Sharp at runtime

This confirms the source builds locally; it does not verify deployed behavior, third-party form delivery, or remote CI.

### Existing quality scaffolding

- `.github/workflows/ci.yml` runs format check, lint, and build on pushes and PRs
- `lighthouserc.json` enforces Lighthouse performance/accessibility thresholds
- `npm run verify` exists for a combined quality pass

## 10. High-Level Risks And Gaps

1. Client-facing placeholders remain and must be replaced before launch.
2. Portfolio and payment-demo details are not yet client-approved for production use.
3. Cloudflare Worker deployment configuration and account bindings must remain valid for deployment.
4. The design system is partially tokenized; hardcoded text/border colors and the logo/header integration may require client-specific changes.

## 11. Recommended Next Priorities

1. Replace placeholder CTA, booking, and form destinations with client-approved production values.
2. Replace demo copy, pricing, statistics, and portfolio entries with approved client content.
3. **COMPLETED: Brand assets generated and integrated (logo, favicon, backgrounds, placeholders)**
4. Confirm the Cloudflare Worker project, domain, sitemap, robots, and deployment configuration for the target site.
5. Review whether to generate the currently hand-maintained sitemap.
6. Extend design tokens where needed and add integration/end-to-end coverage if the template's scope requires it.

## 12. Bottom Line

The repo is a structured, config-driven marketing site with reusable routes, components, documented client-onboarding steps, and a portfolio of seven interactive React demos, two external sites, and one concept card. Its local production build is green. It is not yet production-ready for a particular client: placeholders, demo payment/contact values, external integrations, and deployment details still need to be supplied and verified.

**Current status (2026-10-07)**: The vector asset pipeline is operational, and the portfolio descriptions have been aligned with the actual demos and destinations. The Ark theme system includes dark defaults plus Temozonia, amber, and fire variants. Temozonia's demo configuration and product catalog are centralized in `src/data/config.ts`. The latest code is committed to `main`; this document does not claim that the latest portfolio update has been deployed.

---

## 13. Current Deployment Model (2026-10-07)

> This section reflects the active deployment model in the repo today: a **Cloudflare Workers hybrid setup** that serves the Astro SSR build through a Worker with static asset bindings.

### 13.1 What Changed

| File               | Before                                                                        | After                                                                    |
| ------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `package.json`     | `wrangler: ^3.80.0`                                                           | `wrangler: ^4.0.0`                                                       |
| `astro.config.mjs` | `output: 'static'`, `build.format: 'directory'`, adapter with `platformProxy` | `output: 'server'`, `build.format: 'file'`, adapter with `platformProxy` |
| `wrangler.toml`    | Pages config (`pages_build_output_dir = "./dist"`)                            | **Deleted** — replaced by `wrangler.jsonc`                               |
| `wrangler.jsonc`   | Did not exist                                                                 | New Worker config (see 13.2)                                             |

### 13.2 New `wrangler.jsonc`

```jsonc
{
  "name": "ark-system",
  "compatibility_date": "2026-10-06",
  "main": "./dist/_worker.js/index.js",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
  },
  "compatibility_flags": ["nodejs_compat"],
  "kv_namespaces": [
    {
      "binding": "SESSION",
      "id": "SESSION",
    },
  ],
  "observability": { "enabled": true },
}
```

- `main` points to the Astro SSR entrypoint generated by the Cloudflare adapter.
- `assets.directory` serves the client-side build output (`dist/`) via the `ASSETS` binding.
- `kv_namespaces.SESSION` satisfies the adapter's session KV requirement.
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

### 13.6 Live Status (2026-10-07)

- **URL**: https://ark-system.substrateholdingsai.workers.dev
- **Version ID**: `06349b85-3fe6-422e-a8da-eec7918862a3`
- **Bindings**: `SESSION` KV namespace (`316c37d5fe864e4bab912a0dbbe6b00a`), `ASSETS`
- **Worker startup time**: 29 ms
- **Assets uploaded**: 18 files (886.46 KiB)
- **Active model**: Cloudflare Workers hybrid deployment using Astro server output and static assets

### 13.7 Deployment Troubleshooting Log

| Error                                                              | Fix                                                                                                                                                            |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN` required                                    | Generate token at https://developers.cloudflare.com/api/tokens/ using the "Create API Token" preset                                                            |
| `Uploading a Pages _worker.js directory as an asset`               | Add `dist/.assetsignore` containing `_worker.js`                                                                                                               |
| `Invalid _redirects configuration: Only relative URLs are allowed` | Rewrite `public/_redirects` to use relative paths only; host canonicalisation moves to Dashboard Rules                                                         |
| `KV namespace 'SESSION' is not valid`                              | Create namespace via API (`POST /accounts/<id>/storage/kv/namespaces` with `{"name":"SESSION","title":"SESSION"}`) and store its real `id` in `wrangler.jsonc` |
