import svg from '../svg';
import h from 'preact-hyperscript-h';

export default ({ percent, label, ...props }) => h(svg, {
  width: 300,
  height: 250,
  ...props
}, [
  h('path.outer', {
    d: 'M150,44.2C162.1,21,187.7,5,218.3,5C260.7,5,295,35.4,295,73.1c0,76.4-84.2,133-145,171.9 C89.3,205.9,5,149.5,5,73.1C5,35.5,39.3,5,81.7,5C112.2,5,137.7,21,150,44.2z',
    style: {
      fill: 'blue',
      stroke: 'red',
      strokeWidth: 10,
      strokeLinecap: 'round',
    }
  }),
  h('path.inner', {
    d: 'M150,250L150,250c68.5-46.7,118-78.7,121.3-136c1.8-31.2-24.4-50.7-60.7-50.7 c-26.3,0-50.2,21.4-60.6,40.7l0,0c-10.5-19.3-34.4-40.7-60.6-40.7c-36.2,0-62.5,19.4-60.7,50.7C32,171.3,81.5,203.3,150,250L150,250 L150,250z',
    style: {
      fill: 'red',
    }
  }),
  h('text.percent', {
    textAnchor: 'middle',
    x: '50%',
    y: '64%',
    style: {
      fontSize: '400%',
    },
  }, [`${percent}%`]),
  h('text.label', {
    textAnchor: 'middle',
    x: '50%',
    y: '78%',
    style: {
      fontSize: '200%',
    },
  }, [label]),
]);
