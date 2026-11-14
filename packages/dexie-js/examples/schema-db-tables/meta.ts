// dexie-js example: db.tables: every table and its schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "db.tables: every table and its schema",
  summary: "db.tables is the list of every table in the database, and each one knows its own schema. Three tables are listed, their keys and indexes are read back, and a table is shown to be the same object as db.pets.",
  section: "Schema and versions",
  tags: ["db.tables", "table.schema", "stores"],
  docs: ["repo/docs/Dexie/Dexie.tables.md", "repo/docs/TableSchema.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
