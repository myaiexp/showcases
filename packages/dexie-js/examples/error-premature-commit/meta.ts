// dexie-js example: PrematureCommitError: waiting on a timer inside a transaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PrematureCommitError: waiting on a timer inside a transaction",
  summary: "A transaction is only open while it has database work to do. Waiting on a timer inside it lets IndexedDB commit early, and Dexie reports a red PrematureCommitError. A scope with only Dexie calls commits normally.",
  section: "Errors",
  tags: ["PrematureCommitError","transaction"],
  docs: ["repo/docs/DexieErrors/Dexie.PrematureCommitError.md","repo/docs/Dexie/Dexie.transaction().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
