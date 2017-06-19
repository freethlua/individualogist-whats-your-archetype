import { Component } from 'preact';
import h from 'preact-hyperscript-h';
import linkstate from 'linkstate';

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
        }),
        h.input({
          type: 'email',
          placeholder: 'Email',
          onchange: linkstate(this, 'email'),
        }),
        h.button('Submit'),
      ])
    ]);
  }
}
