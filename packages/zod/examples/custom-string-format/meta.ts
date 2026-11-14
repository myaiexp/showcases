// Zod example: Make your own string format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Make your own string format',
  summary:
    'z.stringFormat() turns a regular expression or a yes/no function into a named format. Failures are reported as invalid_format, with the format\'s name in the message.',
  section: 'Strings and formats',
  tags: ['z.stringFormat'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
