// Fuse.js example: a custom sortFn that breaks ties by year
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Break ties your own way',
  summary:
    'Search a library by genre and several books score exactly the same. Fuse.js leaves ties in shelf order, but a sortFn can rank them by anything, here newest first.',
  section: 'Keys and results',
  tags: ['sortFn', 'shouldSort', 'includeScore', 'keys'],
  docs: ['repo/src/types.ts', 'repo/src/core/config.ts', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
