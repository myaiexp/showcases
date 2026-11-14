// Papa Parse example: Papa.DefaultDelimiter, the delimiter used when detection fails
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The delimiter used when detection fails',
  summary:
    'Papa guesses among commas, tabs, pipes, semicolons and two invisible separators. Text split by anything else gets no guess, and Papa.DefaultDelimiter, a comma unless you change it, steps in. Set it, parse, and put it back.',
  section: 'Extras',
  tags: ['Papa.DefaultDelimiter', 'UndetectableDelimiter', 'delimiter detection', 'delimitersToGuess'],
  docs: ['repo/docs/docs.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
