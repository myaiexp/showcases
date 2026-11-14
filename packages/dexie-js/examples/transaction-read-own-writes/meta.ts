// dexie-js example: Read right after writing, no waiting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Read right after writing, no waiting",
  summary: "Inside a transaction you can queue several writes without waiting for them and read straight away. The read already sees the new rows, although the grid only shows them once everything is saved.",
  section: 'Transaction',
  tags: ["transaction", "put", "where", "above", "toArray"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/API-Reference.md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/Table/Table.put().md", "repo/docs/Table/Table.where().md", "repo/docs/WhereClause/WhereClause.above().md", "repo/docs/Collection/Collection.toArray().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
