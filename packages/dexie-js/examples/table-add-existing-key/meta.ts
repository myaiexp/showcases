// dexie-js example: add() refuses a taken id, put() overwrites it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "add() refuses a taken id, put() overwrites it",
  summary: "Four friends are stored. Adding a fifth with a free id works. Adding another friend with an id that is already taken is refused with a ConstraintError and the table stays as it was. put() with the same id instead overwrites the old row.",
  section: 'Table',
  tags: ["add", "put", "ConstraintError"],
  docs: ["repo/docs/Table/Table.add().md", "repo/docs/Table/Table.put().md", "repo/docs/DexieErrors/Dexie.ConstraintError.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
