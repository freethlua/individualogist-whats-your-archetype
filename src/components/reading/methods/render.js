import hs from 'preact-hyperstyler';
import { route } from 'preact-router';
import component from '../..';
import styles from '../style.styl';

const h = hs(styles);

export function render() {

  if (this.error) {
    return h.pre(this.error);
  }

  const { archetype, audioName } = this;

  return h.div('.wrapper.reading', [
    h(component('reading-base'), {
      audioName: this.props.quizData.archetype,
      onended: () => route('/deluxe'),
      ...this.props,
    }),
  ]);
}
