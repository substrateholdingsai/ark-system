// Ark Systems — generador de favicon raster.
//
// Convierte public/assets/vector/favicon.svg (la fuente de verdad, generada por
// scripts/generate-assets.py) en los rasters que necesitan navegadores viejos y
// iOS, que no aceptan SVG:
//   - public/favicon.ico                    16 + 32 px (icono de pestaña legacy)
//   - public/assets/vector/apple-touch-icon.png   180x180 (home screen de iOS)
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

/** Construye un .ico válido a partir de PNGs (formato ICONDIR + ICONDIRENTRY). */
function buildIco(images) {
  const dirSize = 6 + 16 * images.length;
  let offset = dirSize;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(images.length, 4); // cantidad de imágenes

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

async function renderPng(size) {
  return sharp(svg, { density: Math.ceil((96 * 64) / 64) })
    .resize(size, size, { fit: 'contain' })
    .png()
    .toBuffer();
}

const sizes = [16, 32];
const images = [];

for (const size of sizes) {
  const png = await renderPng(size);
  images.push({ size, png });
  console.log(`[OK] PNG ${size}x${size} renderizado`);
}

const appleTouch = await sharp(svg, { density: Math.ceil((96 * 64) / 64) })
  .resize(APPLE_TOUCH_SIZE, APPLE_TOUCH_SIZE, { fit: 'contain' })
  .flatten({ background: '#1E3A8A' }) // iOS rechaza PNG con alfa en apple-touch-icon.
  .png()
  .toFile(join(root, 'public', 'assets', 'vector', 'apple-touch-icon.png'));
console.log(`[OK] apple-touch-icon.png ${appleTouch.width}x${appleTouch.height}`);

const icoPath = join(root, 'public', 'favicon.ico');
writeFileSync(icoPath, buildIco(images));
console.log(`[OK] favicon.ico con ${images.length} imágenes`);
