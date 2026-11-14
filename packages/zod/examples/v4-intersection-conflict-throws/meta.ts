// Zod example: an intersection that cannot merge throws a plain Error in Zod 4
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unmergeable intersections throw',
  summary:
    'An intersection parses the input twice and merges the two results. When the results cannot be merged, the schema itself is broken, so Zod 4 throws a plain Error instead of returning a validation issue the way Zod 3 did.',
  section: 'Release notes',
  tags: ['z.intersection', 'safeParse', 'zod/v3'],
  docs: ['repo/packages/docs/content/v4/changelog.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
