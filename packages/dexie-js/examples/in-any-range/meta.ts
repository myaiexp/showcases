// dexie-js example: InAnyRange: two age ranges at once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'InAnyRange: two age ranges at once',
  summary:
    'One query that matches friends inside any of several ranges, like children and elders but nobody in between. Edit the four numbers and the highlighted rows follow.',
  section: 'WhereClause',
  tags: ['where', 'inAnyRange', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.inAnyRange().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
