// dexie-js example: db.verno: the version the database is on
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "db.verno: the version the database is on",
  summary: "db.verno is the highest version you declared. IndexedDB itself stores that number times ten, which the second step reads from the native database, and a database opened without version() reports the same number back.",
  section: "Schema and versions",
  tags: ["verno", "version()", "backendDB", "open"],
  docs: ["repo/docs/Dexie/Dexie.verno.md", "repo/docs/Dexie/Dexie.backendDB().md", "repo/docs/Dexie/Dexie.version().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
