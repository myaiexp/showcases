// dexie-js example: SubTransactionError: an inner transaction that does not fit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SubTransactionError: an inner transaction that does not fit",
  summary: "A transaction started inside another must be no wider than its parent. Writing inside a read-only parent, or using a table the parent lacks, fails with a red SubTransactionError. A fitting inner transaction saves normally.",
  section: "Errors",
  tags: ["SubTransactionError","transaction","nested"],
  docs: ["repo/docs/DexieErrors/Dexie.SubTransactionError.md","repo/docs/Dexie/Dexie.transaction().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
