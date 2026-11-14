// Fuse.js example: a ball drawn every frame shows whether a big search freezes the page
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Big searches without a frozen page',
  summary:
    'Two balls bounce on two lanes, moved by the page every frame. Search 60,000 people with plain Fuse and its ball stops dead while the search runs; search the same people with FuseWorker and the ball keeps going.',
  section: 'Web Workers',
  tags: ['FuseWorker', 'Fuse', 'search', 'workerUrl', 'terminate'],
  docs: ['repo/docs/web-workers.md', 'repo/docs/performance.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
