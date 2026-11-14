// dexie-js example: Any error aborts, even a typo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Any error aborts, even a typo",
  summary: "Carol is added, and then the code hits a mistake (a misspelled variable). Dexie treats any error inside the transaction as a failure and undoes Carol. Without the mistake she is saved.",
  section: 'Transaction',
  tags: ["transaction", "put", "on complete", "on abort", "on error"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/API-Reference.md", "repo/docs/Table/Table.put().md", "repo/docs/Transaction/Transaction.on.complete.md", "repo/docs/Transaction/Transaction.on.abort.md", "repo/docs/Transaction/Transaction.on.error.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
