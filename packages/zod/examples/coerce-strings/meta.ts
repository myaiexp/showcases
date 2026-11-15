// Zod example: Coerce anything into text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coerce anything into text',
  summary:
    'z.string() rejects 42; z.coerce.string() runs String(input) first, so numbers, booleans, null and even lists become text. Nothing fails, which is the catch: null turns into the word "null".',
  section: 'Primitives and coercion',
  tags: ['z.coerce.string', 'z.string', 'coercion'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
