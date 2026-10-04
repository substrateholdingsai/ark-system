/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // The Void (Neutrals)
        void: 'rgb(var(--color-ark-void) / <alpha-value>)',
        base: 'rgb(var(--color-ark-base) / <alpha-value>)',
        surface: 'rgb(var(--color-ark-surface) / <alpha-value>)',
        'surface-hover': 'rgb(var(--color-ark-surface-hover) / <alpha-value>)',

        // Dynamic Accents (The "Ark Pulse")
        // Use CSS variables in a format that supports Tailwind opacity modifiers
        // like bg-ark-accent/30, bg-ark-accent/50, etc.
        ark: {
          accent: 'rgb(var(--color-ark-accent) / <alpha-value>)',
          'accent-hover': 'rgb(var(--color-ark-accent-hover) / <alpha-value>)',
          'accent-glow': 'rgb(var(--color-ark-accent-glow) / <alpha-value>)',
        },

        // Semantic
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        ark: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'ark-fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ark-pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.95)' },
        },
      },
      animation: {
        'fade-up': 'ark-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-soft': 'ark-pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'ark-card': '0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'ark-glow': '0 0 40px -10px var(--color-ark-accent-glow)',
      },
      maxWidth: {
        'ark-container': '1280px', // 7xl
        'ark-prose': '65ch',
      },
    },
  },
  plugins: [],
};
