// dexie-js example: db.hasFailed(): did opening go wrong?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "db.hasFailed(): did opening go wrong?",
  summary: "hasFailed() turns true when a database could not be opened. A healthy database says no on both counts; one opened without a declared schema under a name nobody ever created fails, and the instance says so.",
  section: 'Dexie class',
  tags: ["hasFailed()","isOpen()","dynamic mode","NoSuchDatabaseError"],
  docs: ["repo/docs/Dexie/Dexie.hasFailed().md","repo/docs/Dexie/Dexie.isOpen().md","repo/docs/Dexie/Dexie.open().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
