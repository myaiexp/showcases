// dexie-js example: InAnyRange with includeLowers and includeUppers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'InAnyRange with includeLowers and includeUppers',
  summary:
    'The options object decides whether friends exactly on a range boundary count. Two fixed ranges, 5 to 18 and 50 to 75, and two checkboxes show the four boundary people (5, 18, 50 and 75) appear and vanish.',
  section: 'WhereClause',
  tags: ['where', 'inAnyRange', 'includeLowers', 'includeUppers', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.inAnyRange().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
