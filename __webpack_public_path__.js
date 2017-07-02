window.isLocalhost = Boolean(location.hostname.match(/localhost|127.0.0.1/));
window.isGithub = Boolean(location.hostname.match(/github.io/));

__webpack_public_path__ = isLocalhost ? ''
  : isGithub ? location.pathname
  : '/wp-content/themes/individualogist/whats-your-archetype/';
