// dexie-js example: ++ with no name: a key outside the row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "++ with no name: a key outside the row",
  summary: "Writing just ++ with no name gives the table a number key that is kept beside each row, not inside it. add() still hands the key back, and the grid shows it in its own column, but reading the rows shows they carry no id.",
  section: "Schema and versions",
  tags: ["stores", "++", "add", "toArray", "primaryKeys"],
  docs: ["repo/docs/Version/Version.stores().md", "repo/docs/Tutorial/Design.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
