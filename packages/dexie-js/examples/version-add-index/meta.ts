// dexie-js example: A new version adds an index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A new version adds an index",
  summary: "Searching by shoe size is refused while the field is stored but not indexed. A new version adds the field to the index list, with no upgrade function at all, and the rows already stored become searchable.",
  section: "Schema and versions",
  tags: ["version().stores()", "where().between", "SchemaError", "schema.indexes"],
  docs: ["repo/docs/Version/Version.stores().md", "repo/docs/Tutorial/Design.md", "repo/docs/Tutorial/Understanding-the-basics.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
