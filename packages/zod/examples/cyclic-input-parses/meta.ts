// Zod example: cyclical input data parses, and the output mirrors the loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data that points back to itself",
  summary:
    "A category that lists itself as a subcategory is a loop in the data, not a tree. Zod does not run forever on it: it parses the loop and hands back a new loop, so the result mirrors the input's shape without being the same object.",
  section: 'Objects',
  tags: ['z.object', 'getter', 'recursive', 'cyclical input'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
