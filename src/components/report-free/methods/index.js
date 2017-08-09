const reqAll = require.context('.', true, /\.js$/);
const methods = reqAll.keys().reduce((all, name) => ({ ...all, ...reqAll(name) }), {});

export default target => {
  Object.assign(target.prototype, methods);
  return target;
};
