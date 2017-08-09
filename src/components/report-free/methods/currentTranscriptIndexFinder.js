export function currentTranscriptIndexFinder(currentTime = 0, currentTranscriptIndex = 0) {
  const line = this.transcript[currentTranscriptIndex];
  if (!line) {
    console.warn(`No line found at index ${currentTranscriptIndex} ({transcript.length: ${this.transcript.length}}). Resetting index to 0`);
    return this.currentTranscriptIndexFinder(currentTime, 0);
  }
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
