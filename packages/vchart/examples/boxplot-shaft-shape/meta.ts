// vchart example: BoxPlot: shaftShape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BoxPlot: shaftShape',
  summary:
    'boxPlot.style.shaftShape picks how the element is drawn: line (outlined box and whisker caps), bar (filled rectangles) or filled-line. A select switches the shape on a grouped chart.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['boxPlot.style.shaftShape', 'line', 'bar', 'filled-line'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/BoxPlot.md',
    'repo/docs/assets/option/en/mark/box-plot.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
