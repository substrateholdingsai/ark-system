# Ark Design System v1.0

> **Frictionless by Design.** Every pixel must serve speed, clarity, and conversion.

---

## 1. Core Philosophy

**Edge-Native First:** No heavy JS animation libraries by default. We use hardware-accelerated CSS transitions and transforms.

**Modular Theming:** The core system is a skeleton. Client brands are applied via CSS variables or Tailwind config presets, never by hardcoding values in components.

**High Contrast, Low Noise:** Deep voids, crisp typography, and subtle borders. We use light and shadow to guide attention, not to decorate.

---

## 2. Color Palette

The Ark system uses a semantic, opacity-based scaling system to ensure perfect harmony in both light and dark modes.

### 2.1 Core Neutrals (The Void)

| Token           | Hex                      | Tailwind Class        | Usage                                 |
| :-------------- | :----------------------- | :-------------------- | :------------------------------------ |
| `void`          | `#000000`                | `bg-black`            | Absolute background, hero sections    |
| `base`          | `#09090B`                | `bg-zinc-950`         | Primary page background               |
| `surface`       | `#18181B`                | `bg-zinc-900`         | Cards, modals, elevated layers        |
| `surface-hover` | `#27272A`                | `bg-zinc-800`         | Interactive states, hover backgrounds |
| `border`        | `rgba(255,255,255,0.08)` | `border-white/[0.08]` | Subtle dividers, card outlines        |
| `border-strong` | `rgba(255,255,255,0.15)` | `border-white/[0.15]` | Active states, focused inputs         |

### 2.2 The "Ark Pulse" (Accents)

We define two primary accent gradients. The build system can swap these based on the client's `config.ts`.

- **Ark Neon** (Tech/SaaS): `linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)` (Indigo to Cyan)
- **Ark Amber** (Premium/Commerce): `linear-gradient(135deg, #F59E0B 0%, #D97706 100%)` (Amber to Gold)

### 2.3 Semantic Colors

| Token     | Hex                     | Usage                            |
| :-------- | :---------------------- | :------------------------------- |
| `success` | `#10B981` (Emerald 500) | Payment confirmed, active states |
| `warning` | `#F59E0B` (Amber 500)   | Pending, attention required      |
| `error`   | `#EF4444` (Red 500)     | Form errors, failed transactions |

---

## 3. Typography

We use a two-font system for maximum legibility and premium feel. Both are available via Google Fonts with `display=swap` for zero layout shift.

**Display / Headings: Plus Jakarta Sans**
_Why:_ Geometric, modern, and highly legible at large sizes. Feels premium and authoritative.
_Weights:_ 600 (Semibold), 700 (Bold), 800 (ExtraBold)
_Tracking:_ Tight (`tracking-tight` or `-0.02em`) for headings > 32px.

**Body / UI: Inter**
_Why:_ The gold standard for UI legibility. Neutral, highly readable at small sizes.
_Weights:_ 400 (Regular), 500 (Medium), 600 (Semibold)
_Tracking:_ Normal or slight wide (`tracking-wide`) for uppercase labels.

**Mono / Code: Geist Mono or JetBrains Mono**
_Why:_ For config blocks, API keys, and technical snippets.

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
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

Strict adherence to a 4px base grid. No arbitrary values (e.g., `mt-[13px]`) are allowed in core components.

- **Micro:** 4px (0.25rem), 8px (0.5rem)
- **Base:** 16px (1rem), 24px (1.5rem)
- **Section:** 64px (4rem), 96px (6rem), 128px (8rem)

**Max Widths:**

- `max-w-prose` (65ch) for readable text blocks.
- `max-w-7xl` (1280px) for main container widths.

---

## 5. Elevation & Effects

We avoid heavy, blurry drop shadows. Modern elevation is achieved through subtle borders + backdrop blur + ambient glow.

### 5.1 Glassmorphism (The Ark Card)

```css
.ark-card {
  background: rgba(24, 24, 27, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.ark-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
}
```

### 5.2 Ambient Glow (For Hero/CTA elements)

