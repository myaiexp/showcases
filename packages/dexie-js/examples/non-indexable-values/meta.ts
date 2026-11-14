// dexie-js example: Non-indexable values: rows where() cannot find
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Non-indexable values: rows where() cannot find',
  summary:
    'null, true or false, a missing value and an object are not valid index keys, so those rows are invisible to every where() query, even "everything except 9". Only the rows with a number or text are highlighted.',
  section: 'WhereClause',
  tags: ['where', 'between', 'Dexie.minKey', 'Dexie.maxKey', 'notEqual', 'toArray'],
  docs: ['repo/docs/Indexable-Type.md', 'repo/docs/WhereClause/WhereClause.notEqual().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
