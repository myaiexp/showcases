// Fuse.js example: quotes keep a phrase together in an extended search
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Searching for a phrase',
  summary:
    'Spaces normally split a search into separate words. Wrap a phrase in double quotes and Fuse.js treats it as one piece, in order: exactly, containing, starting with or ending with it.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', '"phrase"', '=', "'", '^', '$'],
  docs: ['repo/docs/extended-search.md', 'repo/CHANGELOG.md', 'repo/src/search/extended/parseQuery.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
