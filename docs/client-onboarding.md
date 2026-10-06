# Client Onboarding Runbook

Guía rápida para preparar una copia de Ark System para una nueva marca. La mayoría del contenido y los enlaces se cambian en `src/data/config.ts`; los colores se definen en `src/styles/global.css`. No edites componentes para cambiar contenido de marca salvo que el diseño requiera una estructura nueva.

El enfoque es _config-driven_: empieza por la configuración y los tokens CSS y modifica componentes solo cuando el cliente necesite una estructura o un recurso de marca que el template no admita.

> **Estado actual del template:** `BaseLayout.astro` aplica `config.theme.default` al documento. Están definidos los temas `fire`, `neon` y `amber`; `/brand` permite comparar `neon` y `amber`, y no se incluye en la navegación principal.
>
> **Verificación local:** `npm run verify` pasó el 2026-10-04 después de integrar el contrato tipado. El build muestra una advertencia de Cloudflare/Sharp que no lo bloquea; revisa [map.md](./map.md) para el estado anotado.

## Prerrequisitos

- Acceso al repositorio template y permiso para crear/configurar el repo del cliente.
- Node.js 20 (el `.nvmrc` y `package.json` requieren Node 20 o posterior).
- pnpm o npm, incluido con Node.js.
- Material del cliente: nombre, textos, URL definitiva, email, enlaces de reserva/venta, logo, favicon, imagen Open Graph y capturas del portafolio.
- Valores de marca aprobados: color de acento, variante hover, tipografías y contraste legible.

## Cómo iniciar un nuevo cliente

Cada cliente debe tener su propio repositorio. Usa Ark como template para crear una copia independiente:

1. Crea un repositorio nuevo desde `ark-system` con la opción **Use this template** de GitHub, o clona el repositorio si esa opción no está disponible.
2. Nombra el nuevo repositorio `cliente-nombre-web`.
3. Instala las dependencias desde la raíz del proyecto: `pnpm install`.
4. Edita la instancia `config` en `src/data/config.ts` con los datos y el contenido aprobados del cliente.
5. Reemplaza los assets del cliente: logo e imagen Open Graph en `public/assets/`, favicon en `public/favicon.ico` y capturas de portafolio en `public/assets/portfolio/`. Actualiza las rutas del config si cambian.
6. Si el cliente requiere colores fuera de los temas `neon`, `amber` y `fire`, añade su selector y tokens en `src/styles/global.css` y selecciona el tema en `config.theme.default`.
7. Crea o configura el proyecto de Cloudflare Pages vinculándolo al **nuevo repositorio**; define el comando de build y el directorio de salida de acuerdo con la configuración del proyecto.

Continúa con los pasos detallados de abajo para revisar copy, SEO, formulario, tema, assets y despliegue antes de publicar.

## 1. Crear la copia y preparar dependencias

Usa la función “Use this template” del proveedor Git cuando esté disponible, o clona el repo y configura el nuevo remoto:

```bash
git clone <repo-url> <nombre-del-cliente>
cd <nombre-del-cliente>
git checkout -b feat/client-<nombre>
pnpm install # o npm install
```

Antes de empezar, confirma que `node --version` muestre `v20` o posterior. Usa el gestor de paquetes habitual del proyecto para instalar las dependencias.

## 2. Actualizar contenido y enlaces

Edita la instancia `config` en `src/data/config.ts`; las interfaces del mismo archivo (`SiteConfig`, `BrandConfig`, `HeroSection`, `PricingSection` y tipos relacionados) definen el contrato reutilizable. Las secciones configurables incluyen:

- `brand`, `locale` y `theme`: identidad, dominio, assets y tema global.
- `nav`, `hero` y `finalCta`: navegación, propuesta principal, estadísticas y llamadas a la acción.
- `problems`, `how`, `stackSection`, `stack` y `useCases`: problema, proceso, tecnologías y casos de uso.
- `costs` y `pricing`: comparativa, planes, datos fiscales y métodos de pago.
- `portfolio`: proyectos y sus assets.
- `footer` y `contact`: textos del pie, email, reserva y endpoint del formulario.

Reemplaza todos los valores marcados como `PENDIENTE` y enlaces de ejemplo, incluido `https://cal.com/your-ark-team/...`, antes de publicar. Revisa cada CTA para confirmar si lleva a una ruta interna, una URL externa, un checkout u otro destino. Los precios, estadísticas, costos comparativos y afirmaciones fiscales son contenido editorial: valídalos con el cliente y, cuando aplique, con sus asesores.

