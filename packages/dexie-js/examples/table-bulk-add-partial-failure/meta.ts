// dexie-js example: bulkAdd(): bad rows fail, good rows stay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "bulkAdd(): bad rows fail, good rows stay",
  summary: "Four rows are added, but two of them reuse ids that are taken. The call rejects with a BulkError that lists exactly which rows failed, and because the error is caught, the two good rows are still saved.",
  section: 'Table',
  tags: ["bulkAdd", "BulkError", "failuresByPos"],
  docs: ["repo/docs/Table/Table.bulkAdd().md", "repo/docs/DexieErrors/Dexie.BulkError.md", "repo/docs/Promise/Promise.catch().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
