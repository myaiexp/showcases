// dexie-js example: InvalidArgumentError: calls with unusable arguments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "InvalidArgumentError: calls with unusable arguments",
  summary: "Three calls are handed arguments that make no sense: a made-up transaction mode, keys for a table that keeps its ids inside rows, and update() on an object with no id. Each fails with a red InvalidArgumentError and the table is untouched.",
  section: "Errors",
  tags: ["InvalidArgumentError","transaction","bulkAdd","update"],
  docs: ["repo/docs/DexieErrors/Dexie.InvalidArgumentError.md","repo/docs/Dexie/Dexie.transaction().md","repo/docs/Table/Table.bulkAdd().md","repo/docs/Table/Table.update().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
