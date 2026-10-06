// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

/** @param {string} path */
const src = (path) => fileURLToPath(new URL(path, import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://ark.systems',
  // Server output for Cloudflare Workers deployment
  output: 'server',
  build: {
    format: 'file',
  },
  // Cloudflare adapter (Pages mode generates _worker.js with output: 'server')
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  // Tailwind integration
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We handle this in global.css
    }),
  ],
  // Image optimization
  image: {
    // Every image ships from /public/assets, so no remote hosts are allowed.
    // To permit one later, add { protocol: 'https', hostname: '**.example.com' } —
    // wildcards are only valid at the *beginning* of a hostname.
    remotePatterns: [],
  },
  // Markdown/MDX configuration
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  // Vite configuration
  vite: {
    // Must mirror tsconfig.json "paths" — TypeScript resolves those aliases but
    // Vite does not, so without this any `@/utils/...` import passes `astro check`
    // and then fails the production build with "Cannot resolve".
    resolve: {
      alias: {
        '@': src('./src'),
        '@components': src('./src/components'),
        '@layouts': src('./src/layouts'),
        '@data': src('./src/data'),
        '@utils': src('./src/utils'),
      },
    },
    build: {
      // Optimize bundle size
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
