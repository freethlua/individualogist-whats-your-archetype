import { Component } from 'preact';
import URL from 'url';
import quickHash from 'quick-hash';
import hs from 'preact-hyperstyler';
import linkstate from 'linkstate';
import archetypes from '../../data/archetypes'
import styles from './style.styl';

const h = hs(styles);

export default class Form extends Component {

  componentWillMount() {
    const currentUrl = URL.parse(String(location), true);
    const aweberRedirectHash = quickHash(String(new Date()), +new Date());
    this.setState({ aweberRedirectHash });
    currentUrl.query.aweberSuccess = aweberRedirectHash;
    delete currentUrl.search;
    this.redirectUrl = URL.format(currentUrl);
  }

  render() {
    return h.div('.container', [
      h.form({
        onSubmit: e => {
          this.props.onSubmit(this.state);
          console.log(`hash created:`, { hash }, this.state);
        },
        action: 'https://www.aweber.com/scripts/addlead.pl',
        method: 'POST',
      }, [
        h.input({ type: 'hidden', name: 'meta_web_form_id', value: archetypes[this.props.quizData.archetype].aweber['meta_web_form_id'] }),
        h.input({ type: 'hidden', name: 'listname', value: archetypes[this.props.quizData.archetype].aweber['listname'] }),
        h.input({ type: 'hidden', name: 'meta_adtracking', value: archetypes[this.props.quizData.archetype].aweber['meta_adtracking'] }),
        h.input({ type: 'hidden', name: 'redirect', value: this.redirectUrl }),
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
