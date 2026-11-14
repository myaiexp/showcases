// dexie-js example: DataCloneError: a function cannot be stored
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DataCloneError: a function cannot be stored",
  summary: "Dates and arrays go into the database without trouble, but a row holding a function does not. The add fails with a red error and the grid is unchanged. Only plain data survives the trip into IndexedDB.",
  section: "Errors",
  tags: ["DataCloneError","add"],
  docs: ["repo/docs/DexieErrors/Dexie.DataCloneError.md","repo/docs/Table/Table.add().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
