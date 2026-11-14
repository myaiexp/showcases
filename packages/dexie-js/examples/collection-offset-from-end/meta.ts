// dexie-js example: reverse().offset(): skip rows from the end
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "reverse().offset(): skip rows from the end",
  summary:
    "offset() skips from the front, but turn the collection around with reverse() first and it skips from the back. That gives you everything except the last few rows, or a slice counted from the end. Names are sorted A to Z here.",
  section: 'Collection',
  tags: ['reverse', 'offset', 'limit', 'orderBy'],
  docs: ['repo/docs/Collection/Collection.offset().md', 'repo/docs/Collection/Collection.reverse().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
