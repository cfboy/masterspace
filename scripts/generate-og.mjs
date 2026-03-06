// Script to generate a custom OG image by compositing the logo over a textured background with a dark overlay for contrast.
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const OG_W = 1200;
const OG_H = 630;

// Logo dimensions on the OG image (centered, with padding)
const LOGO_W = 600;
const LOGO_H = Math.round(600 * (2632.848 / 4096)); // preserve viewBox ratio → ~386px
const LOGO_X = Math.round((OG_W - LOGO_W) / 2);
const LOGO_Y = Math.round((OG_H - LOGO_H) / 2);

// 1. Read SVG and make it white
let svgStr = readFileSync(resolve(root, 'src/assets/logo.svg'), 'utf-8');
// Force fill to white (brand color on dark bg)
svgStr = svgStr.replace(/fill="currentColor"/g, 'fill="#FFFFFF"');
// Also set a fixed width/height so sharp rasterises at the right size
svgStr = svgStr.replace(/width="100%"\s+height="100%"/, `width="${LOGO_W}" height="${LOGO_H}"`);

const logoBuffer = await sharp(Buffer.from(svgStr)).resize(LOGO_W, LOGO_H).png().toBuffer();

// 2. Dark overlay (semi-transparent black over texture for contrast)
const darkOverlay = await sharp({
  create: {
    width: OG_W,
    height: OG_H,
    channels: 4,
    background: { r: 20, g: 18, b: 18, alpha: 0.62 },
  },
})
  .png()
  .toBuffer();

// 3. Gold bottom bar (brand accent)
const BAR_H = 6;
const goldBar = await sharp({
  create: {
    width: OG_W,
    height: BAR_H,
    channels: 4,
    background: { r: 201, g: 169, b: 110, alpha: 1 },
  },
})
  .png()
  .toBuffer();

// 4. Composite: texture → dark overlay → logo → gold bar
await sharp(resolve(root, 'src/assets/top-view-dark-background-texture.jpg'))
  .resize(OG_W, OG_H, { fit: 'cover', position: 'centre' })
  .composite([
    { input: darkOverlay, blend: 'over', left: 0, top: 0 },
    { input: logoBuffer, blend: 'over', left: LOGO_X, top: LOGO_Y },
    { input: goldBar, blend: 'over', left: 0, top: OG_H - BAR_H },
  ])
  .jpeg({ quality: 92 })
  .toFile(resolve(root, 'public/og-image-custom.jpg'));

console.log(`Generated public/og-image-custom.jpg (${OG_W}x${OG_H})`);

// For running this script: `node scripts/generate-og.mjs`
