// Fuse.js example: the default tokenizer finds words in Cyrillic, Greek, Arabic and more
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Every alphabet works out of the box',
  summary:
    'A small list of greetings in Russian, Greek, Arabic, Hebrew and Hindi. Token search finds the words in each script with no setup, where a tokenizer written for English letters would see an empty query.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'tokenize', 'threshold', 'includeMatches'],
  docs: ['repo/docs/token-search.md', 'repo/src/search/token/analyzer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
