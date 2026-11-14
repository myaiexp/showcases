// dexie-js example: *tags: one row, many index entries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "*tags: one row, many index entries",
  summary: "A person has a list of tags. With a star in front of the index, each tag in the list is searchable on its own, so searching for sports finds everyone who has it. Declared without the star, the same list is treated as one single value and nothing is found.",
  section: "Schema and versions",
  tags: ["stores", "*tags", "where().equals", "multiEntry"],
  docs: ["repo/docs/Version/Version.stores().md", "repo/docs/MultiEntry-Index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
