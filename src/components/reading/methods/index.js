const reqAll = require.context('.');
const all = reqAll.keys().reduce((all, name) => ({ ...all, ...reqAll(name) }), {});

export default target => {
  Object.assign(target.prototype, all);
  return target;
};
