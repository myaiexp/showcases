// dexie-js example: schema: what a table is made of
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "schema: what a table is made of",
  summary: "Every table can describe itself. The badges in the grid header come from the same information: key is the primary key, ix an index, & a unique index, * a multi-entry index. Ask for the primary key, the indexes, the unique ones and the multi-entry ones.",
  section: 'Table',
  tags: ["schema", "primKey", "indexes"],
  docs: ["repo/docs/Table/Table.schema.md", "repo/docs/TableSchema.md", "repo/docs/IndexSpec.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
