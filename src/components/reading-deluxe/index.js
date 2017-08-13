import { Component } from 'preact';
import { route } from 'preact-router';
import Youtube from 'react-youtube';
import hs from 'preact-hyperstyler';
import archetypes from '../../data/archetypes';
import component from '..';
import styles from './style.styl';

const h = hs(styles);

export default class extends Component {
  render() {
    if (!this.props.quizData || !this.props.quizData.archetype) {
      return route('/quiz');
    } else if (!this.props.formData || !this.props.aweberSuccess) {
      return route('/intro');
    }

    if (this.error) {
      return h.pre(this.error);
    }

    const ribbon = h.div('.ribbon', [
      h.img({ src: require('../../assets/images/pop-up/60-day-money-back-guarantee.png') }),
      h.p('Take your time to look through your Deluxe Archetype Report and everything else that comes with it. If you decide within the next 60 days that you’re not completely satisfied with your Deluxe Archetype Report, just drop us an e-mail at contact@individualogist.com and we’ll issue you a full refund. No questions nor explanations will be necessary.'),
      h.p('I’m making this guarantee because I’m 100% certain that this report has the capacity to truly turn your life around. That’s how much I believe in the process of individuation, and that’s how much I believe you will benefit from it. So, no matter what, you’ve got the longer end of the stick. There is absolutely no risk involved, and it’s all up to you and whether you decide to take this life-changing path.'),
    ]);

    const action1 = h.div('.action-1', [
      h.div('.img', [h.img({ src: require('../../assets/images/pop-up/new-deluxe-archetype-report-with-bonuses-small.png') })]),
      h.div([
        h.p('Get Your Deluxe Archetype Report For Only $37.00 Now!'),
        h.a({ href: archetypes[this.props.quizData.archetype].clickbank.link }, [h.button(['Click Here To Order Now'])]),
      ]),
    ]);

    const testimonial1 = h.div('.testimonial', [
      h.p('“Reading it felt almost as if I was reliving my entire life. What’s even crazier is that it showed me things about myself that I didn’t even know before!”'),
      h('div.youtube', [
        h(Youtube, { videoId: 'jWWB3adrqro' }),
        // h.iframe({ src: 'https://www.youtube.com/watch?v=jWWB3adrqro', width: 420 }),
      ]),
    ]);

    const action2 = h.div('.action-2', [
      h.div('.img', [h.img({ src: require('../../assets/images/pop-up/new-deluxe-archetype-report-with-bonuses-large.png') })]),
      h.div('.side', [
        h.div('.heading', 'Get Your Deluxe Archetype Report For Only $37.00 Now!'),
        h.div('.delivery', [
          h.div('.label', [
            h.div('Delivery E-mail:'),
            h.div('Full name:'),
          ]),
          h.div('.data', [
            h.div(this.props.formData.email),
            h.div(this.props.formData.name),
          ])
        ]),
        h.a({ href: archetypes[this.props.quizData.archetype].clickbank.link }, [h.button(['Order Now'])]),
        h.div('.shield', [
          h.img({ src: require('../../assets/images/pop-up/shield.png') }),
          h.p('All payments are secure'),
        ]),
        h.div('.footer', 'Order now and you’ll receive the Deluxe Archetype Report instantly. We know for a fact that you’ll gain an enormous amount of value from this detailed report. But  if you decide that this product isn’t for you, we’ll give you a 100% refund within the next 60 days of purchase. No questions asked.'),
      ]),
    ]);

    const restEl = h.div('.rest', [
      action1,
      testimonial1,
      action2,
      ribbon,
      h(component('testimonials')),
      action2,
      h(component('faqs')),
      action2,
    ]);

    return h.div('.wrapper.deluxe', [
      h(component('reading-base'), {
        audioName: 'follow-up' in this.props ? 'deluxe-archetype-follow-up-sales' : 'deluxe-archetype-sales',
        ...this.props,
      }),
      restEl,
    ]);
  }
}
