// Zod example: a self-referencing schema checks a nested category tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A category tree of any depth",
  summary:
    "A shop category holds subcategories, which hold more subcategories. A getter on the key lets the schema refer to itself, so one definition checks a tree of any depth and an issue deep inside is pinned by its full path.",
  section: 'Objects',
  tags: ['z.object', 'getter', 'z.array', 'recursive', 'path'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
