import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import { route } from 'preact-router';
import archetypes from '../../data/archetypes';
import styles from './style.styl';
import md from 'preact-markdown';

const h = hs(styles);

export default props => {
  const redirecting = props.redirect();
  if (redirecting) return redirecting;

  const archetypeDetails = archetypes[props.quizData.archetype];

  if (!archetypeDetails) {
    console.log(`props:`, props);
    throw new Error('no')
    return h.pre(`Invalid archetype: '${props.quizData.archetype}'`);
  }

  return h.div('.wrapper', [h.div('.container', [
    h.div('.heading', [
      h.label('Your archetype is: '),
      h.span(archetypes[props.quizData.archetype].title),
    ]),
    h.img('.archetype', { src: require(`../../assets/images/archetype-icons/${props.quizData.archetype}.png`) }),
    h.p('.intro', [md(`Dear **${props.quizData.archetype}**, we have so much to tell you about who you are, what you're great at, what you're not so great at... But we can't fit everything into a single page. So, we've put everything into a **FREE** archetype reading! We're not expecting anything in return, but it would tickle us pink if you'd be kind enough to share this quiz with your friends and family! If not, just scroll on down to gain instant access to your **FREE** archetype reading!`)]),
    h.div('.box', [
      h.h1([md(`Everything You Need To Know About **${archetypes[props.quizData.archetype].title}**... in One Free Archetype Reading`)]),
      h.h2([md('We\'ve prepared a FREE detailed archetype reading telling you about your love, health, and wealth, just for you!')]),
      h.ul([
        h.li([md(`Discover your life journey as a **${archetypes[props.quizData.archetype].title.replace('The ', '')}** and how you can leverage on your strengths to achieve greatness!`)]),
        h.li([md('Gain valuable insight into your special skills and innate abilities!')]),
        h.li([md(`Find out how you can use **${archetypes[props.quizData.archetype].title}** archetype to overcome anything that life throws at you!`)]),
      ]),
      h.div('.preview', [
        h.div([h.img({ src: require('../../assets/images/misc/preview-page-3a.jpg') })]),
        h.div([h.img({ src: require(`../../assets/images/archetypes/covers/${props.quizData.archetype}.jpg`) })]),
        h.div([h.img({ src: require('../../assets/images/misc/preview-page-4a.jpg') })]),
      ]),
    ]),
    h.div('.form-conainer', [
      h.p([md(`Instantly Access Your Free Personalized Archetype Reading On **${archetypes[props.quizData.archetype].title}** Archetype!`)]),
      h.p([md('We\'ll send a downloadable version of your archetype reading straight to your e-mail (FREE)')]),
      props.form,
    ]),
  ])]);
};
