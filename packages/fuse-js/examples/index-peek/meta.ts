// Fuse.js example: what the index stores, read from getIndex().toJSON()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What the index remembers',
  summary:
    'The index is plain data: for each book and field, the text and a length note called n that is 1 for a one-word field and smaller for longer ones. Move fieldNormWeight to see the notes change.',
  section: 'Collections and indexes',
  tags: ['getIndex', 'toJSON', 'fieldNormWeight', 'records', 'field-length norm'],
  docs: ['repo/src/tools/FuseIndex.ts', 'repo/src/types.ts', 'repo/docs/performance.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
