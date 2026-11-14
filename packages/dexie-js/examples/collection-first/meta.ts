// dexie-js example: collection.first(): just the first row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.first(): just the first row",
  summary:
    "first() runs the query and returns only the first row in the collection's order, or nothing at all when the query finds nobody. Which row is first depends on the index: by age it is the youngest, and the matching row is highlighted.",
  section: 'Collection',
  tags: ['first', 'orderBy', 'where', 'above'],
  docs: ['repo/docs/Collection/Collection.first().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
