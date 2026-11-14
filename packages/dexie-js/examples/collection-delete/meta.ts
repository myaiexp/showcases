// dexie-js example: collection.delete(): remove everything matched
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.delete(): remove everything matched",
  summary:
    "delete() removes every row the query finds, in one call, and tells you how many it removed. Matched rows turn red and fade out of the grid. Deleting a query that finds nothing is harmless and returns zero.",
  section: 'Collection',
  tags: ['delete', 'where', 'below', 'above'],
  docs: ['repo/docs/Collection/Collection.delete().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
