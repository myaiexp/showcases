// dexie-js example: delete() across two searches: orders cleanup
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "delete() across two searches: orders cleanup",
  summary:
    "Because a collection can combine searches with or(), delete() can clear out several kinds of rows at once. Here every order that is finished or discarded, plus every order dated before February, is removed in one call. An order matching both reasons is deleted once.",
  section: 'Collection',
  tags: ['delete', 'where', 'anyOf', 'or', 'below'],
  docs: ['repo/docs/Collection/Collection.delete().md', 'repo/docs/Collection/Collection.or().md', 'repo/docs/WhereClause/WhereClause.anyOf().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
