import { Component, render, h } from 'preact';
import fade from 'fade';
// import simpleFade from 'simple-fade';

export default class extends Component {
  componentWillReceiveProps(newProps = {}) {
    if (!this.state) this.state = {};
    if (!this.containerEl) return;
    this.setState({ lastProps: newProps });
    if ('changed' in this.props && this.firstTime === false && this.props.changed === newProps.changed) return;
    this.firstTime = false;
    const newEl = render(
      h(
        this.props.tagName || 'div',
        Object.assign(newProps, {
          style: 'position:absolute',
        }),
        newProps.children || []
      ),
      this.containerEl
    );
    fade.out(newEl, 0, () => fade.in(newEl));
    // simpleFade.fadeIn(1000, newEl);
    if (this.containerEl.childNodes.length > 1) {
      for (const node of this.containerEl.childNodes) {
        if (node !== newEl) {
          // simpleFade.fadeOut(200, node, () => node.remove());
          fade.out(node, 500, () => node.remove());
          // fade.out(node, 200, () => node.remove());
        }
      }
    }
  }

  shouldComponentUpdate() { return false }

  render() {
    return h('div', {
      ref: ref => this.containerEl = ref,
      style: 'position: relative'
    }, []);
  }
}
