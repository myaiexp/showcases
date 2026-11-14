// dexie-js example: on('close'): told when the database shuts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on('close'): told when the database shuts",
  summary: "The close event fires whenever the connection ends: when your own code calls close(), and also when the database is shut from outside, here by another part of the app deleting it. It is the place to switch off anything that depended on the data.",
  section: 'Dexie class',
  tags: ["on('close')","close()","Dexie.delete","open()"],
  docs: ["repo/docs/Dexie/Dexie.on.close.md","repo/docs/Dexie/Dexie.close().md","repo/docs/Dexie/Dexie.delete().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
