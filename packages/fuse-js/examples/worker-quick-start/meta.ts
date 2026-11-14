// Fuse.js example: FuseWorker searching thousands of people on background threads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Search on background threads',
  summary:
    'FuseWorker splits a big address book across several Web Workers, which search their share at the same time while the page stays free. Same options and results as Fuse, but search() answers with a Promise.',
  section: 'Web Workers',
  tags: ['FuseWorker', 'search', 'numWorkers', 'workerUrl', 'terminate', 'limit'],
  docs: ['repo/docs/web-workers.md', 'repo/README.md', 'repo/src/workers/FuseWorker.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
