const fs = require('fs');
const forEachFile = require('../parse-dir');
const parse = require('.');

forEachFile((str, { dir, file }) => {
  str = parse(str);

  file = file.replace(file.extname, '.new' + file.extname);

  fs.writeFileSync(
    file,
    '/* auto-generated */ module.exports = ' + outputJson
  );

});
