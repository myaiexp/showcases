// Zod example: Your own words for each field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your own words for each field',
  summary:
    'A sign-up schema checked twice over the same data: once with Zod\'s default messages, once with a message written on each field. The problems and their places are identical; only the wording changes, which is what a person filling in the form actually reads.',
  section: 'Customizing errors',
  tags: ['error', 'z.string', 'z.email', 'z.number', 'message'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
