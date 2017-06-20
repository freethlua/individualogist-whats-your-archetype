import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import linkstate from 'linkstate';
import markup from 'preact-markup';
import fadeImage from '../fade-image';
import styles from './style.styl';

const h = hs(styles);

export default class Slider extends Component {
  componentWillMount() {
    this.changeBackground();
    document.body.onkeyup = e => e.keyCode === 32 && this.playPause();
  }
  componentWillUnmount() {
    delete document.body.onkeyup;
  }

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
      this.setState({
        audioPaused: false,
        lastBackgroundChangeTime: +new Date(),
      });
    } else {
      this.audioEl.pause();
      this.setState({
        audioPaused: true,
        lastBackgroundChangeTime: +new Date(),
      });
    }
  }

  changeBackground() {
    if (!this.state.lastBackgroundChangeTime || (this.state.lastBackgroundChangeTime + 4000 < new Date())) {
      const cbg = this.state.currentBackgroundIndex || 0;
      const nbg = cbg >= 4 ? 1 : cbg + 1;
      this.setState({
        background: require(`../../assets/images/backgrounds/quiz-slider-${nbg}.jpg`),
        currentBackgroundIndex: nbg,
        lastBackgroundChangeTime: +new Date(),
      });
    }
  }

  componentWillUpdate() {
    this.changeBackground();
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

    return h.div('.wrapper', [h.div('.container', [
      h.header([
        h.img({ src: require(`../../assets/images/logos/large-text.png`) }),
      ]),
      h.div('.content', { onclick: e => this.playPause() }, [
        h.div('.play-pause', { class: this.state.audioPaused ? 'visible' : '' }),
        h.div('.text', [this.state.currentLine
          ? h(markup, { markup: this.state.currentLine })
          // ? h.pre(JSON.stringify(this.state.currentLine, null, 2))
          : h.p('Loading...'),
        ]),
        h.div('.image', [
          h.div('.background', [h(fadeImage, { src: this.state.background })]),
          // h.div('.background', [h.img({ src: this.state.background })]),
          h.div('.foreground', [this.state.img && h(fadeImage, { src: this.state.img })]),
          // h.div('.foreground', [this.state.img && h.img({ src: this.state.img })]),
        ]),
        h.audio({
          // controls: true,
          src: audio,
          ref: ref => this.audioEl = ref,
          ontimeupdate: e => {
            const currentTime = e.target.currentTime;
            for (const line of transcript) {
              if (currentTime < line.end) {
                let currentLine = line.text;
                if (this.state.currentLine === currentLine) {

                } else {
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
                  // this.changeBackground();
                  this.setState({ currentTime, currentLine })
                }
                break;
              }
            }
          },
        }),
      ]),
      h.div('.rest', [
        h.div('.action-1', [
          h.div('.img', [h.img({ src: require(`../../assets/images/pop-up/new-deluxe-archetype-report-with-bonuses.png`) }),]),
          h.div([
            h.p(`Get Your Deluxe Archetype Report For Only $37.00 Now!`),
            h.button('Click Here To Order Now'),
          ]),
        ]),
      ]),
      // h.pre([JSON.stringify(this.state, null, 1)]),
    ])]);
  }
}
