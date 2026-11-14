// dexie-js example: get(): one row by its key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "get(): one row by its key",
  summary: "Ask for a friend by id. A hit highlights the row and returns the object; a miss is not an error, the answer is simply undefined. In the full view, type any id.",
  section: 'Table',
  tags: ["get"],
  docs: ["repo/docs/Table/Table.get().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
