<div align="center">

# ⚖️ Ark Systems

**Infraestructura Edge para despachos contables y legales.**

Cumplimiento documental · Análisis jurídico · Herramientas profesionales.

[![Astro](https://img.shields.io/badge/Astro-5.0-ff5d01?style=flat-square&logo=astro)](https://astro.build)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Edge-f38020?style=flat-square&logo=cloudflare)](https://cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

[Demo](#) • [Ark Legal](#-ark-legal) • [Ark Commerce](#-ark-commerce) • [Ark Lab](#-ark-lab) • [Deploy](#-deployment)

</div>

---

## 👁 Visión

Ark no es una agencia web. Es **infraestructura de cumplimiento** para profesionales que no pueden permitirse fallar.

### El Problema

- **Despachos contables** deben conservar expedientes 5-10 años (CFF, LFPIORPI). La mayoría los guarda en carpetas, WhatsApp y discos externos.
- **Despachos legales** pierden casos por no encontrar un documento a tiempo. Sin cadena de custodia, sin respaldo, sin búsqueda.
- **La tecnología tradicional** (WordPress, hosting compartido) es lenta, vulnerable y cara de mantener.

### La Solución Ark

- **Expediente digital a prueba de auditoría**: ordenado, respaldado, buscable en segundos.
- **Cumplimiento automatizado**: LFPIORPI, CFF, cadena de custodia.
- **Herramientas de análisis jurídico**: mapas de conducta-ley-sanación, calculadoras profesionales, compliance como código.
- **$0 de CAPEX**: arrendamiento operativo 100% deducible.
- **Cloudflare Edge**: 300+ ciudades, <0.4s, sin servidores que mantener.

---

## 🏛 Las tres líneas de Ark

### ⚖️ Ark Legal

**Nuestra bandera. Donde el valor es 10x.**

Herramientas para despachos contables, fiscales y legales:

| Producto | Qué hace | Para quién |
|:---|:---|:---|
| **Arkangel** | Compliance como código. Evalúa conductas antes de actuar. | Cobranza, fintech, call centers |
| **Mapa Crypto** | Mapa conducta → ley → sanción. Parametrizable a cualquier rama. | Despachos fiscales, compliance |
| **SBC 2026** | Calculadora LFT 2023 + LSS Art.27 + LISR Art.93. | RH, nómina, despachos laborales |
| **Expediente Fiscal** | Repositorio documental a prueba de auditoría. | Despachos contables |
| **Expediente Legal** | Repositorio con cadena de custodia. | Despachos legales |

**Modelo:** Arrendamiento desde $3,890/mes. 100% deducible ISR + IVA.

---

### 🛒 Ark Commerce

**Nuestro flujo. Prueba de que la tecnología funciona en producción.**

| Producto | Vertical | Estado |
|:---|:---|:---|
| **Temozonia** | E-commerce carnes | Demo live |
| **Tomato for Bitcoin** | Campo a mesa ₿ | Demo live |
| **La Bianca Tropical** | Hotel boutique | Sitio real |
| **Medical Express** | Agenda médica | Prototipo |
| **Padel Outlet** | Outlet deportivo | Concepto |
| **Velvet Room** | Bar / nightlife | Concepto |

**Modelo:** Arrendamiento desde $3,890/mes. Mismo motor, distinta vertical.

---

### 🔬 Ark Lab

**Nuestro I+D. Credibilidad técnica.**

| Producto | Qué explora |
|:---|:---|
| **Talos** | Colector de datos para minería Bitcoin |
| **Acepta Bitcoin** | Directorio de comercios ₿ |

**Modelo:** Open source / experimental. Alimenta el resto.

---

## 🛠 Stack Tecnológico

### Cimiento: Cloudflare Edge

| Tecnología | Propósito |
|:---|:---|
| **Cloudflare Workers** | Ejecución serverless en 300+ ciudades |
| **Cloudflare Pages** | Hosting estático, $0/mes |
| **Cloudflare D1** | Base de datos SQL en el edge |
| **Cloudflare Vector** | Búsqueda vectorial para IA |
| **Cloudflare WAF** | Seguridad, anti-DDoS, SSL enterprise |

### Core

| Tecnología | Propósito |
|:---|:---|
| **Astro 5** | Static-first, zero-JS por defecto |
| **TypeScript 5.6** | Type safety |
| **Tailwind CSS 3.4** | Design system |

### Integraciones

| Servicio | Uso |
|:---|:---|
| **Stripe** | Pagos globales |
| **Mercado Pago** | SPEI, OXXO, MSI |
| **BTCPay / Blink** | Bitcoin Lightning |
| **Cal.com** | Agendamiento sin backend |
| **Formspree** | Formularios sin backend |

---

## 📁 Estructura del Proyecto

```text
ark-system/
├── README.md
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── wrangler.toml
├── public/
│   ├── assets/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── docs/
│   ├── designsystem.md
│   └── map.md
└── .github/
    └── workflows/
```

### Principios de arquitectura

- **Edge-first**: el procesamiento y la entrega ocurren lo más cerca posible del usuario.
- **Compliance por diseño**: cada flujo documental se construye con trazabilidad, retención y respaldo.
- **Productos reutilizables**: Ark Legal, Ark Commerce y Ark Lab comparten el mismo motor técnico.
- **Operación 100% deducible**: infraestructura como servicio, no como inversión de capital.

---

## 🚀 Deployment

La plataforma está diseñada para desplegarse con un flujo simple:

```bash
npm install
npm run build
npx wrangler pages deploy dist
```

Se puede desplegar en Cloudflare Pages o en cualquier entorno compatible con Astro + Workers.

---

## 🎯 Dirección estratégica

Ark Systems no es un sitio institucional. Es un sistema operativo para profesionales que necesitan:

- resolver riesgo legal y fiscal,
- documentar evidencias con trazabilidad,
- automatizar cumplimiento,
- y operar desde infraestructura edge sin fricción.

Nuestra misión es convertir la gestión documental y regulatoria de despachos y negocios en un activo operativo y no en un archivo caótico.

---

## 🤝 Contacto

- Email: hello@ark.systems
- Demo: https://ark.systems
- Modelo: arrendamiento operativo + soporte profesional

---

## 📄 Licencia

Este proyecto se distribuye bajo una licencia orientada a desarrollo interno y comercial. Revisa los términos del repositorio antes de reutilizar el código en producción.
