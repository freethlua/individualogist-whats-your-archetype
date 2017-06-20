import hs from 'preact-hyperstyler';
import archetypes from '../../data/archetypes';
import styles from './style.styl';

const h = hs(styles);

export default props =>  h.div('.wrapper', [ h.div('.container', [
  h.div('.heading', [
    h.label('Your archetype is: '),
    h.span(archetypes[props.archetype].title),
  ]),
  h.img('.archetype', { src: require(`../../assets/images/archetype-icons/${props.archetype}.png`) }),
  h.p('.intro', [`Dear `, h.strong(props.archetype), `, we have so much to tell you about who you are, what you're great at, what you're not so great at... But we can't fit everything into a single page. So, we've put everything into a FREE downloadable report! We're not expecting anything in return, but it would tickle us pink if you'd be kind enough to share this quiz with your friends and family! If not, just scroll on down to gain instant access to your FREE archetype report!`]),
  h.div('.box', [
    h.p([`Everything You Need To Know About `, h.strong(archetypes[props.archetype].title), `... in One Free Report`]),
    h.p([`We've prepared a FREE detailed report telling you about your love, health, and wealth, just for you!`]),
    h.ul([
      h.li(`Discover your life journey as a Lover and how you can leverage on your strengths to achieve greatness!`),
      h.li(`Gain valuable insight into your special skills and innate abilities!`),
      h.li(`Find out how you can use the Lover archetype to overcome anything that life throws at you!`),
    ]),
  ]),
  h.div('.preview', [
    h.div([h.img({ src: require('../../assets/images/misc/preview-page-3a.jpg') })]),
    h.div([h.img({ src: require(`../../assets/images/archetypes/covers/${props.archetype}.jpg`) })]),
    h.div([h.img({ src: require('../../assets/images/misc/preview-page-4a.jpg') })]),
  ]),
  h.div('.form-conainer', [
    h.p([`Download Your Report On `, h.strong(archetypes[props.archetype].title), ` Archetype`]),
    h.p([`Want to find out more about your archetype? Download your FREE report now! (Only One Step)`]),
    props.form,
  ]),
])]);
