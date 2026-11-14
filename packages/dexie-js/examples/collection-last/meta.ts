// dexie-js example: collection.last(): just the last row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.last(): just the last row",
  summary:
    "last() returns only the final row of the collection in its order, or nothing when the query is empty. Sorted by age the last row is the oldest friend. It is the mirror image of first().",
  section: 'Collection',
  tags: ['last', 'orderBy', 'where', 'below'],
  docs: ['repo/docs/Collection/Collection.last().md', 'repo/docs/Collection/Collection.first().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
