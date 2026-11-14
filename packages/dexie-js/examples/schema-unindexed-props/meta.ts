// dexie-js example: Only indexed fields are declared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Only indexed fields are declared",
  summary: "Only the fields you list in stores() are indexed, but every other field is still saved. Here kind and fur are stored and shown in the grid, yet searching by fur is refused because it was never declared, while searching by name works.",
  section: "Schema and versions",
  tags: ["stores", "put", "where", "SchemaError"],
  docs: ["repo/docs/Version/Version.stores().md", "repo/docs/Tutorial/Design.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
