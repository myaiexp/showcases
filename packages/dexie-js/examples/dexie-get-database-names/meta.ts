// dexie-js example: Dexie.getDatabaseNames(): list the databases
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.getDatabaseNames(): list the databases",
  summary: "Browsers keep every database for a website side by side, and Dexie.getDatabaseNames() lists them by name. Three databases are created here and one deleted; the list is filtered to this card's own, because the gallery's other cards share the same site.",
  section: 'Dexie class',
  tags: ["Dexie.getDatabaseNames","new Dexie","Dexie.delete","open()"],
  docs: ["repo/docs/Dexie/Dexie.getDatabaseNames().md","repo/docs/Dexie/Dexie.delete().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
