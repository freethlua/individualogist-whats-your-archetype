import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import linkstate from 'linkstate';
import styles from './style.styl';

const h = hs(styles);

export default class Form extends Component {
  render() {
    return h.div('.container', [
      h.form({
        onSubmit: e => {
          e.preventDefault();
          this.props.onSubmit(this.state);
        }
      }, [
        h.input({
          type: 'name',
          placeholder: 'Name',
          onchange: linkstate(this, 'name'),
          required: true,
        }),
        h.input({
          type: 'email',
          placeholder: 'Email',
          onchange: linkstate(this, 'email'),
          required: true,
        }),
        h.button('Download'),
      ])
    ]);
  }
}
