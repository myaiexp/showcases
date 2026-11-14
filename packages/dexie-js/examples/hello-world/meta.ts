// dexie-js example: Hello World: store, then query
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hello World: store, then query',
  summary:
    'One table of friends, declared with the fields you want to search by. Four friends go in with a single call, then three questions come back out: who is young, everyone by age, and whose name starts with S. The grid is the real database in your browser.',
  section: 'Getting started',
  tags: ['new Dexie', 'version().stores()', 'bulkPut', 'where().between', 'orderBy().reverse()', 'startsWith', 'keys()'],
  docs: ['repo/docs/Tutorial/Hello-World.md', 'repo/docs/Table/Table.clear().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
