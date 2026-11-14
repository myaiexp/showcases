// Zod example: A colour as a fixed three-number list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A colour as a fixed three-number list',
  summary:
    'A tuple fixes the length and gives each position its own rule. An RGB colour is exactly three whole numbers from 0 to 255; a short list, a long one, or a 300 in the wrong slot is rejected with the position named.',
  section: 'Arrays, tuples and unions',
  tags: ['z.tuple', 'int', 'min', 'max'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
