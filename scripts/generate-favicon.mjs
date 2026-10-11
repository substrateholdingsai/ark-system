// Ark Systems — generador de favicon y logo raster.
//
// Convierte public/assets/vector/favicon.svg (la fuente de verdad, generada por
// scripts/generate-assets.py) en los rasters que necesitan navegadores viejos,
// iOS y los consumidores de structured data, que no aceptan SVG:
//   - public/favicon.ico                        16 + 32 px (pestaña legacy)
//   - public/assets/vector/apple-touch-icon.png 180x180 opaco (home screen iOS)
//   - public/assets/vector/logo-512.png         512x512 con alfa (JSON-LD)
//
// Uso: npm run favicon

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = join(root, 'public', 'assets', 'vector', 'favicon.svg');
const svg = readFileSync(svgPath);

const APPLE_TOUCH_SIZE = 180;
const LOGO_SIZE = 512;

// El SVG declara width/height de 64 px. sharp lo rasteriza a 96 dpi por defecto,
// así que le pasamos una densidad que produzca un lienzo del tamaño del destino
// más grande (512 px) y dejamos que downscalée: escalar hacia abajo siempre sale
// nítido, mientras que subir desde un lienzo chico se vería borroso.
const DENSITY = 96 * (LOGO_SIZE / 64);

const render = (size) => sharp(svg, { density: DENSITY }).resize(size, size, { fit: 'contain' });

/** Construye un .ico válido a partir de PNGs (formato ICONDIR + ICONDIRENTRY). */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(images.length, 4); // cantidad de imágenes

  let offset = 6 + 16 * images.length;
  const entries = [];
  for (const image of images) {
    const entry = Buffer.alloc(16);
    // 0 significa 256 px en el formato ICO.
    entry.writeUInt8(image.size === 256 ? 0 : image.size, 0); // ancho
    entry.writeUInt8(image.size === 256 ? 0 : image.size, 1); // alto
    entry.writeUInt8(0, 2); // paleta: 0 = true color
    entry.writeUInt8(0, 3); // reservado
    entry.writeUInt16LE(1, 4); // planos de color
    entry.writeUInt16LE(32, 6); // bits por píxel
    entry.writeUInt32LE(image.png.length, 8); // bytes de la imagen
    entry.writeUInt32LE(offset, 12); // offset dentro del archivo
    offset += image.png.length;
    entries.push(entry);
  }

  return Buffer.concat([header, ...entries, ...images.map((image) => image.png)]);
}

// ── 1. Imágenes que viajan dentro del .ico ───────────────────────────────────
const icoImages = [];
for (const size of [16, 32]) {
  icoImages.push({ size, png: await render(size).png().toBuffer() });
  console.log(`[OK] PNG ${size}x${size} renderizado`);
}

// ── 2. apple-touch-icon: iOS rechaza PNG con alfa, por eso se aplana ────────
await render(APPLE_TOUCH_SIZE)
  .flatten({ background: '#1E3A8A' })
  .png()
  .toFile(join(root, 'public', 'assets', 'vector', 'apple-touch-icon.png'));
console.log(`[OK] apple-touch-icon.png ${APPLE_TOUCH_SIZE}x${APPLE_TOUCH_SIZE} (opaco)`);

// ── 3. Logo para structured data: cuadrado, con alfa en las esquinas ────────
await render(LOGO_SIZE)
  .png()
  .toFile(join(root, 'public', 'assets', 'vector', 'logo-512.png'));
console.log(`[OK] logo-512.png ${LOGO_SIZE}x${LOGO_SIZE} (con alfa)`);

// ── 4. .ico válido ensamblado ───────────────────────────────────────────────
writeFileSync(join(root, 'public', 'favicon.ico'), buildIco(icoImages));
console.log(`[OK] favicon.ico con ${icoImages.length} imágenes`);
