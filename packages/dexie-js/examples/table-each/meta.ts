// dexie-js example: each(): visit every row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "each(): visit every row",
  summary: "each() calls your function for every row, one after the other, without building an array first. Here each visited row lights up in turn. Visiting follows the primary key, or the order of an index when you start from orderBy().",
  section: 'Table',
  tags: ["each", "orderBy"],
  docs: ["repo/docs/Table/Table.each().md", "repo/docs/Collection/Collection.each().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
