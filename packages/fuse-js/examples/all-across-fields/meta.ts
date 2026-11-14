// Fuse.js example: tokenMatch all gathers the query words across a record's fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Words spread across fields',
  summary:
    'Search products for "red shirt" in filter mode. A product named "Red" whose description says "cotton shirt" qualifies, because each word only has to appear somewhere in the record.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'tokenMatch', 'keys', 'includeMatches'],
  docs: ['repo/docs/token-search.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
