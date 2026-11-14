// dexie-js example: bulkAdd() with allKeys: every new key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "bulkAdd() with allKeys: every new key",
  summary: "The table numbers its own rows (++id). By default bulkAdd() only reports the key of the last row. Pass {allKeys: true} and you get one key per row you added, in the same order.",
  section: 'Table',
  tags: ["bulkAdd", "allKeys", "++id"],
  docs: ["repo/docs/Table/Table.bulkAdd().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
