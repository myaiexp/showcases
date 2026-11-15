// Zod example: sign rules on a number strip around zero
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Positive, negative and the zero question',
  summary:
    "Four named rules, positive, nonnegative, negative and nonpositive, drawn on a strip around zero. Zero is the only number the answer depends on: it is neither positive nor negative, so each name decides it differently.",
  section: 'Numbers, dates and enums',
  tags: ['z.number', 'positive', 'nonnegative', 'negative', 'nonpositive'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
