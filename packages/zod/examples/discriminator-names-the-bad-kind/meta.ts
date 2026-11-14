// Zod example: A discriminator makes the unknown-kind error clear
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A discriminator makes the unknown-kind error clear',
  summary:
    'The same three payment shapes as a plain z.union and as a z.discriminatedUnion. For a known kind with a bad field both report the same field issue, but for a wrong or missing kind the plain union can only say "Invalid input" while the discriminated one says which kinds exist.',
  section: 'Arrays, tuples and unions',
  tags: ['z.discriminatedUnion', 'z.union', 'invalid_union'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
