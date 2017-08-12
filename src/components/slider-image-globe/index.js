import hs from 'preact-hyperstyler';
import styles from './style.styl';

const h = hs(styles);

export default () => h.div('.globe-container', [h.div('.globe')]);
