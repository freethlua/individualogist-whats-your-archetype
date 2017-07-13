import { Component } from 'preact';
import h from 'preact-hyperscript-h';
import archetypes from '../data/archetypes';

/* quick-fix for making this render only once in the apps life cycle */
let clickmagickRenderedOnce = false;

export default class extends Component {
  componentWillMount() {
    this.setState({ clickmagickRenderedOnce });
  }
  componentDidMount() {
    this.setState({ clickmagickRenderedOnce });
  }
  render() {
    const components = [];

    if (this.props.quizData && this.props.quizData.archetype) {
      if (this.state.clickmagickRenderedOnce) {
        console.log('Debug:', 'clickmagick already rendered once, skipping this');
      } else {
        console.log('Debug:', 'clickmagick being rendered for the first time');
        clickmagickRenderedOnce = true;
        const clickmagick = h.img('.clickmagick', {
          src: archetypes[this.props.quizData.archetype].clickmagick.imgSrc,
        });
        components.push(clickmagick);
      }
    }
    return h.div('.tracking', components);
  }
}
