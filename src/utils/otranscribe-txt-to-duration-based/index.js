const parseStr = require('../otranscribe-txt-to-json');

module.exports = txt => {
  const json = parseStr(txt);

  let prev
  return json.map(c => {
    if (prev && prev.end) {
      return `${formatTime(prev.end)}: ${c.text}`;
    } else {
      return `${formatTime(c.start)}: ${c.text}`;
    }
    // console.log(i);
    prev = c
  }).join('/n');

}


function formatTime(secs) {
  if (secs < 60) {
    return `${secs}.1000`
  } else if (secs < 60 * 60) {
    const mins = parseInt(secs / 60, 10);
    secs = secs % 60;
    return `${mins}:${secs}.1000`
  }
}
