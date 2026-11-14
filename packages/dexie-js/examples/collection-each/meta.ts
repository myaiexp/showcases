// dexie-js example: collection.each(): visit every row in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.each(): visit every row in order",
  summary:
    "each() calls your function once for each row of the collection, in the collection's order. The rows light up one after another in the grid as if the database were reading them out loud. The order depends on the index: by id, by age or only the over-30s.",
  section: 'Collection',
  tags: ['each', 'orderBy', 'where', 'above'],
  docs: ['repo/docs/Collection/Collection.each().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
