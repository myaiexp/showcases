// Zod example: z.enum accepts a fixed list of strings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pick a size: z.enum',
  summary:
    "A shop sells t-shirts in S, M, L and XL. z.enum() accepts exactly those strings, spelled exactly like that: lower-case m, XXL and the word large are all rejected, and the message lists what would have been accepted.",
  section: 'Numbers, dates and enums',
  tags: ['z.enum'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
