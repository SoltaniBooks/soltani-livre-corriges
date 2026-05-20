const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'App.jsx');
const formulasJsonPath = path.join(__dirname, 'src', 'formulas.json');

if (!fs.existsSync(appJsxPath)) {
  console.error('App.jsx not found at ' + appJsxPath);
  process.exit(1);
}

if (!fs.existsSync(formulasJsonPath)) {
  console.error('formulas.json not found at ' + formulasJsonPath);
  process.exit(1);
}

const appJsx = fs.readFileSync(appJsxPath, 'utf8');
const formulas = JSON.parse(fs.readFileSync(formulasJsonPath, 'utf8'));

// Find all matches of T.something
// We want to match patterns like T.R2E1_1a, but be careful with word boundaries,
// and make sure we don't match things like T[fkey] or T[row.key]
const regex = /T\.([a-zA-Z0-9_]+)/g;
let match;
const keysInApp = new Set();
while ((match = regex.exec(appJsx)) !== null) {
  keysInApp.add(match[1]);
}

console.log(`Found ${keysInApp.size} distinct formula keys referenced in App.jsx.`);

let missingCount = 0;
for (const key of keysInApp) {
  if (!(key in formulas)) {
    console.error(`MISSING KEY: T.${key} is referenced in App.jsx but does not exist in formulas.json!`);
    missingCount++;
  }
}

if (missingCount === 0) {
  console.log('SUCCESS: All formula keys referenced in App.jsx exist in formulas.json!');
  process.exit(0);
} else {
  console.error(`FAILURE: ${missingCount} keys are missing from formulas.json!`);
  process.exit(1);
}
