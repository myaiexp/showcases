// dexie-js example: bulkDelete(): remove several rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "bulkDelete(): remove several rows",
  summary: "Hand over a list of keys and all those rows fade out together. Keys that do not exist are ignored.",
  section: 'Table',
  tags: ["bulkDelete"],
  docs: ["repo/docs/Table/Table.bulkDelete().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
