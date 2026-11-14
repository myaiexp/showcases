// dexie-js example: Dexie.shallowClone(): a copy that still shares insides
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.shallowClone(): a copy that still shares insides",
  summary: "A shallow clone copies only the top level of an object, so the nested parts are shared with the original. Change a top-level field of the copy and the original is safe; change something nested and the original changes too, which is the classic surprise.",
  section: 'Dexie class',
  tags: ["Dexie.shallowClone","nested object","shared reference"],
  docs: ["repo/docs/Dexie/Dexie.shallowClone().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
