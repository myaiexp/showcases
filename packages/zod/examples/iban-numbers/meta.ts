// Zod example: Bank account numbers (IBAN)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bank account numbers (IBAN)',
  summary:
    'z.iban() checks the shape of an International Bank Account Number and its mod-97 checksum, so one wrong digit is caught. Spaces and lower case are rejected: it wants the electronic form.',
  section: 'Strings and formats',
  tags: ['z.iban'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
