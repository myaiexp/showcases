// Fuse.js example: a nested $and / $or query drawn as a tree of lit squares
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Queries inside queries',
  summary:
    'The docs\' nested query, "old war" AND (starts with "lock" OR lacks "arts"), drawn as a tree. Each node has a square per book, lit where that part keeps it, so you can see how an OR inside an AND narrows the list.',
  section: 'Logical Search',
  tags: ['$and', '$or', 'nesting', 'useExtendedSearch', 'search'],
  docs: ['repo/docs/logical-search.md', 'repo/docs/extended-search.md', 'repo/src/core/queryParser.ts', 'repo/src/core/index.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
