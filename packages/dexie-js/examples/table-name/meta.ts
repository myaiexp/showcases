// dexie-js example: name: a table knows its name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "name: a table knows its name",
  summary: "A database with three tables. Every table object carries its own name, the same word you used when you declared it, which is handy for logging or for code that handles tables generically.",
  section: 'Table',
  tags: ["name"],
  docs: ["repo/docs/Table/Table.name.md", "repo/docs/Table/Table.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
