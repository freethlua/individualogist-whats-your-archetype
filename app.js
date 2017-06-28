import { Component, render } from 'preact';
import quickHash from 'quick-hash';
import URL from 'url';
import localforage from 'localforage';
import hs from 'preact-hyperstyler';
import './handle-errors';
// import 'ionicons/dist/css/ionicons.css'
// import 'animate.css';
// import 'reset-css/reset.css';
// import '@font/nunito/light.css';
import * as cmp from './components';
import styles from './app.styl';

const h = hs(styles);

window.url = URL.parse(location + '', true);

class App extends Component {

  componentWillMount() {
    if ('new' in url.query) {
      localforage.removeItem('state');
    }

    this.setState({
      quizData: this.props.quizData,
      formData: this.props.formData,
    });

    if ('dev' in url.query) {
      // console.log({ url.query });
      if ('report' in url.query) {
        if (url.query.report === 'free') {
          this.setState({
            aweberSucccess: 'testoverride',
            formData: {
              name: url.query.name || 'Testname',
              email: url.query.email || 'test@test.com',
            },
            quizData: {
              archetype: url.query.archetype || 'magician',
            }
          });
        }
      }
    }

    if ('aweberSucccess' in url.query && this.state.formData) {
      const hash = quickHash(this.state.formData.name + this.state.formData.email);
      if (url.query.aweberSucccess === hash) {
        console.log(`authenticated!`);
        this.setState({
          aweberSucccess: url.query.aweberSucccess
        });
      } else {
        console.log(`Couldn't authenticate...`);
      }
    }

  }

  componentWillUpdate() {
    // console.log(`this.state.class:`, !!this.state.class);
  }

  render() {
    // console.log(`this.state.class:`, !!this.state.class);

    const header = h.div('.header', [cmp.header]);

    // console.log(`this.state.class:`, !!this.state.class);
    const quiz = h.div('.quiz', [h(cmp.quiz, {
      onFinish: quizData => {
        delete this.state.class;
        // console.log(`this.state.class:`, !!this.state.class);
        // console.log(`this.state:`, this.state);
        this.setState({ quizData, class: null });
        // console.log(`this.state:`, this.state);
        localforage.setItem('state', this.state);
      }
    })]);
    // console.log(`this.state.class:`, !!this.state.class);

    // console.log(`this.state.class:`, !!this.state.class);
    const form = h.div('.form', [h(cmp.form, {
      onSubmit: formData => {
        delete this.state.class;
        this.setState({ formData, class: null });
        localforage.setItem('state', this.state);
      }
    })]);
    // console.log(`this.state.class:`, !!this.state.class);

    const reportIntro = h.div('.reportIntro', [h(cmp.reportIntro, { form, archetype: this.state && this.state.quizData && this.state.quizData.archetype })]);
    // console.log(`this.state.class:`, !!this.state.class);
    const reportFree = h.div('.reportFree', [h(cmp.reportFree, Object.assign({}, this.state))]);
    // console.log(`this.state.class:`, !!this.state.class);

    if (!this.state.quizData) {
      // console.log(`this.state.class:`, !!this.state.class);
      return h.div('.app', [quiz, cmp.comments]);
    } else {
      if (!this.state.formData || !this.state.aweberSucccess) {
        return h.div('.app', [reportIntro, cmp.comments]);
      } else {
        return h.div('.app', [reportFree]);
      }
    }
  }
}

const target = document.getElementById('whats-your-archetype_app') || document.body;
localforage.config({ name: 'app-v2v1211' });
localforage.getItem('state').then(data => {
  // data = {}
  console.log(`data:`, data);
  // render(h(App, data), target)
  render(h(App, Object.assign({}, data)), target)
  const footer = document.getElementById('whats-your-archetype_footer') || document.body;
  render(cmp.footer, footer);
});
