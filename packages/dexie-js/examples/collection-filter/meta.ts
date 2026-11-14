// dexie-js example: collection.filter(): same as and()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collection.filter(): same as and()",
  summary:
    "filter() does exactly what and() does: it keeps the rows your JavaScript function says yes to. Here friends come out in age order, then a name test trims them, then limit() takes just the first two of what is left.",
  section: 'Collection',
  tags: ['filter', 'orderBy', 'limit'],
  docs: ['repo/docs/Collection/Collection.filter().md', 'repo/docs/Collection/Collection.and().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
