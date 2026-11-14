// Zod example: A message that repeats what you typed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A message that repeats what you typed',
  summary:
    'A size field accepts S, M, L or XL. The error function reads iss.input to quote the rejected text back and iss.values to list the allowed options.',
  section: 'Customizing errors',
  tags: ['z.enum', 'error function', 'iss.input', 'iss.values', 'invalid_value'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
