// Fuse.js example: ' keeps items that contain the exact letters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'These exact letters, anywhere',
  summary:
    'A plain search for "python" also lights up the misspelt Pyton and Pithon. Put an apostrophe in front and Fuse.js keeps only names that really contain those letters, wherever they sit, with the letters marked.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', "'", 'include-match', 'includeMatches'],
  docs: ['repo/docs/extended-search.md', 'repo/src/search/extended/matchers.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
