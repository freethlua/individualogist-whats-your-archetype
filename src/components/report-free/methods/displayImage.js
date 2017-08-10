export function displayImage({ fadeIn, ...opts } = {}) {
  if (fadeIn) {
    this.setState({
      displayImage: opts,
    })
  } else {
    this.setState({
      displayImage: null,
    })
  }
}
