const fs = require('fs');
require('pathify-string');
const parse = require('.');

const otranscribeDir = __dirname.join('../../assets/transcripts-otranscribe');
const durationBasedDir = __dirname.join('../../assets/transcripts-duration-based');

for (const file of fs.readdirSync(otranscribeDir)) {
  const str = fs.readFileSync(otranscribeDir.join(file), 'utf8');
  const outputStr = parse(str);
  outputFile = durationBasedDir.join(file);
  fs.writeFileSync(outputFile, outputStr);
}
