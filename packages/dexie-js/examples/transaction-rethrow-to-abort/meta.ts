// dexie-js example: Catch, log, rethrow: it still aborts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Catch, log, rethrow: it still aborts",
  summary: "Catching a failed write only to log it counts as handling it, so the transaction still commits. Throw the error again, or return a rejected promise, and the transaction aborts as it should.",
  section: 'Transaction',
  tags: ["transaction", "catch", "Promise.all", "Promise.reject"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/API-Reference.md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/Promise/Promise.catch().md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.add().md", "repo/docs/Transaction/Transaction.on.complete.md", "repo/docs/Transaction/Transaction.on.abort.md", "repo/docs/Transaction/Transaction.on.error.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
