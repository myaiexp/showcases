// dexie-js example: Forgot a table: the transaction fails
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Forgot a table: the transaction fails",
  summary: "A reusable function writes a note to a second table, but the transaction only listed the accounts table. The note fails and the payment is undone with it. List both tables and everything is saved.",
  section: 'Transaction',
  tags: ["transaction", "add", "update", "NotFoundError"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/API-Reference.md", "repo/docs/Table/Table.update().md", "repo/docs/Table/Table.add().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
