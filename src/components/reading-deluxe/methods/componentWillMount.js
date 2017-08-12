import throttle from 'throttleit';
import archetypes from '../../../data/archetypes';

import { transcriptsDir } from '../../../utils/transcripts'

export async function componentWillMount() {
  // window.title = this.props.quizData.archetype

  this.archetype = this.props.quizData.archetype;
  if (!this.archetype) {
    this.error = 'Need to have an archetype before this component could be rendered';
    return;
  }
  this.archetypeDetails = archetypes[this.archetype];

  this.audioName = this.archetype;
}
