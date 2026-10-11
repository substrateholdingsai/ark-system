# Ark Design System v2.0

> **Compliance by Design.** Every pixel must convey trust, precision, and permanence.

---

## 0. Qué cambió respecto a v1.0

| Aspecto | v1.0 (agencia web) | v2.0 (infraestructura legal) |
|:---|:---|:---|
| **Filosofía** | Frictionless, Edge-Native | Compliance by Design, Edge-Native |
| **Tono visual** | Tech premium, juvenil | Institucional, sobrio, confiable |
| **Paleta primaria** | Indigo → Cyan (neón) | **Índigo profundo → Ámbar sobrio** |
| **Tipografía display** | Plus Jakarta Sans | **Fraunces o Source Serif** (autoridad legal) |
| **Tipografía body** | Inter | **Inter** (se mantiene, es estándar UI) |
| **Elevación** | Glassmorphism brillante | **Glassmorphism sobrio + sello de autenticidad** |
| **Animaciones** | Snappy, rápidas | **Pausadas, deliberadas** (transmiten control) |
| **3 líneas** | No existían | **Legal (índigo), Commerce (ámbar), Lab (cyan)** |
| **Cimiento** | No explícito | **Cloudflare Edge visible como sello de confianza** |

---

## 1. Core Philosophy

**Edge-Native First:** Sin librerías JS de animación. Todo con CSS hardware-accelerated.

**Modular Theming:** El sistema es un esqueleto. Cada línea (Legal, Commerce, Lab) aplica su tema vía CSS variables, nunca hardcodeando valores.

**Trust Through Restraint:** Menos ruido visual. Más jerarquía. El diseño debe transmitir **permanencia y precisión**, no juventud y velocidad.

**Compliance as Visual Language:** Cada elemento debe poder rastrearse, versionarse y auditarse. El diseño refleja el producto.

---

## 2. Color Palette (re-ingenierizada)

### 2.1 Core Neutrals (The Void — se mantiene, es bueno)

| Token | Hex | Tailwind | Uso |
|:---|:---|:---|:---|
| `void` | `#000000` | `bg-black` | Background absoluto |
| `base` | `#09090B` | `bg-zinc-950` | Background principal |
| `surface` | `#18181B` | `bg-zinc-900` | Cards, modales |
| `surface-hover` | `#27272A` | `bg-zinc-800` | Estados interactivos |
| `border` | `rgba(255,255,255,0.08)` | `border-white/[0.08]` | Divisores |
| `border-strong` | `rgba(255,255,255,0.15)` | `border-white/[0.15]` | Estados activos |

### 2.2 Los 3 Temas de Línea (NUEVO)

Ya no hay “Ark Neon” y “Ark Amber” genéricos. Ahora hay **un tema por línea de negocio**.

#### Tema `legal` (índigo profundo — autoridad)

```css
[data-theme='legal'] {
  --color-ark-accent-rgb: 79 70 229;         /* indigo-600 */
  --color-ark-accent-hover-rgb: 67 56 202;   /* indigo-700 */
  --color-ark-accent-to-rgb: 30 58 138;      /* indigo-900 */
  --color-ark-accent-glow: rgba(79, 70, 229, 0.12);
  --color-ark-texture: rgba(79, 70, 229, 0.03);
}
```

#### Tema `commerce` (ámbar — conversión con rigor)

```css
[data-theme='commerce'] {
  --color-ark-accent-rgb: 245 158 11;        /* amber-500 */
  --color-ark-accent-hover-rgb: 217 119 6;  /* amber-600 */
  --color-ark-accent-to-rgb: 146 64 14;      /* amber-800 */
  --color-ark-accent-glow: rgba(245, 158, 11, 0.14);
  --color-ark-texture: rgba(245, 158, 11, 0.035);
}
```

#### Tema `lab` (cyan — investigación y innovación)

```css
[data-theme='lab'] {
  --color-ark-accent-rgb: 34 211 238;        /* cyan-400 */
  --color-ark-accent-hover-rgb: 8 145 178;  /* cyan-600 */
  --color-ark-accent-to-rgb: 8 47 73;        /* cyan-950 */
  --color-ark-accent-glow: rgba(34, 211, 238, 0.12);
  --color-ark-texture: rgba(34, 211, 238, 0.03);
}
```

### 2.3 Semantic Colors

| Token | Hex | Uso |
|:---|:---|:---|
| `success` | `#10B981` (Emerald 500) | Confirmación, validación |
| `warning` | `#F59E0B` (Amber 500) | Pendiente, atención |
| `error` | `#EF4444` (Red 500) | Errores, riesgo |
| `info` | `#22D3EE` (Cyan 400) | Investigación, explicación |

---

## 3. Typography

### 3.1 Display / Headings

**Fraunces** o **Source Serif 4** para títulos de autoridad y narrativa institucional.

_Why:_ transmite seriedad, permanencia y capacidad de decisión. Se usa en hero, cards de producto, y piezas que deben parecer “firmas” más que “marketing”.

**Weights:** 500, 600, 700
**Tracking:** ligeramente aperturado o editorial, no excesivo.

### 3.2 Body / UI

**Inter** sigue siendo el estándar para texto general y UI.

