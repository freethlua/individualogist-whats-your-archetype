function sliderImage(key, { fadeIn, ...opts } = {}) {
  if (fadeIn) {
    this.mustacheSetState(key, opts);
  } else {
    this.mustacheUnsetState(key);
  }
}

export function sliderImageSingle(opts) {
  return this::sliderImage('sliderImageSingle', opts);
}

export function sliderImageLoveCompat(opts) {
  return this::sliderImage('sliderImageLoveCompat', opts);
}

export function sliderImageGlobe(opts) {
  return this::sliderImage('sliderImageGlobe', opts);
}

export function sliderImageSpiritual(opts) {
  return this::sliderImage('sliderImageSpiritual', opts);
}
