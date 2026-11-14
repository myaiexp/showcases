// Zod example: A short list of allowed values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A short list of allowed values',
  summary:
    'Hand z.literal() an array and it accepts any one of those values, like a size or a status. Anything else is rejected with the list of options, and .values gives you the set.',
  section: 'Primitives and coercion',
  tags: ['z.literal', '.values'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
