export function loveCompatibility({ fadeIn, ...opts } = {}) {
  if (fadeIn) {
    this.setState({
      loveCompatibility: opts,
    })
  } else {
    this.setState({
      loveCompatibility: null,
    })
  }
}
