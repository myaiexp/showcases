// dexie-js example: bulkAdd() in a transaction: one failure undoes all
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "bulkAdd() in a transaction: one failure undoes all",
  summary: "Inside a transaction, a bulkAdd() you do not catch cancels everything, even the rows that were fine. Catch the bulkAdd() itself and the good rows are committed while the bad ones are skipped.",
  section: 'Table',
  tags: ["bulkAdd", "BulkError", "transaction"],
  docs: ["repo/docs/Table/Table.bulkAdd().md", "repo/docs/DexieErrors/Dexie.BulkError.md", "repo/docs/Dexie/Dexie.transaction().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
