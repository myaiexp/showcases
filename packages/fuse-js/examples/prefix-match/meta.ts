// Fuse.js example: ^ keeps items that start with a word, !^ the ones that do not
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Starts with, or does not',
  summary:
    'A "^" before a word means the name has to begin with it, so "The Java Book" no longer counts as Java. "!^" turns it around and keeps everything that does not begin that way.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', '^', '!^', 'prefix-exact-match', 'inverse-prefix-exact-match'],
  docs: ['repo/docs/extended-search.md', 'repo/src/search/extended/matchers.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
