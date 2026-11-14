// dexie-js example: abort(): cancel it yourself
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "abort(): cancel it yourself",
  summary: "A transaction can be cancelled on purpose. First a row is written and then abort() discards it. Second, a check finds Alice cannot afford a payment and aborts, so Bob's bonus is discarded too.",
  section: 'Transaction',
  tags: ["Transaction.abort", "Dexie.currentTransaction", "AbortError"],
  docs: ["repo/docs/Transaction/Transaction.abort().md", "repo/docs/Dexie/Dexie.currentTransaction.md", "repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.update().md", "repo/docs/Table/Table.get().md", "repo/docs/Transaction/Transaction.on.complete.md", "repo/docs/Transaction/Transaction.on.abort.md", "repo/docs/Transaction/Transaction.on.error.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
