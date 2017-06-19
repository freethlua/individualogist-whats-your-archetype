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
    return h.div('.app', [
      h.div('.header', [cmp.header]),
      h.div('.component', [!this.state.quizData
        ? h(cmp.quiz, { onFinish: quizData => this.setState({ quizData }) })
        : !this.state.formData
        ? h.div('.section', [
          cmp.reportIntro(this.state.quizData.archetype)
        ])
        // ? h.div(['Form'])
        // : h(cmp.Slider, this.state)
        : h.div(['Slider'])
      ]),
      cmp.comments,
    ]);
  }
}

render(h(App), document.getElementById('whats-your-archetype_app') || document.body);
