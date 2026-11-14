// Zod example: A set of tags with size limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A set of tags with size limits',
  summary:
    'A Set holds each value once, which suits tags. z.set(z.string()) checks that the input really is a Set (an array is refused) and that every member is text, and min() and max() limit how many tags it may hold.',
  section: 'Records, maps, sets and more',
  tags: ['z.set', 'min', 'max', 'z.string'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
