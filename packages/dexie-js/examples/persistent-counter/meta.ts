// Dexie.js example: a counter whose value lives in IndexedDB
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Persistent counter',
  summary:
    'A count stored as one row in the browser\'s own database. Closing the connection, as closing the tab does, loses nothing: opening the database again reads the same number back. In the full view, reload the page to see it survive.',
  section: 'Getting started',
  tags: ['put', 'get', 'close', 'open', 'isOpen'],
  docs: [
    'repo/docs/Tutorial/Understanding-the-basics.md',
    'repo/docs/Table/Table.put().md',
    'repo/docs/Table/Table.get().md',
    'repo/docs/Dexie/Dexie.close().md',
    'repo/docs/Dexie/Dexie.open().md',
    'repo/docs/Dexie/Dexie.isOpen().md',
  ],
  provenance: 'pure',
  added: '2026-03-03',
});
