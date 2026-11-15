// Zod example: Payment by card, bank or PayPal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Payment by card, bank or PayPal',
  summary:
    'A payment is one of three shapes, picked by its kind field. Zod reads kind first and then checks only that shape, so a bad card number is reported as a card problem and nothing is said about bank or PayPal fields. An unknown kind is rejected at kind itself.',
  section: 'Arrays, tuples and unions',
  tags: ['z.discriminatedUnion', 'z.literal', 'z.object', 'issues'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
