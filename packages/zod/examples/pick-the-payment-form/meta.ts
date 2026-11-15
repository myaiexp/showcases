// Zod example: Get one option out of a discriminated union
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Get one option out of a discriminated union',
  summary:
    'z.getDiscriminatedOption() returns the schema for one value of the discriminator, so a screen that already knows the chosen kind can check just that form. Each kind shows the fields it asks for and then checks a sample against that option alone.',
  section: 'Arrays, tuples and unions',
  tags: ['z.getDiscriminatedOption', 'z.discriminatedUnion', 'shape'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
