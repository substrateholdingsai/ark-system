/**
 * Prettier — Ark System
 *
 * Run `npm run format` to rewrite, `npm run format:check` to verify.
 * ESLint runs afterwards (eslint-config-prettier disables every rule Prettier
 * already owns), so lint never argues about formatting.
 *
 * @type {import('prettier').Config}
 */
export default {
  plugins: ['prettier-plugin-astro'],
  printWidth: 100,
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
};
