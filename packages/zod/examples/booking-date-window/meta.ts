// Zod example: z.date min and max with custom messages
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A booking window for dates',
  summary:
    "A hotel takes bookings for December only. z.date().min() and .max() set the opening and closing day, each with its own message, so a date that is too early or too late is told exactly which side it missed.",
  section: 'Numbers, dates and enums',
  tags: ['z.date', 'min', 'max', 'error'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
