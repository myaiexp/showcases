// dexie-js example: count(): how many rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "count(): how many rows",
  summary: "count() answers how many rows the table holds without reading them all out. Add and delete rows and ask again: the number follows.",
  section: 'Table',
  tags: ["count"],
  docs: ["repo/docs/Table/Table.count().md", "repo/docs/Collection/Collection.count().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
