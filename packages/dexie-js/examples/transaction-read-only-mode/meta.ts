// dexie-js example: 'r' cannot write, 'rw' can
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "'r' cannot write, 'rw' can",
  summary: "The same code runs in a read-only transaction and in a read-write one. Reading works in both, but the write fails in the read-only one with a ReadOnlyError.",
  section: 'Transaction',
  tags: ["transaction", "ReadOnlyError", "update", "get"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/DexieErrors/Dexie.ReadOnlyError.md", "repo/docs/Tutorial/Design.md", "repo/docs/Table/Table.update().md", "repo/docs/Table/Table.get().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
