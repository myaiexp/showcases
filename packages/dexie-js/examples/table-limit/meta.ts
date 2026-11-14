// dexie-js example: limit(): only the first N rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "limit(): only the first N rows",
  summary: "limit() keeps a result short: the first three rows by id, or the first five. The matching rows light up and the rest dim. It is the building block for \"show the top N\" lists.",
  section: 'Table',
  tags: ["limit", "toArray"],
  docs: ["repo/docs/Table/Table.limit().md", "repo/docs/Collection/Collection.limit().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
