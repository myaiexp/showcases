// dexie-js example: primaryKeys(): AND across several indexes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "primaryKeys(): AND across several indexes",
  summary:
    "Dexie has no built-in AND across different indexes, but primaryKeys() makes one easy: run each search for ids only, keep the ids that appear in every list, then fetch just those rows. Each step lights up one search and the last shows the overlap.",
  section: 'Collection',
  tags: ['primaryKeys', 'bulkGet', 'startsWith', 'between', 'transaction'],
  docs: ['repo/docs/Collection/Collection.primaryKeys().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
