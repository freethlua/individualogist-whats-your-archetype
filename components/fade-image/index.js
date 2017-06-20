import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import styles from './style.styl';

const h = hs(styles);

export default class extends Component {

  componentWillMount() {
    this.setState({
      src1: this.props.src,
      currIndex: 1,
    });
  }

  componentDidMount() {
    this.ref1.onload = () => this.setState({ class1: ['visible'] });
    this.ref2.onload = () => this.setState({ class2: ['visible'] });
  }


  componentWillReceiveProps() {
    const oldSrc = this.state['src' + this.state.currIndex];
    const newSrc = this.props.src;
    const same = newSrc === oldSrc
    console.log(`${newSrc} ${same?'==':'!='} ${oldSrc}`);
    if (!same) {
      const newState = this.state;
      const oldIndex = this.state.currIndex;
      const newIndex = oldIndex === 1 ? 2 : 1;
      newState.currIndex = newIndex;
      newState['src' + newIndex] = newSrc;
      this.setState(newState);
      this.ref1.onload = () => this.setState({ class1: ['visible'], class2: [] });
      this.ref2.onload = () => this.setState({ class2: ['visible'], class1: [] });
    } else {

    }
  }

  // shouldComponentUpdate() {
  //   return !this.state['src' + this.state.currIndex] || (this.props.src !== this.state['src' + this.state.currIndex])
  // }

  render() {
    return h.div('.container', [
      h.img('.img1', { ref: ref => this.ref1 = ref, src: this.state.src1, class: this.state.class1 }),
      h.img('.img2', { ref: ref => this.ref2 = ref, src: this.state.src2, class: this.state.class2 }),
      h.pre(JSON.stringify(this.state, null, 2)),
    ]);
  }
}
