export function onkeydown(e) {
  if (!this.mainContentEl) {
    return;
  }
  if (window.pageYOffset > 500) {
    return;
  }
  if (e.keyCode === 32) {
    // space
    if (!this.state.sliderPausePopup) {
      this.playPause();
    }
  } else if (e.keyCode === 38 && e.ctrlKey) {
    // ctrl + up
    const before = this.audioEl.playbackRate;
    let after = before * 1.2;
    if (after > 4) {
      after = 4;
    }
    if (before < 1) {
      after = 1;
    }
    this.audioEl.playbackRate = after;
  } else if (e.keyCode === 40 && e.ctrlKey) {
    // ctrl + down
    const before = this.audioEl.playbackRate;
    let after = before * 0.9;
    if (after < 0.5) {
      after = 0.5;
    }
    if (before > 1) {
      after = 1;
    }
    this.audioEl.playbackRate = after;
  } else if (e.keyCode === 39) {
    // right
    this.audioEl.currentTime += e.shiftKey ? 20 : 5;
    this.setState({ currentTimeEnd: null, currentTranscriptIndex: null });
  } else if (e.keyCode === 37) {
    // left
    this.audioEl.currentTime -= e.shiftKey ? 20 : 5;
    this.setState({ currentTimeEnd: null, currentTranscriptIndex: null });
  } else if (e.keyCode === 190) {
    // period
    this.audioEl.currentTime = 0;
    this.audioEl.pause();
  } else {
    return;
  }
  e.preventDefault();
  return false;
}
