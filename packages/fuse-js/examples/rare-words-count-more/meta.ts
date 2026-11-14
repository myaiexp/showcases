// Fuse.js example: rare query words weigh more than common ones in token search
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rare words count for more',
  summary:
    'In a recipe list where "chicken" is everywhere and "saffron" is rare, a recipe with only saffron outranks one with only chicken. The bars show how common each query word is, worked out from the recipes themselves.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'threshold', 'includeScore', 'includeMatches'],
  docs: ['repo/docs/token-search.md', 'repo/src/search/token/index.ts', 'repo/src/search/token/InvertedIndex.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
