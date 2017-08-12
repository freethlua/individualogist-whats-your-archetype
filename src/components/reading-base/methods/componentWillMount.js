import throttle from 'throttleit';
import archetypes from '../../../data/archetypes';

import { transcriptsDir } from '../../../utils/transcripts'

export async function componentWillMount() {

  const { audioName } = this.props;

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
