// Fuse.js example: fuse.add() makes a new document searchable at once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'New items are searchable at once',
  summary:
    'A to-do list is searched for "plumb". Add "Plumbing quote for kitchen" with fuse.add() and it lights up in the very next search: no new Fuse, no rebuilding the list.',
  section: 'Collections and indexes',
  tags: ['add', 'search', 'dynamic collection', 'keys'],
  docs: ['repo/README.md', 'repo/src/core/index.ts', 'repo/src/tools/FuseIndex.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
