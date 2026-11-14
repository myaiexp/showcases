// dexie-js example: SchemaError: searching a field that has no index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SchemaError: searching a field that has no index",
  summary: "Only name is indexed here. Asking where() to search by age fails with a red SchemaError; filter() on the same field works because it reads every row. The marked rows show what filter found.",
  section: "Errors",
  tags: ["SchemaError","where","filter"],
  docs: ["repo/docs/DexieErrors/Dexie.SchemaError.md","repo/docs/Table/Table.where().md","repo/docs/Table/Table.filter().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
