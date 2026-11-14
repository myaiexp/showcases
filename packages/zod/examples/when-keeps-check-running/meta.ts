// Zod example: when: run a check despite other errors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'when: run a check despite other errors',
  summary:
    "By default a refine on an object is skipped as soon as any field has a type error, so a matching-passwords check stays silent while an unrelated field is wrong. A when function can say the refine should still run, and the mismatch shows up alongside the other issue.",
  section: 'Refinements',
  tags: ['refine', 'when', 'path', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
