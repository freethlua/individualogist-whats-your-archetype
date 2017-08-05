module.exports = parseStr;

function parseStr(str) {
  const pattern = /([0-9])\.([0-9]+): /g;
  let match, prev, array = [],
    prevArrItem;
  while (match = pattern.exec(str)) {
    if (prev) array.push({
      start: (prevArrItem && prevArrItem.start || 0) + parseInt(prev[1], 10) * 1000 + parseInt(prev[2], 10),
      str: str.substring(prev.index + match[0].length, match.index),
    });
    prevArrItem = array[array.length - 1];
    prev = match;
  }
  return array;
}
