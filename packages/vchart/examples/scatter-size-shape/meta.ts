// vchart example: Scatter: size and shape together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter: size and shape together',
  summary:
    'One scatter series can encode four fields: x and y by position, a category by shape and color, and a number by size. New points arrive every couple of seconds, and hovering a point scales it through point.state.hover.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['sizeField', 'shapeField', 'seriesField', 'point.state.hover', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Scatter.md',
    'repo/docs/assets/option/en/series/scatter.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
