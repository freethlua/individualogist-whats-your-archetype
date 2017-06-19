import { Component, render } from 'preact';
import hs from 'preact-hyperstyler';
import archetypes from '../../data/archetypes';
import questions from '../../data/questions';
import styles from './style.styl';

const h = hs(styles);

export default class Quiz extends Component {

  componentWillMount() {
    this.setState({ archetypes, questions });
    this.refs = { li: [] };
  }

  calcCqi() {
    for (let i = 0; i < this.state.questions.length; i++) {
      if (!this.state.questions[i].answer) {
        return i;
      }
    }
  }

  render() {
    const cqi = 'cqi' in this.state ? this.state.cqi : this.calcCqi();

    return h.div('.container', [
      // h.pre('.debug', { style: 'position:fixed!important;bottom:0!important;right:0!important' }, JSON.stringify(this.state.questions.map(q => q.answer), null, 2))

      h.div('.intro.animated.slideInDown', [
        h.p('.ion-ios-timer-outline', 'Takes less than 60 seconds'),
        h.p('.ion-ios-color-wand-outline', 'Only 6 questions'),
        h.p('.ion-ios-heart-outline', 'Honesty leads to accuracy'),
      ]),

      h.div('.form', [
        h.input('.progress-bar', {
          type: 'range',
          max: this.state.questions.length - 1,
          step: 1,
          value: cqi,
          onchange: e => {
            const cqi = parseInt(e.target.value);
            for (let i = cqi; i < this.state.questions.length; i++) {
              delete this.state.questions[i].answer;
              delete this.state.questions[i].ai;
            }
            this.setState({ questions: this.state.questions, cqi });
          },
          ref: ref => this.refs.progressBar = ref,
        }),
        h.ol({
          style: {
            height: this.refs.li[cqi] ? this.refs.li[cqi].offsetHeight : '12.5em',
          }
        }, this.state.questions.map((q, qi) =>
          h.li({
            class: { visible: cqi === qi },
            ref: ref => this.refs.li[qi] = ref,
          }, [
            h.label('.question', { for: `q[${qi}]` }, [h.span('.order', [`${qi+1}/${this.state.questions.length}`]), h.span('.question', [q.question])]),
            h.div('.answers', {}, q.answers.map((a, ai) => h.label('.answer', { for: `q[${qi}][${ai}]` }, [h.input({
              // class: { checked: this.state.questions[qi].ai === ai },
              checked: this.state.questions[qi].ai === ai,
              type: 'checkbox',
              id: `q[${qi}][${ai}]`,
              name: `q[${qi}]`,
              // value: Object.keys(a.points).map(t => `${t}=${a.points[t]}`).join(';'),
              onclick: e => {
                if (cqi !== qi) {
                  return;
                }
                if (!this.state.scrolled) {
                  this.refs.progressBar.scrollIntoView({ behavior: 'smooth' });
                  this.setState({ scrolled: true });
                }
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
                    archetype: sortedArchetypes[0],
                  });
                  setTimeout(() => this.props.onFinish(this.state), 333);
                }
              }
            }), a.answer])))
          ])))
      ]),
    ]);
  }
}
