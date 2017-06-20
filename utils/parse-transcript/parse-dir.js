require('../pathify-string');
const fs = require('fs');
const otranscribeTxtToJson = require('../otranscribe-txt-to-json');
const parseTranscript = require('.');

const dir = __dirname.join('../../assets/audios');

for (let file of fs.readdirSync(dir).filter(f => f.match(/\.txt$/))) {
  const str = fs.readFileSync(dir.join(file), 'utf8');
  const ojson = otranscribeTxtToJson(str);
  // console.log({ ojson, str });
  ojson.forEach(t => {
    const parsedTranscript = parseTranscript(t.text);
    Object.assign(t, parsedTranscript);
  });
  fs.writeFileSync(dir.join(file.basename(file.extname)) + '.json', JSON.stringify(ojson, null, 2))
}
