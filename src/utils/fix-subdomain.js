export default path => {
  if (window.isDev) {
    return path;
  } else {
    const host /*without subdomain*/ = location.host.split('.').slice(1).join('.');
    if (path.charAt(0) === '/') {
      path = path.substr(1);
    }
    return `//${host}/${path}`;
  }
};
