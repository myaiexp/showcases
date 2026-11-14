// dexie-js example: orderBy() skips rows without a sortable value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "orderBy() skips rows without a sortable value",
  summary: "Two friends have no usable age: one never had it, one has null. They are in the table, but orderBy('age') cannot place them, so they are missing from the sorted list. Keep that in mind when a field is optional.",
  section: 'Table',
  tags: ["orderBy", "toArray", "indexable types"],
  docs: ["repo/docs/Table/Table.orderBy().md", "repo/docs/Indexable-Type.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
