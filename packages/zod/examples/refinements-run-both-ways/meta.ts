// Zod example: Checks run going out as well
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Checks run going out as well',
  summary:
    "A refine on a codec guards both directions. A Date from 1999 is refused when you encode it just as ISO text from 1999 is refused when you decode it; and a wrong kind of value is caught first, before your check ever runs.",
  section: 'Codecs',
  tags: ['z.codec', '.refine', 'safeEncode', 'safeDecode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
