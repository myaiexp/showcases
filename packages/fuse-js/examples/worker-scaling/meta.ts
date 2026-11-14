// Fuse.js example: the same big search timed with 1, 2 and 4 workers on this device
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'More workers, faster search',
  summary:
    'One search over a big list, timed on this device with plain Fuse and with FuseWorker on 1, 2 and 4 workers. Each extra worker takes a share of the list, so the wait shrinks, until the cost of copying data to the workers catches up.',
  section: 'Web Workers',
  tags: ['FuseWorker', 'numWorkers', 'search', 'performance', 'terminate'],
  docs: ['repo/docs/web-workers.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
