import hs from 'preact-hyperstyler';
import styles from './style.styl';
import matureBlondeWoman from './assets/mature-blonde-woman.jpg';
import blondeWoman from './assets/blonde-woman.jpg';
import brunetteWoman from './assets/brunette-woman.jpg';

const h = hs(styles);

const backgroundColor = '00aeef'; // ff5110

export default props => h.div('.testimonials', [
  h.blockquote([
    h.img({ src: matureBlondeWoman }),
    h.div('.main', [
      h.header('So accurate that it honestly scared me!'),
      h.p('The Deluxe Archetype Report was astonishingly accurate. it confirmed exactly what\'s been going on in my life. You got literally everything right. From my childhood to my current circumstances. Your reading is so accurate that it honestly scared me!'),
      h.footer([
        h.div('.name', 'Samantha Adams'),
        h.div('.info', 'Office Manager, Christchurch, New Zealand'),
      ]),
    ]),
  ]),
  h.blockquote([
    h.img({ src: blondeWoman }),
    h.div('.main', [
      h.header('I broke down. I couldn\'t help it.'),
      h.p('As I read through the first few chapters of my Deluxe Archetype Report, I broke down. I couldn\'t help it. It describes me so well, how others perceive me, my deepest desires, my passions, my interests, and my internal struggles.'),
      h.footer([
        h.div('.name', 'Victoria Maloney'),
        h.div('.info', 'Housewife, Florida, USA'),
      ]),
    ]),
  ]),
  h.blockquote([
    h.img({ src: brunetteWoman }),
    h.div('.main', [
      h.header('I was in complete shock.'),
      h.p('When I got my Deluxe Archetype Report, I was in complete shock as I read it.. I just found its accuracy so hard to believe - there are things in here about me that not even my husband knows, but you do!'),
      h.footer([
        h.div('.name', 'Elizabeth Cagiano'),
        h.div('.info', 'Business Analyst, Ohio, USA'),
      ]),
    ]),
  ]),
]);
