// vchart example: BoxPlot: grouped boxes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BoxPlot: grouped boxes',
  summary:
    'A second xField entry splits each category into side-by-side boxes, one per group, colored with the color array. A legend filters the groups.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['xField', 'seriesField', 'color', 'legends', 'boxPlot'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/BoxPlot.md',
    'repo/docs/assets/option/en/series/box-plot.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
