// tanstack-charts example: Inset and maxThickness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Inset and maxThickness',
  summary:
    'inset removes pixels from both edges of every bar\'s band, and maxThickness caps the bar width, centring a narrower bar in its band. Sliders change each; with a thin cap the bars stay the same width however wide the chart is.',
  section: 'Bar and Rect Marks',
  tags: ['barY', 'inset', 'maxThickness', 'scaleBand'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
