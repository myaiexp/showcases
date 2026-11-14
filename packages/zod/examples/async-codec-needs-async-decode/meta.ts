// Zod example: Async codecs need the async calls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Async codecs need the async calls',
  summary:
    "A codec whose decode looks something up (here a pretend price list, no network) returns a Promise. The plain decode refuses it outright; safeDecodeAsync and safeEncodeAsync wait for the answer and give back the normal result.",
  section: 'Codecs',
  tags: ['z.codec', 'z.safeDecode', 'z.safeDecodeAsync', 'z.safeEncodeAsync'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
