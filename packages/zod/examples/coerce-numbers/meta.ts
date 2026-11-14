// Zod example: z.coerce.number() turns text and other values into numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coerce text into numbers',
  summary:
    'Form fields and URLs hand you text, not numbers. z.number() rejects "42"; z.coerce.number() runs Number(input) first, so "42" becomes 42. Values Number() cannot read, like "tuna", still fail.',
  section: 'Primitives and coercion',
  tags: ['z.coerce.number', 'z.number', 'coercion'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
