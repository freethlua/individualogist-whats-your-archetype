module.exports = parseStr;

function parseStr(str) {
  const pattern = /([0-9]\.[0-9]+): /g;
  let match, prev, array = [],
    prevArrItem;
  while (match = pattern.exec(str)) {
    if (prev) array.push({
      start: parseFloat(((prevArrItem && prevArrItem.start || 0) + parseFloat(prev[1])).toFixed(3)),
      text: str.substring(prev.index + match[0].length, match.index),
    })
    prevArrItem = array[array.length - 1];
    prev = match;
  }
  return array;
}
