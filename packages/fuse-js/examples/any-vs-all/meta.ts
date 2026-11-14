// Fuse.js example: tokenMatch any (widens) against all (narrows) on a small shop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Add a word: widen or narrow',
  summary:
    'A small clothes shop searched two ways. In the default mode every extra word lets more items through; with tokenMatch "all" every extra word narrows the list, like filtering.',
  section: 'Token Search',
  tags: ['useTokenSearch', 'tokenMatch', 'threshold'],
  docs: ['repo/docs/token-search.md', 'repo/src/types.ts', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
