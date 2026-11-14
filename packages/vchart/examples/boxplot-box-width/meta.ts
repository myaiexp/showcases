// vchart example: BoxPlot: box and whisker widths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BoxPlot: box and whisker widths',
  summary:
    'boxWidth fixes the width of the box and shaftWidth the width of the whisker caps; without them the width adapts to the band. Two sliders change them on the same data.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['boxPlot.style.boxWidth', 'boxPlot.style.shaftWidth', 'lineWidth'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/BoxPlot.md',
    'repo/docs/assets/option/en/mark/box-plot.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
