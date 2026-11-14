// dexie-js example: Adopt a database Dexie did not create
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Adopt a database Dexie did not create",
  summary: "A database made with the plain browser API, no Dexie, can be opened with Dexie by name. Its schema is read back and printed as the db.version().stores() code you would paste into your app, and its tables are searchable straight away.",
  section: "Schema and versions",
  tags: ["open", "db.tables", "verno", "schema.primKey", "where().equals"],
  docs: ["repo/docs/Tutorial/Migrating-existing-DB-to-Dexie.md", "repo/docs/Dexie/Dexie.open().md", "repo/docs/Dexie/Dexie.verno.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
