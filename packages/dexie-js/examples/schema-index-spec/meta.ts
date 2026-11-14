// dexie-js example: IndexSpec: what each index says about itself
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "IndexSpec: what each index says about itself",
  summary: "Every index in table.schema describes itself. Four kinds sit in one table, and three steps read the primary key, each index as written, and which ones are unique, multi-entry or compound.",
  section: "Schema and versions",
  tags: ["schema.primKey", "schema.indexes", "IndexSpec", "src", "unique", "multi", "compound"],
  docs: ["repo/docs/IndexSpec.md", "repo/docs/TableSchema.md", "repo/docs/Version/Version.stores().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
