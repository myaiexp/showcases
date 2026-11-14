// Fuse.js example: several keys in one object are an implicit AND; a repeated key needs $and
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AND without writing $and',
  summary:
    'Put two different keys in one object and Fuse treats them as AND. Put the same key in twice and JavaScript keeps only the last, so the first clause silently vanishes: that is when you need an explicit $and.',
  section: 'Logical Search',
  tags: ['$and', 'implicit AND', 'keys', 'search'],
  docs: ['repo/docs/logical-search.md', 'repo/src/core/queryParser.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
