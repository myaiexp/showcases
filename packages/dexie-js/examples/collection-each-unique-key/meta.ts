// dexie-js example: collection.eachUniqueKey(): each key only once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.eachUniqueKey(): each key only once",
  summary:
    "Three of these six people are called Angela. eachKey() would visit Angela three times, but eachUniqueKey() visits every different first name once. The grid lights up the first row of each name.",
  section: 'Collection',
  tags: ['eachUniqueKey', 'eachKey', 'orderBy'],
  docs: ['repo/docs/Collection/Collection.eachUniqueKey().md', 'repo/docs/Collection/Collection.eachKey().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
