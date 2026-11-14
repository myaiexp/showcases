// dexie-js example: db.name: the name that finds the data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "db.name: the name that finds the data",
  summary: "The name given to new Dexie() is what the browser stores a database under. A second, separate Dexie created with the same name sees the very same rows, which is how different parts of an app share one database.",
  section: 'Dexie class',
  tags: ["name","new Dexie","dynamic mode"],
  docs: ["repo/docs/Dexie/Dexie.name.md","repo/docs/Dexie/Dexie.md","repo/docs/Dexie/Dexie.open().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
