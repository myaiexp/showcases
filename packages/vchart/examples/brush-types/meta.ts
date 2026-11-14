// vchart example: Brush types: x, y, rect and polygon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brush types: x, y, rect and polygon',
  summary:
    'A scatter chart with a Brush: brushType x, y, rect or polygon and brushMode single or multiple. The card draws each kind of box through dispatched pointer events; in the full view drag on the chart.',
  section: 'Concepts: Components',
  tags: ['brush', 'brushType', 'brushMode', 'inBrush', 'outOfBrush'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Brush.md',
    'repo/docs/assets/option/en/component/brush.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
