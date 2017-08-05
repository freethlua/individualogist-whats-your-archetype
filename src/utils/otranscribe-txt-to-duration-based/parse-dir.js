const fs = require('fs');
const forEachFile = require('../parse-dir');
const parse = require('.');

forEachFile((str, { dir, file }) => {
  const outputStr = parse(str);

  outputFile = dir.join(file.replace(file.extname + '', '.new' + file.extname));

  fs.writeFileSync(outputFile, outputStr);

});
