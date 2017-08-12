export function confirmToContinue(opts) {
  if (!this.pausePopupFlag) {
    this.pausePopupFlag = true;
    this.pause({ tween: false }, () => {
      this.setState({
        sliderPausePopup: {
          show: true,
          ...opts,
          done: () => {
            this.play();
            this.setState({ sliderPausePopup: null });
          },
        }
      });
    });
  }
  return ''
}
