import { Component, render } from 'preact';
import parseSrt from 'parse-srt';
import markup from 'preact-markup';
import linkstate from 'linkstate';
import h from 'preact-hyperscript-h';

class Form extends Component {
  render() {
    return h.form({
      onsubmit: e => {
        e.preventDefault();
        this.props.updateFormData(this.state);
      }
    }, [
      h.input({
        placeholder: 'Enter your name',
        onchange: linkstate(this, 'name'),
      }),
      h.input({
        placeholder: 'Enter your DOB in MM/DD/YYY format:',
        onchange: linkstate(this, 'dob'),
      }),
      h.button('Submit'),
    ]);
  }
}

class Slider extends Component {
  componentDidMount() {
    fetch('assets/understanding-numerology.srt')
      .then(r => r.text())
      .then(parseSrt)
      .then(srt => {
        // console.log(`srt:`, srt);
        this.setState({ srt });
      })
    this.ref.play()
  }

  render() {
    return h.div([
      h.div({
        style: {
          width: '100%',
          height: '100vw',
        },
        onclick: e => {
          // console.log('hi');
          if (this.ref.paused) {
            this.ref.play();
          } else {
            this.ref.pause();
          }
        },
      }, [
        // this.state.currentTime,
        this.state.currentSrt
          ? h(markup, { markup: this.state.currentSrt })
          : h.p('Loading...'),
        // JSON.stringify(this.props.formData, null, 2)
      ]),
      h.audio({
        // controls: true,
        src: 'assets/understanding-numerology.mp3',
        ref: ref => this.ref = ref,
        ontimeupdate: e => {
          const currentTime = e.target.currentTime;
          if (this.state.srt) {
            for (const srt of this.state.srt) {
              if (currentTime < srt.end) {
                // let currentSrt = srt.text;
                // const variable = currentSrt.match(/\{\{(.*)\}\}/g)
                const currentSrt = srt.text
                  .replace(/\{\{name\}\}/g, `"${this.props.formData.name}"`)
                this.setState({ currentTime, currentSrt });
                break;
              }
            }
          }
        },
      })
    ])
  }
}

class App extends Component {
  render() {
    return h.div([
      // h.header('Logo/header'),
      this.state.formData
      ? h(Slider, { formData: this.state.formData })
      : h(Form, { updateFormData: formData => this.setState({ formData }) }),
    ]);
  }
}

render(h(App), document.body)
