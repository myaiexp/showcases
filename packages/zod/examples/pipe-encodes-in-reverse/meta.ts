// Zod example: A pipe runs backwards when encoding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A pipe runs backwards when encoding',
  summary:
    "A pipe sends data through A then B on decode. On encode the order flips: B checks the value first, then A turns it back into text. The cap of 100 refuses 150 in both directions, and 4.5 passes the cap but is stopped by A.",
  section: 'Codecs',
  tags: ['.pipe', 'z.codec', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
