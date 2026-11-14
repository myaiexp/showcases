// dexie-js example: autoOpen: false and open()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "autoOpen: false and open()",
  summary: "Normally a Dexie database opens itself the first time you use it. Switch that off and every call fails until you open the database yourself, which is how an app can decide exactly when the storage starts.",
  section: 'Dexie class',
  tags: ["new Dexie","autoOpen","open()","isOpen","DatabaseClosedError"],
  docs: ["repo/docs/Dexie/Dexie.open().md","repo/docs/Dexie/Dexie.md","repo/docs/Dexie/Dexie.isOpen().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
