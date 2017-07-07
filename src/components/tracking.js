import h from 'preact-hyperscript-h';
import archetypes from '../data/archetypes';

export default props => h('.tracking', [
  //
  props.quizData && props.quizData.archetype && h.img('.clickmagick', {
    src: archetypes[props.quizData.archetype].clickmagick.imgSrc,
  }),
]);
