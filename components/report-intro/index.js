import hs from 'preact-hyperstyler';
import archetypes from '../../data/archetypes';
import styles from './style.styl';
import md from 'preact-markdown';

const h = hs(styles);

export default props =>  h.div('.wrapper', [ h.div('.container', [
  h.div('.heading', [
    h.label('Your archetype is: '),
    h.span(archetypes[props.archetype].title),
  ]),
  h.img('.archetype', { src: require(`../../assets/images/archetype-icons/${props.archetype}.png`) }),
  h.p('.intro', [md(`Dear **${props.archetype}**, we have so much to tell you about who you are, what you're great at, what you're not so great at... But we can't fit everything into a single page. So, we've put everything into a **FREE** archetype reading! We're not expecting anything in return, but it would tickle us pink if you'd be kind enough to share this quiz with your friends and family! If not, just scroll on down to gain instant access to your **FREE** archetype reading!`)]),
  h.div('.box', [
    h.p([md(`Everything You Need To Know About **${archetypes[props.archetype].title}**... in One Free Archetype Reading`)]),
    h.p([md(`We've prepared a FREE detailed archetype reading telling you about your love, health, and wealth, just for you!`)]),
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
    h.p([md(`Instantly Access Your Free Personalized Archetype Reading On **${archetypes[props.archetype].title}** Archetype!`)]),
    h.p([md(`We'll send a downloadable version of your archetype reading straight to your e-mail (FREE)`)]),
    props.form,
  ]),
])]);
