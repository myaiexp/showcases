// Fuse.js example: $and keeps only the books that match every clause
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Every clause must match',
  summary:
    'Pass Fuse an { $and: [...] } object instead of a string: a book is kept only when the author clause and the title clause both match. A tick table shows which clause let each book through.',
  section: 'Logical Search',
  tags: ['$and', 'logical query', 'keys', 'search'],
  docs: ['repo/docs/logical-search.md', 'repo/README.md', 'repo/src/core/queryParser.ts', 'repo/src/core/index.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
