// dexie-js example: Native Promise inside a transaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Native Promise inside a transaction",
  summary: "The page's own Promise is safe to use inside a transaction. Promise.all reads two rows at once and a native then still runs in the transaction. When one write in Promise.all fails, all are undone.",
  section: 'Promise',
  tags: ["Promise.all", "transaction", "Dexie.currentTransaction", "get"],
  docs: ["repo/docs/Promise/Promise.md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Dexie/Dexie.currentTransaction.md", "repo/docs/Table/Table.get().md", "repo/docs/Table/Table.count().md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.add().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
