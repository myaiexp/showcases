// dexie-js example: on('complete'): it is saved
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on('complete'): it is saved",
  summary: "A transaction can tell you when it has finished and been saved. A write transaction and a read-only one both fire the event once they are done.",
  section: 'Transaction',
  tags: ["Transaction.on complete", "Dexie.currentTransaction", "put", "count"],
  docs: ["repo/docs/Transaction/Transaction.on.complete.md", "repo/docs/Dexie/Dexie.currentTransaction.md", "repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.count().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
