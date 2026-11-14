// deck-gl example: TextLayer anchor and baseline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TextLayer anchor and baseline',
  summary:
    'All nine combinations of getTextAnchor (start, middle, end) and getAlignmentBaseline (top, center, bottom) around red markers that show where each label is anchored.',
  section: 'Core layers',
  tags: ['TextLayer', 'getTextAnchor', 'getAlignmentBaseline', 'getPixelOffset'],
  docs: [
    'repo/docs/api-reference/layers/text-layer.md',
    'repo/docs/api-reference/core/layer.md',
    'repo/docs/api-reference/layers/scatterplot-layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
