const path = require('path');

for (const key in path) {
  if (typeof path[key] === 'function') {
    Object.defineProperty(String.prototype, key, {
      get() {
        const str = this + '';
        const value = path[key](str);
        const fn = function(...args) {
          return path[key](str, ...args.map(a => a + ''));
        };
        fn.valueOf = () => value;
        return fn;
      }
    });
  }
}
