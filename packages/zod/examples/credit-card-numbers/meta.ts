// Zod example: Card numbers and the Luhn check
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Card numbers and the Luhn check',
  summary:
    'z.creditCard() checks the length and the Luhn checksum, so a single mistyped digit is caught. Single spaces and hyphens between groups are allowed; the issuer is not identified.',
  section: 'Strings and formats',
  tags: ['z.creditCard'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
