// dexie-js example: collection.or(): add a second search
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.or(): add a second search",
  summary:
    "or() starts another search on a different index and merges its rows with the first. First Sara by name, then everyone with big feet is added, then everyone under 10. A row that matches more than once is still listed once.",
  section: 'Collection',
  tags: ['or', 'where', 'equalsIgnoreCase', 'above', 'below'],
  docs: ['repo/docs/Collection/Collection.or().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
