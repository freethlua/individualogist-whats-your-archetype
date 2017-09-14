import URL from 'url';
import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import linkstate from 'linkstate';
import { route } from 'preact-router';
import archetypes from '../../data/archetypes';
import styles from './style.styl';

const h = hs(styles);

export default class Form extends Component {
  componentWillMount() {
    if (this.state.formData && this.state.formData.email) {
      this.redirectUrl = location.protocol + '//' + location.host + '?email=' + this.state.formData.email;
    }
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
          // value: this.state.name || this.props.formData && this.props.formData.name || '',
          required: true,
        }),
        h.input({
          type: 'email',
          name: 'email',
          placeholder: 'Email',
          onchange: linkstate(this, 'email'),
          // value: this.state.email || this.props.formData && this.props.formData.email || '',
          required: true,
        }),
        h.button('Start My Free Reading!'),
      ])
    ]);
  }
}
