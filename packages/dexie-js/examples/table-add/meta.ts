// dexie-js example: add(): store one new row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "add(): store one new row",
  summary: "Two friends are stored. add() puts a third row in and hands back the id the table gave it, and it also writes that id onto the object you passed. The new row flashes green in the grid.",
  section: 'Table',
  tags: ["add", "++id"],
  docs: ["repo/docs/Table/Table.add().md", "repo/docs/Table/Table.put().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
