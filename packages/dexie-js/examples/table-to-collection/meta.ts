// dexie-js example: toCollection(): the whole table as a Collection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "toCollection(): the whole table as a Collection",
  summary: "toCollection() turns the entire table into a Collection, the thing you chain filters and readers onto. Here the same collection is counted, filtered by age, and asked for its first row.",
  section: 'Table',
  tags: ["toCollection", "count", "filter", "first"],
  docs: ["repo/docs/Table/Table.toCollection().md", "repo/docs/Collection/Collection.count().md", "repo/docs/Collection/Collection.filter().md", "repo/docs/Collection/Collection.first().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
