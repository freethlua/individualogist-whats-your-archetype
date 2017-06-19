import hs from 'preact-hyperstyler';
import archetypes from '../../data/archetypes';
import styles from './style.styl';
import * as assets from './assets'

const h = hs(styles);

export default archetype => h.div('.container', [
  h.div('.heading', `Your archetype is: ${archetypes[archetype].title}`),
  h.img({ src: assets[`archetype-${archetype}.png`] })
]);
