// Zod example: z.enum from an enum-like object allows its values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Enums from an object: values count, names do not',
  summary:
    "Code often keeps its options in an object like { Salmon: 0, Tuna: 1 }. z.enum() accepts that object (or a TypeScript enum) and allows its values, not its names: 0 and 1 pass, Salmon and 2 do not.",
  section: 'Numbers, dates and enums',
  tags: ['z.enum'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
