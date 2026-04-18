const fs = require('fs');
const path = require('path');

// Usage: node scripts/importRestaurantImages.js <source_folder>
// Copies files named like 1005.jpg or 1005.png from source_folder into public/images/restaurants/

const src = process.argv[2];
if (!src) {
  console.error('Usage: node scripts/importRestaurantImages.js <source_folder>');
  process.exit(1);
}

const absSrc = path.resolve(process.cwd(), src);
const destDir = path.resolve(process.cwd(), 'public', 'images', 'restaurants');

if (!fs.existsSync(absSrc)) {
  console.error('Source folder does not exist:', absSrc);
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(absSrc);
let copied = 0;
files.forEach(file => {
  const match = file.match(/^(\d{3,4})\.(jpg|jpeg|png|svg)$/i);
  if (match) {
    const id = match[1];
    const srcPath = path.join(absSrc, file);
    const ext = path.extname(file).toLowerCase();
    const destPath = path.join(destDir, `${id}${ext}`);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} -> ${destPath}`);
    copied++;
  }
});

console.log(`Finished. ${copied} files copied.`);
