import { Component } from 'preact';
import { route } from 'preact-router';
import hs from 'preact-hyperstyler';
import component from '..';
import styles from './style.styl';

const h = hs(styles);

export default class extends Component {
  render() {
    if ('deluxe' in url.query) {
      return route('/deluxe?' + url.query.deluxe);
    }

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
