// dexie-js example: toArray(): read every row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "toArray(): read every row",
  summary: "toArray() reads the whole table into a plain list, ordered by primary key. The panel shows the list as it came back; change the table and read again to get the new picture.",
  section: 'Table',
  tags: ["toArray"],
  docs: ["repo/docs/Table/Table.toArray().md", "repo/docs/Collection/Collection.toArray().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
