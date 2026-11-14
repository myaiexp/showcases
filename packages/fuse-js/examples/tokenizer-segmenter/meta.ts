// Fuse.js example: a function tokenizer built on Intl.Segmenter for Japanese text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Searching text without spaces',
  summary:
    'Japanese sentences have no spaces between words. A query like "Tokyo and Osaka" typed in Japanese finds nothing by default; a tokenizer built on the browser\'s Intl.Segmenter splits it into words and finds both cities.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'tokenize', 'threshold', 'includeMatches'],
  docs: ['repo/docs/token-search.md', 'repo/src/search/token/analyzer.ts', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
