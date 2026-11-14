// Fuse.js example: capping a result list with the limit search option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Only the top few',
  summary:
    'A short word can match a dozen countries, and a dropdown has room for five. Passing a limit to search keeps just the best matches, still ranked, and the rest of the list stays dimmed.',
  section: 'Keys and results',
  tags: ['search', 'limit', 'includeScore', 'threshold'],
  docs: ['repo/README.md', 'repo/src/types.ts', 'repo/src/core/index.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
