// Zod example: .apply() hands extra arguments to your function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '.apply() hands extra arguments to your function',
  summary:
    'A function that turns a missing or null nickname into a fallback takes the fallback as its argument. .apply(withFallback, "anonymous") passes it through, and another schema reuses the same function with "n/a".',
  section: 'Defaults, catch and more',
  tags: ['apply', 'nullish', 'transform'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
