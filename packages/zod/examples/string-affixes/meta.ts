// Zod example: Starts with, ends with, includes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Starts with, ends with, includes',
  summary:
    'Three one-line checks for text with a required beginning, ending or piece in the middle: a secure link, a CSV file name, an @ in a handle. The error names the missing piece.',
  section: 'Strings and formats',
  tags: ['.startsWith', '.endsWith', '.includes'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
