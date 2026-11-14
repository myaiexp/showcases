// dexie-js example: or() vs and(): union or intersection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "or() vs and(): union or intersection",
  summary:
    "and() keeps rows that pass both tests (the overlap). or() runs a second search on another index and adds its rows (the union). A friend who matches both searches still shows up only once.",
  section: 'Collection',
  tags: ['or', 'and', 'where', 'above'],
  docs: ['repo/docs/Collection/Collection.or().md', 'repo/docs/Collection/Collection.and().md', 'repo/docs/Tutorial/Design.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
