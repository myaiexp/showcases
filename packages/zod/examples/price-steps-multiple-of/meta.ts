// Zod example: multipleOf accepts only values on a fixed step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Prices in 5 cent steps',
  summary:
    "A price field must be a multiple of 0.05. 1.20 and 4.95 pass, 19.99 does not, and the sums that floating point gets slightly wrong, like 0.1 + 0.2, are still treated as 0.30 and accepted. Switch to multipleOf(5) to see whole-number steps.",
  section: 'Numbers, dates and enums',
  tags: ['z.number', 'multipleOf', 'step'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
