import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import styles from './style.styl';
import md from 'preact-markdown';

const h = hs(styles);

export default class extends Component {
  render(props) {
    if (!props.show) return;
    if (!props.type || props.type === 'ok') {
      // test this!
      return h.div('.ok', [
        h.p(props.message),
        h.button({
          onclick: props.done
        }, [props.buttonLabel]),
      ]);
    } else {

    }
  }
}
