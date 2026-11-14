// Papa Parse example: teaching auto-detection about an unusual separator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Teach the guesser a new separator',
  summary:
    'Papa guesses among comma, tab, pipe, semicolon and two invisible separators. A file separated by "~" is not on the list, so the guess fails. Add it to delimitersToGuess and detection works again.',
  section: 'Parse config',
  tags: ['delimitersToGuess', 'auto-detect', 'UndetectableDelimiter'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
