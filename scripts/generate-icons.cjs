const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_PATH = path.join(__dirname, '../public/tec-icon.svg');
const ICONS_DIR = path.join(__dirname, '../src-tauri/icons');

const sizes = [
  { name: '32x32.png', size: 32 },
  { name: '128x128.png', size: 128 },
  { name: '128x128@2x.png', size: 256 },
  { name: 'icon.png', size: 512 },
  { name: 'Square30x30Logo.png', size: 30 },
  { name: 'Square44x44Logo.png', size: 44 },
  { name: 'Square71x71Logo.png', size: 71 },
  { name: 'Square89x89Logo.png', size: 89 },
  { name: 'Square107x107Logo.png', size: 107 },
  { name: 'Square142x142Logo.png', size: 142 },
  { name: 'Square150x150Logo.png', size: 150 },
  { name: 'Square284x284Logo.png', size: 284 },
  { name: 'Square310x310Logo.png', size: 310 },
  { name: 'StoreLogo.png', size: 50 },
];

async function generateIcons() {
  console.log('Generating Tec icons from SVG...');

  const svgBuffer = fs.readFileSync(SVG_PATH);

  for (const { name, size } of sizes) {
    const outputPath = path.join(ICONS_DIR, name);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`  ✓ ${name} (${size}x${size})`);
  }

  // Generate ICO for Windows
  const icoPath = path.join(ICONS_DIR, 'icon.ico');
  await sharp(svgBuffer)
    .resize(256, 256)
    .toFile(icoPath);
  console.log(`  ✓ icon.ico (256x256)`);

  // Generate ICNS for macOS (using PNG as base)
  const icnsPath = path.join(ICONS_DIR, 'icon.icns');
  await sharp(svgBuffer)
    .resize(512, 512)
    .toFile(icnsPath);
  console.log(`  ✓ icon.icns (512x512)`);

  console.log('\nAll icons generated successfully!');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
