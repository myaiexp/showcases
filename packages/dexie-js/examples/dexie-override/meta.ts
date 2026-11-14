// dexie-js example: Dexie.override(): wrap a function, keep the original
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.override(): wrap a function, keep the original",
  summary: "Dexie.override() swaps a function for a version that can still call the original. A save function is wrapped so that every call also reports what it is about to do and what came back, without changing a line of the original.",
  section: 'Dexie class',
  tags: ["Dexie.override","wrapping","monkey patching"],
  docs: ["repo/docs/Dexie/Dexie.override().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
