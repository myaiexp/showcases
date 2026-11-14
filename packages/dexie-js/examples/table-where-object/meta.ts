// dexie-js example: where({...}): match several fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "where({...}): match several fields",
  summary: "Hand where() an object instead of an index name and it returns a Collection filtered by every field you list. Two Davids are stored; adding the age picks one. It is the same lookup as get() with criteria.",
  section: 'Table',
  tags: ["where", "first", "get", "toArray"],
  docs: ["repo/docs/Table/Table.where().md", "repo/docs/Table/Table.get().md", "repo/docs/Collection/Collection.first().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
