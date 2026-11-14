// dexie-js example: Dexie.waitFor() keeps it alive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.waitFor() keeps it alive",
  summary: "The same timer wait as before, but wrapped in Dexie.waitFor(), so the transaction stays open and both writes are saved. The second step shows the rule: while waiting, do not touch the transaction's own tables.",
  section: 'Transaction',
  tags: ["Dexie.waitFor", "transaction", "TransactionInactiveError", "put"],
  docs: ["repo/docs/Dexie/Dexie.waitFor().md", "repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/DexieErrors/Dexie.TransactionInactiveError.md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.get().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
