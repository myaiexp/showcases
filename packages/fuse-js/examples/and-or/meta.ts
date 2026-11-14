// Fuse.js example: spaces mean AND and a pipe means OR in extended search
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Both words, or either group',
  summary:
    'In an extended search, spaces mean "and" and a vertical bar means "or". The docs\' query "\'Man \'Old | Artist$" is read as two groups, and every lit book shows which group found it.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', 'AND', 'OR', '|', 'keys'],
  docs: ['repo/docs/extended-search.md', 'repo/README.md', 'repo/src/search/extended/index.ts', 'repo/src/search/extended/parseQuery.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
