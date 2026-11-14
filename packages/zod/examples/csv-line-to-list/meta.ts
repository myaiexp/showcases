// Zod example: Split a line of text into a list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Split a line of text into a list',
  summary:
    "A tag field arrives as one comma-separated string. A transform splits it, trims each piece and drops the empty ones, so the schema hands back a real list. The output pane shows the text become an array.",
  section: 'Transforms and pipes',
  tags: ['transform', 'split', 'z.string'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
