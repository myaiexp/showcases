// dexie-js example: update() with a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "update() with a function",
  summary: "When the new value depends on the old one, give update() a function instead of an object. It receives the stored row, edits it (add a year, shout the name, delete a field) and Dexie saves the result.",
  section: 'Table',
  tags: ["update", "function"],
  docs: ["repo/docs/Table/Table.update().md", "repo/docs/Collection/Collection.modify().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
