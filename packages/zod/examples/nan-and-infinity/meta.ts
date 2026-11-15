// Zod example: z.number rejects NaN and Infinity, z.nan accepts only NaN
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'NaN and Infinity are not numbers here',
  summary:
    "In JavaScript NaN and Infinity have the type number, but z.number() only allows finite numbers and rejects them. If NaN is what you really want to accept, z.nan() takes it and nothing else.",
  section: 'Numbers, dates and enums',
  tags: ['z.number', 'z.nan'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
