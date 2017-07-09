import URL from 'url';
import { Component, render } from 'preact';
import hs from 'preact-hyperstyler';
import Router, { route } from 'preact-router';
import AsyncRoute from 'preact-async-route';
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
      window.history.replaceState(null, null, window.location.href.split('?')[0]);
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
      window.history.replaceState(null, null, window.location.href.split('?')[0]);
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

  // componentDidMount() {
  //   if (!this.state.quizData) {
  //     route('/quiz');
  //   } else if (!this.state.formData || !this.state.aweberSuccess) {
  //     route('/intro');
  //   } else {
  //     route('/reading');
  //   }
  // }

  render() {
    const tracking = !isDev && h(cmp.tracking, state);

    const redirect = () => {
      if (!this.state.quizData) {
        route('/quiz');
      } else if (!this.state.formData || !this.state.aweberSuccess) {
        route('/intro');
      } else {
        route('/reading');
      }
    };

    const quiz = () => h.div([h(cmp.quiz, Object.assign({}, this.state, {
      onFinish: quizData => {
        this.setState({ quizData });
        store.save(this.state);
        route('/intro');
      }
    })), cmp.comments, cmp.footer]);
    const intro = () => h.div([h(cmp.reportIntro, Object.assign({}, this.state, {
      form: h(cmp.form, Object.assign({}, this.state, {
        onSubmit: (e, formData) => {
          if (window.isDev) {
            this.setState({ formData, aweberSuccess: formData.aweberRedirectHash });
            store.save(this.state);
            route('/reading');
            e.preventDefault();
          } else {
            this.setState({ formData });
            store.save(this.state);
          }
        },
        componentDidMount: formEl => {
          formEl.querySelector('input[name=name]').focus();
          window.scrollTo(0, 0);
        },
      }))
    })), cmp.comments, cmp.footer, tracking]);

    const reading = () => h.div([h(cmp.reportFree, Object.assign({}, this.state)), cmp.comments, cmp.footer, tracking]);

    const syncRoute = (path, component) => h(component, { path });
    const asyncRoute = (path, component) => h(AsyncRoute, { path, component });

    return h.div('.app', [h(Router, [
      h.div({ path: '/', default: true }, [h(redirect)]),
      syncRoute('/quiz', quiz),
      syncRoute('/intro', intro),
      syncRoute('/reading', reading),
      // async not working when routing changes for some reason
      // asyncRoute('/quiz', quiz),
      // asyncRoute('/intro', intro),
      // asyncRoute('/reading', reading),
    ])]);
  }
}

const target = document.getElementById('app') || document.getElementById('whats-your-archetype_app') || document.body;
store.ready.then(data => {
  window.reload = () => render(h(App, data), target, target.lastChild);
  render(h(App, data), target, target.lastChild);
  if (document.getElementById('loading')) {
    document.getElementById('loading').remove();
  }
}).catch(error => {
  render(h.pre(error.stack || error.message || error), target, target.lastChild);
  console.error(error);
});
