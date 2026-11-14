// Zod example: Yes/no text and back again
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Yes/no text and back again',
  summary:
    "z.stringbool() is a codec: decode reads words like yes, no, 1 and off as true or false. Encode picks one spelling, the first word of the list; with your own lists, that first word wins.",
  section: 'Codecs',
  tags: ['z.stringbool', 'truthy', 'falsy', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
