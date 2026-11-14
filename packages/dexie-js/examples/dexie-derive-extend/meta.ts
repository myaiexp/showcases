// dexie-js example: Dexie.derive() and Dexie.extend()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.derive() and Dexie.extend()",
  summary: "Two small helpers for plain objects and classes. derive() makes one constructor inherit from another, so a Car counts as a Vehicle and overrides its move. extend() copies the fields of one object onto another.",
  section: 'Dexie class',
  tags: ["Dexie.derive","Dexie.extend","inheritance","instanceof"],
  docs: ["repo/docs/Dexie/Dexie.derive().md","repo/docs/Dexie/Dexie.extend().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
