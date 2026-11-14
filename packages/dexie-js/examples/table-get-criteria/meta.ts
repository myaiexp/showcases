// dexie-js example: get() with criteria: first row that matches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "get() with criteria: first row that matches",
  summary: "Instead of a key, hand get() an object of field values. It returns the first row that matches them all, or undefined. With two Merkels stored it still returns just one row.",
  section: 'Table',
  tags: ["get", "criteria"],
  docs: ["repo/docs/Table/Table.get().md", "repo/docs/Table/Table.where().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
