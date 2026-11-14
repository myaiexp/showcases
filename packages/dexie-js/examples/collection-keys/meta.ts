// dexie-js example: collection.keys(): list the index values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.keys(): list the index values",
  summary:
    "keys() returns the values of the index the collection was found with, such as names or ages, instead of whole rows. It is quicker than toArray() because the rows themselves are not loaded. The list follows the collection's order.",
  section: 'Collection',
  tags: ['keys', 'orderBy', 'where', 'reverse'],
  docs: ['repo/docs/Collection/Collection.keys().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
