// Fuse.js example: an advanced-search form that builds a logical query
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An advanced-search form',
  summary:
    'Author, genre and year boxes plus an all/any switch build an { $and } or { $or } query as you type. Empty boxes are left out, and the query being sent is shown next to the books it keeps.',
  section: 'Logical Search',
  tags: ['$and', '$or', 'useExtendedSearch', 'keys', 'includeMatches'],
  docs: ['repo/docs/logical-search.md', 'repo/docs/extended-search.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
