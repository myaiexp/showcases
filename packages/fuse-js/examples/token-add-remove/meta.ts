// Fuse.js example: the token index follows fuse.add and fuse.remove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The ranking follows the collection',
  summary:
    'Add and remove recipes while a token search stays put. Once saffron is in several recipes it is no longer rare, so a recipe with only saffron loses its edge over one with only chicken.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'add', 'remove', 'setCollection'],
  docs: ['repo/docs/token-search.md', 'repo/src/search/token/InvertedIndex.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
