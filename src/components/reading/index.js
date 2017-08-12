import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import { route } from 'preact-router';
import component from '..';
import styles from './style.styl';

const h = hs(styles);

export default class extends Component {
  render() {
    if (this.error) {
      return h.pre(this.error);
    }

    return h.div('.wrapper.reading', [
      h(component('reading-base'), {
        audioName: this.props.quizData.archetype,
        onended: () => route('/deluxe'),
        ...this.props,
      }),
    ]);
  }

}
