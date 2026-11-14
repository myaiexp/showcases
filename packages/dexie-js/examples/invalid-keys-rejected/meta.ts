// dexie-js example: Invalid keys: null, true and objects are refused
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Invalid keys: null, true and objects are refused',
  summary:
    'Asking for a key that cannot exist in an index, such as null, true, undefined or an object, does not quietly return nothing. The query fails, and the red message shows what the database said.',
  section: 'WhereClause',
  tags: ['where', 'equals', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.equals().md', 'repo/docs/Indexable-Type.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
