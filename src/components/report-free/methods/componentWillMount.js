import throttle from 'throttleit';
import archetypes from '../../../data/archetypes';

import transcriptsToJson from '../../../utils/otranscribe-txt-to-json';
const transcriptsDir = 'transcripts-otranscribe';
// import transcriptsToJson from '../../utils/duration-based-to-json';
// const transcriptsDir = 'transcripts-duration-based';

export async function componentWillMount() {
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
    this.audioSrc = require(`../../../assets/audios/${audioName}.mp3`);
  } catch (error) {
    console.error(error);
    this.error = `Cannot load the audio file: '${audioName}.mp3'`;
    return;
  }

  try {
    this.transcript = this.parseTranscript(await
      import (`../../../assets/${transcriptsDir}/${audioName}.txt`));
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
