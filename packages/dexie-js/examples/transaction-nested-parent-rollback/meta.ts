// dexie-js example: A transaction inside a transaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A transaction inside a transaction",
  summary: "A function with its own transaction is called twice, first alone and then inside a bigger transaction that fails at the end. Alone, each call is saved. Inside the parent, both calls are undone with it.",
  section: 'Transaction',
  tags: ["transaction", "nested transactions", "update", "get"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/API-Reference.md", "repo/docs/Table/Table.update().md", "repo/docs/Table/Table.get().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
