// Fuse.js example: logical queries whose clauses use extended-search operators
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Operators inside clauses',
  summary:
    'Turn on useExtendedSearch and the text inside each logical clause can use operators: "^Old" starts with Old, "\'Scalzi" contains Scalzi, "!arts" excludes it. Without the flag the same query treats those symbols as ordinary letters.',
  section: 'Logical Search',
  tags: ['useExtendedSearch', '$and', '$or', '^', '!', 'search'],
  docs: ['repo/docs/logical-search.md', 'repo/docs/extended-search.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
