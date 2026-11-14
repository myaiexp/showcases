// dexie-js example: db.friends: tables as properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "db.friends: tables as properties",
  summary: "A database declared with a schema gets one property per table, so db.friends just works. Open a database without declaring anything and those properties are not there, but db.table('friends') still finds the table.",
  section: 'Dexie class',
  tags: ["[table]","table()","version().stores","dynamic mode"],
  docs: ["repo/docs/Dexie/Dexie.[table].md","repo/docs/Dexie/Dexie.table().md","repo/docs/Dexie/Dexie.open().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
