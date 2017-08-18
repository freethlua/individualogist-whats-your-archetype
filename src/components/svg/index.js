import { h } from 'preact';

export default ({ children, ...props }) => h('svg', {
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  // width: '100%',
  // height: '100%',
  // viewBox: '0 0 100 100',
  // preserveAspectRatio: 'none',
  ...props
}, children);
