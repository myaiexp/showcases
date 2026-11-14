// Zod example: Text to numbers and back, with a codec
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text to numbers and back, with a codec',
  summary:
    "stringToNumber and stringToInt are defined as the docs show (they are code to copy, not built-in exports). Each reads number text with a pattern check, decodes it, and writes text back; the encoded text can differ in spelling, and text the pattern dislikes is refused.",
  section: 'Codecs',
  tags: ['z.codec', 'z.regexes.number', 'z.regexes.integer', 'z.int', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
