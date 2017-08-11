import hs from 'preact-hyperstyler';
import styles from './style.styl';

const { img } = hs(styles);

export default ({ path }) => img({ src: require('../../assets/' + path) });
