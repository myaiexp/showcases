// Zod example: Unix timestamps become Dates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unix timestamps become Dates',
  summary:
    "epochSecondsToDate and epochMillisToDate (defined as the docs show) turn a count since 1970 into a Date and back. Seconds drop the milliseconds on the way out, so a Date with a fraction of a second does not come back the same.",
  section: 'Codecs',
  tags: ['z.codec', 'z.int', '.min', 'z.date', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
