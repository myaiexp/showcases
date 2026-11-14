// Zod example: superRefine: choose the issue code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'superRefine: choose the issue code',
  summary:
    "refine can only produce issues with the code custom. superRefine can add any of Zod's own issue kinds, such as too_big for a list that is too long, next to a custom one for duplicates, so downstream code can tell the problems apart.",
  section: 'Refinements',
  tags: ['superRefine', 'addIssue', 'refine', 'issue code', 'z.array'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
