// dexie-js example: bulkAdd(): many rows in one call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "bulkAdd(): many rows in one call",
  summary: "An empty table gets four friends in a single call, then two more. The call resolves with the key of the last row in the array. For hundreds or thousands of rows this is faster than adding them one at a time.",
  section: 'Table',
  tags: ["bulkAdd"],
  docs: ["repo/docs/Table/Table.bulkAdd().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
