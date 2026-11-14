// Fuse.js example: = keeps only items that are exactly the word
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Only the whole word',
  summary:
    'A plain search for "scheme" also lights up Schema, Scheduler and even Chemistry. Put "=" in front and Fuse.js keeps only the item that is exactly that word, nothing longer, nothing misspelt.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', '=', 'exact-match'],
  docs: ['repo/docs/extended-search.md', 'repo/src/search/extended/matchers.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
