// Zod example: Reuse the element schema of a list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reuse the element schema of a list',
  summary:
    'A list of tags is built from one Tag schema. unwrap() hands that element schema back, so the very same rule that checks each tag in the list can check a single tag in a form field.',
  section: 'Arrays, tuples and unions',
  tags: ['z.array', 'unwrap'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
