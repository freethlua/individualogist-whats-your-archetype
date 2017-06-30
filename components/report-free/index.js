import { Component } from 'preact';
import URL from 'url';
import hs from 'preact-hyperstyler';
import quickHash from 'quick-hash';
import hh from 'preact-hyperscript-h';
import linkstate from 'linkstate';
import arrify from 'arrify';
import filterDuplicates from 'filter-duplicates';
import throttle from 'throttleit';
import markup from 'preact-markup';
import Youtube from 'react-youtube';
import Fade from 'preact-fade';
import archetypes from '../../data/archetypes';
import styles from './style.styl';

const h = hs(styles);

export default class ReportFree extends Component {
  componentWillMount() {

    // window.title = this.props.quizData.archetype

    this.archetype = this.props.quizData.archetype;
    if (!this.archetype) {
      return this.error = 'Need to have an archetype before this component could be rendered';
    }
    this.archetypeDetails = archetypes[this.archetype];

    try {
      this.audioSrc = require(`../../assets/audios/${this.archetype}.mp3`);
    } catch (error) {
      return this.error = `Cannot load the audio file: '${this.archetype}.mp3'`;
    }

    try {
      this.transcript = require(`../../assets/audios/${this.archetype}`);
    } catch (error) {
      return this.error = `Cannot load the transcript file: '${this.archetype}'`;
    }

    this.changeBackground();

    this.onkeydown = throttle(this.onkeydown, 200).bind(this);

    window.addEventListener('keydown', this.onkeydown.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onkeydown);
  }

  componentDidMount() {
    if ('dev' in url.query) {
      if ('seekTo' in url.query) {
        this.audioEl.currentTime = parseInt(url.query.seekTo, 10);
      }
    }
    this.ontimeupdate({ target: this.audioEl });
    this.playPause();
    window.scrollTo(0, 0);
  }

  onkeydown(e) {
    if (!this.mainContentEl) return
    if (window.pageYOffset > 500) return;
    if (e.keyCode === 32) {
      // space
      this.playPause();
    } else if (e.keyCode === 38 && e.ctrlKey) {
      // ctrl + up
      const before = this.audioEl.playbackRate;
      let after = before * 1.2;
      if (after > 4) after = 4;
      if (before < 1) after = 1;
      this.audioEl.playbackRate = after;
    } else if (e.keyCode === 40 && e.ctrlKey) {
      // ctrl + down
      const before = this.audioEl.playbackRate;
      let after = before * .9;
      if (after < .5) after = .5;
      if (before > 1) after = 1;
      this.audioEl.playbackRate = after;
    } else if (e.keyCode === 39) {
      // right
      this.audioEl.currentTime += e.shiftKey ? 20 : 5;
    } else if (e.keyCode === 37) {
      // left
      this.audioEl.currentTime -= e.shiftKey ? 20 : 5;
    } else if (e.keyCode === 190) {
      // period
      this.audioEl.currentTime = 0;
      this.audioEl.pause()
    } else {
      return
    }
    e.preventDefault();
    return false;
  }

  cueAction(action, opts, transcriptLine) {
    this[action](opts, transcriptLine);
  }

  displayImage(opts, transcriptLine) {
    if (opts.fadeOut) {
      this.hideImage();
    } else {
      try {
        if (opts.path.match('compatibility')) {
          opts.class = arrify(opts.class).concat(['compatibility']);
        }
        this.setState({
          img: require(`../../assets/` + opts.path),
          imgClass: opts.class || this.state.imgClass,
        });
      } catch (error) {
        this.hideImage();
        console.error(error);
      }
    }
  }
  hideImage() {
    this.setState({
      img: '',
      imgClass: [],
    });
  }


  playPause(playPause = true) {
    const oldState = this.audioEl.paused;
    if (playPause) {
      if (oldState) {
        this.audioEl.play();
      } else {
        this.audioEl.pause();
      }
    }
    const newState = this.audioEl.paused;
    this.setState({ audioPaused: newState });
    this.setState({ lastBackgroundChangeTime: +new Date() });
  }

