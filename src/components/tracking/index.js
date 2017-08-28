import { Component } from 'preact';
import h from 'preact-hyperscript-h';
import archetypes from '../../data/archetypes';

/* quick-fix for making this render only once in the apps life cycle */
let clickmagickRenderedOnce = false;
// later edit: this has been moved to appState for persistence. i.e. it now only renders once EVER

export default class extends Component {
  componentWillMount() {
    this.setState({ clickmagickRenderedOnce });
  }
  componentDidMount() {
    this.setState({ clickmagickRenderedOnce });
  }
  render() {
    const components = [];

    if (this.props.formData && this.props.formData.email) {
      if (this.state.clickmagickRenderedOnce || this.props.clickmagickRenderedOnce) {
        console.log('Debug:', 'clickmagick already rendered once, skipping this');
      } else {
        console.log('Debug:', 'clickmagick being rendered for the first time');
        clickmagickRenderedOnce = true;
        // this.props.clickmagickRendered({ clickmagickRenderedOnce });
        const clickmagick = h.img('.clickmagick', {
          src: archetypes[this.props.quizData.archetype].clickmagick.imgSrc,
          onload: this.props.clickmagickRendered,
        });
        components.push(clickmagick);
      }
    }
    return h.div('.tracking', components);
  }
}
