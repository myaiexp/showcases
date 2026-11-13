// Fuse.js example: type-ahead fuzzy search over a list of packages
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Live fuzzy search',
  summary:
    'Type to fuzzy-search a list of popular JS packages. Try typos such as "recat" or "loash"; Fuse still finds the match and highlights it.',
  section: 'Basics',
  tags: ['search', 'typos', 'includeMatches'],
  docs: [],
  provenance: 'legacy',
  added: '2026-03-03',
});
