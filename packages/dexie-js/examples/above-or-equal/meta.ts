// dexie-js example: AboveOrEqual: the limit itself counts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AboveOrEqual: the limit itself counts',
  summary:
    'Like "above", but a friend who is exactly the limit age is included too. Compare it with the Above example: at 21, Josephine joins the answer.',
  section: 'WhereClause',
  tags: ['where', 'aboveOrEqual', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.aboveOrEqual().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
