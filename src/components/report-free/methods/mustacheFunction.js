export function mustacheFunction(fn) {
  return () => (mustacheText, renderMustache) => this[fn](JSON.parse(renderMustache(mustacheText)));
}
