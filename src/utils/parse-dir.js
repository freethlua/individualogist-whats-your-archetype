require('pathify-string');
const util = require('util');
const fs = require('fs');

const dir = __dirname.join('../assets/audios');

module.exports = fn => {
  for (const file of fs.readdirSync(dir).filter(f => f.match(/\.txt$/))) {
    const str = fs.readFileSync(dir.join(file), 'utf8');
    fn(str, { dir, file })
  }

}
