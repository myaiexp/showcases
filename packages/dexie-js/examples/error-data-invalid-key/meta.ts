// dexie-js example: DataError: ids of the wrong kind are refused
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DataError: ids of the wrong kind are refused",
  summary: "A row's id can be a number, string, date or array, but not a boolean, an object or null. Each attempt fails with a red DataError and the grid stays as it was.",
  section: "Errors",
  tags: ["DataError","primary key"],
  docs: ["repo/docs/DexieErrors/Dexie.DataError.md","repo/docs/Indexable-Type.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
