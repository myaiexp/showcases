// Zod example: An error tree shaped like the data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An error tree shaped like the data',
  summary:
    'z.treeifyError turns the flat issue list into a nested tree with the same shape as the data: errors at each node, properties for object fields and items for array elements. The order and its tree are drawn together.',
  section: 'Formatting errors',
  tags: ['z.treeifyError', 'properties', 'items', 'errors', 'safeParse'],
  docs: ['repo/packages/docs/content/error-formatting.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
