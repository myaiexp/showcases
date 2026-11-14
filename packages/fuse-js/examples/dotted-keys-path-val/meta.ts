// Fuse.js example: $path and $val for fields whose names contain a dot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fields with a dot, in a logical query',
  summary:
    'When an author object has fields literally called "first.name" and "last.name", a logical query points at them with $path and $val. Misspell both names ("jon", "scazi") and the book is still found.',
  section: 'Logical Search',
  tags: ['$path', '$val', '$and', 'keys', 'array path'],
  docs: ['repo/docs/logical-search.md', 'repo/src/core/queryParser.ts', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
