/**
 * Generate favicon and apple-touch-icon from SVG symbol mark
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SVG_PATH = path.join(PUBLIC_DIR, 'logos', 'hola-credit-favicon.svg');

async function generate() {
  const svgBuffer = fs.readFileSync(SVG_PATH);

  const sizes = [16, 32, 48, 180];

  for (const size of sizes) {
    const outPath = path.join(PUBLIC_DIR, size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`);
    await sharp(svgBuffer, { density: 300 })
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`Generated: ${path.basename(outPath)} (${size}x${size})`);
  }

  // Generate favicon.ico from the 32x32 PNG
  const icoPath = path.join(PUBLIC_DIR, 'favicon.ico');
  const png32 = await sharp(svgBuffer, { density: 300 })
    .resize(32, 32)
    .png()
    .toBuffer();

  // Create ICO file with PNG data
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);   // Reserved
  header.writeUInt16LE(1, 2);   // Type: 1 = ICO
  header.writeUInt16LE(1, 4);   // Number of images: 1

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);      // Width
  entry.writeUInt8(32, 1);      // Height
  entry.writeUInt8(0, 2);       // Color palette
  entry.writeUInt8(0, 3);       // Reserved
  entry.writeUInt16LE(1, 4);    // Color planes
  entry.writeUInt16LE(32, 6);   // Bits per pixel
  entry.writeUInt32LE(png32.length, 8);  // Size of image data
  entry.writeUInt32LE(22, 12);  // Offset to image data (6 + 16 = 22)

  const ico = Buffer.concat([header, entry, png32]);
  fs.writeFileSync(icoPath, ico);
  console.log('Generated: favicon.ico');

  // Verify
  for (const f of ['favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png', 'apple-touch-icon.png', 'favicon.ico']) {
    const p = path.join(PUBLIC_DIR, f);
    if (fs.existsSync(p)) {
      const stat = fs.statSync(p);
      console.log(`  ✓ ${f} (${stat.size} bytes)`);
    } else {
      console.log(`  ✗ ${f} (missing)`);
    }
  }
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
