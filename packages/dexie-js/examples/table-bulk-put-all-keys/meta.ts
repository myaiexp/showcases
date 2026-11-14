// dexie-js example: bulkPut() with allKeys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "bulkPut() with allKeys",
  summary: "Three rows are put in one call, two replacing friends and one new. With {allKeys: true} the answer lists the key every row ended up under, in the order you sent them.",
  section: 'Table',
  tags: ["bulkPut", "allKeys"],
  docs: ["repo/docs/Table/Table.bulkPut().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
