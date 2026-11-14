// dexie-js example: Transaction.table(): a table by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transaction.table(): a table by name",
  summary: "The callback of a transaction receives the transaction itself, which can hand out its tables by name. Asking for a table that is not part of the transaction fails and the transaction is undone.",
  section: 'Transaction',
  tags: ["Transaction.table", "Transaction.storeNames", "transaction", "update"],
  docs: ["repo/docs/Transaction/Transaction.table().md", "repo/docs/Transaction/Transaction.md", "repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Table/Table.update().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
