// Zod example: a core-typed helper accepts Zod and Zod Mini schemas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One helper, Zod or Zod Mini',
  summary:
    'A tiny library function turns a URL query into a 200 reply or a 400 listing the problems. It is written against zod/v4/core only, so the reader hands it a Zod schema or a Zod Mini schema and the same helper works with both.',
  section: 'For library authors',
  tags: ['zod/v4/core', 'z.core.$ZodType', 'z.core.safeParse', 'z.core.output', 'zod/mini'],
  docs: ['repo/packages/docs/content/library-authors.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
