// Zod example: Upper or lower case only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Upper or lower case only',
  summary:
    'z.string().uppercase() and .lowercase() do not change the text, they reject text that is not already in that case. Country codes and slugs are the usual uses.',
  section: 'Strings and formats',
  tags: ['.uppercase', '.lowercase'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
