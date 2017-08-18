import hs from 'preact-hyperstyler';
import styles from './style.styl';
import heart from './heart';
import box from './box';

const h = hs(styles);

export default ({ archetype }) => h(box, {
  // width: 1000,
  // height: 333,
}, [
  heart({
    percent: 66,
    label: 'Hero',
    x: '50%',
    y: '50%',
  })
]);
