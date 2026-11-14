// dexie-js example: A new version adds a table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A new version adds a table",
  summary: "A new version only has to name the table it adds. Version 2 declares pets, the friends table keeps its rows, and both tables work afterwards.",
  section: "Schema and versions",
  tags: ["version().stores()", "add", "count", "tables"],
  docs: ["repo/docs/Tutorial/Understanding-the-basics.md", "repo/docs/Tutorial/Design.md", "repo/docs/Version/Version.stores().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
