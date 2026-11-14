// Zod example: ISO date-times and their options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ISO date-times and their options',
  summary:
    'z.iso.datetime() accepts the strict ISO 8601 form, and options widen or narrow it: time-zone offsets, local times with no zone, and how many digits the seconds may have. Pick an option and watch one set of timestamps change.',
  section: 'Strings and formats',
  tags: ['z.iso.datetime', 'offset', 'local', 'precision'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
