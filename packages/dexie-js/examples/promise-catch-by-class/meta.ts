// dexie-js example: catch(): by class, by name, or anything
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "catch(): by class, by name, or anything",
  summary: "Dexie lets a catch handler name the kind of error it wants. A handler for ConstraintError catches a duplicate id, either by class or by name, but lets a different error fall through to the next handler.",
  section: 'Promise',
  tags: ["catch", "Dexie.ConstraintError", "add", "put"],
  docs: ["repo/docs/Promise/Promise.catch().md", "repo/docs/DexieErrors/Dexie.ConstraintError.md", "repo/docs/Tutorial/Design.md", "repo/docs/Table/Table.add().md", "repo/docs/Table/Table.put().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
