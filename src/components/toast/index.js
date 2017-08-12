import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import styles from './style.styl';

const h = hs(styles);

export default class extends Component {
  componentDidMount() {
    this.setTimeout()
  }
  setTimeout() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(::this.hide, this.props.timeout || 3000);
  }
  show() {
    this.setState({ visible: true });
    if (this.props.onhide) {
      this.props.onhide();
    }
    clearTimeout(this.timeout);
  }
  hide() {
    this.setState({ hidden: true, visible: false });
    if (this.props.onhide) {
      this.props.onhide();
    }
    clearTimeout(this.timeout);
  }
  render() {
    const visible = this.state.visible || !(this.state.hidden || this.props.hidden);
    return h.div('.toast', [h.div({
      onclick: ::this.hide,
      style: {
        opacity: visible && 1 || 0,
        // 'pointer-events': visible && 'initial' || 'none',
      },
      onmouseenter: ::this.show,
      onmouseleave: ::this.setTimeout,
    }, this.props.children)]);
  }
};
