import JSON from 'json5';
import arrify from 'arrify';

const mustacheState = Symbol('mustacheState');

export function mustacheFunction(fn) {
  return () => (mustacheText, renderMustache) => {
    try {
      return this[fn](JSON.parse(renderMustache(mustacheText)))
    } catch (error) {
      error.message = `Couldn't parse '${mustacheText}'. ` + error.message;
      throw error;
    }
  };
}

export function mustacheSetState(key, val) {
  if (!this[mustacheState]) {
    this[mustacheState] = new Map();
  }
  this[mustacheState].set(key, val);
  this.setState({
    [key]: val
  });
  console.log('Set `mustacheState`', key, val);
}

export function mustacheUnsetState(keys) {
  if (!this[mustacheState]) {
    console.log('No mustacheState to unset');
    return;
  }
  if (!keys) {
    keys = [...this[mustacheState].keys()];
  }
  keys = arrify(keys);
  for (const key of keys) {
    this[mustacheState].delete(key);
    this.setState({
      [key]: null
    });
  }
  console.log('Unset `mustacheState`', keys);
}
