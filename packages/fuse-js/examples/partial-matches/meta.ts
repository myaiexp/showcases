// Fuse.js example: records matching only some query words rank below full matches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Near misses still show up',
  summary:
    'Search for three words and recipes that have only two of them still appear, ranked below the recipes that have all three. Coloured chips show which words each recipe contains.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'threshold', 'includeScore', 'includeMatches'],
  docs: ['repo/docs/token-search.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
