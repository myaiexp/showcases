// Zod example: z.transform: accept anything, return something
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'z.transform: accept anything, return something',
  summary:
    "A bare z.transform checks nothing: whatever comes in goes to your function and its return value comes out. Here String() turns text, numbers, booleans, lists and even undefined into text.",
  section: 'Transforms and pipes',
  tags: ['z.transform', 'transform'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
