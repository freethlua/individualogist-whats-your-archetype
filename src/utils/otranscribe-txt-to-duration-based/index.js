const parseStr = require('../otranscribe-txt-to-json');

module.exports = txt => {
  const json = parseStr(txt);

  let prev
  return json.map(c => {
    let ret
    if (prev && prev.end) {
      ret = `${c.end - prev.end}.000: ${c.text}`;
    } else {
      ret = `${c.start - (prev && prev.start || 0)}.000: ${c.text}`;
    }
    prev = c
    return ret;
  }).join('\n');
}
