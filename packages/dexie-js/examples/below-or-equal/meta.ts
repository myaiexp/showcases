// dexie-js example: BelowOrEqual: the limit itself counts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BelowOrEqual: the limit itself counts',
  summary:
    'Highlights every friend up to and including a limit age. Change the number and watch Josephine drop in and out as the limit crosses 21.',
  section: 'WhereClause',
  tags: ['where', 'belowOrEqual', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.belowOrEqual().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
