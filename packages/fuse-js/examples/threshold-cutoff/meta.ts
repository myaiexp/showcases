// Fuse.js example: every item's match score on one axis with a sweeping threshold line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Where the cutoff falls',
  summary:
    'Every fruit gets a score for the query "aple", from 0 (perfect) to 1 (nothing alike). The threshold is a line across that scale: drag it and the fruits past it drop out of the results.',
  section: 'Fuzzy Search',
  tags: ['threshold', 'includeScore', 'search'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/docs/articles/how-fuzzy-search-works.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
