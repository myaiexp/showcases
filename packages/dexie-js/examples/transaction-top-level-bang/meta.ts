// dexie-js example: "rw!": always its own transaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "\"rw!\": always its own transaction",
  summary: "A logger is called from inside a payment transaction. With a plain mode it tries to join and fails because the log table was not listed. With 'rw!' it opens its own transaction, so its note stays even when the payment is undone.",
  section: 'Transaction',
  tags: ["transaction", "rw!", "add", "update"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Table/Table.add().md", "repo/docs/Table/Table.update().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
