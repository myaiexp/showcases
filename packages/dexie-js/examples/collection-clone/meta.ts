// dexie-js example: collection.clone(): reuse a query safely
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.clone(): reuse a query safely",
  summary:
    "Methods like reverse() and limit() change the collection they are called on. clone() makes a copy of the query first, so the original keeps asking its original question. The last step shows what happens without it.",
  section: 'Collection',
  tags: ['clone', 'reverse', 'limit', 'above'],
  docs: ['repo/docs/Collection/Collection.clone().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
