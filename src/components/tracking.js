import h from 'preact-hyperscript-h';
import archetypes from '../data/archetypes';

export default props => h.div('.tracking', [
  //
  props.quizData && props.quizData.archetype && h.img('.clickmagick', {
    src: archetypes[props.quizData.archetype].clickmagick.imgSrc,
  }),
]);
