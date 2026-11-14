// dexie-js example: db.isOpen(): is the connection up?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "db.isOpen(): is the connection up?",
  summary: "isOpen() is a plain yes or no that changes as the database goes through its life: declared, used for the first time, closed, opened again. The log asks the question after every move.",
  section: 'Dexie class',
  tags: ["isOpen()","open()","close()","new Dexie"],
  docs: ["repo/docs/Dexie/Dexie.isOpen().md","repo/docs/Dexie/Dexie.open().md","repo/docs/Dexie/Dexie.close().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
