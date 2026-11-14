// Fuse.js example: a per-key getFn that builds the searchable text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Search text you build yourself',
  summary:
    'A name stored as first and last in separate fields is hard to find as one phrase. A key getFn joins them into "Ada Lovelace" before searching, and can return null to keep a record out of that key, such as people who have left.',
  section: 'Keys and results',
  tags: ['keys', 'getFn', 'null', 'includeMatches'],
  docs: ['repo/src/types.ts', 'repo/CHANGELOG.md', 'repo/src/core/index.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
