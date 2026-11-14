// Fuse.js example: which misspelt query word matched which word of a title
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Every word forgiven on its own',
  summary:
    'Search a list of docs pages with a query like "express midleware rout". Token search fixes each misspelt word separately, and the example colours each query word and the title word it found.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'threshold', 'minMatchCharLength', 'includeMatches'],
  docs: ['repo/docs/token-search.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
