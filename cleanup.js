const fs = require('fs');
let html = fs.readFileSync('dashboard.html', 'utf8');

// 삭제할 공고 ID 목록
const toDelete = [
  'nyp-gracie-square-mood',
  'nyp-geriatrics-bh-91552912432', 
  'northwell-rn-psych-glenoaks-179987',
  'nyp-crisis-stabilization-91506401136',
  'nyp-bh-11n-day-eve',
  'nyp-young-adult-nights',
  'southoaks-177053'
];

let deletedCount = 0;
let lines = html.split('\n');
let newLines = [];
let skipMode = false;
let braceCount = 0;
let currentId = null;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // 공고 시작 확인
  let idMatch = line.match(/\{\s*id:\s*"([^"]+)"/);
  if (idMatch) {
    currentId = idMatch[1];
    if (toDelete.includes(currentId)) {
      skipMode = true;
      braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      deletedCount++;
      console.log('Deleting:', currentId);
      continue;
    }
  }
  
  if (skipMode) {
    braceCount += (line.match(/\{/g) || []).length;
    braceCount -= (line.match(/\}/g) || []).length;
    if (braceCount <= 0) {
      skipMode = false;
      currentId = null;
    }
    continue;
  }
  
  newLines.push(line);
}

fs.writeFileSync('dashboard.html', newLines.join('\n'));
console.log('Total deleted:', deletedCount);
