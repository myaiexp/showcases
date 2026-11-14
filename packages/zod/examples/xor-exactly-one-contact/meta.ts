// Zod example: Exclusive union: exactly one option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Exclusive union: exactly one option',
  summary:
    'A contact is either an email or a phone, never both and never neither. z.xor() accepts a single match, rejects zero matches like a normal union, and also rejects two matches, reporting which options matched.',
  section: 'Arrays, tuples and unions',
  tags: ['z.xor', 'z.object', 'invalid_union', 'matches'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
