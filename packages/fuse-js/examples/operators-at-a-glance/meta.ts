// Fuse.js example: the eight extended-search operators on one list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Search operators at a glance',
  summary:
    'Eight tiny symbols in front of or behind a word change how Fuse.js matches it: exactly, anywhere, never, at the start, at the end. Watch the same eighteen names light up differently for each one.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', '=', "'", '!', '^', '$', 'operators'],
  docs: ['repo/docs/extended-search.md', 'repo/README.md', 'repo/src/search/extended/matchers.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
