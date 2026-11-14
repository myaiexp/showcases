// vchart example: Scatter: sizeField bubbles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter: sizeField bubbles',
  summary:
    'sizeField maps a numeric field to the point size, which makes a bubble chart; size.range sets the smallest and largest symbol. A slider widens the largest bubble.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['sizeField', 'size.type', 'size.range'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Scatter.md',
    'repo/docs/assets/option/en/series/scatter.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
