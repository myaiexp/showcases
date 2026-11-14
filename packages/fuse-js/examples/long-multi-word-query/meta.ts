// Fuse.js example: a long multi-word query as one pattern against word by word
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Long queries, no problem',
  summary:
    'Type a six-word query. Read as one long phrase it only finds recipes that spell it out in that order; token search matches each short word on its own and finds the recipe that mentions them all in any order.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'threshold', 'minMatchCharLength', 'includeMatches'],
  docs: ['repo/docs/token-search.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
