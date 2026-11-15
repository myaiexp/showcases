// Zod example: z.int rejects fractions and unsafe huge integers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Whole numbers only: z.int()',
  summary:
    "A quantity field wants whole numbers. z.number() happily takes 2.5 boats, z.int() rejects the fraction, and it also turns away integers too large to be stored exactly (beyond the safe range up to 9,007,199,254,740,991).",
  section: 'Numbers, dates and enums',
  tags: ['z.int', 'z.number'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
