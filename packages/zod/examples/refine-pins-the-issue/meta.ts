// Zod example: A rule across fields: with and without a path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A rule across fields: with and without a path',
  summary:
    "A trip form where the end date must not come before the start date. A plain refine on the object reports the problem for the whole value; add path: [end] and the same message lands on the end field.",
  section: 'Refinements',
  tags: ['refine', 'path', 'z.object', 'issues'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
