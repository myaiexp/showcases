// dexie-js example: collection.limit(): stop after N rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.limit(): stop after N rows",
  summary:
    "limit(3) cuts a collection off after three rows, whatever order it is in. Because the collection is ordered by age, the three it keeps are the three youngest. A limit larger than the table simply returns everything.",
  section: 'Collection',
  tags: ['limit', 'orderBy', 'where', 'above'],
  docs: ['repo/docs/Collection/Collection.limit().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
