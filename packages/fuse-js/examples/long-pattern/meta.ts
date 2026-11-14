// Fuse.js example: a search pattern longer than 32 characters, cut into chunks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A query longer than 32 letters',
  summary:
    'Fuse.js works on 32 letters at a time, but a longer query does not fail: it is cut into overlapping pieces of 32 and each piece is searched on its own. A line matches when any piece does, and the score is the average of the pieces.',
  section: 'Fuzzy Search',
  tags: ['Fuse.match', 'threshold', 'ignoreLocation', 'includeMatches'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/docs/articles/how-fuzzy-search-works.md', 'repo/src/search/bitap/index.ts', 'repo/src/search/bitap/search.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
