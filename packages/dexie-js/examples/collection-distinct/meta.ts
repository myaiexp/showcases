// dexie-js example: collection.distinct(): no repeats from a multi-entry index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.distinct(): no repeats from a multi-entry index",
  summary:
    "With a multi-entry index every tag of a row is indexed on its own, so a row with two matching tags is found twice. distinct() removes the repeats so each friend appears once. Arnold has both tags, so watch him in the numbered list.",
  section: 'Collection',
  tags: ['distinct', '*tags', 'anyOf'],
  docs: ['repo/docs/Collection/Collection.distinct().md', 'repo/docs/MultiEntry-Index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
