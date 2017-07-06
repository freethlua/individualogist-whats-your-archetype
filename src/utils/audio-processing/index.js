const lame = require('lame');
const fs = require('fs');
require('pathify-string');

const encoder = new lame.Encoder({
  // // input
  // channels: 2, // 2 channels (left and right)
  // bitDepth: 16, // 16-bit samples
  // sampleRate: 44100, // 44,100 Hz sample rate
  // output
  bitRate: 64,
  outSampleRate: 22050,
  mode: lame.JOINTSTEREO // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO
});

const dir = __dirname.join('../../assets/audios');

for (const inFile of fs.readdirSync(dir).filter(f => f.match(/\.mp3$/))) {
  const inFilePath = dir.join(inFile);
  const outFile = inFile.basename + '-64' + inFile.extname;
  const outFilePath = dir.join(outFile);

  const inStream = fs.createReadStream(inFilePath);
  const outStream = fs.createReadStream(String(inFilePath));

  inStream.pipe(encoder);
  encoder.pipe(outFilePath);
}
