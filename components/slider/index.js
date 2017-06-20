import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import linkstate from 'linkstate';
import markup from 'preact-markup';
import fadeImage from '../fade-image';
import styles from './style.styl';

const h = hs(styles);

export default class Slider extends Component {
  // componentWillMount() {
  //   if (!this.props || !this.props.archetype) {
  //     throw new Error('Need to have an archetype before this component could be rendered');
  //   }
  // }

  componentDidMount() {
    this.audioEl.play()
  }

  cueAction(action, opts, transcriptLine) {
    this[action](opts, transcriptLine);
  }

  displayImage(opts, transcriptLine) {
    try {
      this.setState({ img: require(`../../assets/` + opts.path) });
    } catch (error) {
      this.setState({ img: '' });
      console.error(error);
    }
  }

  playPause() {
    if (this.audioEl.paused) {
      this.audioEl.play();
    } else {
      this.audioEl.pause();
    }
  }

  render() {
    const archetype = this.props.quizData.archetype;
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

    // console.log(this.state.currentLine);

    return h.div([
      h.div({
        onclick: e => this.playPause(),
      }, [
        // this.state.currentTime,
        this.state.currentLine
        ? h(markup, { markup: this.state.currentLine })
        // ? h.pre(JSON.stringify(this.state.currentLine, null, 2))
        : h.p('Loading...'),
        // JSON.stringify(this.props.formData, null, 2)
      ]),
      this.state.img && h.div({ onclick: e => this.playPause() }, [h(fadeImage, {
        src: this.state.img,
        ref: ref => this.imgEl = ref,
      })]),
      h.audio({
        // controls: true,
        src: audio,
        ref: ref => this.audioEl = ref,
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
                  this.cueAction(key.js.fn, key.js, line);
                }
              }
              this.setState({ currentTime, currentLine })
              break;
            }
          }
        },
      }),
      h.pre([JSON.stringify(this.state, null, 1)]),
    ])
  }
}
