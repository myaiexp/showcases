// dexie-js example: Dexie.setByKeyPath(): change by dotted path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.setByKeyPath(): change by dotted path",
  summary: "Dexie.setByKeyPath() writes a value deep inside an object from a text path, creating the missing levels on the way. The object changes in place; amber lines are the ones just written.",
  section: 'Dexie class',
  tags: ["Dexie.setByKeyPath","dotted key path","nested object"],
  docs: ["repo/docs/Dexie/Dexie.setByKeyPath().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
