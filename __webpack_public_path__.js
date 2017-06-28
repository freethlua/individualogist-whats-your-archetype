if (location.hostname.match(/localhost|127.0.0.1/)) {
  __webpack_public_path__ = '';
  console.log('Webpack public path configured for localhost:', __webpack_public_path__);
} else if (location.hostname.includes('github.io')) {
  __webpack_public_path__ = location.pathname.replace(/\/$/,'');
  console.log('Webpack public path configured for github:', __webpack_public_path__);
} else {
  __webpack_public_path__ = '/wp-content/themes/individualogist/whats-your-archetype';
  console.log('Webpack public path configured for WP:', __webpack_public_path__);
}
