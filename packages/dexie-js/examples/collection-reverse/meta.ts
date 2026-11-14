// dexie-js example: collection.reverse(): the same as desc()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.reverse(): the same as desc()",
  summary:
    "reverse() turns the order around: A to Z becomes Z to A. It is just another name for desc(), and like it, calling it twice cancels out. Read the numbered list on the right to see the order that came back.",
  section: 'Collection',
  tags: ['reverse', 'orderBy', 'toArray'],
  docs: ['repo/docs/Collection/Collection.reverse().md', 'repo/docs/Collection/Collection.desc().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
