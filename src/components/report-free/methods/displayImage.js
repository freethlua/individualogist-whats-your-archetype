export async function displayImage(opts, transcriptLine) {
  if (opts.fadeOut) {
    this.hideImage();
  } else {
    try {
      this.setState({
        img: await
        import ('../../../assets/' + opts.path),
      });
    } catch (error) {
      console.error(error);
      this.hideImage();
    }
  }
}
