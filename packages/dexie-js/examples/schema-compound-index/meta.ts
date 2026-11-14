// dexie-js example: [firstName+lastName]: an index on a pair
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "[firstName+lastName]: an index on a pair",
  summary: "One index can cover two fields together. The table declares first and last name as a pair, the schema lists it under both names, and looking up the pair finds exactly one of the three Angelas. The first half alone can be searched too.",
  section: "Schema and versions",
  tags: ["stores", "[firstName+lastName]", "schema.indexes", "where().equals"],
  docs: ["repo/docs/Version/Version.stores().md", "repo/docs/Compound-Index.md", "repo/docs/IndexSpec.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
