<div align="center">

# 🌌 Ark System

**Frictionless, Edge-Native Web Infrastructure**

Build once. Deploy everywhere. Scale infinitely.

[![Astro](https://img.shields.io/badge/Astro-5.0-ff5d01?style=flat-square&logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-f38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com)

[Demo](#-inicio-rápido) • [Documentación](#-configuración) • [Deploy](#-deployment) • [Contribuir](#-contribución)

</div>

---

## 📋 Tabla de Contenidos

- [👁 Visión](#-visión)
- [✨ Características](#-características)
- [🛠 Stack Tecnológico](#️-stack-tecnológico)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [⚙️ Configuración](#️-configuración)
- [🎨 Design System](#-design-system)
- [🌐 Deployment](#-deployment)
- [📈 Escalabilidad](#-escalabilidad)
- [🔌 Integraciones](#-integraciones)
- [🗺 Roadmap](#-roadmap)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)
- [🙏 Créditos](#-créditos)

---

## 👁 Visión

Ark no es otra agencia web. Es un **sistema de infraestructura** para crear, desplegar y escalar sitios web estáticos de alto rendimiento con cero fricción y cero costos de hosting.

### El Problema

- **WordPress es un museo de 2010**: lento, vulnerable, caro de mantener
- **Wix/Squarespace** te encierran en sus plataformas con mensualidades
- **Los freelancers** pierden horas en setup en lugar de crear valor

### La Solución Ark

- 1 archivo HTML que **cobra, convierte y escala**
- **$0/mes** en hosting con Cloudflare Pages
- **Deploy en 3 minutos** desde Git
- **100% tuyo** — sin dependencias de terceros para el core

---

## ✨ Características

### 🚀 Performance Edge-Native

- Lighthouse 100/100 out of the box
- < 0.8s load time global (edge CDN)
- Zero JavaScript por defecto (CSS-only animations)
- Static-first architecture

### 🎨 Design System Modular

- Temas dinámicos vía CSS variables
- Componentes reutilizables (Hero, Pricing, Portfolio)
- Tipografía premium (Plus Jakarta Sans + Inter)
- Animaciones CSS-native (60fps garantizado)

### 💰 Services Agnostic

- **Stripe** — Pagos globales
- **Mercado Pago** — OXXO, SPEI, MSI (México/LATAM)
- **BTCPay** — Bitcoin Lightning (0% fees)
- **Cal.com** — Scheduling sin backend
- **PayPal** — Backup internacional

### 🔄 Mass Production Ready

- **Config-driven** — Cambia 1 archivo, actualiza todo
- **Git-native** — Push to deploy
- **Multi-site** — Un repo, infinitos sitios
- **Headless CMS ready** — Sanity, Strapi, Contentful

---

## 🛠 Stack Tecnológico

### Core

| Tecnología       | Versión | Propósito                                 |
| :--------------- | :------ | :---------------------------------------- |
| Astro            | 5.0     | Static site generator, zero-JS by default |
| Tailwind CSS     | 3.4     | Utility-first styling, design system      |
| TypeScript       | 5.6     | Type safety, better DX                    |
| Cloudflare Pages | —       | Edge deployment, $0 hosting               |

### Integraciones

| Servicio      | Tipo       | Uso                              |
| :------------ | :--------- | :------------------------------- |
| Stripe        | Payment    | Tarjetas globales, Apple Pay     |
| Mercado Pago  | Payment    | OXXO, SPEI, meses sin intereses  |
| BTCPay Server | Payment    | Bitcoin Lightning, 0% fees       |
| Cal.com       | Scheduling | Booking, meetings, consultations |
| Formspree     | Forms      | Contact forms sin backend        |

### Herramientas de Desarrollo

- **Vite** — Build tool ultra-rápido
- **Sharp** — Image optimization
- **Wrangler** — Cloudflare CLI
- **ESLint + Prettier** — Code quality _(pendientes de configurar: no incluidos en `package.json`)_

---

## 📁 Estructura del Proyecto

```text
ark-system/
├── .gitignore
├── astro.config.mjs          Adapter, Tailwind, image, markdown, Vite
├── package.json              Scripts, deps, engines (node >=20)
├── tailwind.config.mjs       ★ El motor: tokens, fuentes, motion, sombras
├── tsconfig.json             Extends astro/tsconfigs/strict
├── wrangler.toml             Pages: name, compat date, output dir
│
├── docs/
│   ├── designsystem.md       Contrato de diseño: color, tipo, motion, checklist
│   └── map.md                Mapa del proyecto y etapas de build
│
├── public/                   Se copia tal cual a dist/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/
│       ├── ark-logo.svg
│       ├── og-default.png
│       └── portfolio/
│
└── src/
    ├── data/
    │   └── config.ts         ★ FUENTE DE VERDAD
    ├── utils/
    │   └── helpers.ts        formatPrice, buildCalUrl, slugify
    ├── styles/
    │   └── global.css        Variables + @layer base/components/utilities
    ├── layouts/
    │   └── BaseLayout.astro  Shell: fuentes, <main>, Header, Footer, slot
    ├── pages/                Routing por archivos
    │   ├── index.astro
    │   ├── portfolio.astro
    │   ├── pricing.astro
    │   ├── contact.astro
    │   └── 404.astro
    └── components/
        ├── layout/           Header, Footer, Seo
        ├── sections/         Hero, TechStack, PortfolioGrid, PricingTable, CalEmbed
        └── ui/               Button, Card, Badge
```

### La Clave: `src/data/config.ts`

Este archivo es **el cerebro del sistema**. Todo el contenido, links de pago, pricing, y portfolio se define aquí. Cambia este archivo y todo el sitio se actualiza.

```typescript
// src/data/config.ts
export const config = {
  brand: {
    name: 'Ark',
    tagline: 'Frictionless, Edge-Native Web Infrastructure.',
  },

  site: {
    url: 'https://ark.systems',
    locale: 'en_US',
    description: 'Frictionless, edge-native web infrastructure.',
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
  ],

  hero: {
    subheadline: 'We build and ship fast, resilient web infrastructure on the edge.',
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
      features: ['1-Page Static Site', 'Cal.com Integration', 'Cloudflare Deploy'],
      ctaLink: 'https://cal.com/your-ark-team/30min?category=launch',
      tagline: 'Everything needed to go live, fast.',
      ctaLabel: 'Start with Launch',
      highlighted: true,
    },
  ],

  portfolio: [
    {
      name: 'La Bianca Tropical',
      url: 'https://labianca.ark.systems',
      image: '/assets/portfolio/labianca.jpg',
      blurb: 'Edge-hosted storefront with instant global delivery.',
      tags: ['Storefront'],
    },
  ],

  techStack: [{ name: 'Cloudflare' }, { name: 'Astro' }, { name: 'Wrangler' }],
} as const;
```

---

## 🚀 Inicio Rápido

### Prerequisitos

- **Node.js 20.0.0** o superior
- **Git** para control de versiones
- **Cuenta de Cloudflare** (gratis) para deployment

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/substrateholdingsai/ark-system.git
cd ark-system

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre `http://localhost:4321` en tu navegador.

### Scripts Disponibles

| Comando           | Descripción                                          |
| :---------------- | :--------------------------------------------------- |
| `npm run dev`     | Inicia servidor de desarrollo con hot reload         |
| `npm run check`   | Verificación de tipos (`astro check`)                |
| `npm run build`   | Build de producción (verifica tipos + genera static) |
| `npm run preview` | Preview del build localmente                         |
| `npm run deploy`  | Deploy a Cloudflare Pages                            |
| `npm run astro`   | Acceso directo al CLI de Astro                       |

> `npm run build` ejecuta `astro check` **antes** de compilar. Un error de tipos detiene el build.

---

## ⚙️ Configuración

### 1. Personalizar Brand

Edita `src/data/config.ts`:

```typescript
export const config = {
  brand: {
    name: 'Acme',
    tagline: 'Infraestructura web que no te quita el sueño.',
  },
  site: {
    url: 'https://acme.com', // ← también actualizar astro.config.mjs → site
    locale: 'es_MX',
    description: 'Descripción para SEO y Open Graph.',
    ogImage: '/assets/og-default.png',
  },
  contact: {
    calComLink: 'https://cal.com/acme/30min',
    email: 'hola@acme.com',
  },
};
```

> Cambia la URL en **dos** lugares: `config.site.url` y `astro.config.mjs` → `site`. El sitemap y los canonicals se generan desde ahí.

### 2. Configurar Pagos

Ark es **services agnostic**. Conecta cualquier pasarela. En un sitio 100% static lo más simple es un link de pago directo:

```typescript
// src/data/config.ts
export const config = {
  pricing: [
    {
      tier: 'Launch',
      price: 999,
      currency: 'USD',
      features: ['1-Page Static Site', 'Cal.com Integration', 'Cloudflare Deploy'],
      // Stripe Payment Link — funciona sin backend.
      // Para checkout dinámico, apunta a una Pages Function: '/api/checkout?category=launch'
      ctaLink: 'https://buy.stripe.com/test_xxxxxxxxxxxx',
      tagline: 'Todo lo necesario para salir a producción, rápido.',
      ctaLabel: 'Empezar con Launch',
      highlighted: true,
    },
  ],
};
```

Si necesitas checkout dinámico (importe variable, cupones, webhooks), ver [Integraciones](#-integraciones).

### 3. Integrar Cal.com

```typescript
// src/data/config.ts
export const config = {
  contact: {
    calComLink: 'https://cal.com/tu-equipo/30min',
    email: 'hola@tu-dominio.com',
  },
};
```

El embed ya prellena parámetros vía `buildCalUrl()`:

```typescript
// src/utils/helpers.ts — usado automáticamente por <CalEmbed />
buildCalUrl({ tier: 'launch', name: 'Ana', email: 'ana@acme.com' });
// → https://cal.com/tu-equipo/30min?category=launch&name=Ana&email=ana%40acme.com&hide_gdpr_banner=1
```

### 4. Cambiar Tema

Ark soporta múltiples temas vía CSS variables. Los canales RGB viven en `src/styles/global.css`:

```css
/* Neon (default) */
:root {
  --color-ark-accent-rgb: 99 102 241; /* indigo-500 */
  --color-ark-accent-hover-rgb: 79 70 229;
  --color-ark-accent-to-rgb: 6 182 212; /* cyan-500 */
  --color-ark-accent-glow: rgba(99, 102, 241, 0.15);
}

/* Amber — premium / commerce */
[data-theme='amber'] {
  --color-ark-accent-rgb: 245 158 11; /* amber-500 */
  --color-ark-accent-hover-rgb: 217 119 6;
  --color-ark-accent-to-rgb: 217 119 6;
  --color-ark-accent-glow: rgba(245, 158, 11, 0.15);
}
```

Aplica el tema en `BaseLayout.astro`:

```astro
---
import { config } from '../data/config';
---

<html lang="es" data-theme={config.theme ?? 'neon'}>
```

> **Nota:** el campo `theme` es una adición al `config.ts` actual. Agrégalo tú mismo (`theme: 'neon' | 'amber'`) o deja el valor por defecto con `data-theme="neon"`.

---

## 🎨 Design System

Ark incluye un design system completo y profesional. Ver [`docs/designsystem.md`](./docs/designsystem.md) para el detalle completo, y [`docs/map.md`](./docs/map.md) para el mapa del proyecto.

### Colores

| Token        | Hex       | Uso                           |
| :----------- | :-------- | :---------------------------- |
| `void`       | `#000000` | Background absoluto           |
| `base`       | `#09090B` | Background principal          |
| `surface`    | `#18181B` | Cards, modales                |
| `ark-accent` | `#6366F1` | Color primario (configurable) |

### Tipografía

- **Display:** Plus Jakarta Sans (headings)
- **Body:** Inter (UI text)
- **Mono:** JetBrains Mono (code snippets)

### Componentes

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Button from '../components/ui/Button.astro';
import Card from '../components/ui/Card.astro';
import Badge from '../components/ui/Badge.astro';
---

<BaseLayout>
  <section class="mx-auto max-w-6xl px-6 py-section">
    <Badge tone="accent">Nuevo</Badge>
    <h1 class="mt-4">Titular con Plus Jakarta Sans</h1>
    <p class="mt-4 text-ark-muted">Cuerpo de texto con Inter.</p>

    <div class="mt-8 flex gap-4">
      <Button href="/contact">Book a call</Button>
      <Button href="/portfolio" variant="secondary">
        See our work
      </Button>
      <Button variant="ghost">Ghost</Button>
    </div>

    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card href="https://example.com">Card clickable</Card>
      <Card>Card estática</Card>
    </div>
  </section>
</BaseLayout>
```

Variantes: `Button` → `primary` | `secondary` | `ghost` · `Card` → con `href` o polimórfica (`div` | `article` | `li`) · `Badge` → `neutral` | `accent` | `success`

### Animaciones

Todas las animaciones son **CSS-native** para máximo performance:

```css
/* tailwind.config.mjs → transitionTimingFunction.ark */
--ease-ark: cubic-bezier(0.16, 1, 0.3, 1); /* premium, snappy, natural */

/* Clases generadas automáticamente */
.animate-fade-up   /* ark-fade-up 0.5s ease-ark forwards */
.animate-pulse-soft /* ark-pulse-soft 2s ease-in-out infinite */

/* Keyframes disponibles */
@keyframes ark-fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Duraciones estándar: `duration-150` (micro-interacciones) · `duration-300` (cambios de estado) · `duration-500` (layout, fades).

> Las clases en `@layer components` de `global.css` (`.ark-card`, `.ark-btn-primary`, `.ark-input`, `.ark-badge`, `.ark-glow`) **solo se emiten cuando un archivo las referencia**, porque Tailwind purga lo que no se usa. Escribe la clase en un componente y se activa.

---

## 🌐 Deployment

### Cloudflare Pages (Recomendado)

#### Opción 1: Git Integration (Automático)

1. Push este repo a GitHub/GitLab
2. Ve a **Cloudflare Dashboard**
3. **Workers & Pages → Create → Pages → Connect to Git**
4. Selecciona tu repo
5. Configura:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. **Save and Deploy**

Cada push a `main` dispara un deploy automático.

#### Opción 2: Direct Upload (Manual)

```bash
# 1. Autenticarte (una vez)
npx wrangler login

# 2. Build
npm run build

# 3. Deploy
npx wrangler pages deploy dist --project-name=ark-system
```

O simplemente `npm run deploy` (asume que `dist/` ya existe).

### Dominio Personalizado

En **Cloudflare Pages → Custom domains**:

1. Agrega tu dominio (ej: `ark.systems`)
2. Cloudflare configura DNS automáticamente
3. SSL/TL se activa en segundos

### Costos

| Plan     | Precio  | Límites                              |
| :------- | :------ | :----------------------------------- |
| **Free** | $0/mes  | 500 builds/mes, bandwidth ilimitado  |
| **Pro**  | $20/mes | 5000 builds/mes, analytics avanzados |

Para la mayoría de proyectos, el plan **Free** es más que suficiente.

---

## 📈 Escalabilidad

### De 1 a 100 Sitios

Ark está diseñado para mass production.

#### Estrategia 1: Multi-Branch

```bash
# 1. Crear una rama por cliente
git checkout -b client/acme

# 2. Swappear config.ts y el data-theme en BaseLayout.astro
# 3. Commit y push
git commit -am "Brand: Acme"
git push origin client/acme

# 4. Preview deploy aislado
npx wrangler pages deploy dist --branch=client-acme
```

Cada rama produce un sitio independiente. Sin branches, sin conflictos.

#### Estrategia 2: Multi-Repo

```bash
# Clonar el sistema como template
npx degit substrateholdingsai/ark-system mi-cliente

cd mi-cliente
npm install

# Reemplazar el historial con el repo del cliente
rm -rf .git
git init
git remote add origin git@github.com:cliente/mi-cliente.git
git add -A && git commit -m "Initial commit from Ark"
```

#### Estrategia 3: Headless CMS

Conecta Sanity/Strapi para gestión de contenido. El fetch corre en **build time**, así que el sitio sigue siendo 100% static:

```astro
---
// src/pages/portfolio.astro
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true, // contenido cacheado en el edge
  apiVersion: '2024-01-01',
});

const projects = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
---

<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {projects.map((p) => (
    <li>
      <a href={p.url}>{p.name}</a>
    </li>
  ))}
</ul>
```

### Performance a Escala

- **Edge CDN:** Contenido servido desde 300+ ubicaciones globales
- **Zero backend:** No hay servidores que escalar
- **Static HTML:** Cacheable por defecto
- **Image optimization:** Sharp genera WebP/AVIF automáticamente

---

## 🔌 Integraciones

### Pagos

#### Stripe

Para un sitio static, usa un **Payment Link** (checkout hospedado por Stripe, cero backend):

```typescript
// src/data/config.ts
export const config = {
  pricing: [
    {
      tier: 'Launch',
      price: 999,
      currency: 'USD',
      features: ['1-Page Static Site', 'Cloudflare Deploy'],
      ctaLink: 'https://buy.stripe.com/live_xxxxxxxxxxxx', // ← Payment Link
      ctaLabel: 'Pagar $999',
      highlighted: true,
    },
  ],
};
```

Para checkout dinámico necesitas un endpoint. Implica cambiar `output: 'static'` a `output: 'server'` en `astro.config.mjs`:

```typescript
// src/pages/api/checkout.ts — Pages Function (requiere output: 'server')
import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export const POST: APIRoute = async ({ request, url }) => {
  const { tier, price, name } = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: tier },
          unit_amount: price * 100, // Stripe usa centavos
        },
        quantity: 1,
      },
    ],
    customer_email: name,
    success_url: `${url.origin}/gracias`,
    cancel_url: `${url.origin}/pricing`,
  });

  return Response.json({ url: session.url });
};
```

#### Mercado Pago (LATAM)

```typescript
// src/pages/api/checkout-mp.ts — Pages Function
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: import.meta.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export const POST: APIRoute = async ({ request, url }) => {
  const { tier, price } = await request.json();

  const preference = await new Preference(client).create({
    items: [{ title: tier, quantity: 1, unit_price: price }],
    back_urls: {
      success: `${url.origin}/gracias`,
      pending: `${url.origin}/gracias`,
      failure: `${url.origin}/pricing`,
    },
    auto_return: 'approved', // Regresa solo cuando el pago se aprueba
  });

  return Response.json({ url: preference.init_point });
};
```

#### BTCPay Server (Bitcoin)

```typescript
// src/pages/api/checkout-btc.ts — Pages Function
export const POST: APIRoute = async ({ request, url }) => {
  const { tier, price } = await request.json();
  const base = import.meta.env.BTCPAY_URL;
  const key = import.meta.env.BTCPAY_API_KEY;

  const res = await fetch(`${base}/api/v1/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // BTCPay usa Basic auth con el API key como usuario
      Authorization: `Basic ${btoa(`${key}:`)}`,
    },
    body: JSON.stringify({
      price,
      currency: 'USD',
      orderId: `ark-${tier}`,
      checkout: { redirectURL: `${url.origin}/gracias` },
    }),
  });

  const payment = await res.json();
  return Response.json({ url: payment.checkoutLink });
};
```

> **Nunca** pongas las API keys en el bundle del cliente. Usa variables de entorno de Cloudflare: `wrangler pages secret put STRIPE_SECRET_KEY`.

### Scheduling

#### Cal.com

```astro
---
// src/components/sections/CalEmbed.astro
import { buildCalUrl } from '../../utils/helpers';

const { tier, name, email, height = 700 } = Astro.props;
const src = buildCalUrl({ tier, name, email });
---

<div class="overflow-hidden rounded-2xl border border-ark-border bg-white">
  <iframe
    src={src}
    title="Agenda una llamada"
    width="100%"
    height={height}
    loading="lazy"
    style="border: 0"
  ></iframe>
</div>

<script is:inline>
  (function () {
    var script = document.createElement('script');
    script.src = 'https://assets.cal.com/embed/index.js';
    script.async = true;
    document.head.appendChild(script);
  })();
</script>
```

### Forms

#### Formspree (Sin backend)

```astro
<!-- src/pages/contact.astro -->
<form method="POST" action="https://formspree.io/f/YOUR_FORM_ID" class="mt-10 space-y-4">
  <input type="hidden" name="tier" value={tier ?? ''} />

  <label class="block text-sm">
    <span class="text-ark-muted">Nombre</span>
    <input name="name" autocomplete="name" required class="ark-input mt-2 w-full" />
  </label>

  <label class="block text-sm">
    <span class="text-ark-muted">Email</span>
    <input name="email" type="email" autocomplete="email" required class="ark-input mt-2 w-full" />
  </label>

  <label class="block text-sm">
    <span class="text-ark-muted">Detalles del proyecto</span>
    <textarea name="message" rows="5" class="ark-input mt-2 w-full"></textarea>
  </label>

  <Button type="submit">Enviar mensaje</Button>
</form>
```

> Reemplaza `YOUR_FORM_ID` por el id que te da Formspree al crear el form. Configura la redirección a `/gracias` en el dashboard de Formspree.

### Analytics

#### Plausible (Privacy-first)

```astro
<!-- src/layouts/BaseLayout.astro, dentro de <head> -->
<script is:inline defer data-domain="ark.systems" src="https://plausible.io/js/script.js"></script>
```

Sin cookies, sin banner de consentimiento en la UE, ~1 KB.

---

## 🗺 Roadmap

### Q4 2026

- [ ] Multi-language support (i18n)
- [ ] Dark/Light mode toggle
- [ ] Blog system (Markdown/MDX)
- [ ] E-commerce templates (product variants)

### Q1 2027

- [ ] Headless CMS integration (Sanity, Strapi)
- [ ] A/B testing framework
- [ ] Advanced analytics dashboard
- [ ] Template marketplace

### Q2 2027

- [ ] AI-powered content generation
- [ ] Automated SEO optimization
- [ ] Performance monitoring
- [ ] White-label solution

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor sigue estos pasos:

1. **Fork** el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. **Push** al branch (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Guía de Estilo

- Usa **TypeScript strict mode**
- Sigue el design system definido ([`docs/designsystem.md`](./docs/designsystem.md))
- Mantén Lighthouse score ≥ 95
- Escribe **commits convencionales** (`feat:`, `fix:`, `docs:`)
- Nada de valores arbitrarios de Tailwind (`w-[347px]`) — usa la escala de spacing
- Animaciones CSS-native; nada de librerías de animación JS

### Reportar Bugs

Usa **GitHub Issues** con:

- Descripción clara del problema
- Pasos para reproducir
- Expected vs actual behavior
- Screenshots si aplica

---

## 📄 Licencia

**Proprietary License — Todos los derechos reservados.**

Este software es propiedad de **Substrate Holdings LLC**.

### Uso Permitido

- ✅ Uso comercial en proyectos propios
- ✅ Modificación para necesidades específicas
- ✅ Deploy ilimitado en Cloudflare Pages

### Restricciones

- ❌ No redistribuir como template/kit
- ❌ No sublicenciar a terceros
- ❌ No remover atribución de copyright

Para licencias enterprise o white-label, contacta: **legal@ark.systems**

---

## 🙏 Créditos

### Creado Por

- **Ark Team** — Infraestructura y diseño
- **Comunidad Open Source** — Inspiración y herramientas

### Tecnologías

- [Astro](https://astro.build) — The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com) — A utility-first CSS framework
- [Cloudflare Pages](https://pages.cloudflare.com) — The fastest way to deploy
- [TypeScript](https://www.typescriptlang.org) — JavaScript with syntax for types

### Fuentes

- **Plus Jakarta Sans** — Display typeface
- **Inter** — Body typeface
- **JetBrains Mono** — Monospace typeface

### Integraciones

- [Stripe](https://stripe.com) — Payment infrastructure
- [Mercado Pago](https://www.mercadopago.com) — LATAM payments
- [BTCPay Server](https://btcpayserver.org) — Self-hosted Bitcoin payments
- [Cal.com](https://cal.com) — Open source scheduling

---

## 📞 Contacto

- **Website:** [ark.systems](https://ark.systems)
- **Email:** hello@ark.systems
- **GitHub:** [github.com/substrateholdingsai/ark-system](https://github.com/substrateholdingsai/ark-system)

---

<div align="center">

Hecho con ❤️ para el edge.

⭐ Star this repo si te gusta el proyecto!

</div>
