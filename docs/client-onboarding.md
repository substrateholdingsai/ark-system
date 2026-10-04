# Client Onboarding Runbook

Guía rápida para preparar una copia de Ark System para una nueva marca. La mayoría del contenido y los enlaces se cambian en `src/data/config.ts`; los colores se definen en `src/styles/global.css`. No edites componentes para cambiar contenido de marca salvo que el diseño requiera una estructura nueva.

El enfoque es *config-driven*: empieza por la configuración y los tokens CSS y modifica componentes solo cuando el cliente necesite una estructura o un recurso de marca que el template no admita.

> **Estado actual del template:** la paleta global es oscura y los acentos de tema `neon` y `amber` están definidos. El layout principal todavía no establece `data-theme`, así que para aplicar otra paleta a todo el sitio cambia los tokens de `:root`. La página `/brand` permite comparar `neon` y `amber` en una misma vista, pero no se incluye en la navegación.
>
> **Build conocido:** según el estado registrado en [map.md](./map.md), `npm run build` actualmente falla durante el procesamiento CSS por una utilidad Tailwind no soportada en `src/styles/global.css`. Confirma si el bloqueo sigue presente; no atribuyas ese fallo a los cambios de marca sin aislarlo primero.

## Prerrequisitos

- Acceso al repositorio template y permiso para crear/configurar el repo del cliente.
- Node.js 20 (el `.nvmrc` y `package.json` requieren Node 20 o posterior).
- pnpm o npm, incluido con Node.js.
- Material del cliente: nombre, textos, URL definitiva, email, enlaces de reserva/venta, logo, favicon, imagen Open Graph y capturas del portafolio.
- Valores de marca aprobados: color de acento, variante hover, tipografías y contraste legible.

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

Edita `src/data/config.ts`. Ese archivo contiene:

- `brand`: nombre y tagline.
- `site`: URL canónica, locale, descripción y ruta de la imagen OG.
- `contact`: email y enlace de Cal.com.
- `nav`: etiquetas y rutas de navegación previstas.
- `hero`: propuesta de valor, CTA y estadísticas.
- `pricing`: tiers, precios, características y enlaces CTA.
- `portfolio`: nombre, URL, imagen, descripción y etiquetas de cada caso.
- `techStack`: tecnologías mostradas en la página.

Reemplaza todos los enlaces de ejemplo, incluido `https://cal.com/your-ark-team/...`, antes de publicar. Revisa también cada CTA para confirmar si debe llevar a una ruta interna, Cal.com, un checkout u otro destino. Los precios y estadísticas son contenido editorial: verifica cada valor con el cliente.

**Límites actuales a tener en cuenta:** `Header.astro` define su propia lista de navegación, no consume `config.nav`; actualiza esa lista si cambian los enlaces visibles. Algunos títulos de página también contienen el nombre Ark directamente (por ejemplo, el título de `contact.astro`), así que busca y actualiza el branding hardcodeado antes del release.

## 3. Actualizar la configuración global y SEO

Cuando se confirme el dominio del cliente, actualiza la URL canónica en `src/data/config.ts` y la propiedad `site` de `astro.config.mjs` para que coincidan:

```js
export default defineConfig({
  site: 'https://cliente.com',
  // ...
});
```

En `config.ts`, revisa también `brand.name`, `site.description`, `site.locale` y `site.ogImage`. `src/components/layout/Seo.astro` usa estos valores para generar los metadatos title, description, canonical, Open Graph y Twitter; las páginas pueden sobrescribir el título y la descripción mediante las propiedades de `BaseLayout`.

Actualiza las URLs de `public/sitemap.xml`, que se mantiene manualmente, y comprueba que `public/robots.txt` apunte al sitemap del dominio del cliente. Verifica canonical, metadatos OG/Twitter, sitemap y robots en el build antes de publicar.

## 4. Aplicar identidad visual

### Colores

El sistema de diseño usa variables CSS semánticas definidas en `src/styles/global.css`. Mapea a ellas la paleta aprobada del cliente; no hace falta reescribir componentes para cambiar los colores que ya consumen estos tokens.

Para cambiar el tema de todo el sitio, actualiza los valores de `:root`, ya que `BaseLayout.astro` no establece actualmente un atributo `data-theme` global. Los colores consumidos por Tailwind deben ser tuplas RGB **sin** `rgb()`, `#` ni comas para que funcionen los modificadores de opacidad como `bg-ark-accent/30`:

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

Si necesitas definir una variante de tema para una sección, añade un selector `[data-theme='nombre-cliente']` en `global.css` y asigna allí los tokens que quieras cambiar:

```css
[data-theme='cliente'] {
  --color-ark-accent: 16 185 129;
  --color-ark-accent-hover: 5 150 105;
  --color-ark-accent-glow: 16 185 129;
}
```

El selector solo afecta a los elementos descendientes del elemento que lleva `data-theme`; para aplicarlo a todo el sitio, configura `:root` o añade el atributo al layout. Actualmente los tokens de texto y borde no están centralizados como variables: los componentes usan clases Tailwind como `text-white`, `text-zinc-400` y `border-white/...`. Si la marca requiere cambiar esos colores de forma global, revisa esos usos además de los tokens existentes.

Valida el contraste WCAG de texto y controles sobre sus fondos, incluidos los estados hover y focus; comprueba también placeholders y texto secundario. La variante `[data-theme='amber']` ya existe, y `src/pages/brand.astro` sirve como muestra de temas aplicados localmente.

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
- **Logo:** el asset existente es `public/assets/ark-logo.svg`. `Header.astro` actualmente muestra un rombo y el nombre de marca, pero no consume el SVG; para mostrar el logo en el header también hay que actualizar ese componente. Prepara variantes claras u oscuras si el diseño las necesita.
- **Imagen Open Graph:** reemplaza `public/assets/og-default.png` y conserva la ruta, o actualiza `site.ogImage` en `src/data/config.ts`. Usa una imagen de 1200 × 630 px para compartir en redes sociales.
- **Icono de Apple:** añade `public/apple-touch-icon.png` y enlázalo desde el `<head>` de `src/layouts/BaseLayout.astro` con `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`; actualmente el layout no declara este icono.
- **Imágenes de portafolio:** añade capturas optimizadas a `public/assets/portfolio/` y registra cada ruta en `config.portfolio`. Consulta [assets.md](./assets.md) para las dimensiones y el peso recomendado.

Los archivos de `public/` se copian tal cual al build y quedan disponibles públicamente; no coloques allí documentos internos.

## 7. Revisar contacto y formulario

La página de contacto depende de los destinos y datos de `config.ts`. Antes de lanzamiento:

- Confirma que el email y el enlace de Cal.com sean reales.
- Revisa `src/pages/contact.astro` y sustituye cualquier endpoint de formulario placeholder por uno configurado para el cliente.
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
