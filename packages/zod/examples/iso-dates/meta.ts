// Zod example: Calendar dates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Calendar dates',
  summary:
    'z.iso.date() accepts YYYY-MM-DD and checks that the day exists on the calendar: 2020-02-29 is real, 2021-02-29 is not, and so is a month 13.',
  section: 'Strings and formats',
  tags: ['z.iso.date'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
