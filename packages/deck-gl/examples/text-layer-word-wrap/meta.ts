// deck-gl example: TextLayer wordBreak and maxWidth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TextLayer wordBreak and maxWidth',
  summary:
    'Long strings wrapped into blocks: maxWidth sets the column width in multiples of the text size, wordBreak chooses between breaking at words or anywhere, lineHeight spaces the lines.',
  section: 'Core layers',
  tags: ['TextLayer', 'maxWidth', 'wordBreak', 'lineHeight', 'background'],
  docs: [
    'repo/docs/api-reference/layers/text-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
