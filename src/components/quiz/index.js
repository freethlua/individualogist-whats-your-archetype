import { Component, render } from 'preact';
import hs from 'preact-hyperstyler';
import throttle from 'throttleit';
import archetypes from '../../data/archetypes';
import questions from '../../data/questions';
import styles from './style.styl';

const h = hs(styles);

export default class Quiz extends Component {
  componentWillMount() {
    this.setState({ archetypes, questions });
    this.refs = { li: [] };

    this.onkeydown = throttle(e => {
      if (window.pageYOffset > 500) {
        return;
      }
      if (e.keyCode === 39) {
        // right
        this.setState({ cqi: Math.min((this.state.cqi || 0) + 1, this.state.questions.length - 1) });
      } else if (e.keyCode === 37) {
        // left
        this.setState({ cqi: Math.max((this.state.cqi || 0) - 1, 0) });
      } else {
        return;
      }
      e.preventDefault();
      return false;
    }, 200);

    window.addEventListener('keydown', this.onkeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onkeydown);
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

    return h.div('.wrapper', [h.div('.container', [
      // h.pre('.debug', { style: 'position:fixed!important;bottom:0!important;right:0!important' }, JSON.stringify(this.state.questions.map(q => q.answer), null, 2))

      h.h1([
        h.span('.color', 'Unravel The Mysteries '),
        h.span('of Your '),
        h.span('.color', 'True Self '),
        h.span('By Taking This 60-Second Quiz'),
      ]),

      // h.div('.intro.animated.slideInDown', [
      //   h.p('.ion-ios-timer-outline', 'Takes less than 60 seconds'),
      //   h.p('.ion-ios-color-wand-outline', 'Only 6 questions'),
      //   h.p('.ion-ios-heart-outline', 'Honesty leads to accuracy'),
      // ]),

      h.div('.form', {
        ref: ref => this.formEl = ref,
      }, [
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
            height: this.refs.li[cqi] ?
              this.refs.li[cqi].offsetHeight + 'px' :
              '12.5em',
          }
        }, this.state.questions.map((q, qi) =>
          h.li({
            class: { visible: cqi === qi },
            ref: ref => this.refs.li[qi] = ref,
          }, [
            h.label('.question', { for: `q[${qi}]` }, [h.span('.order', [`${qi + 1}/${this.state.questions.length}`]), h.span('.question', [q.question])]),
            h.div('.answers', {}, q.answers.map((a, ai) => h.label('.answer', { for: `q[${qi}][${ai}]` }, [h.input({
              // class: { checked: this.state.questions[qi].ai === ai },
              checked: this.state.questions[qi].ai === ai,
              type: 'checkbox',
              id: `q[${qi}][${ai}]`,
              name: `q[${qi}]`,
              // value: Object.keys(a.points).map(t => `${t}=${a.points[t]}`).join(';'),
              ref: ref => ref && (cqi === qi && ai === 0) && (this.firstCheckEl = ref),
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
                      this.state.archetypes[archetype].points = (this.state.archetypes[archetype].points || 0) + points;
                    }
                  }
                  const sortedArchetypes = Object.keys(this.state.archetypes).sort((a, b) => (this.state.archetypes[b].points || 0) - (this.state.archetypes[a].points || 0));
                  this.setState({
                    sortedArchetypes,
                    archetype: sortedArchetypes[0],
                    archetypes: this.state.archetypes,
                  });
                  setTimeout(() => this.props.onFinish(this.state), 333);
                  // console.log(this.state);
                }
              }
            }), a.answer])))
          ])))
      ]),
    ])]);
  }

  componentDidUpdate() {
    // console.log(`this.firstCheckEl:`, this.firstCheckEl);
    if (this.firstCheckEl) {
      this.firstCheckEl.focus();
    }
  }

  componentDidMount() {
    if (this.firstCheckEl) {
      this.firstCheckEl.focus();
    }
  }
}

// make "enter" check the checkbox
document.addEventListener('keypress', e => {
  if (e.target.nodeName.toLowerCase() === 'input' && e.target.getAttribute('type').toLowerCase() === 'checkbox') {
    if (e.keyCode === 13) {
      e.target.click();
      // e.preventDefault();
    }
  }
});
