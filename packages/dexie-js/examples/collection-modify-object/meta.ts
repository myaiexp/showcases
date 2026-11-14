// dexie-js example: collection.modify({...}): set fields on every match
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.modify({...}): set fields on every match",
  summary:
    "modify() with an object writes the same new values into every row a query found, and returns how many rows it changed. Here everyone with big feet gets a flag. The changed cells flash amber and the count appears on the right.",
  section: 'Collection',
  tags: ['modify', 'where', 'aboveOrEqual'],
  docs: ['repo/docs/Collection/Collection.modify().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
