import Mustache from 'mustache';
import JSON from 'json5';
import arrify from 'arrify';
import filterDuplicates from 'filter-duplicates';

import { transcriptsDir } from '../../../utils/transcripts'

export async function ontimeupdate() {
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
    // this.hideImage();
    this.setState({ freeReadingEnded: true, ready: false });
    this.audioEl.src = require('../../../assets/audios/deluxe-archetype-sales.mp3');
    console.log('Deluxe audio loaded');
    // this.deluxe = true;
    try {
      this.transcript = this.parseTranscript(await
        import (`../../../assets/${transcriptsDir}/deluxe-archetype-sales.txt`));
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

  const currentLineHasNoClass = !line.class;
  let currentLineHasBeenAddedWithImpliedClass;
  let currentLineHasFadeOutImage;

  const currentLineRaw = line.text || '';
  let imageDisplayedInThisLine = false;
  const locals = Object.assign({
    fn: () => (mustacheText, renderMustache) => {
      let mustacheParsed;
      try {
        mustacheParsed = JSON.parse(renderMustache(mustacheText));
      } catch (error) {
        error.message = `Couldn't parse '${mustacheText}'. ` + error.message;
        throw error;
      }
      const { fn, ...opts } = mustacheParsed;
      if (typeof this[fn] === 'function') {
        console.log(`Executing function: ${fn}(…opts)`, opts);
        const result = this[fn](opts);
        console.log(`result:`, result);
        if (result) {

        }
      } else {
        console.log(`No function found, setting state {${fn}: …opts}`, opts);
        this.mustacheSetState(fn, opts);
      }
    },
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
    // this.hideImage();
  }
}
