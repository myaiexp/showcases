// Zod example: Confirm password: pin the issue on a field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Confirm password: pin the issue on a field',
  summary:
    "A sign-up form whose rule spans two fields: password and confirm must match. A refine on the whole object would blame nobody in particular, so path: [confirm] puts the issue on the confirm field where the form can show it.",
  section: 'Refinements',
  tags: ['refine', 'path', 'z.object', 'issues'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
