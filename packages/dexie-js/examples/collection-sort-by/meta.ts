// dexie-js example: collection.sortBy(): sort by any field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.sortBy(): sort by any field",
  summary:
    "A query comes back in the order of its index, but sortBy() sorts the result by any field you like, even one that is not indexed. Here the friends over 25 are found by age and then put in name order, or in shoe-size order.",
  section: 'Collection',
  tags: ['sortBy', 'where', 'above'],
  docs: ['repo/docs/Collection/Collection.sortBy().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
