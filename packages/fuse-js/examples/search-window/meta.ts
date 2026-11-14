// Fuse.js example: the search window around location, drawn on a character ruler
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Why a word late in the text goes missing',
  summary:
    'A sentence laid out letter by letter with a ruler. The shaded window is the stretch Fuse.js is willing to look in. The word "zero" sits just outside it, so the default search misses it until you widen the window.',
  section: 'Fuzzy Search',
  tags: ['threshold', 'distance', 'location', 'ignoreLocation', 'includeMatches'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
