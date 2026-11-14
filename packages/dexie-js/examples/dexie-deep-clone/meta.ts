// dexie-js example: Dexie.deepClone(): a copy that shares nothing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.deepClone(): a copy that shares nothing",
  summary: "A deep clone copies every level, so changing something nested in the copy never touches the original. Dates stay real dates and class instances stay instances of their class.",
  section: 'Dexie class',
  tags: ["Dexie.deepClone","nested object","Date","instanceof"],
  docs: ["repo/docs/Dexie/Dexie.deepClone().md","repo/docs/Dexie/Dexie.shallowClone().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
