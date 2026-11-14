// dexie-js example: Equals: an exact match, case matters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Equals: an exact match, case matters',
  summary:
    'Only names that are exactly the same text match. "David" finds David but not david, DAVID or Davidson. Type your own name to see how strict equals is.',
  section: 'WhereClause',
  tags: ['where', 'equals', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.equals().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
