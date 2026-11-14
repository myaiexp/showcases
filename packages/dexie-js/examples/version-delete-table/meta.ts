// dexie-js example: Deleting a table takes null
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Deleting a table takes null",
  summary: "Leaving a table out of a new version does not delete it. Only a version that names the table with null does, and the list of tables shows both moments.",
  section: "Schema and versions",
  tags: ["version().stores()", "null", "db.tables"],
  docs: ["repo/docs/Tutorial/Understanding-the-basics.md", "repo/docs/Tutorial/Design.md", "repo/docs/Version/Version.stores().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
