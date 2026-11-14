// Zod example: Error words for one parse only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Error words for one parse only',
  summary:
    'An error map passed to safeParse words the failures of that single call and leaves the schema untouched. The same order is checked with and without it, so you can see the schema itself carries no messages.',
  section: 'Customizing errors',
  tags: ['safeParse', 'error', 'per-parse', 'error map'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
