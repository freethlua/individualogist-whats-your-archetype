import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import Router, { route } from 'preact-router';
import Case from 'case';
import store from '../../store';
import component from '..';
import archetypes from '../../data/archetypes';
import fixSubdomain from '../../utils/fix-subdomain';
import styles from './style.styl';

const h = hs(styles);

export default class App extends Component {
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

    if (this.state.quizData && this.state.quizData.archetype && !archetypes[this.state.quizData.archetype]) {
      console.log(`Invalid archetype: '${this.state.quizData.archetype}'`);
      console.debug(this.state);
      this.setState({
        quizData: {},
      });
    }

    console.log(`this.state:`, this.state);
  }

  redirect(currentRoute = location.pathname) {
    console.log(`Redirect requested from`, currentRoute);
    console.log(this.state.quizData);
    if (typeof currentRoute !== 'string') {
      console.log(`currentRoute:`, currentRoute);
      console.log(`this.path:`, this.path);
      console.log(`arguments:`, arguments);
      throw new Error('currentRoute is not a string');
    }
    const redirectFrom = from => {
      let to = from;
      if (this.state.quizData && this.state.quizData.archetype) {
        if (this.state.formData && this.state.formData.name && this.state.formData.email) {
          if (!['/reading', '/deluxe'].includes(from)) {
            to = '/reading';
          }
        } else {
          to = '/intro';
        }
      } else {
        to = '/quiz';
      }
      return from !== to && to;
    }
    const redirectTo = redirectFrom(currentRoute);
    if (redirectTo) {
      const msg = `redirecting from '${currentRoute}' to '${redirectTo}'`
      console.log(msg);
      route(redirectTo);
      return msg;
    }
  }

  componentDidMount() {
    const redirecting = this.redirect();
    if (redirecting) return redirecting;
  }

  render() {

    const tracking = !isDev && h(component('tracking'), Object.assign({
      clickmagickRendered: () => {
        console.log('clickmagickRendered');
        this.setState({ clickmagickRenderedOnce: true });
        store.save(this.state);
      }
    }, this.state));

    const paths = {};

    paths.quiz = () => h.div([h(component('quiz'), Object.assign({}, this.state, {
      onFinish: quizData => {
        this.setState({ quizData });
        store.save(this.state);
        route('/intro');
      }
    }, { redirect: ::this.redirect })), component('comments'), component('footer')]);

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
          formEl.querySelector('input[type=hidden]').focus();
          window.scrollTo(0, 0);
        },
      }))
    }, { redirect: ::this.redirect })), component('comments'), component('footer'), tracking]);

    paths.reading = () => h.div([
      h(component('reading'), Object.assign({}, url.query, this.state, { redirect: ::this.redirect })),
      component('comments'),
      component('footer'),
      tracking,
    ]);

    paths.deluxe = () => h.div([
      h(component('reading-deluxe'), Object.assign({}, url.query, this.state, { redirect: ::this.redirect })),
      component('comments'),
      component('footer'),
      tracking,
    ]);

    const router = ({ path }) => {
      console.log(`Path requested: '${path}'`);
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

    return h.div('.app', [h(Router, [h(router, { path: '/:path' }), ])]);
  }
}
