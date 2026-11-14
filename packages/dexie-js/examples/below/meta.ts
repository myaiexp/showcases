// dexie-js example: Below: friends younger than a limit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Below: friends younger than a limit',
  summary:
    'Six friends sit in a table indexed by age. Type a limit and everyone strictly younger than it is highlighted; a friend exactly at the limit is left out.',
  section: 'WhereClause',
  tags: ['where', 'below', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.below().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
