// Zod example: Text built from parts: CSS sizes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text built from parts: CSS sizes',
  summary:
    'z.templateLiteral() describes text assembled from pieces, here a number followed by px, em or rem. It accepts "1.5rem" and rejects "12pt" or a missing unit.',
  section: 'Strings and formats',
  tags: ['z.templateLiteral', 'z.number', 'z.enum'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
