// Zod example: Turn typed text into a number with transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Turn typed text into a number with transform',
  summary:
    "A price typed the European way, 12,50, becomes the number 12.5. A transform converts but never judges: text with no number in it comes out as NaN and still counts as a successful parse.",
  section: 'Transforms and pipes',
  tags: ['transform', 'z.string', 'NaN'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
