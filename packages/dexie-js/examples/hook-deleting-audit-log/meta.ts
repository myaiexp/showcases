// dexie-js example: A deleting hook writes an audit row for each delete
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A deleting hook writes an audit row for each delete",
  summary: "Whenever a friend is deleted, the hook adds a line to a separate audit table inside the same transaction. The audit grid grows as rows leave the main grid. If the transaction forgets to include the audit table, the delete is refused instead.",
  section: "Hooks and middleware",
  tags: ["hook","deleting","audit","transaction"],
  docs: ["repo/docs/Table/Table.hook('deleting').md","repo/docs/Transaction/Transaction.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
