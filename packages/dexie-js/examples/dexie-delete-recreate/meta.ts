// dexie-js example: delete() that recreates on next use
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "delete() that recreates on next use",
  summary: "db.delete({ disableAutoOpen: false }) empties the database for good, but leaves the instance ready: the next call quietly creates a fresh database with the same tables. Handy for a Start over button.",
  section: 'Dexie class',
  tags: ["delete()","disableAutoOpen","autoOpen","Dexie.exists"],
  docs: ["repo/docs/Dexie/Dexie.delete().md","repo/docs/Dexie/Dexie.exists().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
