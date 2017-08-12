import Mustache from 'mustache';
import JSON from 'json5';
import arrify from 'arrify';
import delay from 'promise-delay';
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
    this.props.onended();
    return;
  }

  const currentTime = (this.audioEl.currentTime || 0);

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
      let renderedText, mustacheParsed;
      try {
        renderedText = renderMustache(mustacheText);
        mustacheParsed = JSON.parse(renderedText);
      } catch (error) {
        error.message = `Couldn't parse: \n===\n`
          + `mustacheText: ${mustacheText}\n===\n`
          + `renderedText: ${renderedText}\n===\n`
          + error.message;
        if (isDev) {
          this.pause();
          throw error;
        }
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

    const diff = this.audioEl.currentTime - currentTimeStart;
    if (diff) {
      console.log('Audio not in sync', diff);
      // await delay(1000 * diff);
      // this.audioEl.currentTime = currentTimeStart;
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
