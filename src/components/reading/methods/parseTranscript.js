import Mustache from 'mustache';
import { transcriptsToJson } from '../../../utils/transcripts'

export function parseTranscript(str) {
  return transcriptsToJson(str).map(line => {
    line.parsed = Mustache.parse(line.text);
    return line;
  });
}
