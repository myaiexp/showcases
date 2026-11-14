// dexie-js example: db.table(name): pick a table by its name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "db.table(name): pick a table by its name",
  summary: "When the table name is only known at run time, db.table(name) fetches it from a string. Two tables are shown one after the other this way, and asking for a table that was never declared is refused with a clear error.",
  section: 'Dexie class',
  tags: ["table()","tables","InvalidTableError"],
  docs: ["repo/docs/Dexie/Dexie.table().md","repo/docs/Dexie/Dexie.[table].md"],
  provenance: 'pure',
  added: '2026-11-14',
});
