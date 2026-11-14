// Zod example: Return undefined to keep the default message
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Return undefined to keep the default message',
  summary:
    'An error function that returns text answers every failure with it. One that returns undefined for the cases it does not care about leaves those with Zod\'s own message, so you can reword just one kind of failure.',
  section: 'Customizing errors',
  tags: ['error function', 'undefined', 'too_big', 'z.int', 'fallback'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
