import { Component } from 'preact';
import URL from 'url';
import quickHash from 'quick-hash';
import hs from 'preact-hyperstyler';
import linkstate from 'linkstate';
import styles from './style.styl';

const h = hs(styles);

export default class Form extends Component {
  render() {

    const currentUrl = URL.parse(String(location), true);
    const hash = quickHash(this.state.name + this.state.email);
    currentUrl.query.aweberSucccess = hash;
    delete currentUrl.search;
    const redirectUrl = URL.format(currentUrl);

    return h.div('.container', [
      h.form({
        onSubmit: e => {
          this.props.onSubmit(this.state);
        },
        action: 'https://www.aweber.com/scripts/addlead.pl',
        method: 'POST',
      }, [
        h.input({ type: 'hidden', name: 'meta_web_form_id', value: '293430144' }),
        h.input({ type: 'hidden', name: 'listname', value: 'awlist4378395' }),
        h.input({ type: 'hidden', name: 'meta_adtracking', value: 'Ruler_Quiz_Opt_In' }),
        h.input({ type: 'hidden', name: 'redirect', value: redirectUrl }),
        h.input({
          type: 'name',
          name: 'name',
          placeholder: 'Name',
          onchange: linkstate(this, 'name'),
          // value: this.state.name,
          required: true,
        }),
        h.input({
          type: 'email',
          name: 'email',
          placeholder: 'Email',
          onchange: linkstate(this, 'email'),
          // value: this.state.email,
          required: true,
        }),
        h.button('Start My Free Reading!'),
      ])
    ]);
  }
}
