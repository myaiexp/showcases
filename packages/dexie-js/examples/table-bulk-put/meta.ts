// dexie-js example: bulkPut(): add and replace in one call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "bulkPut(): add and replace in one call",
  summary: "Three rows go in at once: one has an existing id so it replaces that friend (amber), two have new ids and are added (green). Sending the same rows again changes nothing, so you can re-run a sync safely.",
  section: 'Table',
  tags: ["bulkPut"],
  docs: ["repo/docs/Table/Table.bulkPut().md", "repo/docs/Table/Table.bulkAdd().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
