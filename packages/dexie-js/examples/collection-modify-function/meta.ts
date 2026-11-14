// dexie-js example: collection.modify(fn): compute each new value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.modify(fn): compute each new value",
  summary:
    "Give modify() a function and it is called once for each matching row, so each new value can depend on the old one. Here every friend gets a year older. Changed cells flash amber, and the function can be limited to a subset like the over-60s.",
  section: 'Collection',
  tags: ['modify', 'toCollection', 'where', 'above'],
  docs: ['repo/docs/Collection/Collection.modify().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
