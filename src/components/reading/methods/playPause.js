export function playPause(playPause = true) {
  if (!this.audioEl) {
    return;
  }
  const oldState = this.audioEl.paused;
  if (playPause) {
    if (oldState) {
      this.play();
    } else {
      this.pause({ tweenDuration: 0.2 });
    }
  }
  this.setState({ lastBackgroundChangeTime: Number(new Date()) });
}
