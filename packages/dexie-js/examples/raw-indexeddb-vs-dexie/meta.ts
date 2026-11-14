// dexie-js example: The same query, without and with Dexie
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The same query, without and with Dexie',
  summary:
    'Both sides store four friends and find the ones aged 20 to 60, and both find the same two people. The left side uses the browser\'s own IndexedDB API, with event handlers and an error path for every step; the right side is Dexie. The big numbers are how many lines of code each took.',
  section: 'Knowledge base',
  tags: ['IndexedDB', 'code complexity', 'bulkAdd', 'where().between'],
  docs: ['repo/docs/Dexie/Dexie.delete().md', 'repo/docs/Collection/Collection.toArray().md', 
    'repo/docs/The-Main-Limitations-of-IndexedDB.md',
    'repo/docs/WhereClause/WhereClause.between().md',
    'repo/docs/Table/Table.bulkAdd().md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
