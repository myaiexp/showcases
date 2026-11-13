// Perspective example: passing a Worker or SharedWorker in
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom Worker',
  summary:
    'perspective.worker() normally starts its own Web Worker; here the page constructs a dedicated Worker or a SharedWorker from the distributed perspective-server.worker.js and passes it in. The Client it returns is used like any other, and terminate() ends it.',
  section: 'Engine Library',
  tags: ['worker', 'Worker', 'SharedWorker', 'custom worker', 'terminate', 'Client'],
  docs: [
    'repo/docs/md/how_to/javascript/custom_worker.md',
    'repo/docs/md/how_to/javascript/worker.md',
    'repo/docs/md/how_to/javascript/deleting.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
