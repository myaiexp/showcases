// dexie-js example: A primary key made of two fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A primary key made of two fields",
  summary: "The primary key itself can be a pair of fields. Two people named Per in different cities are two rows, but storing the same name and city again replaces that row instead of adding another one.",
  section: "Schema and versions",
  tags: ["stores", "[name+city]", "put", "get", "count"],
  docs: ["repo/docs/Version/Version.stores().md", "repo/docs/Compound-Index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
