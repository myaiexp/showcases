// Fuse.js example: how FuseWorker splits the list into shards and merges their answers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One list, split between workers',
  summary:
    'FuseWorker cuts the list into equal shards, one per worker. Every worker searches only its own shard, and the answers are merged into one ranking. Each result here is coloured by the worker that found it.',
  section: 'Web Workers',
  tags: ['FuseWorker', 'numWorkers', 'search', 'refIndex', 'terminate'],
  docs: ['repo/docs/web-workers.md', 'repo/src/workers/FuseWorker.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
