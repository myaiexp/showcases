// Fuse.js example: $or keeps the books that match any clause
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Any clause will do',
  summary:
    'With { $or: [...] } a book is kept as soon as one clause matches: John Scalzi or J.R.R. Tolkien, fantasy or crime. The tick table shows which clause caught each book.',
  section: 'Logical Search',
  tags: ['$or', 'logical query', 'keys', 'search'],
  docs: ['repo/docs/logical-search.md', 'repo/README.md', 'repo/src/core/queryParser.ts', 'repo/src/core/index.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
