// Fuse.js example: $ keeps files that end with a word, !...$ the ones that do not
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ends with, or does not',
  summary:
    'Put a "$" after a file ending and Fuse.js lights only the files that end that way: .ts, .test.ts, .md. A "!" in front hides them instead, so "!.go$" is every file that is not Go.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', '$', '!…$', 'suffix-exact-match', 'inverse-suffix-exact-match'],
  docs: ['repo/docs/extended-search.md', 'repo/src/search/extended/matchers.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
