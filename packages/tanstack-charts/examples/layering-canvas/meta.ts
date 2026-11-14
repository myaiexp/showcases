// tanstack-charts example: Canvas for one mark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas for one mark',
  summary:
    'A 600-point range area painted on Canvas through the renderer option while the line, dots and labels stay SVG. The readout counts the canvas and SVG elements.',
  section: 'Marks and Layering',
  tags: ['renderer', 'canvasChartRenderer', 'areaY', 'text'],
  docs: ['repo/docs/concepts/marks-and-layering.md', 'repo/docs/reference/chart-spec.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
