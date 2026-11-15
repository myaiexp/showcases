// Zod example: Clock times and precision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clock times and precision',
  summary:
    'z.iso.time() accepts HH:MM with optional seconds and fractions, and never a zone. The precision option pins how many digits are allowed after the minutes.',
  section: 'Strings and formats',
  tags: ['z.iso.time', 'precision'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
