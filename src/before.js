window.isLocalhost = Boolean(!location.hostname || location.hostname.match(/localhost|(127|192)\.[0-9.]+|.dev$/));
window.isGithub = Boolean(location.hostname.match(/github.io/));
window.isDev = isLocalhost || isGithub;

if (window.isDev) {
  console.log('Dev mode', { isLocalhost, isGithub });
}

// __webpack_public_path__ = isLocalhost ? '' :
//   isGithub ? location.pathname :
//     '';
// // '/wp-content/themes/individualogist/whats-your-archetype/';
