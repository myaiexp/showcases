// Zod example: z.date rejects strings, numbers and Invalid Date
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A Date is not a date string',
  summary:
    "z.date() checks for a real Date object. A timestamp string from JSON, a number of milliseconds and the broken Date that new Date(nope) makes are all rejected. A custom error function can tell a missing value from a wrong one.",
  section: 'Numbers, dates and enums',
  tags: ['z.date', 'error'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
