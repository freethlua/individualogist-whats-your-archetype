import URL from 'url';
import { Component, render } from 'preact';
import hs from 'preact-hyperstyler';
import { version } from '../package';
import './handle-errors';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import store from './store';
import * as cmp from './components';
import styles from './app.styl';
import './shell.styl';

const h = hs(styles);

console.log('v' + version);

window.url = URL.parse(String(location), true);
window.cleanUrl = URL.format(Object.assign({}, url, {
  query: {},
  search: null
}));

class App extends Component {
  componentWillMount() {
    if ('new' in url.query) {
      window.history.replaceState({}, 'page2', cleanUrl);
      store.clear();
    } else {
      this.setState(this.props);
    }

    if ('dev' in url.query) {
      // window.history.replaceState({}, 'page2', cleanUrl);
      // console.log({ url.query });
      if ('report' in url.query) {
        if (url.query.report === 'free') {
          const aweberSuccess = 'test-override';

          this.setState({
            aweberSuccess,
            formData: {
              name: url.query.name || 'Testname',
              email: url.query.email || 'test@test.com',
              aweberRedirectHash: aweberSuccess
            },
            quizData: {
              archetype: url.query.archetype || 'magician'
            }
          });
        }
      }
    }

    if ('aweberSuccess' in url.query && this.state.formData) {
      window.history.replaceState({}, 'page2', cleanUrl);
      if (url.query.aweberSuccess === this.state.formData.aweberRedirectHash) {
        console.log('authenticated!');
        this.setState({
          aweberSuccess: url.query.aweberSuccess
        });
        store.save(this.state);
      } else {
        console.log('Couldn\'t authenticate...');
        console.log({
          formData: this.state.formData,
          aweberSuccess: url.query.aweberSuccess
        });
      }
    }
  }

  render() {
    // console.log(this.state);
    const state = Object.assign({}, this.state);

    const quiz = h.div('.quiz', [h(cmp.quiz, {
      onFinish: (quizData) => {
        this.setState({ quizData });
        store.save(this.state);
      }
    })]);

    const form = h.div('.form', [h(cmp.form, {
      quizData: this.state.quizData,
      onSubmit: (formData) => {
        this.setState({ formData });
        store.save(this.state);
      },
      componentDidMount: formEl => {
        formEl.querySelector('input[name=name]').focus();
        window.scrollTo(0, 0);
      },
    })]);

    const reportIntro = h.div('.reportIntro', [h(cmp.reportIntro, {
      form,
      archetype: this.state && this.state.quizData && this.state.quizData.archetype
    })]);
    const reportFree = h.div('.reportFree', [h(cmp.reportFree, state)]);

    const tracking = !isDev && h(cmp.tracking, state);

    if (!this.state.quizData) {
      return h.div('.app', [quiz, cmp.comments, cmp.footer]);
    } else if (!this.state.formData || !this.state.aweberSuccess) {
      return h.div('.app', [reportIntro, cmp.comments, cmp.footer, tracking]);
    } else {
      return h.div('.app', [reportFree, cmp.comments, cmp.footer, tracking]);
    }
  }
}

const target = document.getElementById('app') || document.getElementById('whats-your-archetype_app') || document.body;
store.ready.then(data => {
  window.reload = () => render(h(App, data), target, target.lastChild);
  render(h(App, data), target);
  if (document.getElementById('loading')) {
    document.getElementById('loading').remove();
  }
}).catch(error => {
  render(h.pre(error), target);
});
