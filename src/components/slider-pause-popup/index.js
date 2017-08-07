import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import styles from './style.styl';
import md from 'preact-markdown';

const h = hs(styles);

export default class extends Component {
  componentDidMount() {
    this.buttonEl.focus();
  }
  render(props) {
    if (!props.show) return;
    if (!props.type || props.type === 'ok') {
      // test this!
      return h.div('.ok', [
        h.p(props.message),
        h.img('.arrow', { src: require('./assets/double-down-arrows.png') }),
        h.button({
          onclick: props.done,
          ref: _ => this.buttonEl = _,
        }, [props.button || props.buttonLabel]),
      ]);
    } else {

    }
  }
}
