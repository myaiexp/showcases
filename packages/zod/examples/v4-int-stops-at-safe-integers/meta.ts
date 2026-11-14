// Zod example: z.number().int() rejects Infinity and unsafe integers in Zod 4
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Whole numbers must be safe integers',
  summary:
    'Zod 3 let a whole number as huge as 100000000000000000000 through z.number().int(), although JavaScript cannot count that high exactly. Zod 4 only accepts integers it can hold without rounding. Fractions and Infinity fail in both versions.',
  section: 'Release notes',
  tags: ['z.number', '.int()', 'Infinity', 'zod/v3'],
  docs: ['repo/packages/docs/content/v4/changelog.mdx', 'repo/packages/docs/content/v4/versioning.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
