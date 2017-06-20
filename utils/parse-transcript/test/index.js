const parse = require('..');
const realTranscript = require('../../../assets/audios/hero.json');
const testTranscript = require('./transcript.json');

// const transcript = realTranscript.slice(0, 3);
const transcript = testTranscript;

for (const line of transcript) {
  const parsed = parse(line.text);
  console.log(parsed);
}
