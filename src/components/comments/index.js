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
    if (window.isDev || this.ref && this.ref.querySelector('iframe')) {
      return;
    }
    console.log('rendering FB comments...');
    // window.FB.XFBML.parse(this.ref);
    clearTimeout(this.timeout);
    // this.timeout = setTimeout(() => this.update(), 2000);
    this.timeout = setTimeout(() => {
      window.FB.XFBML.parse(this.ref);
      setTimeout(() => this.update(), 2000);
    }, 2000);
    // if (!window.isDev && !this.rendered && !this.ref.querySelector('iframe')) {
    //   console.log('rendering FB comments...');
    //   window.FB.XFBML.parse(this.ref);
    //   setTimeout(() => this.update(), 300);
    //   this.rendered = true;
    // }
  }
  render() {
    return h.div('.outer', {
      ref: ref => this.ref = ref,
    }, [h.div('.container', [
      // h.img({ src: commentLogo }),
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
