// Fuse.js example: a custom tokenize regex keeps node.js, c++ and paths in one piece
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keep node.js and c++ in one piece',
  summary:
    'The default tokenizer chops "node.js" into "node" and "js" and reduces "c++" to a lone "c". A custom regex keeps such words whole, so the search finds the real thing. Untick the g flag to see the regex quietly stop after the first word.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'tokenize', 'threshold', 'includeMatches'],
  docs: ['repo/docs/token-search.md', 'repo/src/search/token/analyzer.ts', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
