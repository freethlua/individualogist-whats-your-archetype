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
// import 'reset-css';
import 'bootstrap/dist/css/bootstrap-reboot.css'
import Case from 'case';
import fixSubdomain from './utils/fix-subdomain';
import store from './store';
import component from './components';
import styles from './app.styl';
import './shell.styl';

const h = hs(styles);

console.log('v' + version);
try {
  console.log(`Last commit message: '${require('../last-commitmsg.txt').trim()}'`);
} catch (error) {}

// console.log(cmp);

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

    if (url.query.name) {
      window.history.replaceState(null, null, cleanUrl);
      this.setState({
        formData: Object.assign({
          name: url.query.name,
        }, this.state && this.state.formData),
      });
      store.save(this.state);
    }

    if (url.query.email) {
      window.history.replaceState(null, null, cleanUrl);
      this.setState({
        formData: Object.assign({
          email: url.query.email,
        }, this.state && this.state.formData),
      });
      store.save(this.state);
    }

    if (url.query.archetype) {
      window.history.replaceState(null, null, cleanUrl);
      this.setState({
        quizData: Object.assign({
          archetype: url.query.archetype,
        }, this.state && this.state.quizData),
      });
      store.save(this.state);
    }

    if ('test' in url.query) {
      this.setState({
        formData: Object.assign({
          name: 'Testname',
          email: 'test@test.com',
        }, this.state && this.state.formData),
        quizData: Object.assign({
          archetype: 'caregiver'
        }, this.state && this.state.quizData),
      });
      store.save(this.state);
    }
  }

  render() {
    const tracking = !isDev && h(component('tracking'), Object.assign({
      clickmagickRendered: () => {
        console.log('clickmagickRendered');
        this.setState({ clickmagickRenderedOnce: true });
        store.save(this.state);
      }
    }, this.state));

    const redirect = () => {
      if (!this.state.quizData || !this.state.quizData.archetype) {
        route('/quiz');
      } else if (!this.state.formData || !this.state.formData.email) {
        route('/intro');
      } else {
        route('/reading');
      }
    };

    const paths = {};

    paths.quiz = () => h.div([h(component('quiz'), Object.assign({}, this.state, {
      onFinish: quizData => {
        this.setState({ quizData });
        store.save(this.state);
        route('/intro');
      }
    })), component('comments'), component('footer')]);

    paths.intro = () => h.div([h(component('intro'), Object.assign({}, this.state, {
      form: h(component('form'), Object.assign({}, this.state, {
        onSubmit: (e, formData) => {
          this.setState({ formData });
          store.save(this.state);
          if (window.isDev) {
            route('/reading');
            e.preventDefault();
          } else {
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
    })), component('comments'), component('footer'), tracking]);

    paths.reading = () => h.div([
      h(component('reading'), Object.assign({}, url.query, this.state)),
      component('comments'),
      component('footer'),
      tracking,
    ]);

    paths.deluxe = () => h.div([
      h(component('reading-deluxe'), Object.assign({}, url.query, this.state)),
      component('comments'),
      component('footer'),
      tracking,
    ]);

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
