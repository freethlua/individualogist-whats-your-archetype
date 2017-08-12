export function currentTranscriptIndexFinder(currentTime = 0, currentTranscriptIndex = 0) {
  console.log('Checking currentTranscriptIndex:', currentTranscriptIndex);

  if (typeof currentTranscriptIndex === 'string') {
    currentTranscriptIndex = parseInt(currentTranscriptIndex, 10);
  }

  if (typeof currentTime === 'string') {
    currentTime = parseInt(currentTime, 10);
  }

  const max = this.transcript.length - 1;

  if (currentTranscriptIndex > max) {
    console.warn(`{currentTranscriptIndex: ${currentTranscriptIndex}} > ({transcript.length-1: ${max}}). Resetting index to ${max}`);
    currentTranscriptIndex = max;
  }

  const line = this.transcript[currentTranscriptIndex];
  if (!line) {
    console.warn(`No line found at index ${currentTranscriptIndex} ({transcript.length: ${max+1}}). Resetting index to 0`);
    return this.currentTranscriptIndexFinder(currentTime, 0);
  }
  const nextLine = this.transcript[currentTranscriptIndex + 1];
  const prevLine = this.transcript[currentTranscriptIndex - 1];
  const currentTimeStart = line.start || prevLine && prevLine.end || 0;
  const currentTimeEnd = line.end || nextLine && nextLine.start || (nextLine && nextLine.end && line.start) || Infinity;
  if (currentTime < currentTimeEnd) {
    console.log('Found currentTranscriptIndex:', currentTranscriptIndex);
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
