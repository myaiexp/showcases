// dexie-js example: Dexie.delete(name): delete without an instance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.delete(name): delete without an instance",
  summary: "The static Dexie.delete(name) removes a database knowing only its name, even while it is open somewhere. The open connection is told to let go, and the database disappears from the list of databases.",
  section: 'Dexie class',
  tags: ["Dexie.delete","Dexie.exists","isOpen","versionchange"],
  docs: ["repo/docs/Dexie/Dexie.delete().md","repo/docs/Dexie/Dexie.exists().md","repo/docs/Dexie/Dexie.isOpen().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
