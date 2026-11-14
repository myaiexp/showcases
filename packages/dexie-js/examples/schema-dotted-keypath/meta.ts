// dexie-js example: address.city: index a nested field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "address.city: index a nested field",
  summary: "An index can point inside a nested object by writing the path with a dot. Here the city lives inside each person's address, and searching by address.city finds the people in Malm\u00f6 or in Stockholm and Barcelona.",
  section: "Schema and versions",
  tags: ["stores", "address.city", "where().equals", "anyOf"],
  docs: ["repo/docs/Version/Version.stores().md", "repo/docs/IndexSpec.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
