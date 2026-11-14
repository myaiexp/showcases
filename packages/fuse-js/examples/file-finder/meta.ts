// Fuse.js example: a file picker whose query is built from chips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Build a file filter from chips',
  summary:
    'Pick a folder, an ending and "leave out tests", and watch the query string Fuse.js receives grow term by term while the project files light up or fade. A tiny version of a real file picker.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', '^', '$', '!', 'includeMatches', 'AND'],
  docs: ['repo/docs/extended-search.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
