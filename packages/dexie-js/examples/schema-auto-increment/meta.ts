// dexie-js example: ++id: the table numbers its rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "++id: the table numbers its rows",
  summary: "A table can number its own rows. Declare the key with ++ and add people without giving an id: each one comes back with the next number. Delete the newest and add again, and the freed number is not given out a second time.",
  section: "Schema and versions",
  tags: ["stores", "++id", "add", "delete"],
  docs: ["repo/docs/Version/Version.stores().md", "repo/docs/Tutorial/Understanding-the-basics.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
