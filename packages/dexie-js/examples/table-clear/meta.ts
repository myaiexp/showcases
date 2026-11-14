// dexie-js example: clear(): empty the whole table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "clear(): empty the whole table",
  summary: "Five friends are stored. clear() removes all of them at once, and a count afterwards says zero. The table itself, with its indexes, stays ready for new rows.",
  section: 'Table',
  tags: ["clear", "count"],
  docs: ["repo/docs/Table/Table.clear().md", "repo/docs/Table/Table.count().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
