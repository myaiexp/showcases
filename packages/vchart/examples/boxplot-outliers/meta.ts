// vchart example: BoxPlot: outliers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BoxPlot: outliers',
  summary:
    'outliersField names an array field whose values are drawn as separate points beyond the whiskers, and outliersStyle sets their fill and size. A slider changes the outlier size and the toggle turns the field off.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['outliersField', 'outliersStyle.size', 'outliersStyle.fill'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/BoxPlot.md',
    'repo/docs/assets/option/en/series/box-plot.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
