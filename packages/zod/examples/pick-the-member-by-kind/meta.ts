// Zod example: z.getDiscriminatedOption fetches one member of a union
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pull one member out of a union',
  summary:
    'A union of fruit and vegetable records, told apart by a type field. z.getDiscriminatedOption hands back just the matching member, so the same union can supply the exact fruit schema when only a fruit is expected.',
  section: 'Release notes',
  tags: ['z.getDiscriminatedOption', 'z.discriminatedUnion', 'z.literal'],
  docs: ['repo/packages/docs/content/blog/zod-4-5.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
