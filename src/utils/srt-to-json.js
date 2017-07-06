const fs = require('fs');
const parseSrt = require('parse-srt');

const input = 'assets/understanding-numerology.srt';
const output = 'assets/understanding-numerology.json';

fs.writeFileSync(
  output,
  JSON.stringify(
    parseSrt(
      fs.readFileSync(
        input, 'utf8'
      )
    ), null, 2
  )
);
