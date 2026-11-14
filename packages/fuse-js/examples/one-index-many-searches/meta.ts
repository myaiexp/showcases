// Fuse.js example: one pre-built index shared by several Fuse instances
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One index, three searches',
  summary:
    'Fuse.createIndex() builds the index once and any number of Fuse objects can use it. Here a strict, a balanced and a forgiving search read the same index and give different answers to the same query.',
  section: 'Collections and indexes',
  tags: ['createIndex', 'new Fuse', 'threshold', 'keys', 'reuse'],
  docs: ['repo/docs/articles/using-fuse-with-react.md', 'repo/docs/performance.md', 'repo/src/tools/FuseIndex.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
