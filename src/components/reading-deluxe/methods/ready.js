import delay from 'promise-delay';

export async function ready() {
  await delay(1000);
  console.log('document.readyState:', document.readyState);
  if ('dev' in url.query) {
    if ('seekTo' in url.query) {
      this.audioEl.currentTime = parseInt(url.query.seekTo, 10);
    } else if ('seekToIndex' in url.query) {
      let index = parseInt(url.query.seekToIndex, 10);
      if (index < 0) {
        index += this.transcript.length - 1;
      }
      this.setState({ currentTranscriptIndex: index });
    }
  }

  await this.ontimeupdate();
  this.playPause();
  window.scrollTo(0, 0);
  this.setState({ ready: true });
}
