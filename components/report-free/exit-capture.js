const redirectTo = 'http://individualogist.com/deluxe-archetype-report-ruler-reading-3/';
const tags = ['button', 'input', 'a'];
const noop = () => {};

for (const tag of tags) {
  const els = document.getElementsByTagName(tag);
  for (const el of els) {
    if (
      (
        tag === 'input'
        && el.type !== 'button'
        && el.type !== 'submit'
        && el.type !== 'image'
      )
      || el.target === '_blank'
    ) {
      continue;
    }
    el.onclick = () => window.onbeforeunload = noop;
  }
}
window.onbeforeunload = () => {
  setTimeout(() => {
    window.onbeforeunload = noop;
    setTimeout(() => document.location.href = redirectTo, 500);
  }, 5);
  return '********************************\n\nATTENTION!!!! \n\nDo not leave this page\n\nClaim your exclusive offer today\n\n\********************************';
};
