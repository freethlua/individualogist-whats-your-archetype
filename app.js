import { Component, render } from 'preact';
import parseSrt from 'parse-srt';
import markup from 'preact-markup';
import linkstate from 'linkstate';
import h from 'preact-hyperscript-h';

import Quiz from './components/quiz';
import Form from './components/form';
import Slider from './components/slider';

class App extends Component {
  render() {
    return !this.state.quizData
      ? h(Quiz, { onFinish: quizData => this.setState({ quizData }) })
      : !this.state.formData
      ? h(Form, { onSubmit: formData => this.setState({ formData }) })
      : h(Slider, this.state);
  }
}

render(h(App), document.body);
