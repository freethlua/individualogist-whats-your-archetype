import hs from 'preact-hyperstyler';
import archetypes from '../../data/archetypes';
import styles from './style.styl';

const h = hs(styles);

export default archetype => h.div('.container', [
  h.div('.heading', [
    h.label('Your archetype is: '),
    h.span(archetypes[archetype].title),
  ]),
  h.img('.archetype', { src: require(`../../assets/images/archetypes/${archetype}.png`) }),
  h.p([`Dear `, h.strong(archetype), `, we have so much to tell you about who you are, what you're great at, what you're not so great at... But we can't fit everything into a single page. So, we've put everything into a FREE downloadable report! We're not expecting anything in return, but it would tickle us pink if you'd be kind enough to share this quiz with your friends and family! If not, just scroll on down to gain instant access to your FREE archetype report!`]),
]);
