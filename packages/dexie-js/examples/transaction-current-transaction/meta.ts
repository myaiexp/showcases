// dexie-js example: currentTransaction: where am I running?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "currentTransaction: where am I running?",
  summary: "Any code can ask Dexie which transaction it is running in, without being handed one. Outside it is null, inside it describes the transaction, and ignoreTransaction() steps out of it.",
  section: 'Transaction',
  tags: ["Dexie.currentTransaction", "Dexie.ignoreTransaction", "Transaction.mode", "Transaction.storeNames"],
  docs: ["repo/docs/Dexie/Dexie.currentTransaction.md", "repo/docs/Dexie/Dexie.ignoreTransaction().md", "repo/docs/Transaction/Transaction.md", "repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Table/Table.get().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