`Header.astro`, `Hero.astro`, `PricingTable.astro`, `TechStack.astro`, `Footer.astro` y `ConfiguredContent.astro` consumen el contrato. Otras rutas secundarias todavía contienen algunos textos propios; revisa branding y copy hardcodeado antes del release. El formulario queda deshabilitado hasta que `contact.formEndpoint` tenga un destino.

## 3. Actualizar la configuración global y SEO

Cuando se confirme el dominio del cliente, actualiza `brand.domain` (solo hostname, sin protocolo) en `src/data/config.ts` y la propiedad `site` de `astro.config.mjs` para que coincidan:

```js
export default defineConfig({
  site: 'https://cliente.com',
  // ...
});
```

Revisa también `brand.name`, `brand.tagline`, `brand.ogImageSrc`, `locale` y el copy de `hero.subheadline`. `BaseLayout.astro` deriva el título y la descripción por defecto del contrato; `Seo.astro` usa el dominio, locale e imagen de marca para canonical, Open Graph y Twitter. Las páginas pueden sobrescribir el título y la descripción mediante las propiedades de `BaseLayout`.

Actualiza las URLs de `public/sitemap.xml`, que se mantiene manualmente, y comprueba que `public/robots.txt` apunte al sitemap del dominio del cliente. Verifica canonical, metadatos OG/Twitter, sitemap y robots en el build antes de publicar.

## 4. Aplicar identidad visual

### Colores

El sistema de diseño usa variables CSS semánticas definidas en `src/styles/global.css`. Mapea a ellas la paleta aprobada del cliente; no hace falta reescribir componentes para cambiar los colores que ya consumen estos tokens.

Para cambiar el tema de todo el sitio, define o ajusta el selector `[data-theme='nombre-cliente']` y cambia `config.theme.default` en `src/data/config.ts`. `BaseLayout.astro` aplica ese valor al `<html>`. Los colores consumidos por Tailwind deben ser tuplas RGB **sin** `rgb()`, `#` ni comas para que funcionen los modificadores de opacidad como `bg-ark-accent/30`:

```css
:root {
  --color-ark-void: 0 0 0;
  --color-ark-base: 15 23 42;
  --color-ark-surface: 30 41 59;
  --color-ark-surface-hover: 51 65 85;
  --color-ark-accent: 16 185 129;
  --color-ark-accent-hover: 5 150 105;
  --color-ark-accent-glow: 16 185 129;
}
```

El ejemplo asigna fondos slate y acento esmeralda; reemplaza los valores por los colores aprobados. Conserva los tres canales separados por espacios. No uses valores hexadecimales en estos tokens: `tailwind.config.mjs` los consume como `rgb(var(--color-ark-accent) / <alpha-value>)`.

El bloque `:root` establece los neutrales y el tema base. Los selectores `fire`, `amber` y `neon` pueden sobreescribir los acentos. Para crear una variante nueva, añade un selector `[data-theme='nombre-cliente']` en `global.css` y asigna allí los tokens que quieras cambiar:

```css
[data-theme='cliente'] {
  --color-ark-accent: 16 185 129;
  --color-ark-accent-hover: 5 150 105;
  --color-ark-accent-glow: 16 185 129;
}
```

El selector aplica sus tokens al elemento con `data-theme` y sus descendientes; en el layout actual, el atributo está en `<html>`, por lo que afecta a todo el sitio. Actualmente los tokens de texto y borde no están centralizados como variables: algunos componentes usan clases Tailwind como `text-white`, `text-zinc-400` y `border-white/...`. Si la marca requiere cambiar esos colores de forma global, revisa esos usos además de los tokens existentes.

Valida el contraste WCAG de texto y controles sobre sus fondos, incluidos los estados hover y focus; comprueba también placeholders y texto secundario. Las variantes `fire`, `amber` y `neon` están definidas; `src/pages/brand.astro` sirve como muestra de comparación de los temas `neon` y `amber`.

### Tipografía

Las familias actuales se cargan desde Google Fonts en `src/styles/global.css` y se asignan en `tailwind.config.mjs` como `font-display`, `font-body` y `font-mono`. Si el cliente necesita otras fuentes, actualiza el `@import` y los `fontFamily` correspondientes; confirma que se carguen los pesos usados por los componentes.

Si el cliente proporciona una fuente propia, guarda los archivos con licencia de uso en `public/fonts/`, declara sus formatos y pesos con `@font-face` en `src/styles/global.css` y actualiza las familias correspondientes en `tailwind.config.mjs`. El proyecto no define actualmente las variables `--ark-font-sans` ni `--ark-font-heading`; no las sustituyas salvo que también las declares y las conectes a la configuración tipográfica que usa el sitio.

## 5. Validación del tema

Inicia el servidor de desarrollo:

```bash
pnpm dev
```

