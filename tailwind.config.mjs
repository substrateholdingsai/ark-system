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
        'border-strong': 'hsl(var(--border-strong))',
        text: {
          primary: 'hsl(var(--text-primary) / <alpha-value>)',
          muted: 'hsl(var(--text-muted) / <alpha-value>)',
        },
        ark: {
          accent: 'hsl(var(--ark-accent) / <alpha-value>)',
          'accent-hover': 'hsl(var(--ark-accent-hover) / <alpha-value>)',
          'accent-to': 'hsl(var(--ark-accent-to) / <alpha-value>)',
          contrast: 'hsl(var(--ark-accent-contrast) / <alpha-value>)',
        },
        success: 'hsl(var(--success) / <alpha-value>)',
        warning: 'hsl(var(--warning) / <alpha-value>)',
        error: 'hsl(var(--error) / <alpha-value>)',
        info: 'hsl(var(--info) / <alpha-value>)',
        eterea: {
          bg: '#F8FBFF',
          bg2: '#EAF2FF',
          bg3: '#DDE8FF',
          surface: '#FFFFFF',
          soft: '#F5F8FF',
          text: '#0A0A0A',
          slate: '#334155',
          muted: '#5B667A',
          muted2: '#6B7280',
          subtle: '#94A3B8',
          border: '#E6EEFF',
          'border-strong': '#D5E2FF',
          blue: '#2563EB',
          'blue-light': '#60A5FA',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        instrument: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      transitionTimingFunction: {
        ark: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
        floatA: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) translateZ(var(--tz, 0px))' },
          '50%': { transform: 'translate3d(0, -10px, 0) translateZ(var(--tz, 0px))' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'ark-fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-soft': 'ark-pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-a': 'floatA 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
      },
      boxShadow: {
        'ark-card': '0 0 0 1px rgba(255, 255, 255, 0.05), 0 12px 30px rgba(0, 0, 0, 0.12)',
        'ark-glow': '0 0 40px -10px hsl(var(--ark-accent) / 0.55)',
        'eterea-card': '0 1px 2px rgba(0, 0, 0, 0.03), 0 8px 24px rgba(232, 240, 255, 0.6)',
        'eterea-hover': '0 12px 40px rgba(37, 99, 235, 0.14)',
        'eterea-hero': '0 20px 80px rgba(37, 99, 235, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        'eterea-btn': '0 8px 24px rgba(37, 99, 235, 0.25)',
      },
      maxWidth: {
        'ark-container': '1280px',
        'ark-prose': '65ch',
      },
    },
  },
  plugins: [],
};
