export function onclick(e) {
  this.justClicked = true;
  setTimeout(() => this.justClicked = false, 100);
}
