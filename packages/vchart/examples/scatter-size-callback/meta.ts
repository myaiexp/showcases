// vchart example: Scatter: size and shape as functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter: size and shape as functions',
  summary:
    'size and shape also accept a callback over the datum, which skips the scale. Here the area follows the square root of the field and the symbol depends on a threshold; a slider moves the threshold.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['size', 'shape', 'function', 'point.style'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Scatter.md',
    'repo/docs/assets/option/en/series/scatter.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
