import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import linkstate from 'linkstate';
import markup from 'preact-markup';
import styles from './style.styl';

const h = hs(styles);

export default class Slider extends Component {
  // componentWillMount() {
  //   if (!this.props || !this.props.archetype) {
  //     throw new Error('Need to have an archetype before this component could be rendered');
  //   }
  // }

  componentDidMount() {
    // fetch('assets/understanding-numerology.srt')
    //   .then(r => r.text())
    //   .then(parseSrt)
    //   .then(srt => {
    //     // console.log(`srt:`, srt);
    //     this.setState({ srt });
    //   })
    // this.audioElement.play()
  }

  render() {
    // console.log(`this.props:`, this.props);
    // const archetype = this.props.quizData.archetype;
    const archetype = 'hero';
    if (!archetype) {
      return 'Need to have an archetype before this component could be rendered';
    }

    let audio;
    try {
      audio = require(`../../assets/audios/${archetype}.mp3`);
    } catch (error) {
      return `Cannot load the audio file: '${archetype}.mp3'`;
    }

    let transcript;
    try {
      transcript = require(`../../assets/audios/${archetype}.json`);
    } catch (error) {
      return `Cannot load the transcript file: '${archetype}.json'`;
    }

    console.log(this.state.currentLine);

    return h.div([
      h.div({
        style: {
          width: '100%',
          height: '100vw',
        },
        onclick: e => {
          // console.log('hi');
          if (this.audioElement.paused) {
            this.audioElement.play();
          } else {
            this.audioElement.pause();
          }
        },
      }, [
        // this.state.currentTime,
        this.state.currentLine
        ? h(markup, { markup: this.state.currentLine })
        // ? h.pre(JSON.stringify(this.state.currentLine, null, 2))
        : h.p('Loading...'),
        // JSON.stringify(this.props.formData, null, 2)
      ]),
      h.audio({
        // controls: true,
        src: audio,
        ref: ref => this.audioElement = ref,
        ontimeupdate: e => {
          const currentTime = e.target.currentTime;
          for (const line of transcript) {
            if (currentTime < line.end) {
              let currentLine = line.text;
              for (const key of line.keys) {
                if (key.key) {
                  if (this.props.formData[key.key]) {
                    currentLine = currentLine.substring(0, key.index)
                      + this.props.formData[key.key]
                      + currentLine.substring(key.index);
                  }
                } else if (key.js) {
                  if (key.js.fn) {
                    if (this[key.js.fn]) {
                      this[key.js.fn](key.js);
                    }
                  }
                }
              }
              this.setState({ currentTime, currentLine })
              break;
            }
          }
        },
      })
    ])
  }
}
