// Zod example: z.enum over a numeric enum lists only its values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Numeric enums list only their values',
  summary:
    'A numeric TypeScript enum also stores a name for every number at runtime. Zod 4.6 leaves those reverse names out, so a three-country enum lists three options, and every listed option really parses.',
  section: 'Release notes',
  tags: ['z.enum', '.options', 'numeric enum', 'reverse mapping'],
  docs: ['repo/packages/docs/content/blog/zod-4-6.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
