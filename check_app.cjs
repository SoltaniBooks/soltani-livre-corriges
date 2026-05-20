const fs = require('fs');
const f = fs.readFileSync('src/App.jsx', 'utf8');
console.log('function T2E1 exists:', f.includes('function T2E1'));
console.log('function T3E1 exists:', f.includes('function T3E1'));
console.log("'T2-E1' in DB:", f.includes("'T2-E1'"));
console.log("'T3-E1' in DB:", f.includes("'T3-E1'"));
console.log("'R2-E1' in DB:", f.includes("'R2-E1'"));
console.log("'R3-E1' in DB:", f.includes("'R3-E1'"));
console.log('function R2E1 exists:', f.includes('function R2E1'));
console.log('function R3E1 exists:', f.includes('function R3E1'));
// Look for any <T2E1 usage in DB
console.log('<T2E1/> in DB:', f.includes('<T2E1/>'));
console.log('<T3E1/> in DB:', f.includes('<T3E1/>'));
