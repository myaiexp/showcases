// vchart example: Brush inBrush and outOfBrush styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brush inBrush and outOfBrush styles',
  summary:
    'How selected and unselected marks look: inBrush and outOfBrush with colorAlpha, color, symbol and symbolSize, plus the selection box\'s own style. The card draws a box through dispatched pointer events for each style in turn.',
  section: 'Concepts: Components',
  tags: ['brush', 'inBrush', 'outOfBrush', 'colorAlpha', 'symbolSize', 'style'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Brush.md',
    'repo/docs/assets/option/en/component/brush.md',
    'repo/docs/assets/option/en/component/brush-common/brush-selected-item-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
