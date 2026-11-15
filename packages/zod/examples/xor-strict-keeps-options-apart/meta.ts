// Zod example: Make exclusive options truly exclusive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Make exclusive options truly exclusive',
  summary:
    'Plain objects drop keys they do not know, so a record with name and version matches both a name-only schema and a name-plus-version schema. Making the narrower option strict stops it matching, and z.xor() then accepts the input.',
  section: 'Arrays, tuples and unions',
  tags: ['z.xor', 'z.object', 'strict', 'extend'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
