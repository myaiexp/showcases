// dexie-js example: on('abort'): it was rolled back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on('abort'): it was rolled back",
  summary: "A transaction can tell you when it was undone. Calling abort(), throwing an error and a failed write all end the same way: the abort event fires and the row that was written disappears.",
  section: 'Transaction',
  tags: ["Transaction.on abort", "Dexie.currentTransaction", "abort", "put", "add"],
  docs: ["repo/docs/Transaction/Transaction.on.abort.md", "repo/docs/Transaction/Transaction.abort().md", "repo/docs/Dexie/Dexie.currentTransaction.md", "repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.add().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
