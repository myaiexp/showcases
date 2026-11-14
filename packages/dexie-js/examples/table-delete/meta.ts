// dexie-js example: delete(): remove one row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "delete(): remove one row",
  summary: "The row fades red and is gone. Deleting a key that does not exist is not an error either: the call just resolves with nothing.",
  section: 'Table',
  tags: ["delete"],
  docs: ["repo/docs/Table/Table.delete().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
