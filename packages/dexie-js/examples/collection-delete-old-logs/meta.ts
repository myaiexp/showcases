// dexie-js example: Delete old log entries with below(date).delete()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Delete old log entries with below(date).delete()",
  summary:
    "A log table grows forever unless you trim it. Dates are real keys, so where('date').below(cutoff) finds every entry older than the cutoff and delete() removes them. Change how many days to keep and try again.",
  section: 'Collection',
  tags: ['delete', 'where', 'below', 'Date'],
  docs: ['repo/docs/Collection/Collection.delete().md', 'repo/docs/WhereClause/WhereClause.below().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
