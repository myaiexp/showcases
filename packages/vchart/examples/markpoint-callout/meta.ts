// vchart example: markPoint with item content and guide line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'markPoint with item content and guide line',
  summary:
    'A callout on the peak of a line chart: markPoint with coordinate, itemContent (text with a label background, offsetX / offsetY), itemLine (type-s, type-do, type-po, type-op, type-arc) and targetSymbol. In the card the callout follows the peak as the data changes.',
  section: 'Concepts: Components',
  tags: ['markPoint', 'coordinate', 'itemContent', 'itemLine', 'targetSymbol', 'offsetX', 'offsetY'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/marker.md',
    'repo/docs/assets/option/en/component/mark-point.md',
    'repo/docs/assets/option/en/component/marker-common/marker-data-point.md',
    'repo/docs/assets/option/en/component/marker-common/marker-label.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
