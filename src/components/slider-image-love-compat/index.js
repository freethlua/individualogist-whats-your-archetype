import hs from 'preact-hyperstyler';
import styles from './style.styl';

const { img } = hs(styles);

export default ({ archetype }) => img({ src: require('./assets/' + archetype + '.png') });
