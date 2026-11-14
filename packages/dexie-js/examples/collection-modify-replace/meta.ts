// dexie-js example: collection.modify(): replace a whole row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.modify(): replace a whole row",
  summary:
    "Inside a modify() function you can swap the entire row for a different object by assigning to ref.value. Here the friends over 80 are replaced by a placeholder; the id stays, everything else is new. Other rows are left alone.",
  section: 'Collection',
  tags: ['modify', 'where', 'above'],
  docs: ['repo/docs/Collection/Collection.modify().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
