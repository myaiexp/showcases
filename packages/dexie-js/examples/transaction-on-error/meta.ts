// dexie-js example: on('error'): why it failed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on('error'): why it failed",
  summary: "A transaction can report the error that made it fail, whether a write clashed or your own code threw. When nothing goes wrong the event stays quiet.",
  section: 'Transaction',
  tags: ["Transaction.on error", "Dexie.currentTransaction", "add", "put"],
  docs: ["repo/docs/Transaction/Transaction.on.error.md", "repo/docs/Dexie/Dexie.currentTransaction.md", "repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.add().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
