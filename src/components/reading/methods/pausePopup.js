export function pausePopup() {
  if (!this.pausePopupFlag) {
    this.pause();
    this.pausePopupFlag = true;
  }
}
