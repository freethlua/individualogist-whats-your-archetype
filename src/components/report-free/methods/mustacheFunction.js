import JSON from 'json5';

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