```css
.ark-glow {
  position: relative;
}
.ark-glow::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
  filter: blur(24px);
  opacity: 0.35;
  z-index: -1;
}
.ark-glow--amber::before {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}
```

---

## 6. Animations & Micro-interactions

**Rule:** If it can be done with CSS transition or `@keyframes`, do not use JavaScript. This keeps Lighthouse scores at 100.

### 6.1 The "Ark Ease" Curve

A custom cubic-bezier that feels premium, snappy, and natural (inspired by Apple/Linear).

```css
:root {
  --ease-ark: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 6.2 Standard Durations

- `duration-150`: Micro-interactions (button hover, icon scale)
- `duration-300`: Standard state changes (modal open, card hover)
- `duration-500`: Layout shifts, page load fades

### 6.3 Signature Animations

```css
@keyframes ark-fade-up {
  from {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes ark-scale-in {
  from {
    opacity: 0;
    transform: scale3d(0.96, 0.96, 1);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
@keyframes ark-shimmer {
  from {
    background-position: -200% 0;
  }
  to {
    background-position: 200% 0;
  }
}
.ark-animate-fade-up {
  animation: ark-fade-up 500ms var(--ease-ark) both;
}
.ark-animate-scale-in {
  animation: ark-scale-in 300ms var(--ease-ark) both;
}
```

---

## 7. Component Anatomy (Examples)

### 7.1 The Ark Button

```html
<button class="ark-btn group">
  <span class="ark-btn__label">Get Started</span>
  <span class="ark-btn__glow"></span>
</button>

<style>
  .ark-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-family: var(--font-body);
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
    transition:
      transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ark-btn:hover {
    transform: translate3d(0, -2px, 0);
  }
  .ark-btn:active {
    transform: translate3d(0, 0, 0) scale(0.98);
  }
  .ark-btn__glow {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 0 24px rgba(6, 182, 212, 0.35);
    opacity: 0;
    transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ark-btn:hover .ark-btn__glow {
    opacity: 1;
  }
</style>
```

### 7.2 The Ark Input

```html
<label class="ark-field">
  <span class="ark-field__label">Email address</span>
  <input class="ark-field__input" type="email" placeholder="you@company.com" />
  <span class="ark-field__error">Enter a valid email address.</span>
</label>
```

---

## 8. Theming Strategy (The "Ark Engine")

To support mass production, components never hardcode colors like `bg-blue-500`. Instead, they use semantic tokens that map to the active theme in `tailwind.config.js`.

**Example Workflow:**

1. Client wants a "Fire" theme.
2. In `config.ts`, we set `theme: 'fire'`.
3. The Tailwind config reads this and maps `--color-ark-accent` to `#FF6B1A`.
4. All buttons, borders, and glows automatically update without changing a single line of component code.

```js
// tailwind.config.js
const { theme } = require('./config');

const ARK_THEMES = {
  neon: {
    accentFrom: '#6366F1',
    accentTo: '#06B6D4',
  },
  amber: {
    accentFrom: '#F59E0B',
    accentTo: '#D97706',
  },
  fire: {
    accentFrom: '#FF6B1A',
    accentTo: '#D97706',
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ark: {
          void: '#000000',
          base: '#09090B',
          surface: '#18181B',
          'surface-hover': '#27272A',
          accent: ARK_THEMES[theme].accentFrom,
          'accent-to': ARK_THEMES[theme].accentTo,
        },
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
        strong: 'rgba(255,255,255,0.15)',
      },
    },
  },
  plugins: [],
};
```

---

## 9. Sprint Checklist for Developers

Before merging any new component or page into the Ark repo, verify:

- [ ] No arbitrary Tailwind values (e.g., `w-[347px]`). Use the spacing scale.
- [ ] Animations are CSS-native (no `framer-motion` unless absolutely necessary for complex sequences).
- [ ] Contrast ratio is ≥ 4.5:1 for all body text.
- [ ] Dark mode is default, light mode is supported via the theming engine.
- [ ] Lighthouse score remains 95+ on Performance and Accessibility.
