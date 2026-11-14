// dexie-js example: "rw?": join the parent only if it fits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "\"rw?\": join the parent only if it fits",
  summary: "A helper function opens its own transaction. Called from a read-only caller, a plain 'rw' does not fit and fails. With 'rw?' it starts its own instead, and when the caller can write it joins the caller.",
  section: 'Transaction',
  tags: ["transaction", "rw?", "Transaction.parent", "update"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Transaction/Transaction.md", "repo/docs/Table/Table.update().md", "repo/docs/Table/Table.get().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
