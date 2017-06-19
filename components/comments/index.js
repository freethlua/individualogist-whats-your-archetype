import hs from 'preact-hyperstyler';
import commentLogo from '../../assets/archetype-comment1.png';
import styles from './style.styl';

const h = hs(styles);

export default h.div('.outer', [h.div('.container', [
  h.img({ src: commentLogo }),
  h.div('.heading', 'What archetype did you get? Let us know in the comments below!'),
  // // rendered statically outside of ths app, as it doesn't play well with dynamic DOM changes
  // h.div({
  //   ref: ref => this.ref = ref,
  //   'data-href': 'http://individualogist.com/whats-your-archetype/',
  //   'data-width': '100%',
  //   'data-numposts': 5,
  // }),
])]);
