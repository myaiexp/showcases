// dexie-js example: update() does nothing for a missing key, upsert() creates it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "update() does nothing for a missing key, upsert() creates it",
  summary: "Updating friend number 9, who does not exist, is not an error: nothing changes and the answer is 0. upsert() with the same call creates the row from the changes you gave.",
  section: 'Table',
  tags: ["update", "upsert"],
  docs: ["repo/docs/Table/Table.update().md", "repo/docs/Table/Table.upsert().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
