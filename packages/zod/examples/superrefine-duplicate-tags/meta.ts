// Zod example: superRefine: one issue per duplicate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'superRefine: one issue per duplicate',
  summary:
    "A tag list must not repeat itself. A plain refine can only say the list is wrong somewhere; superRefine gets a ctx and can add one issue for each repeated tag, pinned to its own position in the list.",
  section: 'Refinements',
  tags: ['superRefine', 'addIssue', 'path', 'z.array'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
