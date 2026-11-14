// dexie-js example: ignoreTransaction(): a note that survives
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ignoreTransaction(): a note that survives",
  summary: "A payment is declined and the transaction is rolled back. A log note written inside it disappears with it. A note written through ignoreTransaction() runs separately, so it stays in the log.",
  section: 'Transaction',
  tags: ["Dexie.ignoreTransaction", "transaction", "add", "update"],
  docs: ["repo/docs/Dexie/Dexie.ignoreTransaction().md", "repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Table/Table.add().md", "repo/docs/Table/Table.update().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
