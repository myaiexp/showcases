// dexie-js example: on('ready'): queries wait for the starter job
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on('ready'): queries wait for the starter job",
  summary: "A ready subscriber can return a promise, and the database stays blocked until it finishes. Here a slow job fills an empty table while a query is already waiting, and the query still gets the finished rows rather than an empty answer.",
  section: 'Dexie class',
  tags: ["on('ready')","Dexie.Promise","bulkAdd","toArray"],
  docs: ["repo/docs/Dexie/Dexie.on.ready.md","repo/docs/Dexie/Dexie.vip().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
