// dexie-js example: or() then sortBy(): put the result in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "or() then sortBy(): put the result in order",
  summary:
    "A collection built with or() runs several searches at once, so its order is not defined. Add sortBy() and the rows come back in an order you choose, oldest first or youngest first.",
  section: 'Collection',
  tags: ['or', 'sortBy', 'reverse', 'above'],
  docs: ['repo/docs/Collection/Collection.or().md', 'repo/docs/Collection/Collection.sortBy().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