  ontimeupdate(e = { target: {} }) {
    const currentTime = e.target.currentTime || 0;
    const percent = Math.round(100 * currentTime / e.target.duration || Infinity);
    for (let i = 0; i < this.transcript.length; i++) {
      const line = this.transcript[i];
      const nextLine = this.transcript[i + 1];
      const currentTimeEnd = line.end || nextLine && nextLine.start || Infinity;
      if (currentTime < (currentTimeEnd - 1)) {

        const prevLine = this.transcript[i - 1];
        const nextLine = this.transcript[i + 1];

        if (!line.class && prevLine && prevLine.class) {
          line.class = filterDuplicates(arrify(line.class).concat(arrify(prevLine.class)));
        }

        if (!prevLine) {
          this.hideImage();
        }

        let currentLine = line.text;
        if (this.state.currentLine === currentLine) {

        } else {
          let lastReplacement;
          for (const key of line.keys) {
            if (key.key) {
              const replacement = this.props.formData[key.key];
              if (replacement) {
                const index = key.index + (lastReplacement ? lastReplacement.length : 0);
                currentLine = currentLine.substring(0, index)
                  + replacement
                  + currentLine.substring(index);
              }
              lastReplacement = replacement;
            } else if (key.js) {
              if (key.js.path.match('compatibility')) {
                line.class = arrify(line.class).concat(['compatibility']);
              }
              this.cueAction(key.js.fn, key.js, line);
            } else {

            }
          }
          // currentLine = currentLine.replace(/([.?!]) /g, '$1<br />');
          // this.changeBackground();
          this.setState({
            currentTime,
            currentTimeEnd,
            currentPercent: percent,
            currentLine,
            currentLineOpts: line,
          })

          // preload next image(s)
          if (nextLine && nextLine.keys) {
            nextLine.keys.forEach(key => {
              if (key.js && key.fn === 'displayImage' && key.js.path) {
                const image = new Image();
                image.src = key.js.path;
              }
            })
          }
        }
        break;
      }
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
    const { archetype, audioSrc, transcript } = this;

    if (this.error) return h.pre(this.error);

    const audioEl = h.audio({
      // controls: true,
      src: audioSrc,
      ref: ref => this.audioEl = ref,
      ontimeupdate: e => this.ontimeupdate(e),
    });



    const headerEl = h.header([
      h.img({ src: require(`../../assets/images/logos/large-text.png`) }),
    ]);

    const mainContentEl = h.div({
      onclick: e => this.playPause(),
      class: [
        'content',
        'current-percent-' + this.state.currentPercent,
      ],
      style: { backgroundImage: `url(${this.state.background})` },
      ref: ref => this.mainContentEl = ref,
    }, [
      h.div('.play-pause', { class: this.state.audioPaused ? 'visible' : '' }),
      h.div('.text', [this.state.currentLine
        ? h(Fade, { changed: this.state.currentLine }, [h(markup, { markup: this.state.currentLine })])
        : h.p('Loading...'),
      ]),
      audioEl,
      h.div('.image', [
        h.div('.foreground', [h.div('.foreground-container', [
          h(Fade, {
            changed: this.state.img,
            fadeInDuration: '2000ms',
            fadeOutDuration: '1000ms',
          }, [h.div({
            class: ['img'].concat(this.state.imgClass || []),
            style: {
              backgroundImage: `url(${this.state.img})`
            },
          })])
        ])]),
      ]),
    ]);

    const restEl = h.div('.rest', [
      h.div('.action-1', [
        h.div('.img', [h.img({ src: require(`../../assets/images/pop-up/new-deluxe-archetype-report-with-bonuses.png`) }), ]),
        h.div([
          h.p(`Get Your Deluxe Archetype Report For Only $37.00 Now!`),
          h.a({ href: this.archetypeDetails.clickbank.link }, [h.button(['Click Here To Order Now'])]),
        ]),
      ]),
      h.div('.testimonial', [
        h.p(`“Reading it felt almost as if I was reliving my entire life. What’s even crazier is that it showed me things about myself that I didn’t even know before!”`),
        h('div.youtube', [
          h(Youtube, { videoId: 'jWWB3adrqro' }),
          // h.iframe({ src: 'https://www.youtube.com/watch?v=jWWB3adrqro', width: 420 }),
        ]),
      ]),
      h.div('.action-2', [
        h.div('.img', [h.img({ src: require(`../../assets/images/pop-up/new-deluxe-archetype-report-with-bonuses.png`) })]),
        h.div('.side', [
          h.div('.heading', `Get Your Deluxe Archetype Report For Only $37.00 Now!`),
          h.div('.delivery', [
            h.div('.label', [
              h.div('Delivery E-mail:'),
              h.div('Full name:'),
            ]),
            h.div('.data', [
              h.div(this.props.formData.email),
              h.div(this.props.formData.name),
            ])
          ]),
          h.a({ href: this.archetypeDetails.clickbank.link }, [h.button(['Order Now'])]),
          h.div('.shield', [
            h.img({ src: require('../../assets/images/pop-up/shield.png') }),
            h.p('All payments are secure'),
          ]),
          h.div('.footer', `Order now and you’ll receive the Deluxe Archetype Report instantly. We know for a fact that you’ll gain an enormous amount of value from this detailed report. But  if you decide that this product isn’t for you, we’ll give you a 100% refund within the next 60 days of purchase. No questions asked.`),
        ]),
      ]),
      h.div('.ribbon', [
        h.img({ src: require('../../assets/images/pop-up/60-day-money-back-guarantee.png') }),
        h.p(`Take your time to look through your Deluxe Archetype Report and everything else that comes with it. If you decide within the next 60 days that you’re not completely satisfied with your Deluxe Archetype Report, just drop us an e-mail at contact@individualogist.com and we’ll issue you a full refund. No questions nor explanations will be necessary.`),
        h.p(`I’m making this guarantee because I’m 100% certain that this report has the capacity to truly turn your life around. That’s how much I believe in the process of individuation, and that’s how much I believe you will benefit from it. So, no matter what, you’ve got the longer end of the stick. There is absolutely no risk involved, and it’s all up to you and whether you decide to take this life-changing path.`),
      ]),
    ]);

    return h.div('.wrapper', [h.div({
      class: ['container'].concat(arrify(this.state.currentLineOpts && this.state.currentLineOpts.class)),
    }, [
      headerEl,
      mainContentEl,
      restEl,
      h.pre([JSON.stringify(this.state, null, 1)]),
    ])]);
  }

}
