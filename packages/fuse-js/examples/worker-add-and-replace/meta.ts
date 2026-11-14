// Fuse.js example: adding people to a FuseWorker and replacing its whole list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Changing the list a worker searches',
  summary:
    'A worker-backed address book that keeps changing: add() hands each new person to the next worker in turn, and setCollection() swaps the whole list. There is no remove(): filter your array and call setCollection.',
  section: 'Web Workers',
  tags: ['FuseWorker', 'add', 'setCollection', 'search', 'terminate'],
  docs: ['repo/docs/web-workers.md', 'repo/src/workers/FuseWorker.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
