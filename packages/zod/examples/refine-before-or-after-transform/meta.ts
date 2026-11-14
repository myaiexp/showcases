// Zod example: Order matters: refine before or after transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Order matters: refine before or after transform',
  summary:
    "A code may be at most 5 characters. Checked before a trim transform, the padded text counts its spaces and fails; checked after the trim, it passes. The same two steps in a different order give different answers.",
  section: 'Transforms and pipes',
  tags: ['refine', 'transform', 'pipe'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
