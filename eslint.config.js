import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/**
 * ESLint flat config — Ark System
 *
 * Order matters:
 *   1. ignores
 *   2. base JS + TypeScript rules
 *   3. Astro rules (must follow the TS block to see .astro frontmatter)
 *   4. eslint-config-prettier LAST, so it can switch off every formatting rule
 *      that Prettier already owns (run `npm run format` for those, not lint)
 */
export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.lighthouseci/**',
      'node_modules/**',
      'public/**',
      'package-lock.json',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  prettier,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // TypeScript resolves undefined identifiers and unused bindings more
      // precisely than ESLint can, and these two produce false positives
      // inside .astro files.
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // The Ark Engine is config-driven; placeholder values are expected while
      // a client build is being wired up (see docs/map.md, K-3/K-4).
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Config files at the repo root run in Node, not the browser.
  {
    files: ['*.config.mjs', '*.config.js', '.prettierrc.mjs'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
];
