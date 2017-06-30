require('../pathify-string');
const util = require('util');
const beautify = require('js-beautify').js_beautify;
const fs = require('fs');
const otranscribeTxtToJson = require('../otranscribe-txt-to-json');
const parseTranscript = require('.');

const dir = __dirname.join('../../assets/audios');

for (let file of fs.readdirSync(dir).filter(f => f.match(/\.txt$/))) {
  const str = fs.readFileSync(dir.join(file), 'utf8');
  const ojson = otranscribeTxtToJson(str);
  // console.log({ ojson, str });
  ojson.forEach(t => {
    // if (!t.text) {
    //   console.error({t, file});
    //   throw new Error(`t.text doesn't exist`);
    // }
    const parsedTranscript = parseTranscript(t.text);
    Object.assign(t, parsedTranscript);
  });

  const outputFile = dir.join(file.basename(file.extname)) + '.js'

  // let outputJson = JSON.stringify(ojson, null, 2)
  let outputJson = util.inspect(ojson, { depth: 10, maxArrayLength: null })

  outputJson = outputJson.replace(/},[\n ]+{/g, '},{');;
  outputJson = beautify(outputJson, { indent_size: 2 });

  fs.writeFileSync(
    outputFile,
    `/* auto-generated */ module.exports = ` + outputJson
  )
}
