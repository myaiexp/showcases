// Zod example: integers checked against 32-bit limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fits in 32 bits? int32 and uint32',
  summary:
    "Databases and binary formats store whole numbers in a fixed number of bits. z.int32() accepts what a signed 32-bit integer can hold, about plus or minus 2.1 billion. z.uint32() accepts 0 to about 4.29 billion. One step past either edge is rejected.",
  section: 'Numbers, dates and enums',
  tags: ['z.int32', 'z.uint32'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
