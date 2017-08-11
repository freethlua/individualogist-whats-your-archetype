export function cueAction(action, opts, transcriptLine) {
  this[action](opts, transcriptLine);
}
