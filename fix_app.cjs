const fs = require('fs');
let f = fs.readFileSync('src/App.jsx', 'utf8');
f = f.replace(/\s*'T2-E1'[\s\S]*?'T3-E4'.*?C:<T3E4\/> \},/, '');
fs.writeFileSync('src/App.jsx', f);
console.log('Fixed App.jsx');
