const parseStr = require('../otranscribe-txt-to-json');

module.exports = txt => {
  const json = parseStr(txt);

  let prev
  return json.map(c => {
    let ret
    if (prev && prev.end) {
      ret = `${formatTime(c.end - prev.end)}: ${c.text}`;
    } else {
      ret = `${formatTime(c.start - (prev && prev.start || 0))}: ${c.text}`;
    }
    prev = c
    return ret;
  }).join('\n');

}


function formatTime(secs) {
  if (secs < 60) {
    return `${secs}.000`;
  } else if (secs < 60 * 60) {
    const mins = parseInt(secs / 60, 10);
    secs = secs % 60;
    return `${mins}:${secs}.000`
  }
}
