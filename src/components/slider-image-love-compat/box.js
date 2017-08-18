import svg from '../svg';
import h from 'preact-hyperscript-h';

export default ({ children, ...props }) => h(svg, {
  width: 1000,
  height: 333,
}, [
  h('linearGradient#triangle-gradient', {
    x1: 0,
    y1: '50%',
    x2: '100%',
    y2: 0,
  }, [
    h('stop', { offset: 0, style: 'stop-color:blue' }),
    h('stop', { offset: 1, style: 'stop-color:red' }),
  ]),
  h('polygon.triangle', {
    points: '0,0 1000,0 0,333',
    style: {
      fill: 'blue',
      fill: 'url(#triangle-gradient)'
    }
  }),
  h('text.headline', {
    textAnchor: 'middle',
    x: '50%',
    y: '1.5em',
    fontSize: '1.8em',
  }, [`Caregiver's Love Compatibility With Other Archetypes`]),
  ...children,
]);
