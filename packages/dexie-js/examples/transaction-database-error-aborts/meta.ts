// dexie-js example: A failed write undoes the writes before it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A failed write undoes the writes before it",
  summary: "Two writes are fired off without waiting for either. One clashes with an existing id. The transaction fails and the good write is undone too. When both are fine, both are saved.",
  section: 'Transaction',
  tags: ["transaction", "put", "add", "ConstraintError"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.add().md", "repo/docs/DexieErrors/Dexie.ConstraintError.md", "repo/docs/Transaction/Transaction.on.abort.md", "repo/docs/Transaction/Transaction.on.error.md", "repo/docs/Transaction/Transaction.on.complete.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
