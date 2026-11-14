// dexie-js example: No transaction: the money disappears
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "No transaction: the money disappears",
  summary: "The same failing transfer runs twice, first without a transaction and then inside one. Without it, Alice loses 30 that Bob never gets, so the total in the bank drops. Inside a transaction nothing changes.",
  section: 'Transaction',
  tags: ["transaction", "update", "get"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/Tutorial/Design.md", "repo/docs/Table/Table.update().md", "repo/docs/Table/Table.get().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
