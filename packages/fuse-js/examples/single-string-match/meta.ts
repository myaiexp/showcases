// Fuse.js example: Fuse.match on log lines one by one, with no index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Check one line at a time',
  summary:
    'No collection, no index: Fuse.match compares a pattern with a single piece of text and answers yes or no, with a score. Run it over log lines to flag the ones that match. The letters only come back if you ask for them with includeMatches.',
  section: 'Fuzzy Search',
  tags: ['Fuse.match', 'includeMatches', 'threshold'],
  docs: ['repo/README.md', 'repo/docs/fuzzy-search.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
