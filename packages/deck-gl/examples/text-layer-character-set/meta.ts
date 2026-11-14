// deck-gl example: TextLayer characterSet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TextLayer characterSet',
  summary:
    'Labels in Latin, Cyrillic and Greek under three character sets: the default ASCII range drops what it cannot draw, an explicit list keeps only what you name, and auto reads the data.',
  section: 'Core layers',
  tags: ['TextLayer', 'characterSet', 'auto', 'unicode'],
  docs: [
    'repo/docs/api-reference/layers/text-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
