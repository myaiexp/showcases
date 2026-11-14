// dexie-js example: NotEqual: everything but one value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'NotEqual: everything but one value',
  summary:
    'Finds every row whose shoe size is different from the one you type. Rows with no size or a null size are never found, since they are not in the index at all.',
  section: 'WhereClause',
  tags: ['where', 'notEqual', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.notEqual().md', 'repo/docs/Indexable-Type.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
