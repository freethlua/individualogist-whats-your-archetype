import hs from 'preact-hyperstyler';
import styles from './style.styl';
import imgBlondeWoman from './assets/blonde-woman.jpg';

const h = hs(styles);

const backgroundColor = '00AEEF';

export default props => h.div('.testimonials', [
  h.blockquote([
    h.header('I broke down. I couldn’t help it.'),
    h.p(`As I read through the first few chapters of my Deluxe Archetype Report, I broke down. I couldn't help it. It describes me so well, how others perceive me, my deepest desires, my passions, my interests, and my internal struggles.`),
    h.footer([
      h.div('.name', 'Elizabeth Cagiano'),
      h.div('.info', 'Business Analyst, Ohio, USA'),
      h.img({ src: imgBlondeWoman }),
    ]),
  ]),
]);
