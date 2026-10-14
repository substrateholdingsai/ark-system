<div align="center">

# ⚖️ Ark Systems

**Infraestructura Edge para negocios y profesionales.**

Sitios de alto rendimiento · Cumplimiento documental · Herramientas profesionales.

[![Astro](https://img.shields.io/badge/Astro-5.0-ff5d01?style=flat-square&logo=astro)](https://astro.build)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Edge-f38020?style=flat-square&logo=cloudflare)](https://cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

[Sitio](https://arksystems.site) • [Portafolio](https://arksystems.site/portfolio) • [Ark Legal](#-ark-legal) • [Ark Commerce](#-ark-commerce) • [Ark Lab](#-ark-lab)

</div>

---

## 👁 Visión

Ark Systems construye y opera sitios web de alto rendimiento sobre Cloudflare Edge, en modelo de arrendamiento operativo (OPEX) o compra única (CAPEX). El portafolio se organiza en tres líneas que comparten el mismo cimiento técnico.

### El Problema

- **Sitios lentos** (WordPress, Wix, hosting compartido) pierden visitas y ventas: 40% de abandono por carga >3s.
- **Inversión inicial alta** ($40,000–$100,000 MXN) que se deprecia en 2 años.
- **Mantenimiento costoso** y dependencia de developers para cada cambio.
- **Despachos y profesionales** sin expediente digital ordenado, sin trazabilidad, sin búsqueda.

### La Solución

- **Arrendamiento OPEX**: $3,890/mes Core, $6,890/mes Pro+IA, setup $0, 100% deducible ISR + IVA.
- **Compra única CAPEX**: $55,000, activo intangible amortizable, ownership total del código.
- **Stack Edge**: Astro 5 + TypeScript + Cloudflare Workers/Pages/D1/Vector, <0.4s, 300+ PoPs.
- **Cumplimiento documental** (Ark Legal): expedientes a prueba de auditoría, trazabilidad, búsqueda.

---

## 🏛 Las tres líneas

### ⚖️ Ark Legal — _Nuestra bandera_

Cumplimiento documental y análisis jurídico para despachos contables y legales.

| Producto        | Qué hace                                                           | Estado           |
| :-------------- | :----------------------------------------------------------------- | :--------------- |
| **Arkangel**    | Simulación de compliance como código para cobranza                 | Demo interactiva |
| **Mapa Crypto** | Explorador de activos virtuales, 12 temas con búsqueda y filtros   | Demo interactiva |
| **SBC 2026**    | Calculadora de Salario Base de Cotización (LFT 2023 + LSS Art. 27) | Demo interactiva |
| **ISN 2026**    | Calculadora de Impuesto Sobre Nómina por entidad federativa        | Demo interactiva |

**Modelo:** arrendamiento desde $3,890/mes · 100% deducible ISR + IVA.

---

### 🛒 Ark Commerce — _Nuestro flujo_

Sitios de alto rendimiento para negocios, en distintas verticales.

| Producto                      | Vertical          | Estado           |
| :---------------------------- | :---------------- | :--------------- |
| **Temozonia Carnes Ahumadas** | E-commerce carnes | Demo interactiva |
| **Tomato for Bitcoin**        | Campo a mesa ₿    | Demo interactiva |
| **La Bianca Tropical**        | Hotel boutique    | Sitio externo    |
| **Padel Outlet**              | Outlet deportivo  | Plantilla        |
| **Velvet Room**               | Cocktail bar      | Demo interactiva |
| **Medical Express**           | Agenda médica     | Demo interactiva |

**Modelo:** arrendamiento desde $3,890/mes. Mismo motor, distinta vertical.

---

### 🔬 Ark Lab — _Nuestro I+D_

Datos, Bitcoin y agentes inteligentes. Open source / experimental.

| Producto           | Qué explora                                 | Estado           |
| :----------------- | :------------------------------------------ | :--------------- |
| **Acepta Bitcoin** | Directorio de comercios que aceptan Bitcoin | Caso de estudio  |
| **Talos**          | Colector de datos para minería Bitcoin      | Demo interactiva |

---

## 💰 Modelo comercial

| Plan                        | Precio     | Setup | Fiscal                        |
| :-------------------------- | :--------- | :---- | :---------------------------- |
| **Arrendamiento Core**      | $3,890/mes | $0    | 100% deducible ISR + IVA      |
| **Arrendamiento Pro + IA**  | $6,890/mes | $0    | 100% deducible ISR + IVA      |
| **Licencia / Compra única** | $55,000    | —     | Activo intangible amortizable |

**Métodos de pago:** SPEI (CFDI 4.0) · Stripe (tarjetas) · BTC/Lightning (BTCPay/Blink) · USDT/USDC.

---

## 🛠 Stack Tecnológico

### Cimiento: Cloudflare Edge

| Tecnología             | Propósito                             |
| :--------------------- | :------------------------------------ |
| **Cloudflare Workers** | Ejecución serverless en 300+ ciudades |
| **Cloudflare Pages**   | Hosting estático, $0/mes              |
| **Cloudflare D1**      | Base de datos SQL en el edge          |
| **Cloudflare Vector**  | Búsqueda vectorial para IA            |
| **Cloudflare WAF**     | Seguridad, anti-DDoS, SSL enterprise  |

### Core

| Tecnología           | Propósito                                                 |
| :------------------- | :-------------------------------------------------------- |
| **Astro 5**          | Static-first, zero-JS por defecto                         |
| **TypeScript 5.6**   | Type safety                                               |
| **Tailwind CSS 3.4** | Design system                                             |
| **Python**           | Automatización, procesamiento de datos, microservicios IA |

### Integraciones

| Servicio           | Uso                      |
| :----------------- | :----------------------- |
| **Stripe**         | Pagos con tarjeta        |
| **Mercado Pago**   | SPEI, OXXO, MSI          |
| **BTCPay / Blink** | Bitcoin Lightning        |
| **Cal.com**        | Agendamiento sin backend |
| **Formspree**      | Formularios sin backend  |

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
│   ├── llms.txt
│   ├── llms-full.txt
│   └── robots.txt
├── src/
│   ├── components/
│   ├── data/
│   │   ├── isn-tasas-2026.ts
│   │   ├── sbc-parametros-2026.ts
│   │   ├── productos-ark.ts
│   │   └── herramientas.ts
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── portfolio/
│   │   │   ├── index.astro
│   │   │   ├── sbc-2026-calculadora.astro
│   │   │   └── isn-2026-calculadora.astro
│   │   └── llms-full.txt.ts
│   ├── styles/
│   └── utils/
├── docs/
│   ├── designsystem.md
│   └── map.md
└── .github/
    └── workflows/
```

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

## 🤝 Contacto

- Email: hello@ark.systems
- Demo: https://ark.systems
- Modelo: arrendamiento operativo + soporte profesional

---

## 📄 Licencia

Este proyecto se distribuye bajo una licencia orientada a desarrollo interno y comercial. Revisa los términos del repositorio antes de reutilizar el código en producción.
