// Zod example: A catch function knows what went wrong
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A catch function knows what went wrong',
  summary:
    'The volume setting uses .catch() with a function that gets the bad input and the error. A value that is too big is set to the maximum, one that is too small to the minimum, and anything else to a middle value. Each row notes what the function was told.',
  section: 'Defaults, catch and more',
  tags: ['catch', 'catch function', 'ctx.error'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
