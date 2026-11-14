// dexie-js example: A timer ends the transaction early
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A timer ends the transaction early",
  summary: "IndexedDB commits a transaction as soon as nothing is using it. Waiting on a timer inside one lets it finish early, so the next write fails with an error. The first write was already saved.",
  section: 'Transaction',
  tags: ["transaction", "TransactionInactiveError", "put"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/Tutorial/Design.md", "repo/docs/DexieErrors/Dexie.TransactionInactiveError.md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.get().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
