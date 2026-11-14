// dexie-js example: db.delete(): the whole database goes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "db.delete(): the whole database goes",
  summary: "db.delete() throws away the database with every row in it. Afterwards Dexie.exists() says it is gone and the instance refuses new calls until you open it again, which creates a fresh empty database.",
  section: 'Dexie class',
  tags: ["delete()","Dexie.exists","open()","DatabaseClosedError"],
  docs: ["repo/docs/Dexie/Dexie.delete().md","repo/docs/Dexie/Dexie.exists().md","repo/docs/Dexie/Dexie.open().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
