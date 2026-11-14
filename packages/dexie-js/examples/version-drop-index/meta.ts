// dexie-js example: A new version drops an index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A new version drops an index",
  summary: "A new version that leaves an index out removes the index but never touches the data. The age badge disappears from the header and searching by age is refused, yet every age is still stored in its row.",
  section: "Schema and versions",
  tags: ["version().stores()", "where().above", "SchemaError", "schema.indexes"],
  docs: ["repo/docs/Version/Version.stores().md", "repo/docs/Tutorial/Design.md", "repo/docs/Tutorial/Understanding-the-basics.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
