# Ark System — Project Map

> Current status snapshot for the repo as of 2026-10-03.
> This document reflects the actual implementation in the codebase today, not the original aspirational roadmap.

## 1. Executive Summary

Ark System is a static marketing / conversion-site template for an edge-native web infrastructure brand. The project is built with Astro, Tailwind CSS, TypeScript, and Cloudflare Pages. The repo currently contains a functioning site scaffold, a content-driven configuration layer, and CI/lighthouse checks, but it is not fully production-ready because the build is currently failing due to a Tailwind/CSS utility issue.

Status at a glance:

- Build status: red (current CSS utility error blocks `astro build`)
- Core platform: Astro 5 + Tailwind 3 + Cloudflare Pages
- Content model: implemented and centralized in `src/data/config.ts`
- Route architecture: implemented for 5 pages
- Deployment config: present, but adapter/output strategy is not fully intentional
- Placeholder content: still present in multiple places (contact and pricing CTA links)
- CI: present in `.github/workflows/ci.yml` and Lighthouse budget exists

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

Important caveat: the repo currently reports a build failure during CSS processing, so the deployment status is effectively “configured, but not green.”

## 4. Repository Structure

```text
ark-system/
├── .github/
│   └── workflows/
│       └── ci.yml                     CI pipeline: format, lint, build, Lighthouse
├── docs/
│   ├── assets.md
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
│   │   └── config.ts                  Central content/config source
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

- Current build is failing due to a missing/unsupported Tailwind class pattern in `src/styles/global.css`
- The Cloudflare adapter remains enabled even though the project is static-first; the repo is not clearly committed to a pure-static vs hybrid deployment model
- The theming engine is partially implemented; the client onboarding workflow is documented in `docs/client-onboarding.md`
- No end-to-end integration or feature tests beyond CI/static checks

## 9. Build / Quality Status

### Current verification result

A local build attempt (`npm run build`) currently fails:

- `src/styles/global.css` includes `selection:bg-ark-accent/30`
- Tailwind rejects that utility during PostCSS processing
- The failure prevents the project from shipping a clean build

This is the most important blocker to resolve before the project is ready to treat as a stable template or client-facing site.

### Existing quality scaffolding

- `.github/workflows/ci.yml` runs format check, lint, and build on pushes and PRs
- `lighthouserc.json` enforces Lighthouse performance/accessibility thresholds
- `npm run verify` exists for a combined quality pass

## 10. High-Level Risks And Gaps

1. Build is currently red.
2. Placeholder business links and contact destinations remain in config.
3. Static content is content-rich but not yet client-ready for real production use.
4. Deployment strategy is configured but not cleanly aligned with the project’s actual static architecture.
5. The design system is strong, but the repo is not yet fully hardened for handoff or multi-brand implementation.

## 11. Recommended Next Priorities

1. Fix the Tailwind/CSS build blocker in `src/styles/global.css`
2. Replace all placeholder CTA and form endpoints with real production values
3. Decide whether the project will remain Cloudflare adapter-backed static output or be fully simplified to a pure static build
4. Replace the hand-maintained sitemap with Astro-generated sitemap tooling if the project invests in SEO expansion
5. Finalize the multi-tenant brand/theme workflow and document it for future client clones

## 12. Bottom Line

The repo is a promising and largely structured marketing-site template with a solid content/config architecture and strong design-system intent. It is not yet in a clean green-build state, and several placeholder items remain. The current project status is best described as “mostly scaffolded, partially branded, and build-blocked by a CSS utility issue.”
