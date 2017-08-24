import tweenr from 'tweenr';

export function pause({
  updateState = true,
  tween = true,
  tweenDuration = tween ? 1 : 0,
} = {}, callback = typeof arguments[0] === 'function' && arguments[0]) {
  if (!this.audioEl) {
    return;
  }
  tweenr().to(this.audioEl, {
    volume: 0,
    duration: tweenDuration,
    ease: 'expo-out',
  }).on('complete', () => {
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (callback) {
      callback();
    }
  });
  if (updateState) {
    this.setState({ audioPaused: true });
  }
}
