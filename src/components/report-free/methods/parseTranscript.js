import Mustache from 'mustache';
import transcriptsToJson from '../../../utils/otranscribe-txt-to-json';
const transcriptsDir = 'transcripts-otranscribe';
// import transcriptsToJson from '../../../utils/duration-based-to-json';
// const transcriptsDir = 'transcripts-duration-based';

export function parseTranscript(str) {
  return transcriptsToJson(str).map(line => {
    line.parsed = Mustache.parse(line.text);
    return line;
  });
}
