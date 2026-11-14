// Zod example: An async function that checks its arguments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An async function that checks its arguments',
  summary:
    'A stock lookup (a made-up server answered after a short wait) is wrapped with implementAsync. The call hands back a promise at once; a wrong argument makes that promise reject with a ZodError, and a good one resolves to the stock level.',
  section: 'Defaults, catch and more',
  tags: ['z.function', 'implementAsync'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
