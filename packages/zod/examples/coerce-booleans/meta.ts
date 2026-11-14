// Zod example: The coerce boolean surprise
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The coerce boolean surprise',
  summary:
    'z.coerce.boolean() runs Boolean(input), so every non-empty text counts as true, including "false" and "0". Only the usual falsy values (0, empty text, null, undefined) come out false.',
  section: 'Primitives and coercion',
  tags: ['z.coerce.boolean', 'z.boolean', 'coercion'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
