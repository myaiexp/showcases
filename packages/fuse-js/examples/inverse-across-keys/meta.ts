// Fuse.js example: an inverse term checks every key of an item
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hiding a word everywhere it hides',
  summary:
    'Search books by title and author and hide "scalzi": the book he wrote disappears, not just the one with his name in the title. A "!" word is checked in every field, and any hit drops the item.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', '!', 'keys', 'inverse-match'],
  docs: ['repo/docs/extended-search.md', 'repo/CHANGELOG.md', 'repo/src/core/index.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
