// Fuse.js example: the docs' own extended-search book queries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three queries, three kinds of answer',
  summary:
    'The queries from the Fuse.js docs run over a small shelf of books: one that starts with a word and roughly matches another, one that rules a word out, and one that accepts either of two groups.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', 'keys', '^', '!', '$', '|'],
  docs: ['repo/docs/extended-search.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
