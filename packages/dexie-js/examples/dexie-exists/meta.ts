// dexie-js example: Dexie.exists(): is there a database by that name?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.exists(): is there a database by that name?",
  summary: "Dexie.exists(name) answers yes or no without creating anything. Ask about a name nobody has used, create the database, ask again, delete it, ask a third time.",
  section: 'Dexie class',
  tags: ["Dexie.exists","open()","Dexie.delete"],
  docs: ["repo/docs/Dexie/Dexie.exists().md","repo/docs/Dexie/Dexie.delete().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
