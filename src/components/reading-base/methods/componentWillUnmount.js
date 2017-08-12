export function componentWillUnmount() {
  window.removeEventListener('keydown', this.onkeydown);
  window.removeEventListener('beforeunload', this.onbeforeunload);
  window.removeEventListener('click', this.onclick);
}
