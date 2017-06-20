const fs = require('fs');
const parse = require('..');
require('../../pathify-string');


const str = fs.readFileSync(__dirname.join('./test.txt'), 'utf8');

console.log(parse(str));
