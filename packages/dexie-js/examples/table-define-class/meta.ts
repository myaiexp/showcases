// dexie-js example: defineClass(): a class made for the table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "defineClass(): a class made for the table",
  summary: "Instead of bringing your own class, defineClass() makes one for the table. Add a method to its prototype and every row read from the table can call it, even though the method was never stored in the database.",
  section: 'Table',
  tags: ["defineClass", "prototype", "get", "each"],
  docs: ["repo/docs/Table/Table.defineClass().md", "repo/docs/Table/Table.mapToClass().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
