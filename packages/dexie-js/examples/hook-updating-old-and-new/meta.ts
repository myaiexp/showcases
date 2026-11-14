// dexie-js example: An updating hook sees the old row and the changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "An updating hook sees the old row and the changes",
  summary: "When a row is changed, the hook is told which fields change and also gets the row as it was. The event log prints each change as before then after, for single updates and for a modify over every row. It is the building block for change history and sync.",
  section: "Hooks and middleware",
  tags: ["hook","updating","modifications"],
  docs: ["repo/docs/Table/Table.hook('updating').md"],
  provenance: 'pure',
  added: '2026-11-14',
});
