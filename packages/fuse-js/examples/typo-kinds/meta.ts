// Fuse.js example: four kinds of typo of one word, each scored with Fuse.match
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Four ways to mistype a word',
  summary:
    'A wrong letter, an extra letter, a missing letter, two letters swapped. Fuse.js still matches all four, and the score tells how far off each is. A swap in the middle of a word costs the most, because it counts as two mistakes.',
  section: 'Fuzzy Search',
  tags: ['Fuse.match', 'includeMatches', 'ignoreLocation', 'threshold'],
  docs: ['repo/docs/articles/how-fuzzy-search-works.md', 'repo/docs/fuzzy-search.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
