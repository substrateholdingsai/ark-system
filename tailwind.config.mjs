/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        void: 'hsl(var(--void) / <alpha-value>)',
        base: 'hsl(var(--base) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        'surface-hover': 'hsl(var(--surface-hover) / <alpha-value>)',
        border: 'hsl(var(--border))',
        ark: {
          accent: 'hsl(var(--ark-accent) / <alpha-value>)',
          'accent-hover': 'hsl(var(--ark-accent-hover) / <alpha-value>)',
          'accent-glow': 'hsl(var(--ark-accent) / <alpha-value>)',
          contrast: 'hsl(var(--ark-accent-contrast) / <alpha-value>)',
        },

        success: 'hsl(var(--success) / <alpha-value>)',
        warning: 'hsl(var(--warning) / <alpha-value>)',
        error: 'hsl(var(--error) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
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
        'ark-glow': '0 0 40px -10px hsl(var(--ark-accent) / 0.55)',
      },
      maxWidth: {
        'ark-container': '1280px', // 7xl
        'ark-prose': '65ch',
      },
    },
  },
  plugins: [],
};
