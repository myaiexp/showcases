// Zod example: Currency codes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Currency codes',
  summary:
    'z.currencyCode() accepts three-letter ISO 4217 codes in capitals. It knows the real list, so a made-up code like ZZZ or a withdrawn one fails.',
  section: 'Strings and formats',
  tags: ['z.currencyCode'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
