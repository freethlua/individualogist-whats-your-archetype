export function changeBackground() {
  if (this.state.background) return; // don't change
  if (!this.state.lastBackgroundChangeTime || this.state.lastBackgroundChangeTime + 4000 < new Date()) {
    const cbg = this.state.currentBackgroundIndex || 0;
    const nbg = cbg >= 4 ? 1 : cbg + 1;
    this.setState({
      background: require(`../../../assets/images/backgrounds/quiz-slider-${nbg}.jpg`),
      currentBackgroundIndex: nbg,
      lastBackgroundChangeTime: Number(new Date()),
    });
  }
}
