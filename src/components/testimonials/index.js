import hs from 'preact-hyperstyler';
import styles from './style.styl';
import imgBlackWoman from './assets/black-woman.jpg';
import imgBlondeWoman from './assets/blonde-woman.jpg';
import imgBlondeWomanWithBook from './assets/blonde-woman-with-book.jpg';
import imgBrunetteWoman from './assets/brunette-woman.jpg';
import imgWhiteMaleInStudio from './assets/white-male-in-studio.jpg';
import imgMatureBlondeWoman from './assets/mature-blonde-woman.jpg';

const h = hs(styles);

const backgroundColor = '00aeef'; // ff5110

export default props => h.div('.testimonials', [
  h.blockquote([
    h.img({ src: imgMatureBlondeWoman }),
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
    h.img({ src: imgBlondeWoman }),
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
    h.img({ src: imgBrunetteWoman }),
    h.div('.main', [
      h.header('I was in complete shock.'),
      h.p('When I got my Deluxe Archetype Report, I was in complete shock as I read it.. I just found its accuracy so hard to believe - there are things in here about me that not even my husband knows, but you do!'),
      h.footer([
        h.div('.name', 'Elizabeth Cagiano'),
        h.div('.info', 'Business Analyst, Ohio, USA'),
      ]),
    ]),
  ]),
  h.blockquote([
    h.img({ src: imgBlackWoman }),
    h.div('.main', [
      h.header('Future predictions are right on!'),
      h.p('I was a total skeptic about this… so it’s saying A LOT when I admit I am stunned by the Deluxe Archetype Report! And the specific and detailed predictions from last month to today are spot on'),
      h.footer([
        h.div('.name', 'Rachel Hoffman'),
        h.div('.info', 'Nurse, Los Angeles, USA'),
      ]),
    ]),
  ]),
  h.blockquote([
    h.img({ src: imgBlondeWomanWithBook }),
    h.div('.main', [
      h.header('There’s no way you could possibly know this about me.'),
      h.p('I was truly astounded by the reading! It felt so ‘weird’ but extremely revealing at the same time! I mean, I as I read I just kept asking: How could you possibly know this about me?'),
      h.footer([
        h.div('.name', 'Sabrina Zachary'),
        h.div('.info', 'Orthodontist, Philadelphia, USA'),
      ]),
    ]),
  ]),
  h.blockquote([
    h.img({ src: imgWhiteMaleInStudio }),
    h.div('.main', [
      h.header('Found incredible success!'),
      h.p('Your reading showed me abilities that I have but never realized. With this new information I was able to tap into them and grow my business to new heights! Thank you for this amazing reading!'),
      h.footer([
        h.div('.name', 'David Wilkinson'),
        h.div('.info', 'Business Owner, England, UK'),
      ]),
    ]),
  ]),
]);
