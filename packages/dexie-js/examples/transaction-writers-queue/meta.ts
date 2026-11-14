// dexie-js example: Two writers queue, two readers do not
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Two writers queue, two readers do not",
  summary: "Two write transactions on the same table run one after the other, and the log's timestamps show the second waiting. Two read-only transactions run side by side without waiting.",
  section: 'Transaction',
  tags: ["transaction", "Dexie.waitFor", "update", "get"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Dexie/Dexie.waitFor().md", "repo/docs/Table/Table.update().md", "repo/docs/Table/Table.get().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
