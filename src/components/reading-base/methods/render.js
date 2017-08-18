import hs from 'preact-hyperstyler';
import { route } from 'preact-router';
import markup from 'preact-markup';
import arrify from 'arrify';
import component from '../..';
import Fade from '../../fade';
import styles from '../style.styl';

const h = hs(styles);

export function render() {

  if (!this.props.quizData || !this.props.quizData.archetype) {
    return route('/quiz');
  } else if (!this.props.formData || !this.props.aweberSuccess) {
    return route('/intro');
  }

  const { audioSrc, transcript } = this;

  if (this.error) {
    return h.pre(this.error);
  }

  const audioEl = h.audio({
    src: audioSrc,
    ref: ref => this.audioEl = ref,
    ontimeupdate: e => this.ontimeupdate(),
  });

  const headerEl = h.header([
    h.img({ src: require('../../../assets/images/logos/large-text.png') }),
  ]);

  const mainContentEl = h.div({
    onclick: e => this.playPause(),
    class: [
      'slider',
      'content',
      // 'current-percent-' + this.state.currentPercent,
    ],
    style: { backgroundImage: `url(${this.state.background})` },
    ref: ref => this.mainContentEl = ref,
  }, [
    h.div('.current-percent', { style: { width: `${this.state.currentPercent}%` } }),
    headerEl,
    h.h1([
      h.span('.name', this.props.formData.name + '\'s'),
      h.span('.rest', 'Archetype Reading'),
    ]),
    h.div('.sliderImage', [
      Fade(this.state.sliderImageSingle
        && h(component('sliderImageSingle'), this.state.sliderImageSingle)),
      Fade(this.state.sliderImageLoveCompat
        && h(component('sliderImageLoveCompat'), {
          archetype: this.props.quizData.archetype,
          ...this.state.sliderImageLoveCompat
        })),
      Fade(this.state.sliderImageGlobe
        && h(component('sliderImageGlobe'), this.state.sliderImageGlobe)),
      Fade(this.state.sliderImageSpiritual
        && h(component('sliderImageSpiritual'), this.state.sliderImageSpiritual)),
    ]),
    h.div('.text', [
      Fade(h(markup, { markup: this.state.currentLine || '', key: this.state.currentLine }))
    ]),
    audioEl,
    h.img('.play-pause', { src: require('../../../assets/images/misc/play-pause.png'), class: this.state.audioPaused ? 'visible' : '' }),
  ]);

  const toast = h(component('toast'), {
    onhide: () => this.setState({ toastHidden: true }),
    hidden: this.state.toastHidden,
  }, [h.div([
    h.div([h.code('⏵⏸ '), h.kbd('space')]),
    h.div([h.kbd('⭠'), h.code('/'), h.kbd('⭢'), h.code(' seek')]),
    h.div([h.kbd('ctrl'), h.code('+'), h.kbd('⭡'), h.code('/'), h.kbd('⭣'), h.code(' speed')]),
  ])]);

  return h.div('.wrapper', [h.div({
    class: ['container']
      .concat(arrify(this.state.currentLineOpts && this.state.currentLineOpts.class))
      .concat([this.state.freeReadingEnded && 'free-reading-ended'].filter(Boolean))
      .concat([this.state.sliderImageLoveCompat && 'sliderImageLoveCompat'].filter(Boolean))
      .concat([this.state.sliderPausePopup && 'slider-paused'].filter(Boolean))
  }, [
    // toast,
    // h(component('sliderImageLoveCompat'), {
    //   archetype: this.props.quizData.archetype,
    //   ...this.state.sliderImageLoveCompat
    // }),
    mainContentEl,
    this.state.sliderPausePopup && h.div('.sliderPausePopup', [h(component('sliderPausePopup'), this.state.sliderPausePopup)]),
    isLocalhost && h.textarea([JSON.stringify(this.state, null, 1)]),
  ])]);
}
