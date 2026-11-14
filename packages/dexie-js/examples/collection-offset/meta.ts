// dexie-js example: collection.offset(): skip the first N rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.offset(): skip the first N rows",
  summary:
    "offset(2) skips the first two rows of the collection and returns the rest. The grid highlights what is returned; the skipped rows stay dim. Skip more rows than exist and nothing comes back.",
  section: 'Collection',
  tags: ['offset', 'orderBy', 'toArray'],
  docs: ['repo/docs/Collection/Collection.offset().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
