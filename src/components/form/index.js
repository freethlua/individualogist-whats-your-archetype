import URL from 'url';
import { Component } from 'preact';
import quickHash from 'quick-hash';
import hs from 'preact-hyperstyler';
import linkstate from 'linkstate';
import { route } from 'preact-router';
import archetypes from '../../data/archetypes';
import styles from './style.styl';

const h = hs(styles);

export default class Form extends Component {
  componentWillMount() {
    const currentUrl = URL.parse(String(location), true);
    const aweberRedirectHash = this.aweberRedirectHash = quickHash(String(new Date()), Number(new Date()));
    this.setState({ aweberRedirectHash });
    currentUrl.query.aweberSuccess = aweberRedirectHash;
    delete currentUrl.search;
    this.redirectUrl = URL.format(currentUrl);
  }

  componentDidMount() {
    this.props.componentDidMount(this.formEl);
  }

  render() {
    return h.div('.container', [
      h.form({
        onSubmit: e => this.props.onSubmit(e, this.state),
        action: 'https://www.aweber.com/scripts/addlead.pl',
        method: 'POST',
        ref: ref => this.formEl = ref,
      }, [
        h.input({ type: 'hidden', name: 'meta_web_form_id', value: archetypes[this.props.quizData.archetype].aweber.meta_web_form_id }),
        h.input({ type: 'hidden', name: 'listname', value: archetypes[this.props.quizData.archetype].aweber.listname }),
        h.input({ type: 'hidden', name: 'meta_adtracking', value: archetypes[this.props.quizData.archetype].aweber.meta_adtracking }),
        h.input({ type: 'hidden', name: 'redirect', value: this.redirectUrl }),
        // h.input({ type: 'hidden', name: 'hash', value: this.aweberRedirectHash }),
        h.input({
          type: 'name',
          name: 'name',
          placeholder: 'Name',
          onchange: linkstate(this, 'name'),
          required: true,
        }),
        h.input({
          type: 'email',
          name: 'email',
          placeholder: 'Email',
          onchange: linkstate(this, 'email'),
          required: true,
        }),
        h.button('Start My Free Reading!'),
      ])
    ]);
  }
}