_Why:_ una de las tipografías más legibles para interfaces complejas. Funciona en dashboards, formularios y contenido técnico.

**Weights:** 400, 500, 600, 700

### 3.3 Mono / Code

**JetBrains Mono** o **Geist Mono** para config, código y referencias técnicas.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

h1,
h2,
h3,
h4 {
  font-family: var(--font-display);
  letter-spacing: -0.02em;
}

body {
  font-family: var(--font-body);
}

code,
pre {
  font-family: var(--font-mono);
}
```

---

## 4. Spacing & Layout

El sistema usa una cuadrícula base de 4px con discreción absoluta.

- **Micro:** 4px, 8px
- **Base:** 12px, 16px, 24px
- **Sección:** 48px, 64px, 96px, 128px

### Max widths

- `max-w-prose` para lectura profunda
- `max-w-7xl` para secciones de producto
- `max-w-5xl` para narrativas institucionales

---

## 5. Elevation & Effects

Se evita la brillantez artificial. La elevación se logra con borde sutil, contraste y textura mínima.

### 5.1 Glassmorphism sobrio

```css
.ark-card {
  background: rgba(24, 24, 27, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  transition: border-color 200ms ease, transform 200ms ease;
}

.ark-card:hover {
  border-color: rgba(255, 255, 255, 0.14);
  transform: translateY(-1px);
}
```

### 5.2 Sello de autenticidad

Los elementos de confianza no “destellan”; emiten autoridad. El glow debe ser muy tenue y siempre incluir una matriz de color de la línea activa.

```css
.ark-trust-mark {
  position: relative;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
}
```

---

## 6. Animations & Micro-interactions

**Regla:** si se puede lograr con CSS, se hace con CSS. No se usa JavaScript para animaciones básicas.

### 6.1 Curva de movimiento

```css
:root {
  --ease-ark: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### 6.2 Duraciones recomendadas

- `150ms`: hover y micro-interacciones
- `250ms`: cambios de estado
- `400-500ms`: reveal de secciones o contenido narrativo

### 6.3 Animaciones firmes

```css
@keyframes ark-fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ark-scale-soft {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.ark-animate-fade-in {
  animation: ark-fade-in 450ms var(--ease-ark) both;
}

.ark-animate-scale-soft {
  animation: ark-scale-soft 260ms var(--ease-ark) both;
}
```

---

## 7. Component Anatomy (Examples)

### 7.1 Botón principal

```html
<button class="ark-btn ark-btn--legal">
  <span class="ark-btn__label">Solicitar demo</span>
</button>
```

```css
.ark-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, rgba(var(--color-ark-accent-rgb), 1), rgba(var(--color-ark-accent-to-rgb), 1));
  border: 1px solid rgba(255,255,255,0.08);
  transition: transform 180ms ease, box-shadow 220ms ease, opacity 180ms ease;
}

.ark-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 26px rgba(var(--color-ark-accent-rgb), 0.18);
}
```

### 7.2 Campo de formulario

```html
<label class="ark-field">
  <span class="ark-field__label">Correo institucional</span>
  <input class="ark-field__input" type="email" placeholder="tu@despacho.com" />
  <span class="ark-field__error">Introduce un correo válido.</span>
</label>
```

```css
.ark-field__input {
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  color: white;
  padding: 0.85rem 0.9rem;
}
```

---

## 8. Theming Strategy (Ark Engine)

La visualización del sistema debe cambiar de acuerdo con la línea de negocio sin reescribir componentes.

**Workflow recomendado:**

1. El contenido se define por línea: `legal`, `commerce` o `lab`.
2. El tema aplica CSS variables a nivel global.
3. Los componentes toman variables semánticas y no valores absolutos.
4. El producto se ve consistente sin duplicar componentes.

```js
const ARK_THEMES = {
  legal: {
    accent: '#4F46E5',
    accentTo: '#1E3A8A',
  },
  commerce: {
    accent: '#F59E0B',
    accentTo: '#B45309',
  },
  lab: {
    accent: '#22D3EE',
    accentTo: '#0F172A',
  },
};
```

```css
[data-theme='legal'] {
  --color-ark-accent-rgb: 79 70 229;
  --color-ark-accent-to-rgb: 30 58 138;
}
```

---

## 9. Checklist para desarrollo y revisión

Antes de mergear un componente o una página, validar:

- [ ] No se usan valores arbitrarios de Tailwind que rompan la escala visual.
- [ ] Las animaciones son CSS-native y no dependen de JS pesado.
- [ ] El contraste es apropiado para lectura institucional.
- [ ] La línea activa queda clara en el UI sin ruido visual.
- [ ] La identidad del producto refleja autoridad, no apenas “tech premium”.
- [ ] El sitio transmite confianza, trazabilidad y permanencia.

---

## 10. Directrices finales

Ark no es una agencia web ni una landing “bonita”. Es una infraestructura de confianza para profesionales con riesgo regulatorio y documental.

Por eso, el diseño debe sentirse:

- **serio sin ser aburrido**,
- **tecnológico sin ser frágil**,
- **seguro sin ser agresivo**,
- **moderno sin perder autoridad**.

Un buen producto Ark no solo vende. Demuestra que el dato, la evidencia y la exigencia profesional están bajo control.