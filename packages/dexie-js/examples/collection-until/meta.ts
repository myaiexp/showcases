// dexie-js example: collection.until(): stop when a test says so
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.until(): stop when a test says so",
  summary:
    "Where limit() stops after a number of rows, until() stops when a row passes your test. Walking friends by age, the walk ends at the first person over 60. Pass true as the second argument and that stopping row is kept too.",
  section: 'Collection',
  tags: ['until', 'orderBy', 'reverse', 'limit'],
  docs: ['repo/docs/Collection/Collection.until().md', 'repo/docs/Collection/Collection.limit().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
