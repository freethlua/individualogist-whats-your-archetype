import { Component } from 'preact';
import { route } from 'preact-router';
import hs from 'preact-hyperstyler';
import arrify from 'arrify';
import filterDuplicates from 'filter-duplicates';
import throttle from 'throttleit';
import markup from 'preact-markup';
import markdown from 'preact-markdown';
import Youtube from 'react-youtube';
import Mustache from 'mustache';
import JSON from 'json5';
import delay from 'promise-delay';
import tweenr from 'tweenr';
import Fade from '../fade';
import archetypes from '../../data/archetypes';
import fixSubdomain from '../../utils/fix-subdomain';
import testimonials from '../testimonials';
import deluxeFaqs from '../deluxe-faqs';
import sliderPausePopup from '../slider-pause-popup';
import styles from './style.styl';

const h = hs(styles);

import transcriptsToJson from '../../utils/otranscribe-txt-to-json';
const transcriptsDir = 'transcripts-otranscribe';
// import transcriptsToJson from '../../utils/duration-based-to-json';
// const transcriptsDir = 'transcripts-duration-based';

// autoPlay(true);

export default class ReportFree extends Component {
  async componentWillMount() {
    // window.title = this.props.quizData.archetype

    this.archetype = this.props.quizData.archetype;
    if (!this.archetype) {
      this.error = 'Need to have an archetype before this component could be rendered';
      return;
    }
    this.archetypeDetails = archetypes[this.archetype];

    let audioName;
    if ('deluxe' in url.query || this.props.deluxe) {
      this.deluxe = true;
      audioName = 'deluxe-archetype-follow-up-sales';
    } else {
      audioName = this.archetype;
    }

    try {
      this.audioSrc = require(`../../assets/audios/${audioName}.mp3`);
    } catch (error) {
      console.error(error);
      this.error = `Cannot load the audio file: '${audioName}.mp3'`;
      return;
    }

    try {
      this.transcript = this.parseTranscript(await
        import (`../../assets/${transcriptsDir}/${audioName}.txt`));
    } catch (error) {
      error.message = `Cannot load the transcript for: '${audioName}'. ${error.message}`
      throw error
    }

    this.changeBackground();

    this.onkeydown = throttle(this.onkeydown, 200).bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.onclick = this.onclick.bind(this);

    window.addEventListener('keydown', this.onkeydown);
    window.addEventListener('beforeunload', this.onbeforeunload);
    window.addEventListener('click', this.onclick);

    this.ready();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onkeydown);
    window.removeEventListener('beforeunload', this.onbeforeunload);
    window.removeEventListener('click', this.onclick);
  }

  async ready() {
    await delay(1000);
    console.log('document.readyState:', document.readyState);
    if ('dev' in url.query) {
      if ('seekTo' in url.query) {
        this.audioEl.currentTime = parseInt(url.query.seekTo, 10);
      } else if ('seekToIndex' in url.query) {
        let index = parseInt(url.query.seekToIndex, 10);
        if (index < 0) {
          index += this.transcript.length;
        }
        this.setState({ currentTranscriptIndex: index });
      }
    }

    await this.ontimeupdate();
    this.playPause();
    window.scrollTo(0, 0);
    this.setState({ ready: true });
  }

  onkeydown(e) {
    if (!this.mainContentEl) {
      return;
    }
    if (window.pageYOffset > 500) {
      return;
    }
    if (e.keyCode === 32) {
      // space
      this.playPause();
    } else if (e.keyCode === 38 && e.ctrlKey) {
      // ctrl + up
      const before = this.audioEl.playbackRate;
      let after = before * 1.2;
      if (after > 4) {
        after = 4;
      }
      if (before < 1) {
        after = 1;
      }
      this.audioEl.playbackRate = after;
    } else if (e.keyCode === 40 && e.ctrlKey) {
      // ctrl + down
      const before = this.audioEl.playbackRate;
      let after = before * 0.9;
      if (after < 0.5) {
        after = 0.5;
      }
      if (before > 1) {
        after = 1;
      }
      this.audioEl.playbackRate = after;
    } else if (e.keyCode === 39) {
      // right
      this.audioEl.currentTime += e.shiftKey ? 20 : 5;
      this.setState({ currentTimeEnd: null, currentTranscriptIndex: null });
    } else if (e.keyCode === 37) {
      // left
      this.audioEl.currentTime -= e.shiftKey ? 20 : 5;
      this.setState({ currentTimeEnd: null, currentTranscriptIndex: null });
    } else if (e.keyCode === 190) {
      // period
      this.audioEl.currentTime = 0;
      this.audioEl.pause();
    } else {
      return;
    }
    e.preventDefault();
    return false;
  }

  onbeforeunload(e) {
    if (window.isDev) {
      return;
    }
    if (this.redirectInitiated) {
      return;
    }
    if (this.justClicked) {
      return;
    }
    setTimeout(() => {
      this.redirectInitiated = true;
      // location.assign(fixSubdomain(`/deluxe-archetype-report-${this.archetype}-reading-3/?name=${this.props.formData.name}&email=${this.props.formData.email}`));
      const redirectUrl = fixSubdomain(`/deluxe-archetype-report-${this.archetype}-reading-3/?name=${this.props.formData.name}&email=${this.props.formData.email}`);
      const dialogText = 'CLAIM YOUR $10 DISCOUNT NOW\nGET THE DELUXE ARCHETYPE REPORT TODAY!';
      if (confirm(dialogText)) {
        location.assign(redirectUrl);
      } else {
        this.redirectInitiated = false;
      }
      location.assign(redirectUrl);
      // route(`/deluxe-archetype-report-${this.archetype}-reading-3/`);
    }, 1000);
    // const dialogText = 'CLAIM YOUR $10 DISCOUNT NOW\nGET THE DELUXE ARCHETYPE REPORT TODAY!';
    const dialogText = '********************************\n\nATTENTION!!!! \n\nDo not leave this page\n\nClaim your exclusive offer today\n\n\********************************';
    e.returnValue = dialogText;
    return dialogText;
  }

  onclick(e) {
    this.justClicked = true;
    setTimeout(() => this.justClicked = false, 100);
  }

  cueAction(action, opts, transcriptLine) {
    this[action](opts, transcriptLine);
  }

  mustacheFunction(fn) {
    return () => (mustacheText, renderMustache) => this[fn](JSON.parse(renderMustache(mustacheText)));
  }

  async displayImage(opts, transcriptLine) {
    if (opts.fadeOut) {
      this.hideImage();
    } else {
      try {
        this.setState({
          img: await
          import ('../../assets/' + opts.path),
        });
      } catch (error) {
        console.error(error);
        this.hideImage();
      }
    }
  }
  hideImage() {
    this.setState({
      img: '',
      imgClass: [],
    });
  }

  pausePopup() {
    if (!this.pausePopupFlag) {
      this.pause();
      this.pausePopupFlag = true;
    }
  }

  confirmToContinue(opts) {
    if (!this.pausePopupFlag) {
      this.pausePopupFlag = true;
      this.pause({ tween: false }, () => {
        this.setState({
          sliderPausePopup: {
            show: true,
            ...opts,
            done: () => {
              this.play();
              this.setState({ sliderPausePopup: null });
            },
          }
        });
      });
    }
    return ''
  }

  play({
    updateState = true,
    tween = true,
    tweenDuration = tween ? 1 : 0,
  } = {}, callback = typeof arguments[0] === 'function' && arguments[0]) {
    if (!this.audioEl) {
      return;
    }
    this.audioEl.volume = 0;
    this.audioEl.currentTime = this.state.currentTimeStart;
    this.audioEl.play();
    tweenr().to(this.audioEl, {
      volume: 1,
      duration: tweenDuration,
    }).on('complete', () => {
      if (callback) {
        callback();
      }
    });
    if (updateState) {
      this.setState({ audioPaused: false });
    }
  }
  pause({
    updateState = true,
    tween = true,
    tweenDuration = tween ? 1 : 0,
  } = {}, callback = typeof arguments[0] === 'function' && arguments[0]) {
    if (!this.audioEl) {
      return;
    }
    tweenr().to(this.audioEl, {
      volume: 0,
      duration: tweenDuration,
      ease: 'expo-out',
    }).on('complete', () => {
      this.audioEl.pause();
      if (callback) {
        callback();
      }
    });
    if (updateState) {
      this.setState({ audioPaused: true });
    }
  }

  playPause(playPause = true) {
    if (!this.audioEl) {
      return;
    }
    const oldState = this.audioEl.paused;
    if (playPause) {
      if (oldState) {
        this.play();
      } else {
        this.pause({ tweenDuration: 0.2 });
      }
    }
    this.setState({ lastBackgroundChangeTime: Number(new Date()) });
  }

  parseTranscript(str) {
    return transcriptsToJson(str).map(line => {
      line.parsed = Mustache.parse(line.text);
      return line;
    });
  }


  currentTranscriptIndexFinder(currentTime = 0, currentTranscriptIndex = 0) {
    const line = this.transcript[currentTranscriptIndex];
    const nextLine = this.transcript[currentTranscriptIndex + 1];
    const prevLine = this.transcript[currentTranscriptIndex - 1];
    const currentTimeStart = line.start || prevLine && prevLine.end || 0;
    const currentTimeEnd = line.end || nextLine && nextLine.start || (nextLine && nextLine.end && line.start) || Infinity;
    if (currentTime < currentTimeEnd) {
      return {
        currentTranscriptIndex,
        line,
        nextLine,
        prevLine,
        currentTimeStart,
        currentTimeEnd,
      }
    } else {
      return this.currentTranscriptIndexFinder(currentTime, currentTranscriptIndex + 1);
    }
  }


  async ontimeupdate() {
    // console.log('ontimeupdate');
    if (!this.audioEl) {
      console.debug(`ontimeupdate fired without audioEl`);
      return;
    }
    if (this.audioEl.ended) {
      console.log(`Audio ended`);
      if (this.deluxe) {
        console.log(`Deluxe audio ended`);
        return;
      }
      this.hideImage();
      this.setState({ freeReadingEnded: true, ready: false });
      this.audioEl.src = require('../../assets/audios/deluxe-archetype-sales.mp3');
      console.log('Deluxe audio loaded');
      try {
        this.transcript = this.parseTranscript(await
          import (`../../assets/${transcriptsDir}/deluxe-archetype-sales.txt`));
      } catch (error) {
        error.message = `Cannot load the transcript for: 'deluxe-archetype-sales'. ${error.message}`
        throw error
      }
      this.setState({ freeReadingEnded: true, ready: true, currentTimeEnd: null, currentTranscriptIndex: null });
      setTimeout(() => this.audioEl.play());
      return;
    }

    const currentTime = this.audioEl.currentTime || 0;

    if (this.state.currentTimeStart && isDev) {
      // console.log(`time since currentTimeStart:`, currentTime - this.state.currentTimeStart);
    }

    if (this.state.currentTimeEnd && currentTime < this.state.currentTimeEnd) {
      return;
    }
    // console.log('ontimeupdate');

    this.pausePopupFlag = false;

    const percent = Math.round(100 * currentTime / this.audioEl.duration || Infinity);

    const {
      line,
      prevLine,
      nextLine,
      currentTimeStart,
      currentTimeEnd,
      currentTranscriptIndex,
    } = this.currentTranscriptIndexFinder(
      currentTime,
      (this.state && this.state.currentTranscriptIndex && (this.state.currentTranscriptIndex + 1)) || 0
    );

    if (!line) {
      return;
    }

    // if (!line.text) {
    //   console.log('Line has no text', {
    //     line,
    //     prevLine,
    //     nextLine,
    //     currentTimeStart,
    //     currentTimeEnd,
    //     currentTranscriptIndex,
    //   });
    //   return;
    // }

    // console.log(`line:`, line);
    const currentLineHasNoClass = !line.class;
    let currentLineHasBeenAddedWithImpliedClass;
    let currentLineHasFadeOutImage;

    const currentLineRaw = line.text || '';
    let imageDisplayedInThisLine = false;
    const locals = Object.assign({
      displayImage: () => (text, render) => {
        imageDisplayedInThisLine = true;
        if (this.state.currentLineRaw !== currentLineRaw) {
          const data = JSON.parse(render(text));
          if (
            data.path.match('compatibility')
            && (!line.class || !line.class.includes('compatibility'))
            && data.fadeIn
          ) {
            line.class = arrify(line.class).concat(['compatibility']);
            currentLineHasBeenAddedWithImpliedClass = true;
          }
          if (data.fadeOut) {
            currentLineHasFadeOutImage = true;
          }
          this.displayImage(data, line);
        }
      },
      pausePopup: () => this.pausePopup(),
      confirmToContinue: this.mustacheFunction('confirmToContinue'),
    }, this.props.formData, this.props.quizData);

    const currentLine = Mustache.render(currentLineRaw, locals, locals);

    if (this.state.currentLine === currentLine) {} else {
      let lastReplacement;
      if (currentLineHasNoClass && !currentLineHasBeenAddedWithImpliedClass && !currentLineHasFadeOutImage && prevLine && prevLine.class) {
        line.class = filterDuplicates(arrify(line.class).concat(arrify(prevLine.class)));
      }

      this.setState({
        currentLineOpts: line,
        currentTime,
        currentTimeStart,
        currentTimeEnd,
        currentPercent: percent,
        currentLine,
        currentLineRaw,
        currentTranscriptIndex,
      });
    }

    if (!prevLine && !imageDisplayedInThisLine) {
      this.hideImage();
    }
  }

  changeBackground() {
    if (!this.state.lastBackgroundChangeTime || this.state.lastBackgroundChangeTime + 4000 < new Date()) {
      const cbg = this.state.currentBackgroundIndex || 0;
      const nbg = cbg >= 4 ? 1 : cbg + 1;
      this.setState({
        background: require(`../../assets/images/backgrounds/quiz-slider-${nbg}.jpg`),
        currentBackgroundIndex: nbg,
        lastBackgroundChangeTime: Number(new Date()),
      });
    }
  }

  componentWillUpdate() {
    this.changeBackground();
  }

  render() {
    if (!this.props.quizData) {
      return route('/quiz');
    } else if (!this.props.formData || !this.props.aweberSuccess) {
      return route('/intro');
    }

    const { archetype, audioSrc, transcript } = this;

    if (this.error) {
      return h.pre(this.error);
    }

    const audioEl = h.audio({
      src: audioSrc,
      ref: ref => this.audioEl = ref,
      ontimeupdate: e => this.ontimeupdate(),
    });

    const headerEl = h.header([
      h.img({ src: require('../../assets/images/logos/large-text.png') }),
    ]);

    const mainContentEl = h.div({
      onclick: e => this.playPause(),
      class: [
        'slider',
        'content',
        // 'current-percent-' + this.state.currentPercent,
      ],
      style: { backgroundImage: `url(${this.state.background})` },
      ref: ref => this.mainContentEl = ref,
    }, [
      h.div('.current-percent', { style: { width: `${this.state.currentPercent}%` } }),
      headerEl,
      h.h1([
        h.span('.name', this.props.formData.name + '\'s'),
        h.span('.rest', 'Archetype Reading'),
      ]),
      h.div('.image', [
        h.div('.foreground', [
          Fade(h.img({ src: this.state.img, key: this.state.img }))
        ]),
      ]),
      h.div('.text', [
        Fade(h(markup, { markup: this.state.currentLine || '', key: this.state.currentLine }))
      ]),
      audioEl,
      h.img('.play-pause', { src: require('../../assets/images/misc/play-pause.png'), class: this.state.audioPaused ? 'visible' : '' }),
    ]);

    const ribbon = h.div('.ribbon', [
      h.img({ src: require('../../assets/images/pop-up/60-day-money-back-guarantee.png') }),
      h.p('Take your time to look through your Deluxe Archetype Report and everything else that comes with it. If you decide within the next 60 days that you’re not completely satisfied with your Deluxe Archetype Report, just drop us an e-mail at contact@individualogist.com and we’ll issue you a full refund. No questions nor explanations will be necessary.'),
      h.p('I’m making this guarantee because I’m 100% certain that this report has the capacity to truly turn your life around. That’s how much I believe in the process of individuation, and that’s how much I believe you will benefit from it. So, no matter what, you’ve got the longer end of the stick. There is absolutely no risk involved, and it’s all up to you and whether you decide to take this life-changing path.'),
    ]);

    const action1 = h.div('.action-1', [
      h.div('.img', [h.img({ src: require('../../assets/images/pop-up/new-deluxe-archetype-report-with-bonuses-small.png') })]),
      h.div([
        h.p('Get Your Deluxe Archetype Report For Only $37.00 Now!'),
        h.a({ href: this.archetypeDetails.clickbank.link }, [h.button(['Click Here To Order Now'])]),
      ]),
    ]);

    const testimonial1 = h.div('.testimonial', [
      h.p('“Reading it felt almost as if I was reliving my entire life. What’s even crazier is that it showed me things about myself that I didn’t even know before!”'),
      h('div.youtube', [
        h(Youtube, { videoId: 'jWWB3adrqro' }),
        // h.iframe({ src: 'https://www.youtube.com/watch?v=jWWB3adrqro', width: 420 }),
      ]),
    ]);

    const action2 = h.div('.action-2', [
      h.div('.img', [h.img({ src: require('../../assets/images/pop-up/new-deluxe-archetype-report-with-bonuses-large.png') })]),
      h.div('.side', [
        h.div('.heading', 'Get Your Deluxe Archetype Report For Only $37.00 Now!'),
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
        h.div('.footer', 'Order now and you’ll receive the Deluxe Archetype Report instantly. We know for a fact that you’ll gain an enormous amount of value from this detailed report. But  if you decide that this product isn’t for you, we’ll give you a 100% refund within the next 60 days of purchase. No questions asked.'),
      ]),
    ]);

    const restEl = h.div('.rest', [
      action1,
      testimonial1,
      action2,
      ribbon,
      h(testimonials),
      action2,
      h(deluxeFaqs),
      action2,
    ]);

    return h.div('.wrapper', [h.div({
      class: ['container']
        .concat(arrify(this.state.currentLineOpts && this.state.currentLineOpts.class))
        .concat([this.state.freeReadingEnded && 'free-reading-ended'].filter(Boolean))
        .concat([this.state.sliderPausePopup && 'slider-paused'].filter(Boolean))
    }, [
      mainContentEl,
      (this.state.freeReadingEnded || this.deluxe) && restEl,
      this.state.sliderPausePopup && h.div('.sliderPausePopup', [h(sliderPausePopup, this.state.sliderPausePopup)]),
      //
      isLocalhost && h.textarea([JSON.stringify(this.state, null, 1)]),
    ])]);
  }
}
