// dexie-js example: reverse().sortBy(): sort descending
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "reverse().sortBy(): sort descending",
  summary:
    "sortBy() always sorts upwards, so to sort downwards call reverse() on the collection first. The friends over 25 come back Z to A by name when reverse() comes before sortBy().",
  section: 'Collection',
  tags: ['sortBy', 'reverse', 'where', 'above'],
  docs: ['repo/docs/Collection/Collection.sortBy().md', 'repo/docs/Collection/Collection.reverse().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
