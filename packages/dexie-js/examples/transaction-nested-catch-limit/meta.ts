// dexie-js example: Catching a sub-transaction does not save the parent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Catching a sub-transaction does not save the parent",
  summary: "A transaction inside a transaction fails. Catching its promise does not stop the outer transaction from aborting. Catching the failed write inside it does keep everything alive.",
  section: 'Transaction',
  tags: ["transaction", "catch", "add", "put"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Promise/Promise.catch().md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.add().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
