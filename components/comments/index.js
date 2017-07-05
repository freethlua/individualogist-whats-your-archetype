import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import commentLogo from './assets/comment-logo.png';
import styles from './style.styl';

const h = hs(styles);

// //connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=247959338893932

// export default


export default h(class comments extends Component {
  componentDidMount() { this.update() }
  componentDidUpdate() { this.update() }
  update() { window.FB && window.FB.XFBML.parse(this.ref) }
  render() {
    return h.div('.outer', {
      ref: ref => this.ref = ref,
    }, [h.div('.container', [
      h.img({ src: commentLogo }),
      h.div('.heading', 'What archetype did you get? Let us know in the comments below!'),
      h.div('.fb-comments', {
        'data-href': 'http://individualogist.com/whats-your-archetype/',
        numPosts: 5,
        // width: '100%',
      }),
    ])]);
  }
});
