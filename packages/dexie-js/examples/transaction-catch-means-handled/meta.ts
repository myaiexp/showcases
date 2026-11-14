// dexie-js example: Catching an error saves the transaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Catching an error saves the transaction",
  summary: "A write clashes with an existing id. Left alone, the transaction fails and everything is undone. Catch that one write and Dexie treats the problem as handled, so the transaction commits and the good rows stay.",
  section: 'Transaction',
  tags: ["transaction", "catch", "put", "add"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/API-Reference.md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/Promise/Promise.catch().md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.add().md", "repo/docs/Transaction/Transaction.on.complete.md", "repo/docs/Transaction/Transaction.on.abort.md", "repo/docs/Transaction/Transaction.on.error.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
