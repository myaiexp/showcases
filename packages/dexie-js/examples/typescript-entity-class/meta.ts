// dexie-js example: Rows that are class instances with methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rows that are class instances with methods',
  summary:
    'The database is declared as a class, and every friend read from it comes back as a Friend object rather than plain data. That object carries its own birthday() method, which updates the database, and a life stage worked out from the age each time it is read and never stored.',
  section: 'TypeScript',
  tags: ['Entity', 'EntityTable', 'mapToClass', 'class AppDB extends Dexie', 'update() with a function'],
  docs: ['repo/docs/Typescript.md', 'repo/docs/EntityTable.md', 'repo/docs/Table/Table.mapToClass().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
