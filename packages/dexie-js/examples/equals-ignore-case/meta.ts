// dexie-js example: EqualsIgnoreCase: David, david and DAVID
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EqualsIgnoreCase: David, david and DAVID',
  summary:
    'The same name in three casings is found by one query, while Davidson (a different word) and other names stay dark. Useful for search boxes where people do not care about capital letters.',
  section: 'WhereClause',
  tags: ['where', 'equalsIgnoreCase', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.equalsIgnoreCase().md', 'repo/docs/Table/Table.where().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
