// Papa Parse example: UndetectableDelimiter and the fallback delimiter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One column and no delimiter to find',
  summary:
    'Papa guesses the delimiter when you do not give one. A list with a single column gives it nothing to go on, so it adds an UndetectableDelimiter error and falls back to a comma. The rows are still right; the error is only a heads-up.',
  section: 'Results',
  tags: ['UndetectableDelimiter', 'Delimiter', 'errors', 'meta.delimiter', 'delimiter detection'],
  docs: ['repo/docs/docs.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
