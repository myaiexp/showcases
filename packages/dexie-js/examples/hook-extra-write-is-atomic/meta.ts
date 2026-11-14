// dexie-js example: A hook's extra write is undone with the transaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A hook's extra write is undone with the transaction",
  summary: "Adding a friend also writes a line to an activity table from inside the hook. When the transaction succeeds both rows are saved. When it fails after the add, neither grid changes, because the hook used the same transaction.",
  section: "Hooks and middleware",
  tags: ["hook","creating","transaction","atomic"],
  docs: ["repo/docs/Table/Table.hook('creating').md","repo/docs/Transaction/Transaction.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
