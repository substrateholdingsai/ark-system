# Ark System — Project Map

> Current status snapshot for the repo as of 2026-10-04.
> This document reflects the actual implementation in the codebase today, not the original aspirational roadmap.

## 1. Executive Summary

Ark System is a static marketing / conversion-site template for an edge-native web infrastructure brand. The project is built with Astro, Tailwind CSS, TypeScript, and Cloudflare Pages. The repo contains a functioning site scaffold, a typed config contract with Ark as Client 0, and CI/Lighthouse checks. The production build passes locally, but the template is not client-ready until placeholder content and external service destinations are configured.

Status at a glance:

- Build status: green locally (`npm run build` completed successfully on 2026-10-04)
- Core platform: Astro 5 + Tailwind 3 + Cloudflare Pages
- Content model: typed reusable contract and Ark Client 0 instance in `src/data/config.ts`
- Route architecture: implemented for 5 content pages (including `/brand`) and 404
- Deployment config: present, but adapter/output strategy is not fully intentional
- Placeholder content: still present, including contact/booking destinations, form endpoint, and sample pricing/portfolio content
- Onboarding documentation: available in `docs/client-onboarding.md`
- Git baseline: commit `0f591d7` pushed to `origin/main`; working tree was clean at snapshot time
- CI: workflow is defined in `.github/workflows/ci.yml`; Lighthouse budget exists, but remote CI status is not recorded here

## 2. What the Project Is

The repo is best described as a content-driven marketing site template rather than a general-purpose application backend. It is meant to sell an “Ark” brand as a web infrastructure package and provide a reusable reference implementation for future client brands.

The guiding design decisions in code are:

1. Single source of truth for copy and links via `src/data/config.ts`
2. Semantic design tokens in `src/styles/global.css` and `tailwind.config.mjs`
3. File-based route composition with Astro pages and reusable section components
4. Static-first deployment with a Cloudflare Pages adapter

## 3. Current Runtime / Deployment Model

```text
Browser
  -> Cloudflare Pages (Astro static output + adapter)
  -> dist/
     -> /index.html
     -> /portfolio/index.html
     -> /pricing/index.html
     -> /contact/index.html
     -> /404.html
```

Current implementation details:

- Astro config uses `output: 'static'`
- Cloudflare adapter is enabled in `astro.config.mjs`
- `wrangler.toml` is present and the project is configured for Cloudflare Pages deployment
- CI performs `npm run build` and runs Lighthouse checks against `./dist`
- The project has a generated `dist/` directory checked in from the latest local build attempt

The local build currently passes. The Cloudflare adapter reports a non-blocking Sharp runtime compatibility warning; this does not establish remote CI or production deployment status.

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
│       └── portfolio/
│           └── labianca.jpg
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
│   │   └── pricing.astro
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
├── wrangler.toml
└── dist/                              Generated build output from the latest build attempt
```

## 5. Route Map

The site includes the following implemented pages:

- `/` — home page with hero, tech stack, portfolio preview, pricing
- `/portfolio` — portfolio gallery page
- `/pricing` — pricing page
- `/contact` — contact form + Cal.com embed
- `/404` — branded not-found view

The route model is file-based and follows Astro conventions.

## 6. Design / Theme Architecture

The global styling layer is set up around semantic design tokens and a dark default theme.

Key files:

- `src/styles/global.css` — root tokens and component default classes
- `tailwind.config.mjs` — custom colors, fonts, shadows, animations
- `src/data/config.ts` — copy, nav, pricing, portfolio, CTA links

Current theme behavior in code:

- dark palette is default (`base` / `surface` / `void` tokens)
- accent is configurable via CSS variables
- amber theme override exists for `[data-theme='amber']`
- custom Tailwind colors are defined for `void`, `base`, `surface`, `surface-hover`, and `ark.accent`

This means the design system is mostly in place, but the implementation is not yet fully clean or consistently validated across the repo.

## 7. Content And Data Model

The system is intentionally config-driven:

- `src/data/config.ts` owns brand copy, pricing, nav links, portfolio metadata, contact info, and CTA URLs
- components read from this config instead of hard-coding content
- `src/utils/helpers.ts` provides formatting and URL-building helpers

This is the main architectural strength of the repo and is the closest thing to a reusable product engine.

## 8. Current Status by Area

### 8.1 Implemented and mostly working

- Astro site scaffold and routing
- Tailwind design tokens and global styles
- Reusable UI primitives (Button, Card, Badge, Input)
- Config-driven landing page sections
- Cloudflare Pages deployment configuration
- CI workflow and Lighthouse budget configuration

### 8.2 Present but incomplete / placeholder-driven

- Contact CTA link uses placeholder `cal.com/your-ark-team/...`
- Form uses placeholder Formspree endpoint or a non-functional form target
- Pricing data is a single-tier demo configuration
- Portfolio data is a single-item sample rather than a full client set
- `public/sitemap.xml` is manually maintained instead of generated by Astro
- `src/layouts/BaseLayout.astro` still pulls Google Fonts directly and is not fully optimized for performance

### 8.3 Not yet production-ready

- `npm run build` passes locally; it reported a Cloudflare/Sharp runtime compatibility warning, which did not block the static build
- Business-specific links, form handling, and demo content still need client-approved production values
- The Cloudflare adapter remains enabled even though the project is static-first; the repo is not clearly committed to a pure-static vs hybrid deployment model
- The theming engine is partially implemented; the client onboarding workflow is documented in `docs/client-onboarding.md`
- No end-to-end integration or feature tests beyond CI/static checks

## 9. Build / Quality Status

### Current verification result

A local `npm run build` completed successfully on 2026-10-04:

- `astro check`: 0 errors, 0 warnings, 0 hints
- `astro build`: completed and prerendered the site's routes
- Astro emitted a warning that Cloudflare does not support Sharp at runtime; this did not fail the build. The adapter notes that `imageService: "compile"` can be used for build-time optimization of prerendered images.

This confirms the current source builds locally; it does not verify deployed behavior, third-party form delivery, or remote CI.

### Existing quality scaffolding

- `.github/workflows/ci.yml` runs format check, lint, and build on pushes and PRs
- `lighthouserc.json` enforces Lighthouse performance/accessibility thresholds
- `npm run verify` exists for a combined quality pass

## 10. High-Level Risks And Gaps

1. Client-facing placeholders remain and must be replaced before launch.
2. Static content is content-rich but not yet client-ready for real production use.
3. Deployment strategy is configured but not cleanly aligned with the project’s actual static architecture.
4. The design system is partially tokenized; hardcoded text/border colors and the logo/header integration may require client-specific changes.

## 11. Recommended Next Priorities

1. Replace placeholder CTA, booking, and form destinations with client-approved production values.
2. Replace demo copy, pricing, statistics, and portfolio entries with approved client content.
3. Complete the brand assets and check whether the header should render the client logo.
4. Confirm the Cloudflare Pages project, domain, sitemap, robots, and deployment strategy for the target site.
5. Decide whether to retain the Cloudflare adapter and whether to generate the currently hand-maintained sitemap.
6. Extend design tokens where needed and add integration/end-to-end coverage if the template's scope requires it.

## 12. Bottom Line

The repo is a structured, config-driven marketing-site template with reusable routes, components, and documented client-onboarding steps. Its local production build is green and a baseline commit is published on `main`. It is not yet production-ready for a particular client: placeholders, assets, external integrations, and deployment details still need to be supplied and verified.
