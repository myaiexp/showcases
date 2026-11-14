// Fuse.js example: findAllMatches on and off, side by side, with highlights and scores
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reading to the end of the line',
  summary:
    'findAllMatches makes Fuse.js keep scanning each text to the end instead of stopping at its best spot. Run the same pantry lists both ways: the highlights stay the same, but look-alike words further on drag some scores down.',
  section: 'Fuzzy Search',
  tags: ['findAllMatches', 'includeMatches', 'includeScore'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/src/types.ts', 'repo/src/search/bitap/search.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
