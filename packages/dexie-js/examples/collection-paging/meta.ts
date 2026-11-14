// dexie-js example: offset() + limit(): page through results
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "offset() + limit(): page through results",
  summary:
    "Skip a few rows with offset(), then take a few with limit(), and you have a page. Here the friends over 10 are shown two per page. In the full view you can change the page size and see how the pages shift.",
  section: 'Collection',
  tags: ['offset', 'limit', 'where', 'above', 'paging'],
  docs: ['repo/docs/Collection/Collection.offset().md', 'repo/docs/Collection/Collection.limit().md', 'repo/docs/Collection/Collection.and().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
