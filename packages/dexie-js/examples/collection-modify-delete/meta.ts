// dexie-js example: collection.modify(): delete rows from inside
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.modify(): delete rows from inside",
  summary:
    "A modify() function can also remove the row it is looking at by deleting ref.value. The matched rows turn red and disappear, and the count of changed rows comes back. This does the same as delete() on the same query.",
  section: 'Collection',
  tags: ['modify', 'delete', 'where', 'above'],
  docs: ['repo/docs/Collection/Collection.modify().md', 'repo/docs/Collection/Collection.delete().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
