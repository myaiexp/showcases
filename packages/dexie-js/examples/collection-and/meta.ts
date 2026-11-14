// dexie-js example: collection.and(): add a JS test to a query
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.and(): add a JS test to a query",
  summary:
    "A query can use an index to narrow things down, then and() adds any test you can write in plain JavaScript. Here ages above 25 are found first, then the list is trimmed by shoe size and by a letter in the name. The matching rows light up in the grid.",
  section: 'Collection',
  tags: ['and', 'where', 'above'],
  docs: ['repo/docs/Collection/Collection.and().md', 'repo/docs/Tutorial/Design.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
