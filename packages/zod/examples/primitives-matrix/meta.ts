// Zod example: Which schema accepts what
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which schema accepts what',
  summary:
    'The seven primitive schemas side by side against a row of mixed values. Each schema takes exactly one kind of value and nothing else: "1" is not 1, NaN is not a number, and null is not undefined.',
  section: 'Primitives and coercion',
  tags: ['z.string', 'z.number', 'z.bigint', 'z.boolean', 'z.symbol', 'z.undefined', 'z.null'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
