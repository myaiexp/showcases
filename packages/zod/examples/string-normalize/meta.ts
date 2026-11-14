// Zod example: Same letter, different bytes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Same letter, different bytes',
  summary:
    'An "é" can be one character or an "e" plus a combining accent, and the two look identical but compare unequal. .normalize() makes them the same form so matching and lengths agree.',
  section: 'Strings and formats',
  tags: ['.normalize', 'unicode'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
