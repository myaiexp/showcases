// dexie-js example: AnyOf: any name in a list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AnyOf: any name in a list',
  summary:
    'Give a list of names and every friend whose name is in it lights up; names nobody has are ignored. Type names separated by commas.',
  section: 'WhereClause',
  tags: ['where', 'anyOf', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.anyOf().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
