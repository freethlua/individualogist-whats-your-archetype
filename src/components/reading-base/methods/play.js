import tweenr from 'tweenr';

export function play({
  updateState = true,
  tween = true,
  tweenDuration = tween ? 1 : 0,
} = {}, callback = typeof arguments[0] === 'function' && arguments[0]) {
  if (!this.audioEl) {
    return;
  }
  this.audioEl.volume = 0;
  this.audioEl.currentTime = this.state.currentTimeStart || 0;
  this.audioEl.play();
  if (this.audioEl.paused) {
    console.log(`Couldn't play, the device isn't obeying (might need user action)`);
    this.audioEl.volume = 1;
    return;
  }
  tweenr().to(this.audioEl, {
    volume: 1,
    duration: tweenDuration,
  }).on('complete', () => {
    if (callback) {
      callback();
    }
  });
  if (updateState) {
    this.setState({ audioPaused: false });
  }
}
