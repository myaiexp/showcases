// Fuse.js example: an index turned into JSON text and loaded back with parseIndex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ship the index as a file',
  summary:
    'Build the search index once (in a script or on a server), save it as JSON text, and load it in the page with Fuse.parseIndex. The page gets a working search without indexing the list itself.',
  section: 'Collections and indexes',
  tags: ['getIndex', 'toJSON', 'parseIndex', 'new Fuse'],
  docs: ['repo/docs/performance.md', 'repo/src/tools/FuseIndex.ts', 'repo/src/core/index.ts', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
