import { render, h } from 'preact';
import URL from 'url';
import store from './store';
import pkg from '../package';
import 'nunito-fontface';
import 'bootstrap/dist/css/bootstrap-reboot.css'

window.isLocalhost = Boolean(!location.hostname || location.hostname.match(/localhost|(127|192)\.[0-9.]+|.dev$/));
window.isGithub = Boolean(location.hostname.match(/github.io/));
window.isDev = isLocalhost || isGithub;
window.url = URL.parse(String(location), true);
window.cleanUrl = URL.format(Object.assign({}, url, {
  query: {},
  search: null
}));
window.originalTitle = document.title;

console.log('v' + pkg.version);
try {
  console.log(`Last commit message: '${require('../last-commitmsg.txt').trim()}'`);
} catch (error) {}
if (window.isDev) {
  console.log('Dev mode', { isLocalhost, isGithub });
}

const appEl = document.getElementById('app');
store.ready.then(data => {
  const App = require('./components/app').default;
  window.reload = () => render(h(App, data), appEl, appEl.lastChild);
  render(h(App, data), appEl, appEl.lastChild);
}).catch(error => {
  console.error(error);
  const msg = isLocalhost ? error.stack || error.message || error : error.message || error;
  render(h('pre', {}, [msg]), appEl, appEl.lastChild);
}).then(() => {
  appEl.classList.remove('loading');
});
