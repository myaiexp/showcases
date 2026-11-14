// dexie-js example: collection.eachPrimaryKey(): visit the row ids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.eachPrimaryKey(): visit the row ids",
  summary:
    "eachPrimaryKey() calls your function with each row's id, in the order of the index used. Sorting by name gives the ids in alphabetical order of the names, which is not the same as 1, 2, 3. Handy when you only need to know which rows, not what they hold.",
  section: 'Collection',
  tags: ['eachPrimaryKey', 'orderBy'],
  docs: ['repo/docs/Collection/Collection.eachPrimaryKey().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
