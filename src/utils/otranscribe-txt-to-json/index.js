module.exports = parseStr;

// function parseStr(str) {
//   if (str.match(/[0-9]+[\n\r  ]+[0-9]+:[0-9]+:/)) {
//     return parseNumTimeType(str);
//   } else {
//     return parseNumTimeType(str, true);
//   }
// }

function parseStr(str) {
  const array = str.split(/(?:^|\n)[  ]*[0-9]+[\n\r  ]+/g)
    .map(s => s.trim())
    .map(s => s.replace(/[\n\r]+/g, '\n'))
    .map(s => s.split(/[\n\r]+/g))
    .map(s => s.map(s => s.trim()))
    .map(s => s.filter(filterEmpty))
    .filter(filterEmpty)

  const newArr = []

  for (let il = 0; il < array.length; il++) {
    const line = array[il];
    const obj = { index: newArr.length };
    for (let ii = 0; ii < line.length; ii++) {
      const item = line[ii];
      if (item.match(/[0-9]+\:[0-9]+/) && (ii === 0 || ii === line.length - 1)) {
        if (obj.text) {
          obj.end = parseTime(item);
        } else {
          obj.start = parseTime(item);
        }
      } else {
        obj.text = (obj.text || '') + item;
      }
    }
    newArr.push(obj);
  }

  return newArr;
}

function parseTimeNumType(str) {
  return str
    .split(/(^|\n)[0-9]+[\n\r  ]/g)
    .map(s => s.trim())
    .map(s => s.replace(/[\n\r]+/g, '\n'))
    .map(s => s.split(/[\n\r]+/g))
    .map(s => s.map(s => s.trim()))
    .map(s => s.filter(filterEmpty))
    .filter(filterEmpty)
    .map((s, i, arr) => {
      const [time, ...text] = s;
      return {
        start: parseTime(time),
        end: arr[i + 1] && parseTime(arr[i + 1][0]) || Infinity,
        text: text.join('\n')
      }
    });
}

function filterEmpty(s) {
  return s && s.length
}

function parseTime(time) {
  const [min, sec] = time.split(':').map(t => parseInt(t, 10));
  return min * 60 + sec;
}

function shiftOneForward(curr, i, arr) {
  const prev = arr[i - 1] || {};
  const next = arr[i + 1] || {};
  curr.start = curr.end
  curr.end = next.end
  return curr
}
