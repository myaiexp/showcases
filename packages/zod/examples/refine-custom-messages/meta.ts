// Zod example: Custom messages for refine
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom messages for refine',
  summary:
    "Three versions of the same rule, a username of 8 characters or more. Without an error option Zod says only Invalid input; with a string it says what you wrote; with a function it can quote the exact text that was rejected.",
  section: 'Refinements',
  tags: ['refine', 'error', 'error function', 'issue.input'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
