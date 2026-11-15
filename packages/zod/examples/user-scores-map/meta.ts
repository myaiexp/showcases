// Zod example: A Map of user id to score
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A Map of user id to score',
  summary:
    'z.map(key schema, value schema) checks a real Map. Here keys are text and values whole numbers from 0 to 100. A bad entry is pinned to its key in the issue path, whether the key or the value was wrong, and min() and max() limit how many entries it holds.',
  section: 'Records, maps, sets and more',
  tags: ['z.map', 'min', 'max', 'issues', 'path'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
