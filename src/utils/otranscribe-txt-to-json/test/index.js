const fs = require('fs');
const parse = require('..');
require('pathify-string');

console.log('===============================');
console.log(parse(fs.readFileSync(__dirname.join('./test.txt'), 'utf8')));
console.log('-------------------------------');
console.log(parse(fs.readFileSync(__dirname.join('./test2.txt'), 'utf8')));
console.log('===============================');
