// dexie-js example: Dexie.getByKeyPath(): read by dotted path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.getByKeyPath(): read by dotted path",
  summary: "Dexie.getByKeyPath() reads a value deep inside an object from a text path such as address.city, the same notation Dexie uses for indexes on nested fields. The highlighted line is the value that comes back.",
  section: 'Dexie class',
  tags: ["Dexie.getByKeyPath","dotted key path","nested object"],
  docs: ["repo/docs/Dexie/Dexie.getByKeyPath().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
