// Zod example: Defaults do not apply when encoding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Defaults do not apply when encoding',
  summary:
    "default() and prefault() fill in a missing value while decoding. Going back there is nothing to fill: the output side needs a real value, so encoding undefined is refused.",
  section: 'Codecs',
  tags: ['.default', '.prefault', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
