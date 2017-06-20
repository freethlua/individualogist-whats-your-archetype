// const { parseStringTemplateGenerator } = require('string-template-parser');

// const parseAngularStringTemplate = parseStringTemplateGenerator({
//   VARIABLE_START: /^\{\{\s*/,
//   VARIABLE_END: /^\s*\}\}/
// });

const JSON = require('json5');

module.exports = parse;

function parse(str) {
  // console.log(`str:`, str);
  const keys = extractKeys(str);
  let final = '';
  const finalKeys = []
  let i = 0;
  for (let { 0: { length }, 1: key, index } of keys) {
    let push = {};
    let js;
    if (key.match(/^JS\:/)) {
      key += '}';
      length += 1;
      js = JSON.parse(key.substr(3));
      push.js = js;
    } else {
      push.key = key;
    }
    const substr = str.substring(i, index);
    final += substr;
    i = index + length;
    const newIndex = final.length
    // console.log({ i, index, newIndex, key, length, substr });
    push.index = newIndex;
    finalKeys.push(push);
  }
  const substr = str.substring(i);
  // console.log({ i, substr });
  final += substr;
  return { text: final, keys: finalKeys };
};

function extractKeys(str) {
  const regex = /\{\{(.*?)\}\}/g
  let reg, regArr = [];
  while (reg = regex.exec(str)) {
    regArr.push(reg);
  }
  return regArr
};


// function parse(str) {
//   let i = 0;
//   let done = false;
//   while (!done) {
//     const chars = str.substr(i, 2);
//     if (chars === '{{') {

//     }
//     // if (chars === '}}') {

//     // }
//   }
// };

// function parse(str, mem = []) {
//   // console.log(`str:`, str);
//   let regex = str.match(/\{\{(.*)\}\}/)
//   if (regex) {
//     regex = regex[1];
//     const f = regex.split(/\}\}/);
//     console.log(`f:`, f);
//     // // console.log(`regex:`, regex);
//     mem.push(regex)
//     const next = regex + '}}';
//     // console.log(`next:`, next);
//     return parse(next, mem) || mem
//   }
// };


// module.exports = line => {
//   // return line
//   const regex = /\{\{(.*)\}\}/
//   return line.text.match(regex)
//   // return regex.test(line.text)
//   let reg, regArr = [];
//   while (reg = regex.exec(line.text)) {
//     regArr.push(reg);
//     // console.log(reg);
//   }
//   console.log(regArr);
//   // console.log(parseAngularStringTemplate(line.text));
// };
