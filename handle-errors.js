import { h, render } from 'preact';

if (isLocalhost) {
  let target = document.createElement('div');
  document.body.insertBefore(target, document.body.firstChild);
  window.addEventListener('error', e => render(h('pre', {}, [e && e.error && e.error.stack || e]), target, target.lastChild));
}

// setInterval(() => {
//   throw new Error('test ' + new Date())
// }, 1000);
