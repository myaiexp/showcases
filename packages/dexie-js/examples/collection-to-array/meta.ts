// dexie-js example: collection.toArray(): get the rows as a list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.toArray(): get the rows as a list",
  summary:
    "toArray() runs the query and returns every matching row as a list, in the collection's order. This is the everyday way to read data out of Dexie: all rows, those found by where(), or a sorted slice. The numbered list on the right is the array.",
  section: 'Collection',
  tags: ['toArray', 'where', 'startsWith', 'orderBy'],
  docs: ['repo/docs/Collection/Collection.toArray().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
