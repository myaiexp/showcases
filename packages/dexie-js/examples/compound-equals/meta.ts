// dexie-js example: Compound index: first and last name together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compound index: first and last name together',
  summary:
    'A single index over the pair first name plus last name finds one exact person. Angela Davis matches, while Angela Persson does not exist even though both names do.',
  section: 'WhereClause',
  tags: ['version().stores', '[firstName+lastName]', 'where', 'equals', 'toArray'],
  docs: ['repo/docs/Compound-Index.md', 'repo/docs/Table/Table.where().md', 'repo/docs/WhereClause/WhereClause.equals().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
