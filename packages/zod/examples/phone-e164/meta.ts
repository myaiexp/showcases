// Zod example: International phone numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'International phone numbers',
  summary:
    'z.e164() accepts phone numbers in the international E.164 form: a plus, a non-zero country code and 7 to 15 digits in total. Spaces, dashes and national formats are rejected.',
  section: 'Strings and formats',
  tags: ['z.e164'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
