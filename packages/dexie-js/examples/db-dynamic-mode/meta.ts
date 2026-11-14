// dexie-js example: Open without version(): read the schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Open without version(): read the schema",
  summary: "Open a database without ever calling version() and Dexie reads what is installed. Its tables and schemas come back from the database itself, rows can be read by table name, and a database that does not exist is reported as an error.",
  section: "Schema and versions",
  tags: ["open", "db.tables", "db.table", "NoSuchDatabaseError", "verno"],
  docs: ["repo/docs/Dexie/Dexie.open().md", "repo/docs/Dexie/Dexie.tables.md", "repo/docs/DexieErrors/Dexie.NoSuchDatabaseError.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
