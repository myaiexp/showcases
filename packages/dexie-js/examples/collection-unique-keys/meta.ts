// dexie-js example: collection.uniqueKeys(): keys without repeats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.uniqueKeys(): keys without repeats",
  summary:
    "uniqueKeys() returns the distinct values of an index as one list: four different first names out of six people, or five different last names. Compare with keys(), which lists every row's value including the repeats.",
  section: 'Collection',
  tags: ['uniqueKeys', 'keys', 'orderBy'],
  docs: ['repo/docs/Collection/Collection.uniqueKeys().md', 'repo/docs/Collection/Collection.keys().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
