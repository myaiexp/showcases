// Zod example: Null, undefined and void
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Null, undefined and void',
  summary:
    'JavaScript has two kinds of nothing and Zod keeps them apart: z.null() accepts only null, z.undefined() only a missing value. z.void() is another name for z.undefined().',
  section: 'Primitives and coercion',
  tags: ['z.null', 'z.undefined', 'z.void'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
