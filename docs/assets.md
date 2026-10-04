# Portfolio Assets

Screenshots for case-study cards live in **`public/assets/portfolio/`**.

## Why this file is not in `public/`

Everything under `public/` is copied verbatim into `dist/` and served from the
public web root. A note file placed there would be reachable at
`https://ark.systems/assets/portfolio/README.md`. Keep internal notes here in
`docs/` instead.

## Adding a case study

1. Drop the optimized screenshot into `public/assets/portfolio/`:

   ```text
   public/assets/portfolio/case-study-01.png
   ```

2. Keep it **under ~200 KB**. Target 1200×900 (4:3) to match the existing
   `aspect-[4/3]` crop in `PortfolioGrid.astro`.

3. Register it in `src/data/config.ts`:

   ```typescript
   export const config = {
     portfolio: [
       {
         name: 'Acme Storefront',
         url: 'https://acme.ark.systems',
         image: '/assets/portfolio/case-study-01.png',
         blurb: 'Edge-hosted storefront with instant global delivery.',
         tags: ['Storefront'],
       },
     ],
   };
   ```

## Current assets

| File           | Used by                     |   Size |
| :------------- | :-------------------------- | -----: |
| `labianca.jpg` | `config.portfolio[0].image` | ~40 KB |
