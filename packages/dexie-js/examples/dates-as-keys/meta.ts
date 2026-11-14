// dexie-js example: Dates as keys: tasks due between two days
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dates as keys: tasks due between two days',
  summary:
    'Dates are valid index keys, so a range of dates works like a range of numbers. Pick two days and the tasks due between them light up, both days included.',
  section: 'WhereClause',
  tags: ['version().stores', 'Date', 'where', 'between', 'includeLower', 'includeUpper', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.between().md', 'repo/docs/Indexable-Type.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
