import { version } from './package.json';
import { Component, render } from 'preact';
import quickHash from 'quick-hash';
import URL from 'url';
import store from './store';
import hs from 'preact-hyperstyler';
import './handle-errors';
// import 'ionicons/dist/css/ionicons.css'
// import 'animate.css';
// import 'reset-css/reset.css';
// import '@font/nunito/light.css';
import * as cmp from './components';
import styles from './app.styl';

const h = hs(styles);

console.log('v' + version);

window.url = URL.parse(location + '', true);
window.cleanUrl = URL.format(Object.assign({}, url, { query: {}, search: null }));

class App extends Component {

  componentWillMount() {
    if ('new' in url.query) {
      window.history.replaceState({}, 'page2', cleanUrl);
      store.clear();
    } else {
      this.setState(this.props);
    }

    if ('dev' in url.query) {
      window.history.replaceState({}, 'page2', cleanUrl);
      // console.log({ url.query });
      if ('report' in url.query) {
        if (url.query.report === 'free') {
          const aweberSuccess = 'test-override';
          this.setState({
            aweberSuccess,
            formData: {
              name: url.query.name || 'Testname',
              email: url.query.email || 'test@test.com',
              aweberRedirectHash: aweberSuccess,
            },
            quizData: {
              archetype: url.query.archetype || 'magician',
            }
          });
        }
      }
    }

    if ('aweberSuccess' in url.query && this.state.formData) {
      window.history.replaceState({}, 'page2', cleanUrl);
      if (url.query.aweberSuccess === this.state.formData.aweberRedirectHash) {
        console.log(`authenticated!`);
        this.setState({
          aweberSuccess: url.query.aweberSuccess
        });
        store.save(this.state)
      } else {
        console.log(`Couldn't authenticate...`);
        console.log({ formData: this.state.formData, aweberSuccess: url.query.aweberSuccess });
      }
    }

  }

  render() {
    console.log(this.state);

    const header = h.div('.header', [cmp.header]);

    const quiz = h.div('.quiz', [h(cmp.quiz, {
      onFinish: quizData => {
        this.setState({ quizData });
        store.save(this.state)
      }
    })]);

    const form = h.div('.form', [h(cmp.form, {
      quizData: this.state.quizData,
      onSubmit: formData => {
        this.setState({ formData });
        store.save(this.state)
      }
    })]);

    const reportIntro = h.div('.reportIntro', [h(cmp.reportIntro, { form, archetype: this.state && this.state.quizData && this.state.quizData.archetype })]);
    const reportFree = h.div('.reportFree', [h(cmp.reportFree, Object.assign({}, this.state))]);

    if (!this.state.quizData) {
      return h.div('.app', [quiz, cmp.comments]);
    } else {
      if (!this.state.formData || !this.state.aweberSuccess) {
        return h.div('.app', [reportIntro, cmp.comments]);
      } else {
        return h.div('.app', [reportFree]);
      }
    }
  }
}

const target = document.getElementById('whats-your-archetype_app') || document.body;
store.ready.then(data => {
  // data = {}
  render(h(App, data), target)
  const footer = document.getElementById('whats-your-archetype_footer') || document.body;
  render(cmp.footer, footer);
});
