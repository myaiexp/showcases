// Fuse.js example: fuse.remove(predicate) and the documents it returns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clearing out finished items',
  summary:
    'fuse.remove() takes a yes-or-no function, drops every document it says yes to and hands those documents back. Remove the done tasks and watch them leave the list and the search results; put them back with fuse.add().',
  section: 'Collections and indexes',
  tags: ['remove', 'add', 'dynamic collection', 'search'],
  docs: ['repo/README.md', 'repo/src/core/index.ts', 'repo/src/tools/FuseIndex.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
