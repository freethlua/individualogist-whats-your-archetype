import { Component, render } from 'preact';
import hs from 'preact-hyperstyler';
import 'ionicons/dist/css/ionicons.css'
import 'animate.css';
import '@font/nunito/light.css';
import logo from '../../assets/individualogist-logo2.png';
import archetypes from './archetypes';
import questions from './questions';
import styles from './style.styl';

const h = hs(styles);


export default class Quiz extends Component {

  componentWillMount() { this.setState({ archetypes, questions }); }

  calcCqi() {
    for (let i = 0; i < this.state.questions.length; i++) {
      if (!this.state.questions[i].answer) {
        return i;
      }
    }
  }

  render() {
    const cqi = 'cqi' in this.state ? this.state.cqi : this.calcCqi();
    const form = h.div('.form', [
      h.input('.progress-bar', {
        type: 'range',
        max: this.state.questions.length - 1,
        step: 1,
        value: cqi,
        onchange: e => this.setState({ cqi: parseInt(e.target.value) }),
      }),
      h.ol(this.state.questions.map((q, qi) =>
        h.li({ class: { visible: cqi === qi } }, [
          h.label('.question', { for: `q[${qi}]` }, [h.span('.order', [`${qi+1}/${this.state.questions.length}`]), h.span('.question', [q.question])]),
          h.div('.answers', {}, q.answers.map((a, ai) => h.label('.answer', { for: `q[${qi}][${ai}]` }, [h.input({
            // class: { checked: this.state.questions[qi].ai === ai },
            checked: this.state.questions[qi].ai === ai,
            type: 'checkbox',
            id: `q[${qi}][${ai}]`,
            name: `q[${qi}]`,
            // value: Object.keys(a.points).map(t => `${t}=${a.points[t]}`).join(';'),
            onclick: e => {
              this.state.questions[qi].answer = a;
              this.state.questions[qi].ai = ai;
              this.setState({ qi, ai, questions: this.state.questions });
              this.setState({ cqi: this.calcCqi() });
              if (typeof this.state.cqi === 'undefined') {
                for (const question of this.state.questions) {
                  for (const archetype in question.answer.points) {
                    const points = question.answer.points[archetype];
                    this.state.archetypes.points = (this.state.archetypes.points || 0) + points;
                  }
                }
                const sortedArchetypes = Object.keys(this.state.archetypes).sort((a, b) =>
                  this.state.archetypes[a] > this.state.archetypes[b]
                  ? 1
                  : this.state.archetypes[a] < this.state.archetypes[b]
                  ? -1
                  : 0
                );
                this.setState({
                  sortedArchetypes,
                  archetype: this.state.archetypes[sortedArchetypes[0]],
                });
                setTimeout(() => this.props.onFinish(this.state), 333);
              }
            }
          }), a.answer])))
        ])))
    ]);

    return h.div('.main', [
      h.header([
        h.img({ src: logo }),
        h.h1('.heading', 'FREE PERSONALITY READING'),
        h.p('.subtitle', 'What’s Your Archetype?'),
        h.p('.subtext', 'Individuation Archetype Explorer®'),
      ]),

      h.div('.intro.animated.slideInDown', [
        h.p('.ion-ios-timer-outline', 'Takes less than 60 seconds'),
        h.p('.ion-ios-color-wand-outline', 'Only 6 questions'),
        h.p('.ion-ios-heart-outline', 'Honesty leads to accuracy'),
      ]),

      form,
    ]);
  }
}
