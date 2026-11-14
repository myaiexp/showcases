// Dexie.js example: a note-taking list persisted in IndexedDB
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Persistent notes',
  summary:
    'A tiny notes app. The yellow list is what the user sees; the grid is the table it is stored in. The list never gets told about new or deleted notes: it is a live query, so it redraws itself whenever the table changes. In the full view the notes survive a reload.',
  section: 'Getting started',
  tags: ['++id', 'add', 'delete', 'orderBy', 'reverse', 'liveQuery'],
  docs: [
    'repo/docs/Tutorial/Understanding-the-basics.md',
    'repo/docs/Table/Table.add().md',
    'repo/docs/Table/Table.delete().md',
    'repo/docs/Table/Table.orderBy().md',
    'repo/docs/Collection/Collection.reverse().md',
    'repo/docs/Collection/Collection.first().md',
    'repo/docs/liveQuery().md',
  ],
  provenance: 'pure',
  added: '2026-03-03',
});
