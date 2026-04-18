const fs = require('fs');
const path = require('path');

const mockDataPath = path.resolve(process.cwd(), 'src', 'data', 'mockData.js');
const imagesDir = path.resolve(process.cwd(), 'public', 'images');
const destDir = path.resolve(imagesDir, 'restaurants');

if (!fs.existsSync(mockDataPath)) {
  console.error('Cannot find mockData.js at', mockDataPath);
  process.exit(1);
}

const data = fs.readFileSync(mockDataPath, 'utf8');

// Extract id and name pairs using regex
const regex = /id:\s*['"](\d{1,5})['"],\s*\n\s*name:\s*['"]([^'\"]+)['"]/g;
let match;
const restaurants = [];
while ((match = regex.exec(data)) !== null) {
  restaurants.push({ id: match[1], name: match[2] });
}

if (restaurants.length === 0) {
  console.error('No restaurants parsed from mockData.js');
  process.exit(1);
}

if (!fs.existsSync(imagesDir)) {
  console.error('Images directory does not exist:', imagesDir);
  process.exit(1);
}

const allFiles = fs.readdirSync(imagesDir).filter(f => f !== 'restaurants');
const imageFiles = allFiles.filter(f => fs.statSync(path.join(imagesDir, f)).isFile());

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

// Preprocess filenames
const files = imageFiles.map(f => ({
  file: f,
  name: path.parse(f).name.toLowerCase()
}));

// scoring: for each restaurant, count token matches in filename
function tokens(s) {
  return s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

const assignments = {};
const usedFiles = new Set();

restaurants.forEach(r => {
  const rTokens = tokens(r.name);
  let best = null;
  let bestScore = 0;
  files.forEach(f => {
    if (usedFiles.has(f.file)) return;
    let score = 0;
    rTokens.forEach(t => { if (t && f.name.includes(t)) score++; });
    // also give bonus if first word matches
    if (r.name.split(' ')[0].toLowerCase() === f.name) score += 1;
    if (score > bestScore) {
      bestScore = score;
      best = f;
    }
  });

  if (best && bestScore > 0) {
    assignments[r.id] = { restaurant: r.name, file: best.file, score: bestScore };
    usedFiles.add(best.file);
    // copy
    const ext = path.extname(best.file).toLowerCase();
    const src = path.join(imagesDir, best.file);
    const dest = path.join(destDir, `${r.id}${ext}`);
    fs.copyFileSync(src, dest);
  } else {
    assignments[r.id] = { restaurant: r.name, file: null, score: 0 };
  }
});

console.log('Auto-mapping results:');
Object.keys(assignments).forEach(id => {
  const a = assignments[id];
  if (a.file) console.log(`${id}: ${a.restaurant} => ${a.file} (score ${a.score})`);
  else console.log(`${id}: ${a.restaurant} => (no matching image)`);
});

console.log('Done. Images copied to', destDir);
