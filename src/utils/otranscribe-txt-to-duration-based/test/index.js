const main = require('..');
const txt = require('fs').readFileSync(__dirname + '/1.txt', 'utf8');

console.log(main(txt));
