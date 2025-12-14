const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const mediaDir = path.join(__dirname, '../public/media');
const outputDir = path.join(__dirname, '../public/media/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(mediaDir);

  for (const file of files) {
    const filePath = path.join(mediaDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && /\.(jpe?g|png)$/i.test(file)) {
      const baseName = path.parse(file).name;
      const outputPath = path.join(outputDir, `${baseName}.webp`);

      try {
        await sharp(filePath)
          .resize(1200, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: 80 })
          .toFile(outputPath);

        const originalSize = stat.size;
        const newSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        console.log(`✅ ${file} → ${baseName}.webp (${savings}% smaller)`);
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
      }
    }
  }

  console.log('\n✨ Image optimization complete!');
}

optimizeImages();
