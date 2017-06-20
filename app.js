import { Component, render } from 'preact';
import parseSrt from 'parse-srt';
import markup from 'preact-markup';
import linkstate from 'linkstate';
import hs from 'preact-hyperstyler';
import './handle-errors';
import 'ionicons/dist/css/ionicons.css'
import 'animate.css';
import '@font/nunito/light.css';
import * as cmp from './components';
import styles from './app.styl';

const h = hs(styles);

class App extends Component {
  render() {

    return h.div('.slider', [h(cmp.slider, {
      formData: {
        name: 'freeth'
      },
      quizData: {
        archetype: 'hero'
      }
    })]);

    const header = h.div('.header', [cmp.header]);
    const form = h.div('.form', [h(cmp.form, { onSubmit: formData => this.setState({ formData }) })]);
    const quiz = h.div('.quiz', [h(cmp.quiz, { onFinish: quizData => this.setState({ quizData }) })]);
    const reportIntro = h.div('.reportIntro', [h(cmp.reportIntro, { form, archetype: this.state && this.state.quizData && this.state.quizData.archetype })]);
    const slider = h.div('.slider', [h(cmp.slider, this.state)]);

    if (!this.state.quizData) {
      return h.div('.app', [header, quiz, cmp.comments]);
    } else {
      if (!this.state.formData) {
        return h.div('.app', [header, reportIntro, cmp.comments]);
      } else {
        return h.div('.app', [slider]);
      }
    }
  }
}

render(h(App), document.getElementById('whats-your-archetype_app') || document.body);
