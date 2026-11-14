// dexie-js example: collection.primaryKeys(): list the row ids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.primaryKeys(): list the row ids",
  summary:
    "primaryKeys() returns the ids of the rows a query finds, in the query's order, without loading the rows. Sorted by name the ids come back jumbled; sorted by age they come back in another order. The grid highlights the same rows.",
  section: 'Collection',
  tags: ['primaryKeys', 'orderBy', 'where', 'limit'],
  docs: ['repo/docs/Collection/Collection.primaryKeys().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
