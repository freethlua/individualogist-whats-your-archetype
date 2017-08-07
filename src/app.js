import URL from 'url';
import { Component, render } from 'preact';
import hs from 'preact-hyperstyler';
import Router, { route } from 'preact-router';
import { version } from '../package';
import './handle-errors';
// import 'roboto-fontface/css/roboto/roboto-fontface.css';
// import 'typeface-roboto-slab';
// import '@font/nunito/index.css';
import 'nunito-fontface';
import 'reset-css';
import Case from 'case';
import fixSubdomain from './utils/fix-subdomain';
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
window.originalTitle = document.title;

class App extends Component {
  componentWillMount() {
    if ('new' in url.query) {
      window.history.replaceState(null, null, cleanUrl);
      store.clear();
    } else {
      this.setState(this.props);
    }

    const aweberSuccess = 'test-override';

    if ('deluxe' in url.query) {
      this.setState({
        aweberSuccess,
        deluxe: true,
        formData: Object.assign({
          name: url.query.name,
        }, this.state && this.state.formData),
        quizData: Object.assign({
          archetype: url.query.archetype,
        }, this.state && this.state.formData),
      });
      store.save(this.state);
    }

    if ('dev' in url.query) {
      // window.history.replaceState(null, null, window.location.href.split('?')[0]);
      if ('report' in url.query) {
        if (url.query.report === 'free') {
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

  render() {
    const tracking = !isDev && h(cmp.tracking, Object.assign({
      clickmagickRendered: () => {
        console.log('clickmagickRendered');
        this.setState({ clickmagickRenderedOnce: true });
        store.save(this.state);
      }
    }, this.state));

    const redirect = () => {
      if (!this.state.quizData) {
        route('/quiz');
      } else if (!this.state.formData || !this.state.aweberSuccess) {
        route('/intro');
      } else {
        route('/reading');
      }
    };

    const paths = {};

    paths.quiz = () => h.div([h(cmp.quiz, Object.assign({}, this.state, {
      onFinish: quizData => {
        this.setState({ quizData });
        store.save(this.state);
        route('/intro');
      }
    })), cmp.comments, cmp.footer]);

    paths.intro = () => h.div([h(cmp.reportIntro, Object.assign({}, this.state, {
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
            try {
              fbq('track', 'Lead', {
                value: 0.00,
                currency: 'USD'
              });
            } catch (error) {
              console.log('Couldn\'t fire facebook tracking event');
              console.error(error);
            }
          }
        },
        componentDidMount: formEl => {
          formEl.querySelector('input[name=name]').focus();
          window.scrollTo(0, 0);
        },
      }))
    })), cmp.comments, cmp.footer, tracking]);

    paths.reading = () => h.div([h(cmp.reportFree, Object.assign({}, this.state)), cmp.comments, cmp.footer, tracking]);

    const redirectExternal = ({ path }) => {
      if (path in paths) {
        document.title = Case.title(path) + ' | ' + window.originalTitle;
        return h(paths[path]);
      } else if (window.isDev) {
        return `(dev mode) Not redirecting to '/${path}'`;
      } else {
        path = fixSubdomain(path);
        location.assign(path);
        return `Redirecting to '${path}'...`;
      }
    };

    return h.div('.app', [h(Router, [
      h(redirect, { path: '/', default: true }),
      h(redirectExternal, { path: '/:path' }),
    ])]);
  }
}

const target = document.getElementById('app') || document.getElementById('whats-your-archetype_app') || document.body;
const loadingElement = document.getElementById('loading');
store.ready.then(data => {
  window.reload = () => render(h(App, data), target, target.lastChild);
  render(h(App, data), target, target.lastChild);
  if (loadingElement) {
    window.showLoading = () => loadingElement.style.display = 'block';
    window.hideLoading = () => loadingElement.style.display = 'none';
    window.hideLoading();
  }
}).catch(error => {
  render(h.pre(error.stack || error.message || error), target, target.lastChild);
  console.error(error);
});
