import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import commentLogo from './assets/comment-logo.png';
import styles from './style.styl';

const h = hs(styles);

export default h(class comments extends Component {
  componentDidMount() {
    this.update();
  }
  componentDidUpdate() {
    this.update();
  }
  update() {
    window.FB && window.FB.XFBML.parse(this.ref);
  }
  render() {
    return h.div('.outer', {
      ref: ref => this.ref = ref,
    }, [h.div('.container', [
      h.img({ src: commentLogo }),
      h.div('.heading', 'What archetype did you get? Let us know in the comments below!'),
      h.div('.fb-comments', {
        href: 'http://individualogist.com/whats-your-archetype/',
        numPosts: 5,
        // width: '100%',
        orderBy: 'reverse_time'
      }),
    ])]);
  }
});
