// dexie-js example: NoneOf: everything except some values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'NoneOf: everything except some values',
  summary:
    'Finds rows whose shoe size is not any of the listed ones. The surprise: rows with no size, or with null, never show up, because the index only knows rows that have a valid key.',
  section: 'WhereClause',
  tags: ['where', 'noneOf', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.noneOf().md', 'repo/docs/Indexable-Type.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
