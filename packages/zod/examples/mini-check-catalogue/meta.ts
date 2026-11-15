// Zod example: the checks Zod Mini passes into .check(), tried live
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mini checks, one by one',
  summary:
    'Zod Mini has no .min() or .trim() methods; each rule is a function handed to .check(). Pick a check (length, pattern, prefix, numeric range, list size, tidy-up) and see it accept or reject a few realistic values, and clean the ones it rewrites.',
  section: 'Zod Mini',
  tags: ['zod/mini', '.check()', 'z.minLength', 'z.regex', 'z.startsWith', 'z.gte', 'z.multipleOf', 'z.trim', 'z.toLowerCase', 'z.maxSize'],
  docs: ['repo/packages/docs/content/packages/mini.mdx', 'repo/packages/docs/content/v4/index.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
