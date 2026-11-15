// Zod example: Strip a phone number to its digits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Strip a phone number to its digits',
  summary:
    "People type phone numbers with brackets, spaces, dots and plus signs. A transform that removes everything but digits gives you one clean value to store, and the output shows exactly what was dropped.",
  section: 'Transforms and pipes',
  tags: ['transform', 'z.string', 'regex'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
