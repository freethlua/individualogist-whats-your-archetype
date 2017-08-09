export function currentTranscriptIndexFinder(currentTime = 0, currentTranscriptIndex = 0) {
  const line = this.transcript[currentTranscriptIndex];
  const nextLine = this.transcript[currentTranscriptIndex + 1];
  const prevLine = this.transcript[currentTranscriptIndex - 1];
  const currentTimeStart = line.start || prevLine && prevLine.end || 0;
  const currentTimeEnd = line.end || nextLine && nextLine.start || (nextLine && nextLine.end && line.start) || Infinity;
  if (currentTime < currentTimeEnd) {
    return {
      currentTranscriptIndex,
      line,
      nextLine,
      prevLine,
      currentTimeStart,
      currentTimeEnd,
    }
  } else {
    return this.currentTranscriptIndexFinder(currentTime, currentTranscriptIndex + 1);
  }
}
