import delay from 'promise-delay';

export async function ready() {
  await delay(1000);
  console.log('document.readyState:', document.readyState);

  if (this.props.seekTo) {
    this.props.seekTo = parseInt(this.props.seekTo, 10);
    this.setState(this.currentTranscriptIndexFinder(
      this.props.seekTo,
      0
    ));
    this.audioEl.seekTo(this.state.currentTimeStart);
  } else if (this.props.seekToIndex) {
    this.props.seekToIndex = parseInt(this.props.seekToIndex, 10);
    console.log(`this.props.seekToIndex:`, this.props.seekToIndex);
    if (this.props.seekToIndex < 0) {
      this.props.seekToIndex = this.transcript.length + this.props.seekToIndex - 1;
    }
    console.log(`this.transcript.length:`, this.transcript.length);
    console.log(`this.props.seekToIndex:`, this.props.seekToIndex);
    this.setState({
      currentTranscriptIndex: this.props.seekToIndex,
    });
    const line = this.transcript[this.props.seekToIndex];
    const prevLine = this.transcript[this.props.seekToIndex - 1];
    if (line && line.start) {
      console.log('Seeking to', line.start);
      this.audioEl.currentTime = line.start;
    } else if (prevLine && prevLine.end) {
      console.log('Seeking to', prevLine.end);
      this.audioEl.currentTime = prevLine.end;
    }
  }

  await this.ontimeupdate();
  // this.playPause();
  this.setState({ audioPaused: true });
  this.play();
  window.scrollTo(0, 0);
  this.setState({ ready: true });
}
