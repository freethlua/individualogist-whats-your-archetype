import binarySearch from 'binary-search'

export function componentDidMount() {
  if (this.props.seekTo) {
    this.setState(this.currentTranscriptIndexFinder(
      this.props.seekTo,
      0
    ));
    this.audioEl.seekTo(this.state.currentTimeStart);
  } else if (this.props.seekToIndex) {
    if (this.props.seekToIndex < 0) {
      this.props.seekToIndex = this.transcript.length - this.props.seekToIndex - 1;
    }
    this.setState({
      currentTranscriptIndex: this.props.seekToIndex,
    });
    this.audioEl.seekTo(this.transcript[this.currentTranscriptIndex].start || this.transcript[this.currentTranscriptIndex - 1].end);
  }
}
