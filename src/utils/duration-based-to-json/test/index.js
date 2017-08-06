const fs = require('fs');
const parse = require('..');
require('pathify-string');

console.log(parse(fs.readFileSync(__dirname.join('./test.txt'), 'utf8')));
