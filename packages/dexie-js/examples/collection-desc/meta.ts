// dexie-js example: collection.desc(): flip the order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.desc(): flip the order",
  summary:
    "A collection comes back in the order of the index it was found with, smallest first. desc() flips that to largest first, and calling it a second time flips it back. The numbered list on the right shows the order the call returned.",
  section: 'Collection',
  tags: ['desc', 'where', 'above', 'toArray'],
  docs: ['repo/docs/Collection/Collection.desc().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
