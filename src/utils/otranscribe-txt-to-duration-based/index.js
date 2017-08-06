const parseStr = require('../otranscribe-txt-to-json');

module.exports = txt => {
  const json = parseStr(txt);

  return json.map((curr, i) => {
    const prev = json[i - 1];
    const next = json[i + 1];
    curr.text = curr.text || '';
    if (prev) {
      return `${(curr.end || curr.start) - (prev.end || prev.start) || 1}.000: ${curr.text}`;
    } else if (next) {
      return `${(next.end || next.start) - (curr.end || curr.start) || 1}.000: ${curr.text}`;
    } else {
      return `1.000: ${curr.text}`;
    }
  }).join('\n');
}
