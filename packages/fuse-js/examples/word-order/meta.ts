// Fuse.js example: the order of the query words does not change token search results
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Word order does not matter',
  summary:
    'Swap the words of a query and a normal Fuse.js search reshuffles its results, because it reads the query as one phrase. Token search treats the words as a set, so the ranking stays the same.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'threshold', 'includeMatches'],
  docs: ['repo/docs/token-search.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
