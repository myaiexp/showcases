// Zod example: A check's message beats the schema's
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A check\'s message beats the schema\'s',
  summary:
    'z.string("Invalid name").min(5) words every failure of the string with the schema message, including the length check. Adding a message on .min() itself wins for that check, while a wrong type still gets the schema\'s message.',
  section: 'Customizing errors',
  tags: ['error', 'z.string', 'min', 'error precedence'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
