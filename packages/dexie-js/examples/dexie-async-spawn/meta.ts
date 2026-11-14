// dexie-js example: Dexie.spawn() and Dexie.async(): yield instead of await
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.spawn() and Dexie.async(): yield instead of await",
  summary: "Before async/await was everywhere, Dexie let you write a function with yield in front of every database call. Both helpers still work: spawn runs such a function at once, async turns it into a reusable one. Each adds tasks one after another and counts them at the end.",
  section: 'Dexie class',
  tags: ["Dexie.spawn","Dexie.async","generator","yield"],
  docs: ["repo/docs/Dexie/Dexie.spawn().md","repo/docs/Dexie/Dexie.async().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
