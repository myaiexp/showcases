// tanstack-charts example: Hiding the tick label under focus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hiding the tick label under focus',
  summary:
    'An opacity callback on tick labels also receives focus and pointer. It runs again when focus changes, repainting without rebuilding marks, measuring text or moving ticks. Here the label of the focused x value is hidden, so the tooltip or crosshair label can take its place. Clearing focus restores it.',
  section: 'Scales, Guides, and Color',
  tags: ['axis.tickLabels.opacity', 'focus', 'ChartAxisTickLabelOpacityContext'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
