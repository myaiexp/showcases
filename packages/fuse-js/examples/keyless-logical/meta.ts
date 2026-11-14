// Fuse.js example: bare strings in a logical query search every field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Words that need no field name',
  summary:
    'Since 7.3.0 a logical query can hold plain strings: { $and: ["scalzi", "blue"] } looks for each word in every field, so "scalzi" can be found in the author and "blue" in the colour. The result lists which fields each book matched in.',
  section: 'Logical Search',
  tags: ['$and', 'keyless', 'logical query', 'keys', 'includeMatches'],
  docs: ['repo/docs/logical-search.md', 'repo/CHANGELOG.md', 'repo/src/core/index.ts', 'repo/src/core/queryParser.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
