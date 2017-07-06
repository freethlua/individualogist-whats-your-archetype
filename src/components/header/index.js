import hs from 'preact-hyperstyler';
import logo from '../../assets/images/logos/large-text.png';
import styles from './style.styl';

const h = hs(styles);

export default h.header([
  h.img({ src: logo }),
  h.p('.heading', 'FREE PERSONALITY READING'),
  h.p('.subtitle', 'What’s Your Archetype?'),
  h.p('.subtext', 'Individuation Archetype Explorer®'),
]);
