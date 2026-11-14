// dexie-js example: collection.count(): how many match
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.count(): how many match",
  summary:
    "count() answers how many rows a query finds without handing you the rows. The number is shown big on the right, while the matching rows light up in the grid. Narrowing the query with where() or and() changes the number.",
  section: 'Collection',
  tags: ['count', 'where', 'above', 'and'],
  docs: ['repo/docs/Collection/Collection.count().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
