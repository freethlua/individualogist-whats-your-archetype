import h from 'preact-hyperscript-h';
import archetypes from '../data/archetypes';

/* quick-fix for making this render only once in the apps life cycle */
let clickmagickRenderedOnce = false;

export default props => {
  const components = [];

  if (props.quizData && props.quizData.archetype && !clickmagickRenderedOnce) {
    clickmagickRenderedOnce = true;
    const clickmagick = h.img('.clickmagick', {
      src: archetypes[props.quizData.archetype].clickmagick.imgSrc,
    });
    components.push(clickmagick);
  }

  return h.div('.tracking', components);
};