Si usas npm, ejecuta `npm run dev`. Abre la URL local que indique Astro y revisa `/brand` para comparar los temas de muestra. Después recorre las páginas del cliente y comprueba que los colores de fondo, acento y estados interactivos se aplican de forma consistente. Busca posibles colores hardcodeados en componentes —por ejemplo, clases `text-zinc-*`, `bg-white` o valores hexadecimales— que puedan impedir que la nueva identidad se aplique; valida también contraste y foco de teclado. Detén el servidor con `Ctrl+C` al terminar.

## 6. Reemplazo de assets estáticos

Sustituye los assets genéricos en `public/` por los archivos aprobados y con licencia de uso del cliente. En este repositorio las rutas existentes difieren de algunos nombres convencionales:

- **Favicon:** reemplaza `public/favicon.ico`, que está enlazado desde `src/layouts/BaseLayout.astro`. Si prefieres `public/favicon.svg`, actualiza allí el `href` del elemento `rel="icon"` correspondiente.
- **Logo:** el asset existente es `public/assets/ark-logo.svg`, que el header carga desde `brand.logoSrc`. Actualiza ese valor si cambias la ruta. Prepara variantes claras u oscuras si el diseño las necesita.
- **Imagen Open Graph:** reemplaza `public/assets/og-default.png` y conserva la ruta, o actualiza `brand.ogImageSrc` en `src/data/config.ts`. Usa una imagen de 1200 × 630 px para compartir en redes sociales.
- **Icono de Apple:** añade `public/apple-touch-icon.png` y enlázalo desde el `<head>` de `src/layouts/BaseLayout.astro` con `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`; actualmente el layout no declara este icono.
- **Imágenes de portafolio:** añade capturas optimizadas a `public/assets/portfolio/` y registra cada ruta en `config.portfolio`. Consulta [assets.md](./assets.md) para las dimensiones y el peso recomendado.

Los archivos de `public/` se copian tal cual al build y quedan disponibles públicamente; no coloques allí documentos internos.

## 7. Revisar contacto y formulario

La página de contacto depende de los destinos y datos de `config.ts`. Antes de lanzamiento:

- Confirma que `contact.email` y `contact.bookingUrl` sean reales.
- Configura `contact.formEndpoint`; el botón de envío permanece deshabilitado mientras el valor esté vacío.
- Envía un formulario de prueba y confirma que llega al destino esperado; un build exitoso no valida el proveedor externo.
- No guardes secretos ni credenciales en el repositorio. Configúralos en el entorno de despliegue si la integración elegida los requiere.

## 8. Verificar la copia

Ejecuta:

```bash
npm run verify
```

El script ejecuta comprobación de formato, lint y `astro check`/build. Revisa además `/brand` para los acentos y prueba manualmente:

- `/`, `/portfolio`, `/pricing`, `/contact` y la página 404.
- Enlaces de navegación, botones, reserva y envío del formulario.
- Diseño móvil, foco de teclado y contraste con los colores nuevos.
- Canonical/OG, favicon, sitemap y robots en el build de producción.

La configuración Lighthouse está en `lighthouserc.json`; CI la ejecuta en su job Lighthouse. También se puede ejecutar localmente con `npm run lighthouse` después de instalar dependencias y tener Chrome disponible.

## 9. Desplegar

El workflow de `.github/workflows/ci.yml` valida formato, lint, build y Lighthouse. El comentario del workflow indica que el despliegue de producción lo realiza la integración Git de Cloudflare Pages al hacer push a `main`; configura el proyecto de Pages para ejecutar `npm run build` y publicar `dist/`.

Para una publicación manual, después de un build correcto:

```bash
npm run deploy
```

El script ejecuta `wrangler pages deploy dist`. Configura primero la autenticación y el proyecto de Pages adecuados para el nuevo cliente.

## Lista de salida

- [ ] Se reemplazó todo el contenido, precio, estadísticas y enlaces de ejemplo.
- [ ] El nombre, dominio, descripción, logo, favicon e imagen OG corresponden al cliente.
- [ ] Los tokens de color mantienen el formato RGB y pasan contraste/foco.
- [ ] El formulario y Cal.com se probaron con destinos reales.
- [ ] El build/`npm run verify` pasa y las cinco rutas se revisaron en escritorio y móvil.
- [ ] Sitemap, robots y configuración de Pages corresponden al dominio/proyecto nuevo.

Con los textos, enlaces, assets y colores ya aprobados, el cambio de marca suele ser una tarea corta. La integración del formulario, la creación de contenido y la configuración de dominio/despliegue pueden requerir trabajo adicional; no se consideran parte de una promesa garantizada de 15 minutos.
