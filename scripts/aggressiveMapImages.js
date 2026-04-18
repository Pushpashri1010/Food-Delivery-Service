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

// Parse restaurants with id, name, cuisine, tags
const restRegex = /\{\s*id:\s*['"](\d{1,5})['"],[\s\S]*?name:\s*['"]([^'\"]+)['"],[\s\S]*?cuisine:\s*['"]([^'\"]+)['"],[\s\S]*?tags:\s*\[([^\]]*)\]/g;
let match;
const restaurants = [];
while ((match = restRegex.exec(data)) !== null) {
  const id = match[1];
  const name = match[2];
  const cuisine = match[3];
  const tagsRaw = match[4];
  const tags = tagsRaw.split(',').map(t => t.replace(/['"\s]/g, '')).filter(Boolean);
  restaurants.push({ id, name, cuisine, tags });
}

if (!fs.existsSync(imagesDir)) {
  console.error('Images directory does not exist:', imagesDir);
  process.exit(1);
}

const allFiles = fs.readdirSync(imagesDir).filter(f => f !== 'restaurants');
const files = allFiles.filter(f => fs.statSync(path.join(imagesDir, f)).isFile());

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

// Build set of already assigned ids in destDir
const assigned = new Set(fs.readdirSync(destDir).map(f => path.parse(f).name));

// Helper tokens
const tokenize = s => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

const fileMeta = files.map(f => ({ file: f, name: path.parse(f).name.toLowerCase(), tokens: tokenize(path.parse(f).name) }));

const keywordBoost = ['biryani','parotta','parotta','chettinad','chicken','mutton','egg','grill','tandoori','pizza','burger','sushi','briyani','biryanihouse','biryani_house','biryani2'];

const results = [];

restaurants.forEach(r => {
  if (assigned.has(r.id)) {
    results.push({ id: r.id, name: r.name, assigned: true, file: null, reason: 'already has file' });
    return;
  }

  // Score candidate files
  let best = null;
  let bestScore = 0;

  const rTokens = tokenize(r.name).concat(tokenize(r.cuisine), ...(r.tags || []).map(t => tokenize(t)).flat());

  fileMeta.forEach(f => {
    // skip if file already copied to a restaurant (exists in destDir)
    const destPath = path.join(destDir, `${r.id}${path.extname(f.file)}`);
    // compute score
    let score = 0;
    // id exact match in filename
    if (f.name === r.id) score += 50;
    // name token matches
    rTokens.forEach(t => {
      if (t && f.name.includes(t)) score += 5;
    });
    // cuisine match
    if (f.name.includes(r.cuisine.toLowerCase())) score += 3;
    // tag match
    (r.tags || []).forEach(tag => { if (f.name.includes(tag.toLowerCase())) score += 2; });
    // keyword boost
    keywordBoost.forEach(k => { if (f.name.includes(k)) score += 2; });

    // reduce score for generic filenames like 'image' or 'photo'
    if (/^(image|photo|img|pic|food)$/.test(f.name)) score = Math.max(0, score - 5);

    if (score > bestScore) {
      bestScore = score;
      best = f;
    }
  });

  if (best && bestScore > 0) {
    // copy
    const ext = path.extname(best.file).toLowerCase();
    const src = path.join(imagesDir, best.file);
    const dest = path.join(destDir, `${r.id}${ext}`);
    try {
      fs.copyFileSync(src, dest);
      assigned.add(r.id);
      results.push({ id: r.id, name: r.name, assigned: true, file: best.file, score: bestScore });
    } catch (err) {
      results.push({ id: r.id, name: r.name, assigned: false, file: best.file, error: err.message });
    }
  } else {
    results.push({ id: r.id, name: r.name, assigned: false, file: null, score: bestScore });
  }
});

console.log('Aggressive mapping results:');
results.forEach(r => {
  if (r.assigned) console.log(`${r.id}: ${r.name} <= ${r.file} (score ${r.score || 'N/A'})`);
  else console.log(`${r.id}: ${r.name} => no match (best score ${r.score || 0})`);
});

console.log('Done. Check', destDir);
